import { NextRequest, NextResponse } from 'next/server'
import { isDbAvailable, db } from '@/db'
import { emailTransmissions } from '@/db/schema'
import { mockTransmissions } from '@/app/hunt/case-07/lib/mockDb'
import { eq } from 'drizzle-orm'
import { getClientIp, isRateLimited, verifyCsrf } from '@/app/hunt/case-07/lib/rateLimit'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function generateDossierHtml(name: string, sector: string, recoveryKey: string): string {
  const parts = recoveryKey.split('-')
  const part1 = parts[0] || 'XXXX'
  const part3 = parts[2] || 'XXXX'
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[CLASSIFIED] Site Kennedy — Recovered Transmission</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: #050505;
      color: #c8c0b0;
      font-family: 'Courier New', Courier, monospace;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 700px;
      margin: 0 auto;
      background: #0a0806;
      border: 1px solid #1a4a1a;
      padding: 30px;
      position: relative;
    }
    .container::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0) 0px,
        rgba(0, 0, 0, 0) 2px,
        rgba(0, 0, 0, 0.15) 2px,
        rgba(0, 0, 0, 0.15) 4px
      );
      pointer-events: none;
      z-index: 1;
    }
    .header { text-align: center; margin-bottom: 20px; position: relative; z-index: 2; }
    .warning { color: #ff4444; font-size: 12px; font-weight: bold; letter-spacing: 0.1em; }
    h1 { color: #4aff4a; font-size: 20px; margin: 10px 0; letter-spacing: 0.05em; }
    .classification { color: #8a8070; font-size: 10px; }
    hr { border: none; border-top: 1px solid #1a4a1a; margin: 20px 0; }
    .agent-info {
      background: #0f0c08;
      border-left: 2px solid #8b1a1a;
      padding: 12px;
      font-size: 12px;
      color: #aaa08f;
      margin-bottom: 20px;
      position: relative;
      z-index: 2;
    }
    .agent-info .flagged { color: #ff4444; font-weight: bold; }
    .instructions {
      background: #0a0a0a;
      border: 1px solid #3a3020;
      padding: 12px;
      margin: 16px 0;
      position: relative;
      z-index: 2;
    }
    .instructions h3 { color: #b8862a; font-size: 12px; font-weight: bold; margin-bottom: 6px; }
    .instructions p { font-size: 12px; margin: 4px 0; }
    .highlight { color: #e8c060; }
    .packet {
      padding: 12px;
      margin: 12px 0;
      background: #080806;
      position: relative;
      z-index: 2;
    }
    .packet h4 { font-size: 12px; font-weight: bold; margin: 0 0 6px 0; }
    .packet code { color: #e8c060; font-size: 14px; font-weight: bold; }
    .packet .desc { color: #8a8070; font-size: 11px; margin-top: 6px; line-height: 1.4; }
    .packet .hint { color: #6a6050; font-size: 10px; }
    .packet-green { border-left: 3px solid #1a4a1a; }
    .packet-green h4 { color: #4aff4a; }
    .packet-blue { border-left: 3px solid #1a3a5a; }
    .packet-blue h4 { color: #aaccff; }
    .packet-purple { border-left: 3px solid #5a1a5a; }
    .packet-purple h4 { color: #cc88ff; }
    .packet-gold { border-left: 3px solid #5a3a1a; }
    .packet-gold h4 { color: #ffaa44; }
    .packet-red { border-left: 3px solid #5a1a1a; }
    .packet-red h4 { color: #ff6644; }
    .reference {
      background: #0c0c0c;
      border: 1px dashed #3a3020;
      padding: 12px;
      margin: 20px 0;
      position: relative;
      z-index: 2;
    }
    .reference h3 { color: #b8862a; font-size: 11px; font-weight: bold; margin-bottom: 6px; }
    .reference code { color: #8a8070; font-size: 10px; line-height: 1.6; }
    .key-format {
      background: #12100a;
      border: 1px solid #b8862a;
      padding: 15px;
      text-align: center;
      margin: 20px 0;
      position: relative;
      z-index: 2;
    }
    .key-format .key {
      color: #b8862a;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0.2em;
      text-shadow: 0 0 8px rgba(184, 134, 42, 0.3);
    }
    .alert {
      color: #8b1a1a;
      font-size: 11px;
      text-align: center;
      margin-top: 20px;
      position: relative;
      z-index: 2;
    }
    .footer {
      text-align: center;
      color: #5a5040;
      font-size: 10px;
      line-height: 1.6;
      position: relative;
      z-index: 2;
    }
    .body-content { position: relative; z-index: 2; }
    @media print {
      body { background: #fff; color: #000; }
      .container { border-color: #000; background: #fff; }
      .container::before { display: none; }
      h1 { color: #000; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p class="warning">⚡ WARNING: AUTHORIZED DIRECTIVE ONLY ⚡</p>
      <h1>CASE FILE 07 — OPERATION DEADLIGHT</h1>
      <p class="classification">CLASSIFICATION: RESTRICTED // SITE KENNEDY ARCHIVES</p>
    </div>

    <hr>

    <div class="body-content">
      <div class="agent-info">
        <strong>AGENT STATUS:</strong> <span class="flagged">FLAGGED</span><br>
        <strong>SECTOR ASSIGNMENT:</strong> ${escapeHtml(sector.toUpperCase())}<br>
        <strong>RECIPIENT:</strong> ${escapeHtml(name.toUpperCase())}
      </div>

      <p style="font-size: 13px; margin: 15px 0;">
        6 encoded data packets were intercepted from the organism&apos;s neural network.
        Each packet uses a different encoding method and contains a single number.
      </p>

      <div class="instructions">
        <h3>INSTRUCTIONS:</h3>
        <p>1. Decode each packet to its <strong class="highlight">decimal value</strong>.</p>
        <p>2. Map each decimal to the alphabet (<span class="highlight">1=A, 2=B, ... 26=Z</span>).</p>
        <p>3. Compile the 6 letters in packet order to form the <strong class="highlight">classification code</strong>.</p>
      </div>

      <div class="packet packet-green">
        <h4>PACKET 1 — BINARY (Base-2)</h4>
        <code>00010000</code>
        <p class="desc">Standard 8-bit binary. Bit positions: (128, 64, 32, 16, 8, 4, 2, 1). Sum the positions where &apos;1&apos; appears.</p>
      </div>

      <div class="packet packet-blue">
        <h4>PACKET 2 — HEXADECIMAL (Base-16)</h4>
        <code>0x0C</code>
        <p class="desc">Base-16 digits: 0-9, then A=10, B=11, C=12, D=13, E=14, F=15. Convert to decimal.</p>
      </div>

      <div class="packet packet-purple">
        <h4>PACKET 3 — OCTAL (Base-8)</h4>
        <code>01</code>
        <p class="desc">Base-8 number system. Each digit represents powers of 8. Convert to decimal.</p>
      </div>

      <div class="packet packet-gold">
        <h4>PACKET 4 — BASE64</h4>
        <code>Bw==</code>
        <p class="desc">Base64 decodes to raw bytes. Decode &quot;Bw==&quot; to get a single byte, then read its decimal value.<br>
          <span class="hint">Technical hint: &apos;B&apos; = index 1, &apos;w&apos; = index 48. Combined: (1 &lt;&lt; 2) | (48 &gt;&gt; 4) = 7.</span>
        </p>
      </div>

      <div class="packet packet-green">
        <h4>PACKET 5 — ASCII ARITHMETIC</h4>
        <code>chr(66) - chr(65)</code>
        <p class="desc">ASCII character code subtraction. Look up the decimal values: &apos;A&apos;=65, &apos;B&apos;=66, &apos;C&apos;=67, etc. Subtract.</p>
      </div>

      <div class="packet packet-red">
        <h4>PACKET 6 — BINARY XOR</h4>
        <code>11001 XOR 01010</code>
        <p class="desc">Bitwise XOR on two 5-bit numbers, then convert result to decimal.<br>
          XOR rule: same bits &rarr; 0, different bits &rarr; 1.
        </p>
      </div>

      <div class="reference">
        <h3>ALPHABET REFERENCE:</h3>
        <code>
          A=1 &nbsp; B=2 &nbsp; C=3 &nbsp; D=4 &nbsp; E=5 &nbsp; F=6 &nbsp; G=7 &nbsp; H=8 &nbsp; I=9 &nbsp; J=10 &nbsp; K=11 &nbsp; L=12 &nbsp; M=13<br>
          N=14 &nbsp; O=15 &nbsp; P=16 &nbsp; Q=17 &nbsp; R=18 &nbsp; S=19 &nbsp; T=20 &nbsp; U=21 &nbsp; V=22 &nbsp; W=23 &nbsp; X=24 &nbsp; Y=25 &nbsp; Z=26
        </code>
      </div>

      <p style="font-size: 13px; margin: 15px 0;">
        Upon proper reconstruction, investigators established the decryption validation key format:
      </p>

      <div class="key-format">
        <p class="key">${part1}-[DECODED_CODE]-${part3}</p>
      </div>

      <p style="font-size: 13px; margin: 15px 0;">
        Replace <strong class="highlight">[DECODED_CODE]</strong> with the 6-letter classification code you deciphered from the 6 data packets above to form the final validation key (e.g., <code style="color: #aaa08f;">${part1}-XXXXXX-${part3}</code>).
      </p>

      <p class="alert">
        ⚠ DO NOT SHARE THIS KEY. ALL VALIDATION ATTEMPTS ARE LOGGED SERVER-SIDE AND TRACED TO AGENT CREDENTIALS.
      </p>
    </div>

    <hr>

    <div class="footer">
      <p>PROJECT NULL // SITE KENNEDY COMMAND HQ // 1996<br>
      SECURITY DIVISION — BIOLOGICAL CONTAINMENT RESPONSE</p>
    </div>
  </div>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  try {
    // 1. CSRF validation
    if (!verifyCsrf(request)) {
      return NextResponse.json({ success: false, message: 'CSRF validation failed.' }, { status: 403 })
    }

    // 2. Rate limiting
    const ip = getClientIp(request)
    if (isRateLimited(ip, 10, 60 * 60 * 1000, 'transmissions-dossier')) {
      return NextResponse.json(
        { success: false, message: 'Too many download attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const body: unknown = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, message: 'Invalid payload.' }, { status: 400 })
    }

    const { transmissionId } = body as Record<string, unknown>
    if (typeof transmissionId !== 'string' || !transmissionId.trim()) {
      return NextResponse.json({ success: false, message: 'Transmission ID is required.' }, { status: 400 })
    }

    // Look up the transmission record
    let record: any = null

    if (isDbAvailable) {
      try {
        const records = await db
          .select()
          .from(emailTransmissions)
          .where(eq(emailTransmissions.id, transmissionId.trim()))
        record = records[0]
      } catch (dbErr) {
        console.error('Database query error in dossier route:', dbErr)
      }
    }

    if (!record) {
      record = mockTransmissions.get(transmissionId.trim())
    }

    if (!record) {
      return NextResponse.json(
        { success: false, message: 'Transmission record not found.' },
        { status: 404 }
      )
    }

    // Generate the dossier HTML
    const html = generateDossierHtml(record.name, record.sector, record.recoveryKey)

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': 'attachment; filename="classified-dossier-site-kennedy.html"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (error: any) {
    console.error('Dossier download API exception:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
