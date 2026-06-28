"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { Chess } from "chess.js";
import { Play, Pause, SkipBack, ChevronLeft, ChevronRight, RotateCcw, HelpCircle } from "lucide-react";
import BlunderHighlight from "./BlunderHighlight";

// Lazy-load the Chessboard to avoid SSR hydration conflicts and bloat
const Chessboard = dynamic(
  () => import("react-chessboard").then((mod) => mod.Chessboard),
  { ssr: false }
);

interface ChessReplayProps {
  onMoveChange?: (moveIndex: number, moveSan: string, fen: string) => void;
}

const PGN_GAME = `[Event "IBM Man-Machine, New York"]
[Site "New York, NY USA"]
[Date "1997.05.11"]
[Round "6"]
[White "Deep Blue"]
[Black "Kasparov, Garry"]
[Result "1-0"]
[ECO "B17"]

1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7 5. Ng5 Ngf6 6. Bd3 e6 7. N1f3 h6 8. Nxe6 Qe7 9. O-O fxe6 10. Bg6+ Kd8 11. Bf4 b5 12. a4 Bb7 13. Re1 Nd5 14. Bg3 Kc8 15. axb5 cxb5 16. Qd3 Bc6 17. Bf5 exf5 18. Rxe7 Bxe7 19. c4 1-0`;

