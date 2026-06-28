import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, RotateCw, RefreshCw } from 'lucide-react';

// ==========================================
// 1. FORGOTTEN HYMN PUZZLE
// ==========================================
interface ForgottenHymnProps {
  activeAnomaly: any;
  onSolve: () => void;
}

function ForgottenHymn({ activeAnomaly, onSolve }: ForgottenHymnProps) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().trim() === 'flame') {
      setError(false);
      onSolve();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <p className="question-text" style={{ fontStyle: 'italic', opacity: 0.85, fontSize: '0.9rem', marginBottom: '1rem' }}>
        One fragment of a ceremonial hymn survived the collapse. The archivists believe the answer lies not in what the hymn says, but in how it begins.
      </p>
      
      <div style={{
        background: 'rgba(25, 12, 10, 0.75)',
        borderLeft: '4px solid var(--color-accent)',
        padding: '16px 24px',
        margin: '1.2rem 0',
        fontFamily: 'var(--font-serif)',
        fontSize: '1.05rem',
        lineHeight: '1.8',
        color: '#fbf3eb',
        letterSpacing: '1px',
        boxShadow: '0 4px 15px rgba(255, 78, 32, 0.05)'
      }}>
        <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', textShadow: '0 0 8px rgba(255, 78, 32, 0.4)' }}>F</span>aith carried us through the longest winters.<br />
        <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', textShadow: '0 0 8px rgba(255, 78, 32, 0.4)' }}>L</span>ight revealed every hidden truth.<br />
        <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', textShadow: '0 0 8px rgba(255, 78, 32, 0.4)' }}>A</span>sh buried every forgotten city.<br />
        <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', textShadow: '0 0 8px rgba(255, 78, 32, 0.4)' }}>M</span>emory outlived every monument.<br />
        <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', textShadow: '0 0 8px rgba(255, 78, 32, 0.4)' }}>E</span>very ending was once a beginning.
      </div>

      <p className="question-text" style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
        Question: What sustained their civilization?
      </p>

      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
        Hint: "The beginning remembers."
      </p>

      <form onSubmit={handleSubmit} className="modal-form">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter key..."
          className="basic-input"
          autoFocus
          style={{ borderColor: error ? 'var(--color-danger)' : 'var(--color-accent)' }}
        />
        {error && <div className="error-text">Decryption Failed</div>}
        <button type="submit" className="basic-btn primary-btn" style={{ marginTop: '0.5rem' }}>
          Decrypt Terminal
        </button>
      </form>
    </div>
  );
}

// ==========================================
// 2. CAESAR SCROLL PUZZLE
// ==========================================
interface CaesarScrollProps {
  activeAnomaly: any;
  onSolve: () => void;
}

function CaesarScroll({ activeAnomaly, onSolve }: CaesarScrollProps) {
  const [shift, setShift] = useState(0);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  const ciphertext = "WKH IODPH LV IDGLQJ";

  const decryptCaesar = (str: string, s: number) => {
    return str.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        // Upper case letters
        return String.fromCharCode(((code - 65 - s + 26) % 26) + 65);
      }
      return char;
    }).join('');
  };

  const currentDecryptedText = decryptCaesar(ciphertext, shift);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().trim().replace(/\s+/g, ' ') === 'the flame is fading') {
      setError(false);
      onSolve();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <p className="question-text" style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: '1rem' }}>
        Archaeologists recovered an encrypted stone tablet containing a message encoded with a simple letter-shift. Decode the inscription exactly as intended.
      </p>

      <div className="caesar-ciphertext" style={{ textAlign: 'center' }}>
        {ciphertext}
      </div>

      <div className="caesar-slider-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px', fontSize: '0.8rem' }}>
          <span>Caesar Shift: +{shift}</span>
          <span style={{ color: shift === 3 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
            {shift === 3 ? 'Align' : 'Shift'}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="25"
          value={shift}
          onChange={(e) => setShift(parseInt(e.target.value))}
          className="caesar-slider"
        />
        <div style={{
          marginTop: '0.5rem',
          fontSize: '1.2rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-accent)',
          fontWeight: 'bold',
          letterSpacing: '3px',
          minHeight: '24px',
          textAlign: 'center',
          textShadow: '0 0 10px rgba(255, 78, 32, 0.35)'
        }}>
          {currentDecryptedText}
        </div>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
        Hint: "A shift of three letters backward reveals the warning."
      </p>

      <form onSubmit={handleSubmit} className="modal-form">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="ENTER TRANSLATED TABLET..."
          className="basic-input"
          style={{ borderColor: error ? 'var(--color-danger)' : 'var(--color-accent)' }}
        />
        {error && <div className="error-text">Decryption Failed</div>}
        <button type="submit" className="basic-btn primary-btn" style={{ marginTop: '0.5rem' }}>
          Decrypt Inscription
        </button>
      </form>
    </div>
  );
}

