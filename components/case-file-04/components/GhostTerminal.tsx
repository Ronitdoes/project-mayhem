"use client";

import React from "react";
import GhostWord from "./GhostWord";
import { GhostWordItem } from "../lib/ghostGenerator";

interface GhostTerminalProps {
  words: GhostWordItem[];
}

export const GhostTerminal: React.FC<GhostTerminalProps> = ({ words }) => {
  return (
    <div className="w-full max-w-2xl bg-black/80 border border-emerald-500/40 rounded-lg p-4 sm:p-6 shadow-[0_0_35px_rgba(16,185,129,0.15)] flex flex-col items-center relative overflow-hidden">
      {/* Terminal Header */}
      <div className="w-full flex items-center justify-between border-b border-emerald-500/30 pb-3 mb-4 font-mono text-xs text-emerald-400/80 tracking-widest uppercase">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-ping inline-block" />
          <span className="font-bold text-red-400">SYSTEM CORRUPTED</span>
        </div>
        <div className="hidden sm:block text-[10px] text-emerald-500/60">
          NODE: 04-GHOST-MEM
        </div>
      </div>

      {/* Word Grid Matrix */}
      <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 py-4 min-h-[220px] sm:min-h-[260px] items-center justify-items-center bg-emerald-950/20 rounded border border-emerald-900/30">
        {words.map((item, idx) => (
          <GhostWord key={`${item.id}-${idx}`} item={item} />
        ))}
      </div>

      {/* Terminal Footer Indicator */}
      <div className="w-full flex justify-between items-center pt-3 mt-4 border-t border-emerald-500/20 font-mono text-[10px] text-emerald-500/70 uppercase">
        <span>STATUS: UNSTABLE MEMORY DUMP</span>
        <span className="animate-pulse">RESCANNING GRID...</span>
      </div>
    </div>
  );
};

export default GhostTerminal;
