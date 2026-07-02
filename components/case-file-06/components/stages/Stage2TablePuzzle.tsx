"use client";

import { useState, useEffect } from "react";

type Fragment = { id: string; text: string };

const initialCol1: Fragment[] = [
  { id: "A", text: "Researcher Alpha" },
  { id: "C", text: "First Cycle (No Previous Designation)" },
  { id: "B", text: "Subject 4" },
];

const initialCol2: Fragment[] = [
  { id: "C", text: "0 resets survived." },
  { id: "A", text: "Too many to count." },
  { id: "B", text: "Exactly four." },
];

const initialCol3: Fragment[] = [
  { id: "B", text: "They wiped it." },
  { id: "C", text: "It is not incomplete. I just arrived." },
  { id: "A", text: "The archive corrupted it." },
];

export default function Stage2TablePuzzle({ 
  onComplete, 
  onLogRecovered, 
  setView 
}: { 
  onComplete?: () => void, 
  onLogRecovered?: (id: string, text: string) => void,
  setView?: (view: "terminal" | "table") => void
}) {
  const [col1, setCol1] = useState<Fragment[]>([...initialCol1]);
  const [col2, setCol2] = useState<Fragment[]>([...initialCol2]);
  const [col3, setCol3] = useState<Fragment[]>([...initialCol3]);

  const [selected, setSelected] = useState<{ col: number, index: number } | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    // Check if solved
    let solved = true;
    for (let i = 0; i < 3; i++) {
      if (col1[i].id !== col2[i].id || col2[i].id !== col3[i].id) {
        solved = false;
        break;
      }
    }
    
    if (solved && !isSolved) {
      setIsSolved(true);
      setTimeout(() => {
        onLogRecovered?.("STAGE2_PUZZLE", "The loops never stop. Consistency is the only way through.");
        onComplete?.();
        if (setView) setView("terminal");
      }, 3000);
    }
  }, [col1, col2, col3, isSolved, onComplete, onLogRecovered, setView]);

  const handleSelect = (colIndex: number, itemIndex: number) => {
    if (isSolved) return;

    if (!selected) {
      setSelected({ col: colIndex, index: itemIndex });
    } else {
      if (selected.col === colIndex) {
        // Swap
        const swap = (arr: Fragment[], i: number, j: number) => {
          const newArr = [...arr];
          const temp = newArr[i];
          newArr[i] = newArr[j];
          newArr[j] = temp;
          return newArr;
        };

        if (colIndex === 1) setCol1(swap(col1, selected.index, itemIndex));
        if (colIndex === 2) setCol2(swap(col2, selected.index, itemIndex));
        if (colIndex === 3) setCol3(swap(col3, selected.index, itemIndex));
      }
      setSelected(null);
    }
  };

  const isRowMatched = (rowIndex: number) => {
    return col1[rowIndex].id === col2[rowIndex].id && col2[rowIndex].id === col3[rowIndex].id;
  };

  const getBlockStyle = (colIndex: number, itemIndex: number, isRowMatch: boolean) => {
    const isSelected = selected?.col === colIndex && selected?.index === itemIndex;
    return {
      padding: "1rem",
      margin: "0.5rem 0",
      backgroundColor: isRowMatch ? "rgba(51, 255, 51, 0.1)" : isSelected ? "rgba(255, 176, 0, 0.2)" : "rgba(10, 10, 12, 0.9)",
      border: `1px solid ${isRowMatch ? "var(--text-primary)" : isSelected ? "var(--text-amber)" : "var(--text-muted)"}`,
      color: isRowMatch ? "var(--text-primary)" : "var(--text-muted)",
      cursor: isSolved ? "default" : "pointer",
      transition: "all 0.3s",
      minHeight: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center" as const,
      boxShadow: isSelected ? "0 0 10px var(--text-amber)" : isRowMatch ? "0 0 10px var(--text-primary)" : "none"
    };
  };

  return (
    <div style={{ 
      padding: "2rem", 
      background: "rgba(15, 15, 20, 0.95)", 
      height: "100%", 
      width: "100%", 
      display: "flex", 
      flexDirection: "column",
      fontFamily: "var(--font-mono)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h2 style={{ color: "var(--text-primary)", margin: 0, letterSpacing: "2px" }}>MEMORY RECONSTRUCTION</h2>
          <p style={{ color: "var(--text-muted)", margin: "0.5rem 0 0 0" }}>Click to select and swap nodes within columns to form consistent memory paths.</p>
        </div>
        <button 
          onClick={() => setView?.("terminal")}
          style={{
            background: "transparent",
            color: "var(--text-amber)",
            padding: "0.5rem 1rem",
            border: "1px solid var(--text-amber)",
            cursor: "pointer",
            fontFamily: "var(--font-mono)"
          }}
        >
          RETURN TO TERMINAL
        </button>
      </div>

      {isSolved && (
        <div className="glitch" style={{ color: "var(--text-primary)", fontSize: "1.5rem", textAlign: "center", marginBottom: "1rem" }}>
          MEMORY PATHS VERIFIED. RETURNING TO TERMINAL...
        </div>
      )}

      <div style={{ display: "flex", flex: 1, gap: "2rem" }}>
        {/* Column 1 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "var(--text-amber)", textAlign: "center", borderBottom: "1px dashed var(--text-muted)", paddingBottom: "0.5rem" }}>DESIGNATION</h3>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {col1.map((item, i) => (
              <div key={`c1-${i}`} onClick={() => handleSelect(1, i)} style={getBlockStyle(1, i, isRowMatched(i))}>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "var(--text-amber)", textAlign: "center", borderBottom: "1px dashed var(--text-muted)", paddingBottom: "0.5rem" }}>RESETS</h3>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {col2.map((item, i) => (
              <div key={`c2-${i}`} onClick={() => handleSelect(2, i)} style={getBlockStyle(2, i, isRowMatched(i))}>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Column 3 */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "var(--text-amber)", textAlign: "center", borderBottom: "1px dashed var(--text-muted)", paddingBottom: "0.5rem" }}>MEMORY STATUS</h3>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {col3.map((item, i) => (
              <div key={`c3-${i}`} onClick={() => handleSelect(3, i)} style={getBlockStyle(3, i, isRowMatched(i))}>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
