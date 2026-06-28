"use client";

import React, { useState, useEffect, useRef } from "react";

interface SumCounterProps {
  onComplete: () => void;
}

export function SumCounter({ onComplete }: SumCounterProps) {
  const [count, setCount] = useState(0);
  const target = 42;
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount(target);
      onComplete();
      return;
    }

    intervalId.current = setInterval(() => {
      setCount((prev) => {
        if (prev >= target) {
          if (intervalId.current) clearInterval(intervalId.current);
          onComplete();
          return target;
        }
        return prev + 1;
      });
    }, 60);

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [onComplete]);

  return (
    <div className="space-y-6 p-5 bg-zinc-950/60 border border-zinc-900 rounded-lg shadow-inner text-left font-mono">
      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">
        // VINTAGE SUMMATION UNIT (1840s)
      </span>

      <div className="flex flex-col items-center justify-center py-6 bg-black/40 border border-zinc-900 rounded-md">
        <div className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest mb-3">
          ACCUMULATOR REGISTER
        </div>
        
        {/* Mechanical Ticker Box */}
        <div className="flex items-center gap-1.5 px-6 py-4 bg-zinc-900 border-2 border-zinc-800 rounded-md shadow-2xl relative overflow-hidden select-none">
          {/* Subtle horizontal line showing wheel split */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/50 z-10 pointer-events-none" />
          
          <div className="w-8 h-12 flex items-center justify-center bg-black border border-zinc-800 text-2xl font-black text-amber-500 font-mono rounded">
            {Math.floor(count / 10)}
          </div>
          <div className="w-8 h-12 flex items-center justify-center bg-black border border-zinc-800 text-2xl font-black text-amber-500 font-mono rounded">
            {count % 10}
          </div>
        </div>

        <div className="text-[10px] text-emerald-400 font-bold mt-4 uppercase tracking-widest animate-pulse h-4">
          {count < target ? "TICKING SYSTEM SUM..." : "✓ STABILIZED DECRYPTION KEY: 42"}
        </div>
      </div>
    </div>
  );
}
