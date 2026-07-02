import { NextRequest, NextResponse } from 'next/server'
import { isDbAvailable, db } from '@/db'
import { emailTransmissions } from '@/db/schema'
import { mockTransmissions } from '@/app/hunt/case-07/lib/mockDb'
import { eq, desc } from 'drizzle-orm'
import { getSession, saveDemoState } from '@/app/hunt/case-07/lib/session'
import { getClientIp, isRateLimited, verifyCsrf } from '@/app/hunt/case-07/lib/rateLimit'

// Same puzzle packets as in the send route
const PUZZLE_PACKETS = [
  {
    id: 1,
    title: 'BINARY (Base-2)',
    data: '00010000',
    method: "Standard 8-bit binary. Bit positions: (128, 64, 32, 16, 8, 4, 2, 1). Sum the positions where '1' appears.",
    color: 'green',
  },
  {
    id: 2,
    title: 'HEXADECIMAL (Base-16)',
    data: '0x0C',
    method: 'Base-16 digits: 0-9, then A=10, B=11, C=12, D=13, E=14, F=15. Convert to decimal.',
    color: 'blue',
  },
  {
    id: 3,
    title: 'OCTAL (Base-8)',
    data: '01',
    method: 'Base-8 number system. Each digit represents powers of 8. Convert to decimal.',
    color: 'purple',
  },
  {
    id: 4,
    title: 'BASE64',
    data: 'Bw==',
    method: 'Base64 decodes to raw bytes. Decode "Bw==" to get a single byte, then read its decimal value.',
    hint: "Technical hint: 'B' = index 1, 'w' = index 48. Combined: (1 << 2) | (48 >> 4) = 7.",
    color: 'gold',
  },
  {
    id: 5,
    title: 'ASCII ARITHMETIC',
    data: 'chr(66) - chr(65)',
    method: "ASCII character code subtraction. Look up the decimal values: 'A'=65, 'B'=66, 'C'=67, etc. Subtract.",
    color: 'green',
  },
  {
    id: 6,
    title: 'BINARY XOR',
    data: '11001 XOR 01010',
    method: 'Bitwise XOR on two 5-bit numbers, then convert result to decimal. XOR rule: same bits → 0, different bits → 1.',
    color: 'red',
  },
]

export async function POST(request: NextRequest) {
  try {
    // 1. CSRF validation
    if (!verifyCsrf(request)) {
      return NextResponse.json({ success: false, message: 'CSRF validation failed.' }, { status: 403 })
    }

    // 2. IP-based rate limiting (Max 3 resends per hour)
    const ip = getClientIp(request)
    if (isRateLimited(ip, 3, 60 * 60 * 1000, 'transmissions-resend')) {
      return NextResponse.json(
        { success: false, message: 'Too many resend attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const body: unknown = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, message: 'Invalid payload.' }, { status: 400 })
    }

    const { email } = body as Record<string, unknown>
    if (typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ success: false, message: 'Email address is required.' }, { status: 400 })
    }

    const cleanedEmail = email.trim().toLowerCase()

    // 3. Authenticate and enforce session-to-email ownership
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Active session not found.' },
        { status: 401 }
      )
    }

    if (session.email.toLowerCase() !== cleanedEmail) {
      if (!isDbAvailable && session.email === 'agent@aetherion.org') {
        session.email = cleanedEmail
        await saveDemoState(session)
      } else {
        return NextResponse.json(
          { success: false, message: 'Unauthorized. Active session does not match requested email.' },
          { status: 401 }
        )
      }
    }

    let record: any = null

    if (isDbAvailable) {
      try {
        const records = await db
          .select()
          .from(emailTransmissions)
          .where(eq(emailTransmissions.email, cleanedEmail))
          .orderBy(desc(emailTransmissions.sentAt))
          .limit(1)
        record = records[0]
      } catch (dbErr) {
        console.error('Database query error in resend route:', dbErr)
      }
    }

    if (!record) {
      const mockRecords = Array.from(mockTransmissions.values())
        .filter(t => t.email === cleanedEmail)
        .sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime())
      record = mockRecords[0]
    }

    if (!record) {
      return NextResponse.json(
        { success: false, message: 'No active transmission registration found for this email address.' },
        { status: 404 }
      )
    }

    // Cooldown verification (60 seconds)
    const lastSentTime = record.lastResentAt ? new Date(record.lastResentAt).getTime() : new Date(record.sentAt).getTime()
    const elapsedSeconds = (Date.now() - lastSentTime) / 1000

    if (elapsedSeconds < 60) {
      const waitTime = Math.ceil(60 - elapsedSeconds)
      return NextResponse.json(
        { success: false, message: `Please wait ${waitTime} seconds before requesting a resend.` },
        { status: 429 }
      )
    }

    // Limit check (Maximum 3 resends)
    if (record.resendCount >= 3) {
      return NextResponse.json(
        { success: false, message: 'Maximum limit of 3 resends has been reached for this transmission.' },
        { status: 400 }
      )
    }

    const nextResendCount = record.resendCount + 1
    const lastResentAt = new Date()

    // Update resend tracking info
    if (isDbAvailable) {
      try {
        await db
          .update(emailTransmissions)
          .set({
            resendCount: nextResendCount,
            lastResentAt,
            deliveryStatus: 'delivered',
            deliveryError: null,
            updatedAt: new Date(),
          })
          .where(eq(emailTransmissions.id, record.id))
      } catch (dbErr) {
        console.error('Database update error in resend route:', dbErr)
      }
    }

    mockTransmissions.set(record.id, {
      ...record,
      resendCount: nextResendCount,
      lastResentAt,
      deliveryStatus: 'delivered',
      deliveryError: null,
      updatedAt: new Date(),
    })

    // Return the transmission data directly — no email needed
    return NextResponse.json({
      success: true,
      transmission: {
        id: record.id,
        recoveryKey: record.recoveryKey,
        name: record.name,
        sector: record.sector,
        packets: PUZZLE_PACKETS,
      },
    })
  } catch (error: any) {

    console.error('Transmission resend API exception:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
