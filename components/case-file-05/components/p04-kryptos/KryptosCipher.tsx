"use client";

import React, { useState, useEffect } from "react";
import { useCaseStore } from "../../CaseFileProvider";
import { CipherPanel } from "./CipherPanel";
import { ClueReveal } from "./ClueReveal";
import { Compass } from "lucide-react";

export function KryptosCipher() {
  const solved = useCaseStore((state) => state.solved);
  const isSolved = solved.includes(4); // Puzzle #4 is Kryptos Cipher

  // Local state for whether clue 2 is unlocked. If solved, default to true.
  const [clue2Revealed, setClue2Revealed] = useState(isSolved);

  // Sync if it gets solved while active
  useEffect(() => {
    if (isSolved) {
      setClue2Revealed(true);
    }
  }, [isSolved]);

  const handleRevealClue2 = () => {
    setClue2Revealed(true);
  };

  return (
    <div className="p-4 sm:p-6 w-full space-y-8 select-text">
      {/* Grid containing Cipher Screen and Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: The Cipher Panel (7 cols on large screens) */}
        <div className="lg:col-span-7 w-full">
          <CipherPanel />
        </div>

        {/* Right Side: Historical Dossier & Interactive Cards (5 cols) */}
        <div className="lg:col-span-5 w-full space-y-6 text-left">
          {/* Historical Info Block */}
          <div className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-lg space-y-3 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 text-zinc-800/10 pointer-events-none">
              <Compass size={96} />
            </div>
            
            <h3 className="text-xs font-bold text-emerald-400 font-mono tracking-widest uppercase flex items-center gap-1.5 select-none">
              <Compass size={14} />
              ANALYSIS MODULE
            </h3>
            
            <p className="text-[11px] leading-relaxed text-zinc-400 font-mono">
              The copper screen sculpture contains four distinct cipher passages. Passages 1, 2, and 3 have been solved. 
              The final K4 section at the bottom remains one of the world's most elusive cryptographic mysteries.
            </p>
            <div className="text-[10px] text-zinc-500 font-mono bg-black/30 p-2 rounded border border-zinc-900/60 select-none">
              <span className="text-amber-500 font-bold">HISTORICAL NOTE:</span> James Sanborn has released exactly three single-word clues over the past decades to aid global decryption efforts.
            </div>
          </div>

          {/* Interactive Cards */}
          <ClueReveal 
            isSolved={isSolved} 
            revealed={clue2Revealed} 
            onReveal={handleRevealClue2} 
          />
        </div>
      </div>
    </div>
  );
}

export default KryptosCipher;
