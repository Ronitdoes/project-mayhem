const SESSION_SECRET = process.env.SESSION_SECRET || 'a-very-secure-random-secret-for-cryptic-hunt-default'

export async function signCookie(value: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(SESSION_SECRET)
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(value))
  const signatureArray = Array.from(new Uint8Array(signatureBuffer))
  const base64 = btoa(String.fromCharCode(...signatureArray))
  const base64url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  return `${value}.${base64url}`
}

export async function verifyCookie(cookieValue: string): Promise<string | null> {
  if (!cookieValue) return null
  const parts = cookieValue.split('.')
  if (parts.length !== 2) return null
  const [value, signature] = parts
  
  const expectedSigned = await signCookie(value)
  const expectedSignature = expectedSigned.split('.')[1]
  
  if (signature === expectedSignature) {
    return value
  }
  return null
}
