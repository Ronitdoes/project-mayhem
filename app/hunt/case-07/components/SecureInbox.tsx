'use client'

import { useState } from 'react'
import styles from '../operation-deadlight.module.css'

export interface TransmissionData {
  id: string
  recoveryKey: string
  name: string
  sector: string
}

interface SecureInboxProps {
  transmission: TransmissionData
  onEnterKey: () => void
}

export function SecureInbox({ transmission, onEnterKey }: SecureInboxProps) {
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [downloadError, setDownloadError] = useState('')

  async function handleDownloadDossier() {
    setDownloading(true)
    setDownloadError('')
    try {
      const res = await fetch('/hunt/case-07/api/transmissions/dossier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transmissionId: transmission.id }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setDownloadError(data.message || 'Download failed.')
        return
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'classified-dossier-site-kennedy.html'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setDownloaded(true)
    } catch {
      setDownloadError('Connection to archive server failed.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className={styles.crtTerminal}>
      <div className={styles.crtScanlines} />
      <div className={styles.terminalOutput}>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          borderBottom: '1px solid #1a4a1a',
          paddingBottom: '1rem',
          marginBottom: '1.5rem',
        }}>
          <p style={{
            fontSize: '0.65rem',
            color: '#ff4444',
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            margin: '0 0 0.5rem 0',
          }}>
            ⚡ CLASSIFIED INTELLIGENCE AVAILABLE ⚡
          </p>
          <p style={{
            fontSize: '1rem',
            color: '#4aff4a',
            fontWeight: 'bold',
            letterSpacing: '0.08em',
            margin: '0 0 0.3rem 0',
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            📨 TRANSMISSION INTERCEPTED
          </p>
          <p style={{ fontSize: '0.6rem', color: '#8a8070', margin: 0 }}>
            SITE KENNEDY SECURE ARCHIVE // CLASSIFICATION: RESTRICTED
          </p>
        </div>

        {/* Agent Status */}
        <div style={{
          background: '#0f0c08',
          borderLeft: '2px solid #8b1a1a',
          padding: '0.8rem',
          marginBottom: '1.2rem',
          fontSize: '0.75rem',
          color: '#aaa08f',
        }}>
          <strong>AGENT STATUS:</strong> <span style={{ color: '#ff4444', fontWeight: 'bold' }}>FLAGGED</span><br />
          <strong>SECTOR:</strong> {transmission.sector.toUpperCase()}<br />
          <strong>RECIPIENT:</strong> {transmission.name.toUpperCase()}
        </div>

        {/* Narrative message */}
        <div style={{
          background: '#0a0a0a',
          border: '1px solid #3a3020',
          padding: '1rem',
          margin: '1rem 0',
        }}>
          <p style={{ fontSize: '0.75rem', color: '#c8c0b0', margin: '0 0 0.8rem 0', lineHeight: 1.6 }}>
            A classified dossier has been compiled from intercepted data fragments recovered from the organism&apos;s neural network at Site Kennedy.
          </p>
          <p style={{ fontSize: '0.75rem', color: '#c8c0b0', margin: '0 0 0.8rem 0', lineHeight: 1.6 }}>
            The dossier contains <strong style={{ color: '#e8c060' }}>6 encoded data packets</strong>, each using a different encoding method. You must decode them to recover the <strong style={{ color: '#e8c060' }}>classification code</strong> and construct the validation key.
          </p>
          <p style={{ fontSize: '0.7rem', color: '#8a8070', margin: 0, lineHeight: 1.5 }}>
            Download the dossier below. The contents are eyes-only — do not share.
          </p>
        </div>

        {/* Download section */}
        <div style={{
          textAlign: 'center',
          padding: '1.5rem 0',
          borderTop: '1px solid #1a4a1a',
          borderBottom: '1px solid #1a4a1a',
          margin: '1.2rem 0',
        }}>
          <button
            type="button"
            onClick={handleDownloadDossier}
            disabled={downloading}
            style={{
              background: downloaded ? '#1a4a1a' : 'linear-gradient(135deg, #1a4a1a 0%, #0d3a0d 100%)',
              border: '1px solid #4aff4a',
              color: '#4aff4a',
              padding: '0.9rem 2rem',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              cursor: downloading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.08em',
              boxShadow: '0 0 15px rgba(74, 255, 74, 0.2)',
              transition: 'all 0.2s',
              width: '100%',
              maxWidth: '350px',
            }}
            onMouseOver={(e) => { if (!downloading) e.currentTarget.style.boxShadow = '0 0 25px rgba(74, 255, 74, 0.4)' }}
            onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 0 15px rgba(74, 255, 74, 0.2)' }}
          >
            {downloading ? 'GENERATING DOSSIER...' : downloaded ? '📄 DOSSIER DOWNLOADED ✓' : '📄 DOWNLOAD CLASSIFIED DOSSIER'}
          </button>

          {downloaded && (
            <p style={{ color: '#4aff4a', fontSize: '0.65rem', margin: '0.8rem 0 0 0' }}>
              ✓ Dossier saved. Open the HTML file in your browser to view the intelligence.
            </p>
          )}

          {downloadError && (
            <p style={{ color: '#ff4444', fontSize: '0.65rem', margin: '0.8rem 0 0 0' }}>
              ⚠ {downloadError}
            </p>
          )}
        </div>

        {/* Instructions */}
        <div style={{
          background: '#12100a',
          border: '1px solid #3a3020',
          padding: '0.8rem',
          margin: '0.8rem 0 1.2rem 0',
        }}>
          <p style={{ color: '#b8862a', fontWeight: 'bold', margin: '0 0 0.4rem 0', fontSize: '0.7rem' }}>
            AFTER DECODING:
          </p>
          <p style={{ fontSize: '0.65rem', color: '#c8c0b0', margin: '3px 0', lineHeight: 1.5 }}>
            The dossier contains instructions and a key format. Once you&apos;ve decoded all 6 packets, construct the validation key and enter it below to clear the quarantine checkpoint.
          </p>
        </div>

        {/* Enter Key button */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={onEnterKey}
            style={{
              background: 'linear-gradient(135deg, #b8862a 0%, #a1701a 100%)',
              border: '1px solid #cda75a',
              color: '#1a1205',
              padding: '0.8rem 1.8rem',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              boxShadow: '0 0 15px rgba(184, 134, 42, 0.3)',
              transition: 'all 0.2s',
              width: '100%',
              maxWidth: '300px',
            }}
            onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 0 25px rgba(184, 134, 42, 0.5)' }}
            onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 0 15px rgba(184, 134, 42, 0.3)' }}
          >
            [ ENTER RECOVERY KEY ]
          </button>
        </div>

        {/* Footer warning */}
        <p style={{
          color: '#8b1a1a',
          fontSize: '0.6rem',
          textAlign: 'center',
          marginTop: '1.2rem',
          lineHeight: 1.4,
        }}>
          ⚠ ALL VALIDATION ATTEMPTS ARE LOGGED SERVER-SIDE AND TRACED TO AGENT CREDENTIALS.
        </p>
      </div>
    </div>
  )
}
