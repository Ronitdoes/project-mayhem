"use client";

import { useState, useEffect, ReactNode, useRef } from "react";
import Stage2TablePuzzle from "./stages/Stage2TablePuzzle";
import { getTableImages } from "./actions";

function DraggableProp({ 
  defaultX, 
  defaultY, 
  topZIndex, 
  setTopZIndex, 
  children,
  onMove
}: { 
  defaultX: number, 
  defaultY: number, 
  topZIndex: number, 
  setTopZIndex: React.Dispatch<React.SetStateAction<number>>, 
  onMove?: (pos: {x: number, y: number}) => void,
  children: ReactNode 
}) {
  const [pos, setPos] = useState({ x: defaultX, y: defaultY });
  const [isDragging, setIsDragging] = useState(false);
  const [localZ, setLocalZ] = useState(10);
  
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setTopZIndex(z => z + 1);
    setLocalZ(topZIndex + 1);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.stopPropagation();
  };
  
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPos(prev => {
      const newPos = { x: prev.x + e.movementX, y: prev.y + e.movementY };
      if (onMove) {
        // Defer execution to avoid calling setState during render phase
        requestAnimationFrame(() => onMove(newPos));
      }
      return newPos;
    });
  };
  
  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    const target = e.target as HTMLElement;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
  };


  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        zIndex: localZ,
        boxShadow: isDragging ? "0 10px 20px rgba(0,0,0,0.5)" : "none",
        transition: "box-shadow 0.2s",
        filter: isDragging ? "brightness(1.1)" : "none"
      }}
    >
      <div style={{ pointerEvents: "none" }}>
        {children}
      </div>
    </div>
  );
}