// ==========================================
// 3. CHRONICLE RECONSTRUCTION PUZZLE
// ==========================================
interface ChronicleProps {
  activeAnomaly: any;
  onSolve: () => void;
}

interface ParaItem {
  id: string;
  order: number; // Chronological order (0 = earliest, 5 = latest)
  text: string;
  lastWord: string;
}

const CHRONICLES_INITIAL: ParaItem[] = [
  {
    id: "A",
    order: 0,
    text: "Long ago, when the world was young, the First Flame still burned, casting a faint ",
    lastWord: "LIGHT"
  },
  {
    id: "B",
    order: 1,
    text: "Though ash had begun to fall, the western capital had not yet fallen, and a single road still ",
    lastWord: "LEADS"
  },
  {
    id: "C",
    order: 2,
    text: "Survival grew difficult as the rivers had already dried, leaving dust ",
    lastWord: "ONLY"
  },
  {
    id: "D",
    order: 3,
    text: "When the gods ceased speaking, the temples were abandoned to ",
    lastWord: "THE"
  },
  {
    id: "E",
    order: 4,
    text: "With no hope remaining, the final expedition departed, searching for the ",
    lastWord: "WORTHY"
  },
  {
    id: "F",
    order: 5,
    text: "As the years stretched into centuries, memory itself began to fade, far from ",
    lastWord: "HOME"
  }
];

function ChronicleReconstruction({ activeAnomaly, onSolve }: ChronicleProps) {
  // Initialize shuffled
  const [items, setItems] = useState<ParaItem[]>([]);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Shuffle items once on load
    const shuffled = [...CHRONICLES_INITIAL].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  }, []);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < items.length) {
      const temp = newItems[index];
      newItems[index] = newItems[targetIndex];
      newItems[targetIndex] = temp;
      setItems(newItems);
    }
  };

  const isCorrectOrder = items.every((item, idx) => item.order === idx);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().trim().replace(/\s+/g, ' ') === 'light leads the worthy home') {
      setError(false);
      onSolve();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <p className="question-text" style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: '0.5rem' }}>
        Six pages of a manuscript are scrambled. Order them chronologically. Use the arrow buttons to arrange them.
      </p>

      <div className="chronicle-list">
        {items.map((item, index) => (
          <div key={item.id} className="chronicle-item" style={{
            borderColor: isCorrectOrder ? 'var(--color-success)' : undefined,
            background: isCorrectOrder ? 'rgba(16, 185, 129, 0.05)' : undefined
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <button
                type="button"
                onClick={() => moveItem(index, 'up')}
                disabled={index === 0}
                style={{
                  background: 'none', border: 'none', color: index === 0 ? '#333' : 'var(--color-accent)',
                  cursor: index === 0 ? 'default' : 'pointer', fontSize: '0.75rem', padding: '0 4px'
                }}
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => moveItem(index, 'down')}
                disabled={index === items.length - 1}
                style={{
                  background: 'none', border: 'none', color: index === items.length - 1 ? '#333' : 'var(--color-accent)',
                  cursor: index === items.length - 1 ? 'default' : 'pointer', fontSize: '0.75rem', padding: '0 4px'
                }}
              >
                ▼
              </button>
            </div>
            <div style={{ flex: 1 }}>
              {item.text}
              <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>{item.lastWord}</span>
            </div>
          </div>
        ))}
      </div>

      {isCorrectOrder ? (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--color-success)',
          padding: '10px 14px', borderRadius: '6px', marginBottom: '1.2rem', fontSize: '0.85rem'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--color-success)' }}>✓ Manuscript Ordered Successfully</p>
          <p style={{ margin: '4px 0 0 0', color: 'var(--color-text)' }}>
            Notes state: <span style={{ fontStyle: 'italic' }}>"Truth is found in beginnings, but the archive is mirrored."</span>
          </p>
        </div>
      ) : (
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1rem', textAlign: 'center' }}>
          Chronological clues: Flame burns → Capital stands → Rivers dry → Temples abandoned → Expedition leaves → Memory fades.
        </p>
      )}

      <form onSubmit={handleSubmit} className="modal-form">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="ENTER DECRYPTION KEY..."
          className="basic-input"
          style={{ borderColor: error ? 'var(--color-danger)' : 'var(--color-accent)' }}
        />
        {error && <div className="error-text">Decryption Failed</div>}
        <button type="submit" className="basic-btn primary-btn" style={{ marginTop: '0.5rem' }}>
          Submit Code
        </button>
      </form>
    </div>
  );
}

// ==========================================
// 4. EXCAVATION GRID PUZZLE
// ==========================================
interface ExcavationGridProps {
  activeAnomaly: any;
  onSolve: () => void;
}

