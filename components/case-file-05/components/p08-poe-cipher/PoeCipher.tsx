"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useCaseStore } from "../../CaseFileProvider";
import { CipherText } from "./CipherText";
import { YearCounter } from "./YearCounter";
import { FileKey2, Compass, AlertCircle } from "lucide-react";

export function PoeCipher() {
  const solved = useCaseStore((state) => state.solved);
  const isSolved = solved.includes(8); // Puzzle #8 is Poe Cipher

  const [startDecrypt, setStartDecrypt] = useState(isSolved);

  // Sync state if already solved
  useEffect(() => {
    if (isSolved) {
      setStartDecrypt(true);
    }
  }, [isSolved]);

  const handleCounterComplete = useCallback(() => {
    setStartDecrypt(true);
  }, []);

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 select-text text-zinc-100 font-mono">
      {/* Telemetry Status Bar */}
      <div className={`w-full border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden transition-all duration-300 ${
        isSolved 
          ? "bg-emerald-950/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
          : startDecrypt
          ? "bg-amber-950/20 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
          : "bg-zinc-950/30 border-zinc-900"
      }`}>
        <div className="space-y-1 relative z-10 text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
            <FileKey2 size={14} className={!startDecrypt ? "animate-pulse text-amber-500" : "text-emerald-500"} />
            HISTORICAL DOSSIER // DECRYPTION STREAM
          </div>
          <h3 className={`text-lg font-bold uppercase tracking-wider ${
            isSolved ? "text-emerald-400" : "text-zinc-200"
          }`}>
            {isSolved 
              ? "ANOMALY RESOLVED // Chronological Anchor Locked" 
              : startDecrypt
              ? "POLYALPHABETIC RECONSTRUCTION IN PROGRESS"
              : "TEMPORAL CALIBRATION SEQUENCE ACTIVE"}
          </h3>
          <p className="text-[11px] leading-relaxed text-zinc-400 max-w-2xl font-sans">
            {isSolved
              ? "The encryption system cracked by Gil Broza has been completely synchronized. Edgar Allan Poe's elusive pseudonym mystery has been archived."
              : startDecrypt
              ? "The year counter has completed scanning to 2000 A.D. Substitution mapping is performing staggered replacements. Analyze the decrypted text."
              : "Aligning temporal matrix back to the publishing era. Calculating frequency curves between 1840 and 2000 A.D."}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-zinc-900 rounded font-bold text-[10px] tracking-wider uppercase select-none">
          <span className={`w-2 h-2 rounded-full ${
            isSolved 
              ? "bg-emerald-500 animate-pulse" 
              : startDecrypt
              ? "bg-amber-500 animate-pulse"
              : "bg-zinc-700"
          }`} />
          <span className={isSolved ? "text-emerald-400" : startDecrypt ? "text-amber-400" : "text-zinc-400"}>
            {isSolved ? "STABILIZED" : startDecrypt ? "DECRYPTING" : "SCANNING"}
          </span>
        </div>
      </div>

      {/* Year Counter widget */}
      <YearCounter onComplete={handleCounterComplete} isSolved={isSolved} />

      {/* Main Parchment Cipher Panel */}
      <CipherText startDecrypt={startDecrypt} />

      {/* Cryptographic Telemetry Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-8 p-4 bg-zinc-950/40 border border-zinc-900 rounded-lg space-y-3 text-left relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-6 -right-6 text-zinc-800/10 pointer-events-none">
            <Compass size={96} />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 font-mono tracking-widest uppercase flex items-center gap-1.5 select-none">
              <Compass size={14} />
              HISTORICAL BRIEFING
            </h4>
            
            <p className="text-[11px] leading-relaxed text-zinc-400 font-serif">
              In 1840, W. B. Tyler challenged Edgar Allan Poe with two ciphers. While the first was cracked soon after, the second was a complex polyalphabetic homophonic substitution that went unsolved for over 150 years. Williams College offered a reward for its decryption.
            </p>
          </div>

          <div className="text-[10px] text-zinc-500 font-mono bg-black/30 p-2.5 rounded border border-zinc-900/60 select-none">
            <span className="text-amber-500 font-bold">ANALYSIS NOTE:</span> In 2000, Toronto software developer Gil Broza broke the code, finding the text had extensive typesetting errors that confounded frequency tools.
          </div>
        </div>

        <div className="md:col-span-4 p-4 bg-zinc-950/40 border border-zinc-900 rounded-lg text-left flex flex-col justify-between relative overflow-hidden">
          <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-1">
            <AlertCircle size={12} className="text-red-500 animate-pulse" />
            STABILIZATION TARGET
          </div>
          
          <p className="text-[10px] leading-relaxed text-zinc-400 mt-1">
            Analyze the decrypted parchment excerpt. Enter the full name of the Canadian engineer who solved this cipher in the year 2000.
          </p>

          <div className="mt-4 pt-3 border-t border-zinc-900/60 text-[9px] text-zinc-500 flex justify-between items-center">
            <span>TARGET COORDINATES:</span>
            <span className="font-bold text-red-500/80">1840-2000 A.D.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoeCipher;
