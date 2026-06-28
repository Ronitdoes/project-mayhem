"use client";

import React from "react";
import { Lock, Unlock, KeyRound } from "lucide-react";

interface ClueRevealProps {
  isSolved: boolean;
  revealed: boolean;
  onReveal: () => void;
}

export function ClueReveal({ isSolved, revealed, onReveal }: ClueRevealProps) {
  const showUnlocked = revealed || isSolved;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between select-none">
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest font-mono">
          // DECRYPTED SCULPTURE HINTS
        </span>
        <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
          <KeyRound size={10} />
          SANBORN RELEASED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: CLOCK */}
        <div className="flex flex-col justify-between p-4 bg-zinc-950/40 border border-emerald-950/60 rounded-lg relative overflow-hidden group shadow-[0_0_15px_rgba(16,185,129,0.02)] min-h-[140px] text-left">
          {/* Subtle green ambient light */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[9px] font-bold text-emerald-500/70 tracking-wider font-mono">
              <span>CLUE #01 (K1/K2)</span>
              <span className="px-1.5 py-0.5 bg-emerald-950/30 border border-emerald-800/40 rounded text-emerald-400 uppercase tracking-widest text-[8px]">
                DECRYPTED
              </span>
            </div>
            <h4 className="text-xl font-bold font-mono tracking-wider text-zinc-100 mt-2">
              CLOCK
            </h4>
          </div>
          
          <div className="text-[9px] text-zinc-500 font-mono mt-4 pt-2 border-t border-zinc-900/60 flex items-center gap-1 select-none">
            <Unlock size={10} className="text-emerald-400" />
            <span>ACCESS: GRANTED</span>
          </div>
        </div>

        {/* Card 2: ??? / BERLIN (Interactive) */}
        <div 
          className={`flex flex-col justify-between p-4 border rounded-lg relative overflow-hidden group transition-all duration-500 min-h-[140px] text-left ${
            showUnlocked
              ? "bg-zinc-950/40 border-emerald-950/60 shadow-[0_0_15px_rgba(16,185,129,0.02)]"
              : "bg-zinc-950/20 border-zinc-900/80 shadow-inner"
          }`}
        >
          {showUnlocked && (
            <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between text-[9px] font-bold tracking-wider font-mono">
              <span className={showUnlocked ? "text-emerald-500/70" : "text-zinc-500"}>CLUE #02 (K2)</span>
              <span className={`px-1.5 py-0.5 border rounded uppercase tracking-widest text-[8px] transition-all duration-300 ${
                showUnlocked
                  ? "bg-emerald-950/30 border-emerald-800/40 text-emerald-400"
                  : "bg-amber-950/10 border-amber-900/30 text-amber-500/80 animate-pulse"
              }`}>
                {showUnlocked ? "DECRYPTED" : "ENCRYPTED"}
              </span>
            </div>

            {/* Content reveal logic */}
            <div className="relative h-10 mt-2 flex items-center">
              {showUnlocked ? (
                <h4 className="text-xl font-bold font-mono tracking-wider text-zinc-100 animate-[fadeIn_0.5s_ease-out_forwards]">
                  BERLIN
                </h4>
              ) : (
                <h4 className="text-xl font-bold font-mono tracking-widest text-zinc-600 select-none">
                  ??????
                </h4>
              )}
            </div>
          </div>

          {/* Bottom state/action */}
          <div className="mt-4 pt-2 border-t border-zinc-900/60 flex items-center justify-between select-none">
            {showUnlocked ? (
              <div className="text-[9px] text-zinc-500 font-mono flex items-center gap-1">
                <Unlock size={10} className="text-emerald-400" />
                <span>ACCESS: GRANTED</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={onReveal}
                className="w-full flex items-center justify-center gap-1.5 py-1 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-[10px] font-bold text-zinc-400 hover:text-emerald-400 rounded cursor-pointer transition-all duration-300 shadow"
              >
                <Lock size={10} className="text-amber-500 animate-pulse" />
                <span>Reveal Clue 2</span>
              </button>
            )}
          </div>
        </div>

        {/* Card 3: NORTHEAST */}
        <div className="flex flex-col justify-between p-4 bg-zinc-950/40 border border-emerald-950/60 rounded-lg relative overflow-hidden group shadow-[0_0_15px_rgba(16,185,129,0.02)] min-h-[140px] text-left">
          <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[9px] font-bold text-emerald-500/70 tracking-wider font-mono">
              <span>CLUE #03 (K4)</span>
              <span className="px-1.5 py-0.5 bg-emerald-950/30 border border-emerald-800/40 rounded text-emerald-400 uppercase tracking-widest text-[8px]">
                DECRYPTED
              </span>
            </div>
            <h4 className="text-xl font-bold font-mono tracking-wider text-zinc-100 mt-2">
              NORTHEAST
            </h4>
          </div>
          
          <div className="text-[9px] text-zinc-500 font-mono mt-4 pt-2 border-t border-zinc-900/60 flex items-center gap-1 select-none">
            <Unlock size={10} className="text-emerald-400" />
            <span>ACCESS: GRANTED</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(2px); filter: blur(2px); }
          to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
      `}</style>
    </div>
  );
}

export default ClueReveal;