export default function ChessReplay({ onMoveChange }: ChessReplayProps) {
  // Parse the PGN game once on mount
  const { history, initialFen } = useMemo(() => {
    const game = new Chess();
    game.loadPgn(PGN_GAME);
    const moves = game.history({ verbose: true });
    return {
      history: moves,
      initialFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    };
  }, []);

  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [containerWidth, setContainerWidth] = useState(480);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPropagatedMoveRef = useRef<{ index: number; fen: string } | null>(null);

  // ResizeObserver for responsiveness
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute current FEN based on move index
  const currentFen = useMemo(() => {
    if (currentMoveIndex === -1) return initialFen;
    const game = new Chess();
    for (let i = 0; i <= currentMoveIndex; i++) {
      game.move(history[i].san);
    }
    return game.fen();
  }, [currentMoveIndex, history, initialFen]);

  // Propagate move change to parent for move list or status updates
  useEffect(() => {
    if (onMoveChange) {
      const currentSan = currentMoveIndex >= 0 ? history[currentMoveIndex].san : "Start";
      const last = lastPropagatedMoveRef.current;
      if (!last || last.index !== currentMoveIndex || last.fen !== currentFen) {
        lastPropagatedMoveRef.current = { index: currentMoveIndex, fen: currentFen };
        onMoveChange(currentMoveIndex, currentSan, currentFen);
      }
    }
  }, [currentMoveIndex, currentFen, history, onMoveChange]);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentMoveIndex((prev) => {
        const nextIndex = prev + 1;
        
        // Stop if reached the end
        if (nextIndex >= history.length) {
          setIsPlaying(false);
          return prev;
        }

        // Move 7 blunder in this Caro-Kann is index 13 (Black's 7th move: h6)
        if (nextIndex === 13) {
          setIsPlaying(false);
        }

        return nextIndex;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying, history.length]);

  // Handle manual navigation controls
  const handleRewindToStart = () => {
    setIsPlaying(false);
    setCurrentMoveIndex(-1);
  };

  const handlePrevMove = () => {
    setIsPlaying(false);
    setCurrentMoveIndex((prev) => Math.max(-1, prev - 1));
  };

  const handleNextMove = () => {
    setIsPlaying(false);
    setCurrentMoveIndex((prev) => Math.min(history.length - 1, prev + 1));
  };

  const handleForwardToEnd = () => {
    setIsPlaying(false);
    setCurrentMoveIndex(history.length - 1);
  };

  const handleTogglePlay = () => {
    if (currentMoveIndex >= history.length - 1) {
      // Loop back if finished
      setCurrentMoveIndex(-1);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Custom highlights on squares
  const customSquareStyles = useMemo(() => {
    // If we are at index 13 (Kasparov's move 7 blunder: h6)
    if (currentMoveIndex === 13) {
      return {
        h7: {
          border: "4px solid #f87171",
          borderRadius: "4px",
          backgroundColor: "rgba(239, 68, 68, 0.15)",
        },
        h6: {
          border: "4px solid #ef4444",
          borderRadius: "4px",
          backgroundColor: "rgba(239, 68, 68, 0.35)",
          boxShadow: "inset 0 0 10px rgba(239,68,68,0.5)",
        },
      };
    }

    // Default highlights for last played move
    if (currentMoveIndex >= 0 && currentMoveIndex < history.length) {
      const lastMove = history[currentMoveIndex];
      return {
        [lastMove.from]: {
          backgroundColor: "rgba(16, 185, 129, 0.15)",
        },
        [lastMove.to]: {
          backgroundColor: "rgba(16, 185, 129, 0.3)",
          boxShadow: "inset 0 0 5px rgba(16,185,129,0.3)",
        },
      };
    }

    return {};
  }, [currentMoveIndex, history]);

  // Display label formatting
  const moveLabel = useMemo(() => {
    if (currentMoveIndex === -1) return "Game Start";
    const fullMoveNumber = Math.floor(currentMoveIndex / 2) + 1;
    const side = currentMoveIndex % 2 === 0 ? "White (Deep Blue)" : "Black (Kasparov)";
    const san = history[currentMoveIndex].san;
    return `Move ${fullMoveNumber}: ${san} by ${side}`;
  }, [currentMoveIndex, history]);

  return (
    <div className="flex flex-col items-center w-full gap-4 relative">
      {/* Container holding Chessboard */}
      <div 
        ref={containerRef} 
        className="w-full flex justify-center relative overflow-hidden bg-zinc-950/80 p-4 border border-zinc-900 rounded-lg shadow-2xl"
      >
        <div style={{ width: Math.min(containerWidth - 32, 440) }}>
          <Chessboard
            options={{
              position: currentFen,
              allowDragging: false,
              boardOrientation: "white",
              darkSquareStyle: { backgroundColor: "#1e293b" },
              lightSquareStyle: { backgroundColor: "#64748b" },
              squareStyles: customSquareStyles,
              boardStyle: {
                width: `${Math.min(containerWidth - 32, 440)}px`,
                height: `${Math.min(containerWidth - 32, 440)}px`,
              }
            }}
          />
        </div>

        {/* Blunder Overlay Tooltip */}
        <BlunderHighlight isVisible={currentMoveIndex === 13} />
      </div>

      {/* Replay Deck Controls */}
      <div className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg p-3 flex flex-col gap-3 font-mono">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            Replay Deck
          </span>
          <span className="text-xs font-bold text-emerald-400 font-mono">
            {moveLabel}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 py-1">
          <button
            onClick={handleRewindToStart}
            disabled={currentMoveIndex === -1}
            title="Rewind to Start"
            className="p-1.5 rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            <SkipBack size={14} />
          </button>
          
          <button
            onClick={handlePrevMove}
            disabled={currentMoveIndex === -1}
            title="Previous Move"
            className="p-1.5 rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft size={14} />
          </button>

          <button
            onClick={handleTogglePlay}
            title={isPlaying ? "Pause Autoplay" : "Start Autoplay"}
            className={`p-2.5 rounded-full border transition-all duration-200 ${
              isPlaying
                ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 hover:bg-emerald-500/20"
                : "bg-zinc-950 border-zinc-700 text-zinc-200 hover:border-zinc-500"
            }`}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            onClick={handleNextMove}
            disabled={currentMoveIndex === history.length - 1}
            title="Next Move"
            className="p-1.5 rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronRight size={14} />
          </button>

          <button
            onClick={handleForwardToEnd}
            disabled={currentMoveIndex === history.length - 1}
            title="Forward to End"
            className="p-1.5 rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            <RotateCcw size={14} className="rotate-180" />
          </button>
        </div>

        {/* Moves Timeline Index Slider */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-[10px] text-zinc-500 shrink-0 font-bold">START</span>
          <input
            type="range"
            min="-1"
            max={history.length - 1}
            value={currentMoveIndex}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentMoveIndex(parseInt(e.target.value));
            }}
            aria-label="Chess Move Index Slider"
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <span className="text-[10px] text-zinc-500 shrink-0 font-bold">END</span>
        </div>

        {/* Interactive Move Log list */}
        <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto p-2 border border-zinc-950 bg-zinc-950/40 rounded-md select-none">
          {history.map((move, idx) => {
            const moveNum = Math.floor(idx / 2) + 1;
            const isWhite = idx % 2 === 0;
            const isCurrent = idx === currentMoveIndex;
            
            return (
              <span
                key={idx}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentMoveIndex(idx);
                }}
                className={`px-2 py-0.5 text-[10px] rounded cursor-pointer border transition-all duration-150 ${
                  isCurrent
                    ? "bg-emerald-500 text-black border-emerald-400 font-bold"
                    : idx === 13
                    ? "text-red-400 border-red-950 hover:bg-red-950/30 hover:border-red-500/30 font-bold"
                    : "text-zinc-400 border-transparent hover:bg-zinc-800/50 hover:border-zinc-800"
                }`}
              >
                {isWhite ? `${moveNum}.` : ""}{move.san}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
