'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ActCinematicIntro } from '../components/ActCinematicIntro'
import { DialogueBox } from '../components/DialogueBox'
import { TransmissionRegistration } from '../components/TransmissionRegistration'
import { SecureInbox, TransmissionData } from '../components/SecureInbox'
import { RecoveryKeyModal } from '../components/RecoveryKeyModal'
import styles from '../operation-deadlight.module.css'

type Phase = 'form' | 'processing' | 'detected' | 'tracing' | 'breached' | 'inbox'

const SECTOR_MESSAGES: Record<string, string> = {
  'A-BLOCK': 'Sector A-Block was the first to fall silent.',
  'B-BLOCK': 'Sector B-Block personnel stopped responding on Day 11.',
  'C-BLOCK': 'Sector C-Block was the last known location of the organism.',
}

function delay(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

export function Act2Quarantine({ onPuzzleSolved }: { onPuzzleSolved: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState<Phase>('form')
  const [residentId, setResidentId] = useState('')
  const [sector, setSector] = useState('A-BLOCK')
  const [progressPct, setProgressPct] = useState(0)
  const [tracingLines, setTracingLines] = useState<string[]>([])
  const progressRef = useRef<NodeJS.Timeout | null>(null)

  // Transmission data from the API
  const [transmission, setTransmission] = useState<TransmissionData | null>(null)

  // Admin override modal
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [adminCode, setAdminCode] = useState('')
  const [adminStatus, setAdminStatus] = useState<'idle' | 'checking' | 'invalid' | 'valid'>('idle')

  // Recovery Key Modal
  const [showKeyModal, setShowKeyModal] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleRegistrationSuccess = async (name: string, sectorVal: string, transmissionData: TransmissionData) => {
    setResidentId(name)
    setSector(sectorVal)
    setTransmission(transmissionData)

    // Phase 1: Processing
    setPhase('processing')
    setProgressPct(0)
    progressRef.current = setInterval(() => {
      setProgressPct(p => {
        if (p >= 100) {
          if (progressRef.current) clearInterval(progressRef.current)
          return 100
        }
        return p + Math.random() * 15 + 5
      })
    }, 180)

    await delay(1800)
    if (progressRef.current) clearInterval(progressRef.current)
    setProgressPct(100)

    // Phase 2: Signal Detected flash
    setPhase('detected')
    document.body.classList.add('chromatic-split')
    await delay(300)
    document.body.classList.remove('chromatic-split')
    await delay(1200)

    // Phase 3: Tracing animation
    setPhase('tracing')
    const lines = [
      '> IDENTIFYING NETWORK NODE...',
      '> SCANNING REGISTRATION DATA...',
      `> AGENT: ${name.toUpperCase()}`,
      '> DEVICE FINGERPRINT: LOGGED',
      '> LOCATION: TRIANGULATING...',
      '> IP ORIGIN: CLASSIFIED',
      '> CROSS-REFERENCING WITH PROJECT NULL DATABASE...',
      `> MATCH FOUND — SECTOR: ${sectorVal}`,
    ]
    for (let i = 0; i < lines.length; i++) {
      await delay(350)
      setTracingLines(prev => [...prev, lines[i]])
    }
    await delay(3000)

    // Phase 4: Data breach warning
    setPhase('breached')
    await delay(6000)

    // Phase 5: Show in-app inbox with the puzzle data
    setPhase('inbox')
  }

  async function handleAdminOverride(e: React.FormEvent) {
    e.preventDefault()
    if (!adminCode.trim() || adminStatus === 'checking') return
    setAdminStatus('checking')
    try {
      const res = await fetch('/hunt/case-07/api/quarantine/admin-bypass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ overrideCode: adminCode.trim() })
      })
      const data = await res.json()
      if (data.valid) {
        setAdminStatus('valid')
        setTimeout(() => {
          setShowAdminModal(false)
          onPuzzleSolved()
        }, 1500)
      } else {
        setAdminStatus('invalid')
        setTimeout(() => setAdminStatus('idle'), 2000)
      }
    } catch {
      setAdminStatus('invalid')
      setTimeout(() => setAdminStatus('idle'), 2000)
    }
  }

  return (
    <>
      <ActCinematicIntro
        index="02"
        act="THE QUARANTINE"
        title="STAGE 1"
        transmission="QUARANTINE REGISTRATION"
      />
      <section ref={sectionRef} className={styles.actSection}>
        <div className={styles.actContent}>
          <p className={styles.actLabel}>ACT 02 · The Quarantine</p>

          <DialogueBox
            speaker="FIELD LOG — DAY 3"
            side="left"
            style="analyst"
            text="We've set up a registration checkpoint. All residents must re-register with Site Command to confirm their identity. Several individuals attempted to bypass the checkpoint. If you're reading this… you've just been flagged."
          />

          {/* Registration Form */}
          {phase === 'form' && (
            <TransmissionRegistration onSuccess={handleRegistrationSuccess} />
          )}

          {/* Processing Phase */}
          {phase === 'processing' && (
            <div className={styles.crtTerminal}>
              <div className={styles.crtScanlines} />
              <div className={styles.terminalOutput}>
                <p>&gt; PROCESSING SUBMISSION...</p>
                <p>&gt; CROSS-REFERENCING RESIDENT DATABASE...</p>
                <p>&gt; ANALYZING NETWORK SIGNATURE...</p>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${Math.min(progressPct, 100)}%` }} />
                </div>
                <p>{Math.min(Math.round(progressPct), 100)}%</p>
              </div>
            </div>
          )}

          {/* Detected Phase */}
          {phase === 'detected' && (
            <div className={styles.detectedOverlay}>
              <h2 className={styles.detectedText}>⚠ SIGNAL DETECTED ⚠</h2>
            </div>
          )}

          {/* Tracing Phase */}
          {phase === 'tracing' && (
            <div className={styles.crtTerminal}>
              <div className={styles.crtScanlines} />
              <div className={styles.terminalOutput}>
                {tracingLines.map((line, i) => (
                  <p key={i} className={line.includes(residentId.toUpperCase()) ? styles.tracingHighlight : ''}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Breached Phase */}
          {phase === 'breached' && (
            <div className={styles.breachCard}>
              <div className={styles.breachBorder}>
                <h3>⚠ DATA EXPOSURE CONFIRMED ⚠</h3>
                <div className={styles.breachContent}>
                  <p>Your registration has been flagged.</p>
                  <p>Your network signature has been logged.</p>
                  <p>Your sector has been recorded.</p>
                  <br />
                  <p className={styles.breachSector}>
                    {SECTOR_MESSAGES[sector] ?? 'Your sector has been marked for review.'}
                  </p>
                  <br />
                  <p>A classified transmission has been intercepted from Site Kennedy archives.</p>
                  <p><strong>The intelligence is now accessible below. Decode it.</strong></p>
                </div>
                <p className={styles.breachSubtext}>
                  &quot;Don&apos;t worry. You were never safe to begin with.&quot;
                </p>
              </div>
            </div>
          )}

          {/* Inbox Phase — In-App Secure Inbox */}
          {phase === 'inbox' && transmission && (
            <>
              <SecureInbox
                transmission={transmission}
                onEnterKey={() => setShowKeyModal(true)}
              />

              {/* Admin Override button */}
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAdminModal(true)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #3a3020',
                    color: '#8a8070',
                    padding: '0.5rem 1rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                  }}
                >
                  ADMIN OVERRIDE
                </button>
              </div>

              {/* Admin Override Modal */}
              {showAdminModal && (
                <div style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0,0,0,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 9999,
                }}>
                  <div style={{
                    background: '#0a0806',
                    border: '1px solid #3a3020',
                    padding: '2rem',
                    maxWidth: '400px',
                    width: '90%',
                    fontFamily: 'var(--font-mono, monospace)',
                  }}>
                    <h3 style={{ color: '#b8862a', marginTop: 0, fontSize: '0.9rem' }}>
                      ADMIN OVERRIDE
                    </h3>
                    <p style={{ color: '#8a8070', fontSize: '0.7rem', lineHeight: 1.4 }}>
                      If you cannot decode the transmission, contact event organizers for an override code.
                    </p>
                    <form onSubmit={handleAdminOverride} style={{ marginTop: '1rem' }}>
                      <input
                        type="text"
                        value={adminCode}
                        onChange={e => setAdminCode(e.target.value)}
                        placeholder="Enter override code..."
                        autoComplete="off"
                        style={{
                          width: '100%',
                          background: '#050505',
                          border: '1px solid #3a3020',
                          color: '#c8c0b0',
                          padding: '0.6rem',
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '0.8rem',
                          boxSizing: 'border-box',
                        }}
                      />
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem' }}>
                        <button
                          type="submit"
                          disabled={adminStatus === 'checking'}
                          style={{
                            flex: 1,
                            background: '#b8862a',
                            border: 'none',
                            color: '#1a1205',
                            padding: '0.5rem',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                          }}
                        >
                          {adminStatus === 'checking' ? 'VERIFYING...' : adminStatus === 'valid' ? 'ACCESS GRANTED ✓' : 'SUBMIT'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setShowAdminModal(false); setAdminCode(''); setAdminStatus('idle') }}
                          style={{
                            background: 'transparent',
                            border: '1px solid #3a3020',
                            color: '#8a8070',
                            padding: '0.5rem 1rem',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                          }}
                        >
                          CANCEL
                        </button>
                      </div>
                      {adminStatus === 'invalid' && (
                        <p style={{ color: '#ff4444', fontSize: '0.7rem', marginTop: '0.5rem' }}>
                          OVERRIDE CODE REJECTED.
                        </p>
                      )}
                      {adminStatus === 'valid' && (
                        <p style={{ color: '#4aff4a', fontSize: '0.7rem', marginTop: '0.5rem' }}>
                          ACCESS GRANTED. BYPASSING QUARANTINE...
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Recovery Key Input Modal */}
      <RecoveryKeyModal
        isOpen={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        onVerified={onPuzzleSolved}
      />
    </>
  )
}