export default function InvestigationTable({ 
  stage, 
  stage7FilePrinted,
  onComplete,
  onLogRecovered,
  setView,
  logs = []
}: { 
  stage: number, 
  stage7FilePrinted?: boolean,
  onComplete?: () => void,
  onLogRecovered?: (id: string, text: string) => void,
  setView?: (view: "terminal" | "table") => void,
  logs?: { id: string, text: string }[]
}) {
  const [images, setImages] = useState<string[]>([]);
  const [topZIndex, setTopZIndex] = useState(10);
  const [isCabinetOpen, setIsCabinetOpen] = useState(false);
  const [isSmudged, setIsSmudged] = useState(false);
  const inkPosRef = useRef({ x: 1100, y: 100 });
  const docPosRef = useRef({ x: 400, y: 150 });

  const checkSmudge = () => {
    if (!isSmudged) {
      // Check distance between document and ink (generous threshold)
      const dx = Math.abs(docPosRef.current.x - inkPosRef.current.x);
      const dy = Math.abs(docPosRef.current.y - inkPosRef.current.y);
      if (dx < 500 && dy < 500) {
        setIsSmudged(true);
      }
    }
  };

  useEffect(() => {
    getTableImages()
      .then(fetchedImages => {
        if (fetchedImages && fetchedImages.length > 0) {
          setImages(fetchedImages);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "linear-gradient(45deg, #1e130c 0%, #3a2218 100%)", 
        boxShadow: "inset 0 0 100px rgba(0,0,0,0.8)",
        overflow: "hidden"
      }}
    >
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)",
        pointerEvents: "none"
      }} />
      
      <div style={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "80%",
        height: "80%",
        background: "radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)",
        pointerEvents: "none",
        zIndex: 1
      }} />

      <div style={{ position: "absolute", bottom: "2rem", right: "2rem", opacity: 0.3, textAlign: "right" }}>
        <h1 style={{ color: "rgba(255,255,255,0.5)", fontSize: "2rem", fontFamily: "var(--font-mono)", margin: 0 }}>
          INVESTIGATION TABLE
        </h1>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.5)" }}>WORKSPACE / EVIDENCE LOCKER</p>
      </div>

      {stage !== 2 && images.filter(img => img !== "ink.png").map((img, i) => (
        <DraggableProp 
          key={img} 
          defaultX={200 + (i % 3) * 50} 
          defaultY={100 + Math.floor(i / 3) * 50}
          topZIndex={topZIndex}
          setTopZIndex={setTopZIndex}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={img.startsWith('.') ? `/api/serve-image?file=${img}` : `/case-06/table/${img}`} 
            alt={`Evidence ${img}`} 
            style={{ 
              // Removed maxWidth to show exact pixel size
            }} 
          />
        </DraggableProp>
      ))}

      {/* INK BOTTLE (ALWAYS VISIBLE) */}
      {stage !== 2 && (
        <DraggableProp 
          defaultX={1100} 
          defaultY={100}
          topZIndex={topZIndex}
          setTopZIndex={setTopZIndex}
          onMove={(pos) => {
            inkPosRef.current = pos;
            checkSmudge();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/case-06/table/ink.png" 
            alt="Ink" 
            style={{ 
              filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.5))"
            }} 
          />
        </DraggableProp>
      )}

      {/* FABRICATION EXPOSED IMAGE */}
      {stage >= 5 && (
        <DraggableProp 
          defaultX={600} 
          defaultY={250}
          topZIndex={topZIndex}
          setTopZIndex={setTopZIndex}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/case-06/dump/record.png" 
            alt="Official Record" 
            style={{ 
              boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
              border: "1px solid #333"
            }} 
          />
        </DraggableProp>
      )}

      {/* STAGE 7 PRINTED DOCUMENT */}
      {stage7FilePrinted && (
        <DraggableProp 
          defaultX={400} 
          defaultY={150}
          topZIndex={topZIndex}
          setTopZIndex={setTopZIndex}
          onMove={(pos) => {
            docPosRef.current = pos;
            checkSmudge();
          }}
        >
          <div style={{ position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/case-06/stage7/document.png" 
              alt="Stage 7 Document" 
              style={{ 
                boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                border: "1px solid #333"
              }} 
            />
            {isSmudged && (
              <div style={{
                position: "absolute",
                bottom: "5%",
                left: "50%",
                transform: "translateX(-50%)",
                width: 200,
                height: 120,
                background: "radial-gradient(ellipse at center, rgba(10,10,20,0.8) 0%, rgba(10,10,20,0.4) 60%, transparent 100%)",
                filter: "blur(1px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "30%",
                pointerEvents: "none",
                zIndex: 100
              }}>
                <span style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "3.5rem",
                  fontWeight: "bold",
                  color: "rgba(220,220,220,0.9)",
                  transform: "rotate(-10deg)",
                  textShadow: "0 0 5px rgba(255,255,255,0.3)"
                }}>NULL</span>
              </div>
            )}
          </div>
        </DraggableProp>
      )}

      {/* STAGE 2 PUZZLE: Flowchart */}
      {stage === 2 && onComplete && onLogRecovered && setView && (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 100 }}>
          <Stage2TablePuzzle onComplete={onComplete} onLogRecovered={onLogRecovered} setView={setView} />
        </div>
      )}



      {/* SIDE CABINET TRIGGER */}
      <div 
        onClick={() => setIsCabinetOpen(true)}
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "40px",
          height: "120px",
          background: "linear-gradient(to right, #4a3b2c, #2b1d14)",
          border: "2px solid #1a110a",
          borderRight: "none",
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "-2px 0 10px rgba(0,0,0,0.5)",
          zIndex: 500,
          color: "rgba(255,255,255,0.5)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          letterSpacing: "2px",
          fontSize: "0.8rem",
          fontWeight: "bold"
        }}
        onMouseEnter={(e) => { e.currentTarget.style.width = "50px"; e.currentTarget.style.background = "linear-gradient(to right, #5c4a38, #3a271c)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.width = "40px"; e.currentTarget.style.background = "linear-gradient(to right, #4a3b2c, #2b1d14)"; }}
      >
        CABINET
      </div>

      {/* CABINET OVERLAY (RECOVERED NOTES) */}
      {isCabinetOpen && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(2px)"
        }}>
          <div style={{
            width: "80%",
            maxWidth: "600px",
            height: "80%",
            backgroundColor: "#d5c9b1", // Manila folder color
            borderRadius: "5px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
            padding: "2rem",
            position: "relative",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}>
            <button 
              onClick={() => setIsCabinetOpen(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "transparent",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#554d3c",
                fontWeight: "bold"
              }}
            >
              ✕
            </button>
            <h2 style={{ color: "#3a3222", borderBottom: "2px solid #a69b82", paddingBottom: "0.5rem", marginTop: 0, textTransform: "uppercase", letterSpacing: "2px" }}>
              Recovered Case Notes
            </h2>
            
            {logs.length === 0 ? (
              <div style={{ color: "#7a7262", fontStyle: "italic", textAlign: "center", marginTop: "2rem" }}>
                No notes have been filed yet.
              </div>
            ) : (
              logs.map(log => (
                <div key={log.id} style={{
                  background: "#f4eedd",
                  padding: "1rem",
                  borderLeft: "4px solid #b84b4b",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  color: "#2a2212",
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "0.95rem",
                  lineHeight: "1.5"
                }}>
                  {log.text}
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}
