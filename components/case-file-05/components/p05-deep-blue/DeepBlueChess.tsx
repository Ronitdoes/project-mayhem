"use client";

import React, { useState, useEffect, useCallback } from "react";
import ChessReplay from "./ChessReplay";
import { useCaseStore } from "../../CaseFileProvider";
import { Cpu, Activity, Thermometer, Terminal, HardDrive, User, RefreshCw, AlertTriangle } from "lucide-react";

export default function DeepBlueChess() {
  const solved = useCaseStore((state) => state.solved);
  const isSolved = solved.includes(5); // Puzzle 5 is Deep Blue

  // Current move tracking from the child ChessReplay
  const [currentMove, setCurrentMove] = useState<{ index: number; san: string }>({
    index: -1,
    san: "Start"
  });

  // Dynamic telemetry states
  const [cpuTemp, setCpuTemp] = useState(44);
  const [positionsPerSec, setPositionsPerSec] = useState(0);

  // Fluctuating telemetry simulation
  useEffect(() => {
    const timer = setInterval(() => {
      // Random walk for CPU temperature between 42 and 48
      setCpuTemp((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return Math.max(42, Math.min(48, next));
      });

      // Random speed fluctuations if game is active
      setPositionsPerSec(() => {
        if (currentMove.index === -1) return 0;
        // Deep Blue peak was 200,000,000 positions per second
        return Math.floor(190000000 + Math.random() * 20000000);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentMove.index]);

  const handleMoveChange = useCallback((index: number, san: string) => {
    setCurrentMove({ index, san });
  }, []);

  // Determine stress levels and alert states based on moves
  const isBlunderActive = currentMove.index === 13;
  const isPostBlunder = currentMove.index >= 13;

  const humanStressLevel = isBlunderActive 
    ? 98 
    : isPostBlunder 
    ? 90 
    : currentMove.index === -1 
    ? 15 
    : Math.floor(20 + (currentMove.index * 4.5));

  const cpuStatus = isBlunderActive
    ? "ANALYZING BLUNDER (MATCH WIN IN 12 MOVES)"
    : currentMove.index === -1
    ? "STANDBY"
    : currentMove.index >= 37 // Resignation
    ? "VICTORY DETECTED"
    : "SEARCHING POSITIONS";

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 select-text text-zinc-100 font-mono">
      {/* HUD Header Banner */}
      <div className={`w-full border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden transition-all duration-300 ${
        isSolved 
          ? "bg-emerald-950/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
          : isBlunderActive
          ? "bg-red-950/20 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.05)]"
          : "bg-zinc-950/30 border-zinc-900"
      }`}>
        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_95%,rgba(16,185,129,0.01)_95%),linear-gradient(to_right,transparent_95%,rgba(16,185,129,0.01)_95%)] bg-[size:16px_16px] pointer-events-none opacity-20" />
        
        <div className="space-y-1 relative z-10 text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
            <Cpu size={14} className={currentMove.index !== -1 && !isSolved ? "animate-pulse text-sky-400" : "text-zinc-500"} />
            CHRONOMETRIC HARDWARE INTERFACE
          </div>
          <h3 className={`text-lg font-bold uppercase tracking-wider ${
            isSolved ? "text-emerald-400" : isBlunderActive ? "text-red-400" : "text-zinc-200"
          }`}>
            {isSolved 
              ? "ANOMALY RESOLVED // Deep Blue Game 6 Synchronized" 
              : isBlunderActive
              ? "CRITICAL TACTICAL DEVIATION IDENTIFIED"
              : "TIMELINE LOG REPLAY: GAME 6 (1997)"}
          </h3>
          <p className="text-[11px] leading-relaxed text-zinc-400 max-w-2xl">
            {isSolved
              ? "The anomaly has been corrected. Human champion Garry Kasparov resigned after a fatal blunder on move 7, resulting in a computer victory that marked a historic shift in human-machine history."
              : "Analyse the match playback data for Game 6. Identify the world champion chess master who resigned under intense psychological pressure from the machine."}
          </p>
        </div>

        {/* Status Badge */}
        <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-zinc-900 rounded font-bold text-[10px] tracking-wider uppercase select-none z-10">
          <span className={`w-2 h-2 rounded-full ${
            isSolved 
              ? "bg-emerald-500 animate-pulse" 
              : isBlunderActive
              ? "bg-red-500 animate-ping"
              : "bg-sky-500 animate-pulse"
          }`} />
          <span className={isSolved ? "text-emerald-400" : isBlunderActive ? "text-red-400" : "text-sky-400"}>
            {isSolved ? "STABILIZED" : isBlunderActive ? "BLUNDER DETECTED" : "REPLAYING"}
          </span>
        </div>
      </div>

      {/* Main Dual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chess Replayer (7 cols) */}
        <div className="lg:col-span-7 w-full flex flex-col gap-4">
          <ChessReplay onMoveChange={handleMoveChange} />
        </div>

        {/* Right Column: Telemetry & Dossier Panel (5 cols) */}
        <div className="lg:col-span-5 w-full flex flex-col gap-4">
          
          {/* Supercomputer Diagnostics */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-lg p-5 space-y-4 text-left">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
              <HardDrive size={16} className="text-sky-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                IBM RS/6000 SP Telemetry
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/40 border border-zinc-900/60 rounded p-3">
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold flex items-center gap-1">
                  <Cpu size={10} /> Processor
                </div>
                <div className="text-sm font-bold text-zinc-200 mt-1">
                  30 Nodes / 120 coproc.
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-900/60 rounded p-3">
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold flex items-center gap-1">
                  <Thermometer size={10} /> Core Temp
                </div>
                <div className="text-sm font-bold text-zinc-200 mt-1 flex items-center gap-1.5">
                  <span className={cpuTemp > 46 ? "text-amber-400" : "text-zinc-200"}>
                    {cpuTemp}°C
                  </span>
                  <span className="text-[10px] text-zinc-500 font-normal">OPERATIONAL</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-900/60 rounded p-3 space-y-1">
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold flex items-center gap-1">
                <Activity size={10} /> Evaluation Rate
              </div>
              <div className="text-md font-bold text-sky-400 font-mono">
                {positionsPerSec.toLocaleString()} <span className="text-[10px] text-zinc-500 font-normal">nodes/sec</span>
              </div>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-900/60 rounded p-3">
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                CPU Status Register
              </div>
              <div className={`text-xs font-bold mt-1 font-mono uppercase tracking-wide ${
                isBlunderActive ? "text-red-400 animate-pulse" : "text-zinc-300"
              }`}>
                {cpuStatus}
              </div>
            </div>
          </div>

          {/* Human Challenger Diagnostics */}
          <div className={`bg-zinc-950/40 border rounded-lg p-5 space-y-4 text-left transition-all duration-300 ${
            isBlunderActive ? "border-red-950/80 shadow-[0_0_15px_rgba(239,68,68,0.03)]" : "border-zinc-900"
          }`}>
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
              <User size={16} className={isBlunderActive ? "text-red-400 animate-pulse" : "text-amber-500"} />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Challenger Biometrics
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Subject Name:</span>
                <span className="font-bold text-zinc-200">GARRY KASPAROV</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Rank:</span>
                <span className="text-amber-500 font-bold">WORLD CHAMPION (1985-2000)</span>
              </div>

              {/* Stress Level Meter */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-zinc-500 uppercase tracking-wider">Psychological Stress</span>
                  <span className={isPostBlunder ? "text-red-400 font-bold" : "text-zinc-400"}>
                    {humanStressLevel}% {isBlunderActive && "CRITICAL"}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded overflow-hidden">
                  <div 
                    style={{ width: `${humanStressLevel}%` }}
                    className={`h-full transition-all duration-500 ${
                      isBlunderActive
                        ? "bg-red-500 animate-pulse"
                        : isPostBlunder
                        ? "bg-red-600"
                        : "bg-amber-500"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chronos Chronology Report / Lore logs */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-lg p-5 text-left">
            <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 mb-3">
              <Terminal size={16} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Chronology Analysis Log
              </span>
            </div>

            <div className="text-[10px] text-zinc-400 font-mono leading-relaxed space-y-2">
              <p>
                <span className="text-zinc-600">[12:14:02]</span> Loading game data... ECO B17 Caro-Kann.
              </p>
              {currentMove.index >= 0 && (
                <p>
                  <span className="text-zinc-600">[12:14:03]</span> Opening theory verified. Kasparov plays Steinitz variation.
                </p>
              )}
              {currentMove.index >= 11 && (
                <p>
                  <span className="text-zinc-600">[12:14:05]</span> Deviation detected on move 6...e6. Preparing counter tactical path.
                </p>
              )}
              {isPostBlunder && (
                <p className="text-red-400/90 font-bold">
                  <span className="text-zinc-600">[12:14:08]</span> WARNING: Black plays 7...h6. Absolute blunder. White knight sacrifice Nxe6 is unavoidable.
                </p>
              )}
              {currentMove.index >= 37 && (
                <p className="text-emerald-400/90 font-bold">
                  <span className="text-zinc-600">[12:14:10]</span> SYSTEM: Kasparov resigns on Move 19. Deep Blue stabilizes.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
