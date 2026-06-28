"use client";

import React, { useState, useEffect, useRef } from "react";
import { Hourglass } from "lucide-react";

interface YearCounterProps {
  onComplete: () => void;
  isSolved: boolean;
}

export function YearCounter({ onComplete, isSolved }: YearCounterProps) {
  const [year, setYear] = useState(1840);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    if (isSolved) {
      setYear(2000);
      onComplete();
      return;
    }

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setYear(2000);
      onComplete();
      return;
    }

    const startVal = 1840;
    const endVal = 2000;
    const duration = 3000; // 3 seconds count up duration
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed >= duration) {
        setYear(endVal);
        onComplete();
        return;
      }

      // Easing out cubic curve: progress = 1 - (1 - t)^3
      const t = elapsed / duration;
      const progress = 1 - Math.pow(1 - t, 3);
      
      const currentVal = Math.floor(startVal + progress * (endVal - startVal));
      setYear(currentVal);

      frameId.current = requestAnimationFrame(animate);
    };

    frameId.current = requestAnimationFrame(animate);

    // Essential cleanup function to cancel RAF frames on component unmount
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [isSolved, onComplete]);

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-950/60 border border-zinc-900 rounded-lg shadow-inner font-mono text-left select-none relative overflow-hidden">
      <div className="space-y-1 z-10">
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">
          // TIMELINE ANALYSIS INDEX
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-wider text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.25)]">
            {year}
          </span>
          <span className="text-[10px] text-zinc-500 font-bold uppercase">
            A.D.
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5 z-10">
        <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-wider px-2 py-0.5 rounded border border-zinc-800 bg-black/40 text-zinc-400">
          <Hourglass size={10} className={year < 2000 ? "animate-spin" : ""} />
          {year < 2000 ? "TEMPORAL SCANNING" : "DECRYPTION STABILIZED"}
        </div>
        <span className="text-[8px] text-zinc-600 uppercase">
          RANGE: 1840 -&gt; 2000 A.D.
        </span>
      </div>

      {/* Grid line indicator animation overlay */}
      {year < 2000 && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/2 to-transparent -translate-x-full animate-[pulseSweep_1.5s_infinite]" />
      )}

      <style>{`
        @keyframes pulseSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-spin {
            animation: none !important;
          }
          .animate-\\[pulseSweep_1\\.5s_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default YearCounter;