function ExcavationGrid({ activeAnomaly, onSolve }: ExcavationGridProps) {
  const [stage, setStage] = useState(1); // 1 = Mixed Grid, 2 = Vigenere Cipher
  const [base64Input, setBase64Input] = useState('');
  const [vigenereKey, setVigenereKey] = useState('');
  const [finalInput, setFinalInput] = useState('');
  const [error, setError] = useState(false);

  // Mixed encoding grid representation (Base64 is SEtKUlhKWEJRVg==)
  // Row order of characters:
  // S, E, t, K, U, l, h, K, W, B, Q, V, g, =, =
  const gridCells = [
    { type: 'Binary', display: '01010011', decoded: 'S' },
    { type: 'Hex', display: '45', decoded: 'E' },
    { type: 'Decimal', display: '116', decoded: 't' },
    { type: 'ASCII', display: 'K', decoded: 'K' },
    { type: 'Hex', display: '55', decoded: 'U' },
    { type: 'Binary', display: '01101100', decoded: 'l' },
    { type: 'Decimal', display: '104', decoded: 'h' },
    { type: 'ASCII', display: 'K', decoded: 'K' },
    { type: 'Binary', display: '01010111', decoded: 'W' },
    { type: 'Hex', display: '42', decoded: 'B' },
    { type: 'Decimal', display: '81', decoded: 'Q' },
    { type: 'ASCII', display: 'V', decoded: 'V' },
    { type: 'Binary', display: '01100111', decoded: 'g' },
    { type: 'Hex', display: '3D', decoded: '=' },
    { type: 'Decimal', display: '61', decoded: '=' }
  ];

  const handleStage1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (base64Input.trim() === 'SEtKUlhKWEJRVg==') {
      setError(false);
      setStage(2);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const decryptVigenere = (cipher: string, key: string) => {
    if (!key) return cipher;
    let out = '';
    let keyIdx = 0;
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
    if (cleanKey.length === 0) return cipher;

    for (let i = 0; i < cipher.length; i++) {
      const code = cipher.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        const kCode = cleanKey.charCodeAt(keyIdx % cleanKey.length) - 65;
        const decryptedChar = String.fromCharCode(((code - 65 - kCode + 26) % 26) + 65);
        out += decryptedChar;
        keyIdx++;
      } else {
        out += cipher[i];
      }
    }
    return out;
  };

  const vigenereCiphertext = "HKJRXJXBQV";
  const vigenereDecrypted = decryptVigenere(vigenereCiphertext, vigenereKey);

  const handleStage2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = vigenereKey.toUpperCase().trim();
    const cleanAnswer = finalInput.toUpperCase().trim().replace(/\s+/g, ' ');

    if (cleanKey === 'EMBER' && cleanAnswer === 'DYING FLAME') {
      setError(false);
      onSolve();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <div className="stage-indicator">
        <span className={stage === 1 ? 'active' : ''}>[STAGE 1: MIXED DECRYPTION]</span>
        <span className={stage === 2 ? 'active' : ''}>[STAGE 2: CIPHERTEXT RECOVERY]</span>
      </div>

      {stage === 1 && (
        <div>
          <p className="question-text" style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: '0.8rem' }}>
            The grid contains cells encoded in different formats. Decrypt each cell sequentially from top-left (left-to-right) to form the combined key code.
          </p>

          <div className="excavation-grid-visual">
            <div className="excavation-cell header">#</div>
            <div className="excavation-cell header">Type</div>
            <div className="excavation-cell header">Value</div>
            <div className="excavation-cell header" style={{ gridColumn: 'span 2' }}>Decoded</div>

            {gridCells.map((cell, idx) => (
              <React.Fragment key={idx}>
                <div className="excavation-cell" style={{ color: 'var(--color-accent)' }}>{idx + 1}</div>
                <div className="excavation-cell">{cell.type}</div>
                <div className="excavation-cell" style={{ fontFamily: 'monospace' }}>{cell.display}</div>
                <div className="excavation-cell" style={{ gridColumn: 'span 2', color: 'var(--color-success)', fontWeight: 'bold' }}>
                  {base64Input.length > idx && base64Input[idx] === cell.decoded ? cell.decoded : '?'}
                </div>
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleStage1Submit} className="modal-form" style={{ marginTop: '1rem' }}>
            <input
              type="text"
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder="Combine decoded characters..."
              className="basic-input"
              style={{ borderColor: error ? 'var(--color-danger)' : 'var(--color-accent)' }}
            />
            {error && <div className="error-text">Check sequence encoding (Base64 padding required)</div>}
            <button type="submit" className="basic-btn primary-btn">
              Validate Stage 1
            </button>
          </form>
        </div>
      )}

      {stage === 2 && (
        <div>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', border: '1px solid var(--color-success)', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            ✓ Stage 1 Complete. Base64 decoded output: <span style={{ color: 'var(--color-success)', fontFamily: 'monospace', fontWeight: 'bold' }}>HKJRXJXBQV</span>
          </div>

          <p className="question-text" style={{ fontSize: '0.85rem', opacity: 0.85 }}>
            Decrypted base64 yields a ciphertext encrypted using a Vigenere keyword cipher. Deduce the keyword from your exploration of other sectors, then enter both the keyword and the plaintext answer.
          </p>

          <div style={{
            background: 'rgba(0,0,0,0.5)', border: '1px dashed var(--color-accent)', padding: '10px 14px', borderRadius: '4px', marginBottom: '1rem'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Vigenere Ciphertext:</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '3px', margin: '4px 0' }}>{vigenereCiphertext}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Decrypted Output:</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-success)', letterSpacing: '3px', margin: '4px 0' }}>
              {vigenereDecrypted}
            </div>
          </div>

          <form onSubmit={handleStage2Submit} className="modal-form">
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={vigenereKey}
                onChange={(e) => setVigenereKey(e.target.value)}
                placeholder="KEYWORD (5 chars)"
                className="basic-input"
                style={{ flex: 1 }}
              />
              <input
                type="text"
                value={finalInput}
                onChange={(e) => setFinalInput(e.target.value)}
                placeholder="PLAINTEXT..."
                className="basic-input"
                style={{ flex: 2 }}
              />
            </div>
            {error && <div className="error-text">Keyword or Plaintext decryption incorrect</div>}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={() => setStage(1)} className="basic-btn secondary-btn" style={{ flex: 1 }}>
                Back
              </button>
              <button type="submit" className="basic-btn primary-btn" style={{ flex: 2 }}>
                Unlock Grid Node
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. TEMPLE FLOOR PUZZLE
// ==========================================
interface TempleFloorProps {
  activeAnomaly: any;
  onSolve: () => void;
}

function TempleFloor({ activeAnomaly, onSolve }: TempleFloorProps) {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [error, setError] = useState(false);

  // Nodes for EMBER:
  // Node coordinates:
  // E1 (200, 240), M (100, 200), B (200, 160), E2 (300, 200), R (200, 100)
  // Let's place 12 nodes total
  const nodes = [
    { id: 'E1', letter: 'E', x: 200, y: 240, label: 'Sun' },
    { id: 'M', letter: 'M', x: 100, y: 200, label: 'Memory' },
    { id: 'B', letter: 'B', x: 200, y: 160, label: 'Ash' },
    { id: 'E2', letter: 'E', x: 300, y: 200, label: 'Sunburst' },
    { id: 'R', letter: 'R', x: 200, y: 100, label: 'Ruins' },
    // Distractors
    { id: 'L', letter: 'L', x: 200, y: 40, label: 'Light (North)' },
    { id: 'A', letter: 'A', x: 80, y: 100, label: 'Aura' },
    { id: 'S', letter: 'S', x: 320, y: 100, label: 'Shadow' },
    { id: 'T', letter: 'T', x: 100, y: 300, label: 'Time' },
    { id: 'H', letter: 'H', x: 300, y: 300, label: 'Hearth' },
    { id: 'K', letter: 'K', x: 50, y: 200, label: 'Keep' },
    { id: 'Y', letter: 'Y', x: 350, y: 200, label: 'Yonder' }
  ];

  const handleNodeClick = (nodeId: string) => {
    if (error) return;
    const newSelected = [...selectedNodes, nodeId];
    setSelectedNodes(newSelected);

    // Validate path sequentially
    const correctPath = ['E1', 'M', 'B', 'E2', 'R'];
    const currentCorrect = newSelected.every((val, idx) => val === correctPath[idx]);

    if (!currentCorrect) {
      setError(true);
      setTimeout(() => {
        setSelectedNodes([]);
        setError(false);
      }, 1000);
    } else if (newSelected.length === 5) {
      setTimeout(onSolve, 1000);
    }
  };

  const getWord = () => {
    return selectedNodes.map(id => nodes.find(n => n.id === id)?.letter || '').join('');
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <p className="question-text" style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: '0.5rem' }}>
        Cathedral ruins inscription: <span style={{ fontStyle: 'italic' }}>"Walk where the Flame once walked."</span><br />
        Clues: Sun rises after Ash. Ash follows Memory. Memory precedes Light. Light faces North.
      </p>

      <div className="temple-graph-container">
        <svg width="320" height="320" style={{ background: '#020101', border: '1px solid var(--wall-stroke)' }}>
          {/* Grid lines */}
          <line x1="160" y1="0" x2="160" y2="320" stroke="#3a1b17" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="0" y1="160" x2="320" y2="160" stroke="#3a1b17" strokeWidth="0.5" strokeDasharray="3 3" />
          
          {/* Graph paths */}
          {selectedNodes.length > 1 && selectedNodes.map((nodeId, idx) => {
            if (idx === 0) return null;
            const prev = nodes.find(n => n.id === selectedNodes[idx - 1]);
            const curr = nodes.find(n => n.id === nodeId);
            if (!prev || !curr) return null;
            return (
              <line
                key={`line-${idx}`}
                x1={prev.x} y1={prev.y}
                x2={curr.x} y2={curr.y}
                stroke={error ? 'var(--color-danger)' : 'var(--color-success)'}
                strokeWidth="3"
                className="path-drawn"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const isSelected = selectedNodes.includes(node.id);
            const isLatest = selectedNodes[selectedNodes.length - 1] === node.id;
            
            let color = 'rgba(255, 78, 32, 0.2)';
            let strokeColor = 'var(--wall-stroke)';
            if (isSelected) {
              color = error ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)';
              strokeColor = error ? 'var(--color-danger)' : 'var(--color-success)';
            } else if (node.id === 'L') {
              strokeColor = 'var(--color-accent)'; // Light faces North indicator
            }

            return (
              <g key={node.id} onClick={() => handleNodeClick(node.id)} className="temple-node">
                <circle
                  cx={node.x} cy={node.y} r="16"
                  fill={color}
                  stroke={strokeColor}
                  strokeWidth={isLatest ? "3" : "1.5"}
                />
                <text
                  x={node.x} y={node.y + 5}
                  fill={isSelected ? '#fff' : 'var(--color-text)'}
                  fontSize="12" fontWeight="bold" textAnchor="middle"
                  fontFamily="var(--font-mono)"
                >
                  {node.letter}
                </text>
                {/* Node labels */}
                <text
                  x={node.x} y={node.y - 20}
                  fill="var(--color-text-muted)"
                  fontSize="8" textAnchor="middle"
                  fontFamily="var(--font-mono)"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
          Sequence Spelled:{' '}
          <span style={{ color: error ? 'var(--color-danger)' : 'var(--color-success)', fontWeight: 'bold', letterSpacing: '4px' }}>
            {getWord() || '____'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSelectedNodes([])}
          className="basic-btn secondary-btn"
          style={{ padding: '4px 8px', fontSize: '0.8rem' }}
        >
          Reset Path
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 6. CATHEDRAL ORGAN PUZZLE
// ==========================================
interface CathedralOrganProps {
  activeAnomaly: any;
  onSolve: () => void;
}

function CathedralOrgan({ activeAnomaly, onSolve }: CathedralOrganProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const [showMorseKey, setShowMorseKey] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<any[]>([]);

  // Morse data: THE FIRST FLAME
  // - .... . / ..-. .. .-. ... - / ..-. .-.. .- -- .
  const morseCode = [
    { char: 'T', morse: '-' }, { char: 'H', morse: '....' }, { char: 'E', morse: '.' },
    { char: '/', morse: '/' },
    { char: 'F', morse: '..-.' }, { char: 'I', morse: '..' }, { char: 'R', morse: '.-.' }, { char: 'S', morse: '...' }, { char: 'T', morse: '-' },
    { char: '/', morse: '/' },
    { char: 'F', morse: '..-.' }, { char: 'L', morse: '.-..' }, { char: 'A', morse: '.-' }, { char: 'M', morse: '--' }, { char: 'E', morse: '.' }
  ];

  // Visual spectrogram animation loop
  const drawSpectrogram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Shift canvas content to the left
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx) {
      tempCtx.drawImage(canvas, 0, 0);
      ctx.fillStyle = '#020101';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, -1.5, 0); // scroll speed
    }

    // Draw the right edge background noise
    ctx.fillStyle = 'rgba(255, 78, 32, 0.05)';
    ctx.fillRect(canvas.width - 2, 0, 2, canvas.height);

    // Draw Morse lines dynamically on the right edge based on timing
    if (isPlaying) {
      const time = Date.now() / 1000;
      // We will map characters of THE FIRST FLAME to frequencies
      // For visual simplicity, draw scrolling dots and dashes at fixed heights
      const beepState = Math.sin(time * 8) > 0; // simple beeper mock
      
      // Draw wind base frequency (noise)
      for (let y = canvas.height - 10; y < canvas.height; y++) {
        ctx.fillStyle = `rgba(255, 78, 32, ${Math.random() * 0.15})`;
        ctx.fillRect(canvas.width - 2, y, 2, 1);
      }

      // Draw Morse line at Y=35 (representing 1800Hz beep)
      if (beepState) {
        ctx.fillStyle = '#e6b800';
        ctx.shadowColor = '#d4af37';
        ctx.shadowBlur = 4;
        ctx.fillRect(canvas.width - 2, 35, 2, 3);
        ctx.shadowBlur = 0; // reset
      }
    }

    animationRef.current = requestAnimationFrame(drawSpectrogram);
  };

  useEffect(() => {
    drawSpectrogram();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      stopAudio();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  const startAudio = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      // 1. Wind hum generator
      const oscWind = ctx.createOscillator();
      const filterWind = ctx.createBiquadFilter();
      const gainWind = ctx.createGain();
      
      oscWind.type = 'sawtooth';
      oscWind.frequency.value = 55; // low hum
      filterWind.type = 'lowpass';
      filterWind.frequency.value = 140;
      gainWind.gain.value = 0.25;

      oscWind.connect(filterWind);
      filterWind.connect(gainWind);
      gainWind.connect(ctx.destination);
      oscWind.start();

      // 2. Morse Beep scheduler
      const morseBeepOsc = ctx.createOscillator();
      const gainBeep = ctx.createGain();
      morseBeepOsc.type = 'sine';
      morseBeepOsc.frequency.value = 1600; // Morse frequency
      gainBeep.gain.value = 0; // silent initially

      morseBeepOsc.connect(gainBeep);
      gainBeep.connect(ctx.destination);
      morseBeepOsc.start();

      // Schedule the Morse code beeps for "THE FIRST FLAME"
      // Dot = 0.12s, Dash = 0.36s, Space = 0.12s, WordSpace = 0.84s
      let time = ctx.currentTime + 0.5;
      
      const playBeeps = () => {
        morseCode.forEach(item => {
          if (item.char === '/') {
            time += 0.6; // word spacing
          } else {
            const symbols = item.morse.split('');
            symbols.forEach(sym => {
              const dur = sym === '.' ? 0.12 : 0.36;
              // beep on
              gainBeep.gain.setValueAtTime(0.08, time);
              // beep off
              gainBeep.gain.setValueAtTime(0, time + dur);
              time += dur + 0.12; // inter-symbol spacing
            });
            time += 0.24; // inter-character spacing
          }
        });
      };

      // Loop Morse code beeps
      playBeeps();
      const interval = setInterval(playBeeps, 12000);

      synthNodesRef.current = [oscWind, morseBeepOsc, gainBeep, interval];
      setIsPlaying(true);
    } catch (e) {
      console.error("Audio API initialization failed: ", e);
      setIsPlaying(true); // fall back to visual only
    }
  };

  const stopAudio = () => {
    if (synthNodesRef.current.length > 0) {
      const [osc1, osc2, gain, interval] = synthNodesRef.current;
      clearInterval(interval);
      try {
        osc1.stop();
        osc2.stop();
      } catch (e) {}
      synthNodesRef.current = [];
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().trim() === 'the first flame') {
      stopAudio();
      onSolve();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <p className="question-text" style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: '1rem' }}>
        The ancient organ terminal emits an acoustic frequency signal. Run the digital spectrogram to identify the hidden Morse sequence.
      </p>

      <div className="organ-controls">
        <canvas ref={canvasRef} width="300" height="80" className="spectrogram-canvas" />
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="button" onClick={handlePlayToggle} className="basic-btn primary-btn" style={{ minWidth: '150px' }}>
            {isPlaying ? (
              <>
                <Square size={16} style={{ marginRight: '6px' }} /> Stop Analyzer
              </>
            ) : (
              <>
                <Play size={16} style={{ marginRight: '6px' }} /> Start Analyzer
              </>
            )}
          </button>

          <a href="/cathedral.wav" download="cathedral.wav" className="basic-btn secondary-btn" style={{ textDecoration: 'none' }}>
            Download WAV
          </a>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button
          type="button"
          onClick={() => setShowMorseKey(!showMorseKey)}
          style={{ background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}
        >
          {showMorseKey ? 'Hide Morse Code Cheat Sheet' : 'Show Morse Code Cheat Sheet'}
        </button>

        {showMorseKey && (
          <div style={{
            background: 'rgba(20, 10, 8, 0.6)', border: '1px solid var(--wall-stroke)',
            padding: '10px', borderRadius: '4px', marginTop: '6px', fontSize: '0.75rem',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', fontFamily: 'monospace'
          }}>
            <span>A: .-</span> <span>B: -...</span> <span>C: -.-.</span> <span>D: -..</span>
            <span>E: .</span> <span>F: ..-.</span> <span>G: --.</span> <span>H: ....</span>
            <span>I: ..</span> <span>J: .---</span> <span>K: -.-</span> <span>L: .-..</span>
            <span>M: --</span> <span>N: -.</span> <span>O: ---</span> <span>P: .--.</span>
            <span>Q: --.-</span> <span>R: .-.</span> <span>S: ...</span> <span>T: -</span>
            <span>U: ..-</span> <span>V: ...-</span> <span>W: .--</span> <span>X: -..-</span>
            <span>Y: -.--</span> <span>Z: --..</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="modal-form">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="ENTER ACOUSTIC DECRYPTION KEY..."
          className="basic-input"
          style={{ borderColor: error ? 'var(--color-danger)' : 'var(--color-accent)' }}
        />
        {error && <div className="error-text">Frequencies don't align. Try again.</div>}
        <button type="submit" className="basic-btn primary-btn" style={{ marginTop: '0.5rem' }}>
          Unlock Cathedral Organ
        </button>
      </form>
    </div>
  );
}

// ==========================================
// 7. IMPOSSIBLE MAP PUZZLE
// ==========================================
interface ImpossibleMapProps {
  activeAnomaly: any;
  onSolve: () => void;
}

interface MapPanel {
  id: number;
  rotation: number; // 0, 90, 180, 270
  flippedH: boolean;
  flippedV: boolean;
  letter: string;
  paths: React.ReactNode; // SVG path elements
}

function ImpossibleMap({ activeAnomaly, onSolve }: ImpossibleMapProps) {
  const [panels, setPanels] = useState<MapPanel[]>([
    {
      id: 0, // Top-Left
      rotation: 90,
      flippedH: true,
      flippedV: false,
      letter: "A",
      paths: (
        <>
          <path d="M 0 75 Q 35 75 75 75" stroke="#d4af37" strokeWidth="2.5" fill="none" />
          <path d="M 75 75 Q 75 115 75 150" stroke="#d4af37" strokeWidth="2.5" fill="none" />
          <circle cx="75" cy="75" r="5" fill="#fff" />
          <text x="75" y="70" fill="#fff" fontSize="10" textAnchor="middle">A</text>
        </>
      )
    },
    {
      id: 1, // Top-Right
      rotation: 180,
      flippedH: false,
      flippedV: true,
      letter: "U",
      paths: (
        <>
          <path d="M 0 75 Q 75 75 75 75" stroke="#d4af37" strokeWidth="2.5" fill="none" />
          <path d="M 75 75 Q 115 75 150 75" stroke="#d4af37" strokeWidth="2.5" fill="none" />
          <circle cx="75" cy="75" r="5" fill="#fff" />
          <text x="75" y="70" fill="#fff" fontSize="10" textAnchor="middle">U</text>
        </>
      )
    },
    {
      id: 2, // Bottom-Left
      rotation: 270,
      flippedH: false,
      flippedV: false,
      letter: "R",
      paths: (
        <>
          <path d="M 75 0 Q 75 75 75 75" stroke="#d4af37" strokeWidth="2.5" fill="none" />
          <path d="M 75 75 Q 75 115 75 150" stroke="#d4af37" strokeWidth="2.5" fill="none" />
          <circle cx="75" cy="75" r="5" fill="#fff" />
          <text x="75" y="70" fill="#fff" fontSize="10" textAnchor="middle">R</text>
        </>
      )
    },
    {
      id: 3, // Bottom-Right
      rotation: 0,
      flippedH: false,
      flippedV: false,
      letter: "E",
      paths: (
        <>
          <path d="M 75 0 Q 75 75 75 75" stroke="#d4af37" strokeWidth="2.5" fill="none" />
          <path d="M 75 75 Q 115 75 150 75" stroke="#d4af37" strokeWidth="2.5" fill="none" />
          <circle cx="75" cy="75" r="5" fill="#fff" />
          <text x="75" y="70" fill="#fff" fontSize="10" textAnchor="middle">E</text>
        </>
      )
    }
  ]);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  const rotatePanel = (id: number) => {
    setPanels(prev => prev.map(p => p.id === id ? { ...p, rotation: (p.rotation + 90) % 360 } : p));
  };

  const flipPanelH = (id: number) => {
    setPanels(prev => prev.map(p => p.id === id ? { ...p, flippedH: !p.flippedH } : p));
  };

  const flipPanelV = (id: number) => {
    setPanels(prev => prev.map(p => p.id === id ? { ...p, flippedV: !p.flippedV } : p));
  };

  // Correct states:
  // Panel 0 (Top-Left): rotation=0, flippedH=false, flippedV=false
  // Panel 1 (Top-Right): rotation=0, flippedH=false, flippedV=false
  // Panel 2 (Bottom-Left): rotation=0, flippedH=false, flippedV=false
  // Panel 3 (Bottom-Right): rotation=0, flippedH=false, flippedV=false
  const isAligned = panels.every(p => p.rotation === 0 && !p.flippedH && !p.flippedV);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().trim() === 'aurelis') {
      onSolve();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <p className="question-text" style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: '0.5rem' }}>
        The sector map appears disjointed. Rotate and fold (flip) the quadrants to align the ancient highways. When they link, follow the road to spell the hidden city.
      </p>

      <div className="impossible-map-grid">
        {panels.map(panel => {
          let transformStr = `rotate(${panel.rotation}deg)`;
          if (panel.flippedH) transformStr += ` scaleX(-1)`;
          if (panel.flippedV) transformStr += ` scaleY(-1)`;

          return (
            <div key={panel.id} className="map-panel-container">
              <div className="map-panel-inner" style={{ transform: transformStr }}>
                <svg width="100%" height="100%" style={{ background: '#090404', border: '1px solid #361714' }}>
                  {/* Grid markings */}
                  <line x1="0" y1="75" x2="150" y2="75" stroke="#1d0a08" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1="75" y1="0" x2="75" y2="150" stroke="#1d0a08" strokeWidth="0.5" strokeDasharray="2 2" />
                  
                  {/* Road paths */}
                  {panel.paths}
                </svg>
              </div>
              
              {/* Quadrant Controls Overlay */}
              <div style={{
                position: 'absolute', bottom: '4px', left: '4px', display: 'flex', gap: '2px', zIndex: 10
              }}>
                <button
                  type="button"
                  onClick={() => rotatePanel(panel.id)}
                  style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid #5a2822', color: '#fff', fontSize: '9px', padding: '2px 4px', cursor: 'pointer' }}
                  title="Rotate 90°"
                >
                  <RotateCw size={10} />
                </button>
                <button
                  type="button"
                  onClick={() => flipPanelH(panel.id)}
                  style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid #5a2822', color: '#fff', fontSize: '9px', padding: '2px 4px', cursor: 'pointer' }}
                  title="Flip Horizontally"
                >
                  ↔
                </button>
                <button
                  type="button"
                  onClick={() => flipPanelV(panel.id)}
                  style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid #5a2822', color: '#fff', fontSize: '9px', padding: '2px 4px', cursor: 'pointer' }}
                  title="Flip Vertically"
                >
                  ↕
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isAligned ? (
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--color-success)',
          padding: '8px 12px', borderRadius: '6px', marginBottom: '1.2rem', fontSize: '0.85rem', textAlign: 'center'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--color-success)' }}>✓ Highways Connected: A-U-R-E-L-I-S</p>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => setPanels(panels.map(p => ({ ...p, rotation: 0, flippedH: false, flippedV: false })))}
            className="basic-btn secondary-btn"
            style={{ padding: '2px 6px', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }}
          >
            <RefreshCw size={10} /> Auto-Align (Dev Override)
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="modal-form">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="ENTER DECRYPTION KEY..."
          className="basic-input"
          style={{ borderColor: error ? 'var(--color-danger)' : 'var(--color-accent)' }}
        />
        {error && <div className="error-text">Highways lead to a dead-end. Try again.</div>}
        <button type="submit" className="basic-btn primary-btn" style={{ marginTop: '0.5rem' }}>
          Decrypt Map Node
        </button>
      </form>
    </div>
  );
}

// ==========================================
// MAIN WRAPPER
// ==========================================
interface ActiveAnomaly {
  key: string;
  puzzles?: { type: string }[];
  type?: string;
}

interface QuestionModalProps {
  activeAnomaly: ActiveAnomaly | null;
  solveAnomaly: (key: string) => void;
  closeAnomaly: () => void;
  showMap: boolean;
}

export function QuestionModal({ activeAnomaly, solveAnomaly, closeAnomaly, showMap }: QuestionModalProps) {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [prevAnomaly, setPrevAnomaly] = useState<ActiveAnomaly | null>(null);

  if (activeAnomaly !== prevAnomaly) {
    setPrevAnomaly(activeAnomaly);
    setCurrentPuzzleIndex(0);
  }

  if (!activeAnomaly) return null;

  const puzzles = activeAnomaly.puzzles || [activeAnomaly as any];
  const currentPuzzle = puzzles[currentPuzzleIndex];

  if (!currentPuzzle) return null;

  const handleSolve = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    } else {
      solveAnomaly(activeAnomaly.key);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="hud-box modal-box">
        <h2 className="modal-title">
          ANOMALY TERMINAL DETECTED
        </h2>
        <div className="modal-content" style={{ marginTop: '1.2rem' }}>
          
          {currentPuzzle.type === 'forgotten_hymn' && <ForgottenHymn activeAnomaly={currentPuzzle} onSolve={handleSolve} />}
          {currentPuzzle.type === 'caesar_scroll' && <CaesarScroll activeAnomaly={currentPuzzle} onSolve={handleSolve} />}
          {currentPuzzle.type === 'chronicle_reconstruction' && <ChronicleReconstruction activeAnomaly={currentPuzzle} onSolve={handleSolve} />}
          {currentPuzzle.type === 'excavation_grid' && <ExcavationGrid activeAnomaly={currentPuzzle} onSolve={handleSolve} />}
          {currentPuzzle.type === 'temple_floor' && <TempleFloor activeAnomaly={currentPuzzle} onSolve={handleSolve} />}
          {currentPuzzle.type === 'cathedral_organ' && <CathedralOrgan activeAnomaly={currentPuzzle} onSolve={handleSolve} />}
          {currentPuzzle.type === 'impossible_map' && <ImpossibleMap activeAnomaly={currentPuzzle} onSolve={handleSolve} />}

          <div className="modal-actions" style={{ marginTop: '2rem' }}>
            <button type="button" onClick={closeAnomaly} className="basic-btn secondary-btn">
              Abort
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
