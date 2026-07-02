import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/app/hunt/case-07/lib/session'
import { db, isDbAvailable } from '@/db'
import { userProgress } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

const MAX_KEY_LENGTH = 64
const MAX_CASE_ID_LENGTH = 16
const MAX_VALUE_SIZE_BYTES = 10 * 1024 // 10 KB max payload size

function safeParseProgressValue(raw: string): any {
  if (raw === undefined || raw === null) return null
  try {
    return JSON.parse(raw)
  } catch {
    return raw
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const caseId = searchParams.get('caseId')

  if (!caseId || typeof caseId !== 'string' || caseId.length > MAX_CASE_ID_LENGTH) {
    return NextResponse.json({ success: false, error: 'Valid caseId parameter required' }, { status: 400 })
  }

  const session = await getSession()
  if (!session?.userId) {
    return NextResponse.json({ success: true, progress: {} })
  }

  if (!isDbAvailable) {
    return NextResponse.json({ success: true, progress: {} })
  }

  try {
    const rows = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, session.userId),
          eq(userProgress.caseId, caseId)
        )
      )

    const progress: Record<string, any> = {}
    rows.forEach((row: any) => {
      progress[row.progressKey] = safeParseProgressValue(row.progressValue)
    })

    return NextResponse.json({ success: true, progress })
  } catch (error) {
    console.error(`Failed to load progress for case ${caseId}:`, error)
    return NextResponse.json({ success: false, error: 'Database read error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.userId) {
      return NextResponse.json({ success: false, error: 'Unauthenticated' }, { status: 401 })
    }

    const body = await request.json()
    const { caseId, key, value } = body || {}

    if (!caseId || typeof caseId !== 'string' || !key || typeof key !== 'string' || value === undefined) {
      return NextResponse.json({ success: false, error: 'caseId, key, and value are required' }, { status: 400 })
    }

    if (caseId.length > MAX_CASE_ID_LENGTH || key.length > MAX_KEY_LENGTH) {
      return NextResponse.json({ success: false, error: 'caseId or key exceeds maximum allowed length' }, { status: 400 })
    }

    // Key format validation (alphanumeric, -, _, .)
    if (!/^[a-zA-Z0-9_\-\.]+$/.test(key)) {
      return NextResponse.json({ success: false, error: 'Invalid progress key format' }, { status: 400 })
    }

    let valString: string
    try {
      valString = JSON.stringify(value)
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid value format (failed JSON serialization)' }, { status: 400 })
    }

    if (Buffer.byteLength(valString, 'utf8') > MAX_VALUE_SIZE_BYTES) {
      return NextResponse.json({ success: false, error: 'Progress payload exceeds maximum allowed size (10KB)' }, { status: 400 })
    }

    if (!isDbAvailable) {
      return NextResponse.json({ success: true }) // Silent success for offline demo mode
    }

    await db
      .insert(userProgress)
      .values({
        userId: session.userId,
        caseId: caseId,
        progressKey: key,
        progressValue: valString,
        updatedAt: new Date()
      })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.caseId, userProgress.progressKey],
        set: {
          progressValue: valString,
          updatedAt: new Date()
        }
      })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to save progress:', error)
    return NextResponse.json({ success: false, error: 'Database write error' }, { status: 500 })
  }
}
