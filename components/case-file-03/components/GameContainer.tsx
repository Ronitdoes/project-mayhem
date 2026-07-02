"use client";
import '../styles.css';

import { useState, useEffect } from 'react';
import { markCaseCompleted } from '@/components/case-progress';
import dynamic from 'next/dynamic';
import { useAudio } from '@/components/AudioProvider';
import { useGameEngine } from '../hooks/useGameEngine';
import { Minimap } from './Minimap';
import { QuestionModal, TypewriterText } from './QuestionModal';
import { StoryModal } from './StoryModal';
import { ArrowUp, ArrowDown, CornerUpLeft, CornerUpRight, Map } from 'lucide-react';

const FirstPersonView = dynamic(
  () => import('./FirstPersonView').then(mod => mod.FirstPersonView),
  { ssr: false }
);

export default function GameContainer() {
  const { changeBGM } = useAudio();
  const { 
    player, anomalies, activeAnomaly, solveAnomaly, closeAnomaly, 
    gameWon, allSolved, movePlayer, turnPlayer, levelIndex, currentMap,
    showStory, finishStory
  } = useGameEngine();

  const [showMap, setShowMap] = useState<boolean>(true);
  const [showBootScreen, setShowBootScreen] = useState<boolean>(true);
  const [bootCompleted, setBootCompleted] = useState<boolean>(false);

  useEffect(() => {
    changeBGM('/cathedral.wav');
    return () => {
      changeBGM('/audio/story-start2.mp3');
    };
  }, [changeBGM]);

  useEffect(() => {
    (window as any).map = () => {
      setShowMap(prev => !prev);
      return "Map visibility toggled.";
    };
    return () => {
      delete (window as any).map;
    };
  }, []);

  useEffect(() => {
    if (gameWon) {
      markCaseCompleted("03");
      const timer = setTimeout(() => {
        window.location.href = '/hunt';
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [gameWon]);

  const solvedCount = Object.values(anomalies).filter(a => a.solved).length;
  const totalAnomalies = Object.keys(anomalies).length;

  if (showBootScreen) {
    return (
      <div className="game-container" style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#050202', width: '100vw', height: '100vh', position: 'fixed', inset: 0, zIndex: 300 }}>
        <div className="scanline-overlay"></div>
        <div className="hud-box" style={{ maxWidth: '500px', width: '90%', padding: '40px', border: '1px solid var(--color-accent-dim)' }}>
          <h2 style={{ fontFamily: 'var(--font-title)', color: 'var(--color-accent)', letterSpacing: '4px', marginBottom: '1.5rem', textAlign: 'center' }}>
            THE DYING FLAME
          </h2>
          <div style={{ color: 'var(--color-danger)', fontWeight: 'bold', fontFamily: 'var(--font-mono)', marginBottom: '1.5rem', letterSpacing: '2px', fontSize: '0.9rem', textAlign: 'center' }}>
            STATUS: CORRUPTED
          </div>
          <div className="question-text" style={{ textAlign: 'left', minHeight: '185px', fontFamily: 'var(--font-mono)', color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: '1.8' }}>
            <TypewriterText 
              text={"Among the ruins,\nseven anomalies survived.\n\nEach concealed\na fragment of the truth.\n\nPROJECT NULL\nbegan the investigation."} 
              speed={30} 
              onComplete={() => setBootCompleted(true)} 
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
            {bootCompleted && (
              <button 
                type="button" 
                onClick={() => setShowBootScreen(false)} 
                className="basic-btn primary-btn"
                style={{ width: '100%' }}
              >
                BEGIN INVESTIGATION
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="scanline-overlay"></div>

      <div className="hud-area">
        <div className="hud-box">
          <h3 style={{ margin: 0, color: 'var(--color-accent)' }}>PROJECT NULL</h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem' }}>SECTOR: RUINS {levelIndex + 1}</p>
          {levelIndex === 0 && (
            <p style={{ margin: '8px 0 0 0' }}>Anomalies Sealed: {solvedCount} / {totalAnomalies}</p>
          )}
          {levelIndex === 1 && (
            <p style={{ margin: '8px 0 0 0', color: 'var(--color-success)' }}>Flame Sanctuary Reached</p>
          )}
          <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.8rem', display: 'var(--desktop-instructions)', marginTop: '8px' }}>W,A,S,D to navigate</p>
        </div>
      </div>

      <div className="viewport-area">
        <FirstPersonView player={player} anomalies={anomalies} allSolved={allSolved} currentMap={currentMap} />
      </div>

      <div className="controls-area">
        <div className="d-pad">
          <button className="basic-btn control-btn" onClick={() => turnPlayer(-1)}><CornerUpLeft size={28} /></button>
          <div className="up-down">
            <button className="basic-btn control-btn" onClick={() => movePlayer(0, 1)}><ArrowUp size={28} /></button>
            <button className="basic-btn control-btn" onClick={() => movePlayer(0, -1)}><ArrowDown size={28} /></button>
          </div>
          <button className="basic-btn control-btn" onClick={() => turnPlayer(1)}><CornerUpRight size={28} /></button>
        </div>
      </div>

      {/* Manual toggle map for mobile/convenience */}
      <button 
        onClick={() => setShowMap(prev => !prev)}
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          zIndex: 60,
          background: 'rgba(0,0,0,0.8)',
          border: '1px solid var(--color-accent)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--color-accent)',
          cursor: 'pointer'
        }}
        title="Toggle Map"
      >
        <Map size={20} />
      </button>

      {showMap && (
        <div className="minimap-area">
          <Minimap player={player} anomalies={anomalies} allSolved={allSolved} currentMap={currentMap} />
        </div>
      )}

      <QuestionModal activeAnomaly={activeAnomaly} solveAnomaly={solveAnomaly} closeAnomaly={closeAnomaly} showMap={showMap} />

      {showStory && <StoryModal onClose={finishStory} />}

      {gameWon && (
        <div className="win-screen" style={{ backgroundColor: '#050202', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="scanline-overlay"></div>
          <div className="hud-box" style={{ maxWidth: '500px', width: '90%', padding: '40px', border: '1px solid var(--color-success)', boxShadow: '0 0 35px rgba(5, 242, 146, 0.2)' }}>
            <h2 style={{ fontFamily: 'var(--font-title)', color: 'var(--color-success)', letterSpacing: '4px', marginBottom: '1.5rem', textAlign: 'center' }}>
              CASE CONCLUSION
            </h2>
            <div style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem', letterSpacing: '1px', fontSize: '0.8rem' }}>
              CASE STATUS:
            </div>
            <div style={{ color: 'var(--color-success)', fontWeight: 'bold', fontFamily: 'var(--font-mono)', marginBottom: '1.5rem', letterSpacing: '2px', fontSize: '1.1rem' }}>
              ARCHIVE: RESTORED
            </div>
            <div style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem', letterSpacing: '1px', fontSize: '0.8rem' }}>
              FIRST FLAME:
            </div>
            <div style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontFamily: 'var(--font-mono)', marginBottom: '1.5rem', letterSpacing: '2px', fontSize: '1.1rem' }}>
              UNKNOWN
            </div>
            
            <div className="question-text" style={{ textAlign: 'left', minHeight: '100px', fontFamily: 'var(--font-mono)', fontSize: '0.95rem', lineHeight: '1.8' }}>
              <TypewriterText 
                text={"✓ Seven Anomalies Solved\n\nAdditional records unlocked..."} 
                speed={40}
              />
            </div>
            
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                onClick={() => { markCaseCompleted("03"); window.location.href = '/hunt'; }}
                className="basic-btn"
                style={{
                  width: '100%',
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  border: '1.5px solid var(--color-success)',
                  color: 'var(--color-success)',
                  background: 'rgba(0, 0, 0, 0.5)',
                  cursor: 'pointer',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}
              >
                Return to Hub
              </button>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'monospace', marginTop: '8px' }}>
                Redirecting automatically in 5 seconds...
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
