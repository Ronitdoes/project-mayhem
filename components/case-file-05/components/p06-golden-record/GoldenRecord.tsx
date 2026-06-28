"use client";

import React, { useState, useEffect } from "react";
import { useCaseStore } from "../../CaseFileProvider";
import { VinylSpinner } from "./VinylSpinner";
import { EEGWaveform } from "./EEGWaveform";
import { VoyagerTimeline } from "./VoyagerTimeline";
import { Activity, Disc, Cpu, Heart } from "lucide-react";

export function GoldenRecord() {
  const solved = useCaseStore((state) => state.solved);
  const isSolved = solved.includes(6); // Puzzle #6 is Golden Record

  // Telemetry phase state: "idle" | "recording" | "love"
  const [phase, setPhase] = useState<"idle" | "recording" | "love">("idle");

  // Sync state if already solved
  useEffect(() => {
    if (isSolved) {
      setPhase("love");
    }
  }, [isSolved]);

  const handleStartRecording = () => {
    setPhase("recording");
  };

  const handleTriggerLove = () => {
    setPhase("love");
  };

  const handleReset = () => {
    if (!isSolved) {
      setPhase("idle");
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 select-text text-zinc-100 font-mono">
      {/* Dynamic Status Banner */}
      <div className={`w-full border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden transition-all duration-300 ${
        isSolved 
          ? "bg-emerald-950/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
          : phase === "love"
          ? "bg-amber-950/20 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
          : "bg-zinc-950/30 border-zinc-900"
      }`}>
        <div className="space-y-1 relative z-10 text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
            <Cpu size={14} className={phase !== "idle" ? "animate-spin-slow text-amber-500" : "text-zinc-500"} />
            COGNITIVE TELEMETRY MATRIX
          </div>
          <h3 className={`text-lg font-bold uppercase tracking-wider ${
            isSolved ? "text-emerald-400" : "text-zinc-200"
          }`}>
            {isSolved 
              ? "ANOMALY RESOLVED // Carl Sagan Link Stabilized" 
              : phase === "love"
              ? "RECORD CORRELATION: INITIALIZED"
              : phase === "recording"
              ? "RECORD Sweeper: Active"
              : "TIMELINE CORE OFFLINE"}
          </h3>
          <p className="text-[11px] leading-relaxed text-zinc-400 max-w-2xl">
            {isSolved
              ? "The emotional telemetry matches Carl Sagan. His connection with Ann Druyan has been stabilized in the Voyager timeline, locking the interstellar data coordinates."
              : phase === "love"
              ? "EEG peaks are spiking and clustering. We have synchronized the emotional recording phase. Decrypt the committee leader's name below."
              : phase === "recording"
              ? "Brainwave sweep is online and recording calm neural activity. Use the controls to simulate falling in love."
              : "Turntable alignment correct. Press the controls to begin scanning Ann Druyan's recorded brainwaves."}
          </p>
        </div>

        {/* Status Indicator */}
        <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-zinc-900 rounded font-bold text-[10px] tracking-wider uppercase select-none">
          <span className={`w-2 h-2 rounded-full ${
            isSolved 
              ? "bg-emerald-500 animate-pulse" 
              : phase === "love"
              ? "bg-amber-500 animate-pulse"
              : phase === "recording"
              ? "bg-sky-500 animate-pulse"
              : "bg-zinc-700"
          }`} />
          <span className={isSolved ? "text-emerald-400" : phase === "love" ? "text-amber-400" : "text-zinc-400"}>
            {isSolved ? "STABILIZED" : phase === "love" ? "LOVE PHASES SYNC" : phase === "recording" ? "RECORDING" : "IDLE"}
          </span>
        </div>
      </div>

      {/* Main Grid: Spinner & EEG Waveform */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Vinyl Spinner (5 cols) */}
        <div className="lg:col-span-5 w-full flex flex-col justify-between">
          <VinylSpinner />
        </div>

        {/* Right Side: EEGWaveform & Phase Controls (7 cols) */}
        <div className="lg:col-span-7 w-full flex flex-col justify-between space-y-4">
          {/* Live Waveform Display */}
          <EEGWaveform isThinkingOfLove={phase === "love"} />

          {/* Telemetry Control Dashboard */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-lg p-5 text-left space-y-4 shadow-md flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2 font-bold uppercase tracking-widest">
                <span>// LOCAL SYSTEM CONTROLS</span>
                <Activity size={12} className={phase === "love" ? "text-red-500 animate-pulse" : "text-zinc-500"} />
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-400 mb-4">
                Calibrate systems and sweep the EEG telemetry. Ann Druyan's recorded brainwaves were captured on June 3, 1977, as she thought of the experience of falling in love.
              </p>
            </div>

            {/* Glowing Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={handleStartRecording}
                disabled={isSolved || phase === "recording" || phase === "love"}
                className={`py-2 px-3 border rounded text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                  phase === "recording"
                    ? "bg-sky-950/20 border-sky-500/50 text-sky-400 cursor-default"
                    : isSolved || phase === "love"
                    ? "bg-zinc-900 border-zinc-950 text-zinc-600 cursor-not-allowed"
                    : "bg-zinc-950 border-zinc-800 hover:border-sky-500/60 hover:text-sky-400 cursor-pointer"
                }`}
              >
                <Disc size={11} className={phase === "recording" ? "animate-spin" : ""} />
                1. Start Sweep
              </button>

              <button
                type="button"
                onClick={handleTriggerLove}
                disabled={isSolved || phase === "love" || phase === "idle"}
                className={`py-2 px-3 border rounded text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                  phase === "love"
                    ? "bg-amber-950/20 border-amber-500/50 text-amber-400 cursor-default"
                    : isSolved || phase === "idle"
                    ? "bg-zinc-900 border-zinc-950 text-zinc-600 cursor-not-allowed"
                    : "bg-zinc-950 border-zinc-800 hover:border-amber-500/60 hover:text-amber-400 cursor-pointer"
                }`}
              >
                <Heart size={11} fill={phase === "love" ? "currentColor" : "none"} className={phase === "love" ? "animate-pulse" : ""} />
                2. Love Telemetry
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={isSolved || phase === "idle"}
                className={`py-2 px-3 border rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                  phase === "idle" || isSolved
                    ? "bg-zinc-900 border-zinc-950 text-zinc-600 cursor-not-allowed"
                    : "bg-zinc-950 border-zinc-800 hover:border-red-500/60 hover:text-red-400 cursor-pointer"
                }`}
              >
                Reset Calibration
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Timeline of Milestones */}
      <VoyagerTimeline isThinkingOfLove={phase === "love"} isSolved={isSolved} />

      {/* Inject custom spin animation */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default GoldenRecord;
