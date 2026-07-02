import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyCookie } from '@/lib/auth-session'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip API routes so API requests return JSON rather than HTML redirects
  if (pathname.includes('/api/')) {
    return NextResponse.next()
  }

  const authCookie = request.cookies.get('auth_session')?.value
  const userId = authCookie ? await verifyCookie(authCookie) : null

  if (!userId) {
    const loginUrl = new URL('/', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/hunt', '/hunt/:path*'],
}
