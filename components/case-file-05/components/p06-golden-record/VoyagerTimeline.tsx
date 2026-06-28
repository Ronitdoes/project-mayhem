"use client";

import React, { useRef, useEffect } from "react";
import { ArrowRight, Compass, Heart, Award } from "lucide-react";

interface VoyagerTimelineProps {
  isThinkingOfLove: boolean;
  isSolved: boolean;
}

export function VoyagerTimeline({ isThinkingOfLove, isSolved }: VoyagerTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to the end of the timeline when the "Love" sequence or solved state triggers
  useEffect(() => {
    if (isThinkingOfLove || isSolved) {
      const scrollTimer = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTo({
            left: containerRef.current.scrollWidth,
            behavior: "smooth",
          });
        }
      }, 300); // slight delay to allow rendering
      return () => clearTimeout(scrollTimer);
    }
  }, [isThinkingOfLove, isSolved]);

  return (
    <div className="w-full space-y-3 font-mono text-left select-none">
      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
        <span>// CHRONOS DATA STREAM: VOYAGER MILESTONES</span>
        <span className="text-emerald-500/70">SWEEP HORIZONTAL &gt;&gt;</span>
      </div>

      {/* Horizontal timeline cards container */}
      <div
        ref={containerRef}
        className="w-full flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent scroll-smooth snap-x"
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Milestone 1: 1977 Voyager Launch */}
        <div className="min-w-[260px] sm:min-w-[280px] bg-zinc-950/50 border border-zinc-900 rounded-lg p-4 flex flex-col justify-between shrink-0 snap-align-start hover:border-zinc-800 transition-all">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] text-zinc-500">
              <span>RECORD ARCHIVE #01</span>
              <span className="font-bold text-amber-500">1977</span>
            </div>
            <h4 className="text-sm font-bold text-zinc-200">Voyager Launch</h4>
            <p className="text-[11px] leading-relaxed text-zinc-400">
              Voyager 1 and 2 launched containing the Golden Record. The committee records Ann Druyan's electroencephalogram (EEG) brainwaves.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-zinc-900/60 flex items-center gap-1.5 text-[9px] text-zinc-500">
            <Compass size={11} />
            <span>INTERSTELLAR BOUND</span>
          </div>
        </div>

        {/* Milestone Connector Arrow */}
        <div className="flex items-center justify-center shrink-0 text-zinc-800">
          <ArrowRight size={18} className="animate-pulse" />
        </div>

        {/* Milestone 2: 1981 Marriage */}
        <div className="min-w-[260px] sm:min-w-[280px] bg-zinc-950/50 border border-zinc-900 rounded-lg p-4 flex flex-col justify-between shrink-0 snap-align-start hover:border-zinc-800 transition-all">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] text-zinc-500">
              <span>RECORD ARCHIVE #02</span>
              <span className="font-bold text-amber-500">1981</span>
            </div>
            <h4 className="text-sm font-bold text-zinc-200">The Marriage</h4>
            <p className="text-[11px] leading-relaxed text-zinc-400">
              Four years after the records were compiled, Ann Druyan and the head of the Voyager Golden Record committee are officially married.
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-zinc-900/60 flex items-center gap-1.5 text-[9px] text-red-500/80">
            <Heart size={11} fill="rgba(239, 68, 68, 0.2)" />
            <span>EMOTIONAL ENVELOPE LOCK</span>
          </div>
        </div>

        {/* Milestone Connector Arrow */}
        <div className="flex items-center justify-center shrink-0 text-zinc-800">
          <ArrowRight size={18} className={isThinkingOfLove ? "text-emerald-500/40 animate-pulse" : ""} />
        </div>

        {/* Milestone 3: The Mystery Scientist */}
        <div
          className={`min-w-[280px] sm:min-w-[320px] border rounded-lg p-4 flex flex-col justify-between shrink-0 snap-align-start transition-all duration-500 ${
            isSolved
              ? "bg-emerald-950/10 border-emerald-500/40 text-emerald-400"
              : isThinkingOfLove
              ? "bg-amber-950/10 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
              : "bg-zinc-950/20 border-zinc-950 text-zinc-600 opacity-60"
          }`}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-zinc-500">RECORD ARCHIVE #03</span>
              <span className="font-bold">????</span>
            </div>
            
            {isSolved ? (
              <>
                <h4 className="text-sm font-bold text-emerald-300">Decrypted: Carl Sagan</h4>
                <p className="text-[11px] leading-relaxed text-zinc-300">
                  Ann Druyan was thinking of Carl Sagan when her brainwaves were recorded. The signal represents the literal electric frequency of love, sailing into the cosmos.
                </p>
              </>
            ) : isThinkingOfLove ? (
              <>
                <h4 className="text-sm font-bold text-amber-400 animate-pulse">Active Decryption Node</h4>
                <p className="text-[11px] leading-relaxed text-zinc-400">
                  Who did she fall in love with? Decrypt the space scientist committee chair to stabilize this anchor.
                </p>
              </>
            ) : (
              <>
                <h4 className="text-sm font-bold">Node Locked</h4>
                <p className="text-[11px] leading-relaxed text-zinc-600">
                  Execute "Initialize Love Telemetry" above to synchronize records and analyze cognitive frequencies.
                </p>
              </>
            )}
          </div>
          
          <div className="mt-4 pt-2 border-t border-zinc-900/60 flex items-center gap-1.5 text-[9px]">
            {isSolved ? (
              <>
                <Award size={11} className="text-emerald-400" />
                <span className="text-emerald-400 font-bold uppercase tracking-wider">Anchor Stabilized</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                <span className="uppercase tracking-widest font-bold text-[8px]">Waiting for Input</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoyagerTimeline;
