"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ShieldAlert } from "lucide-react";

interface DisappearingManProps {
  isSolved: boolean;
}

export function DisappearingMan({ isSolved }: DisappearingManProps) {
  // traveler present status: true = present, false = vanished
  const [isPresent, setIsPresent] = useState(!isSolved);

  // Sync state if already solved
  useEffect(() => {
    if (isSolved) {
      setIsPresent(false);
    }
  }, [isSolved]);

  const handleMonitorFeed = () => {
    if (!isSolved) {
      setIsPresent(false);
    }
  };

  const handleResetFeed = () => {
    if (!isSolved) {
      setIsPresent(true);
    }
  };

  return (
    <div className="w-full bg-zinc-950/60 border border-zinc-900 rounded-lg p-5 relative overflow-hidden select-none flex flex-col justify-between min-h-[300px]">
      {/* CCTV Metadata Header */}
      <div className="flex justify-between items-center text-[9px] text-zinc-500 font-mono border-b border-zinc-900/60 pb-2">
        <span className="flex items-center gap-1">
          <Eye size={10} className={isPresent ? "text-red-500 animate-pulse" : "text-zinc-600"} />
          SURVEILLANCE: CHAMBER 402
        </span>
        <span className="text-zinc-600">FEED_ID: 1954-TAU</span>
      </div>

      {/* Main Screen containing Window & Silhouette */}
      <div className="relative flex-1 flex items-center justify-center p-4 my-2 border border-zinc-900/60 rounded bg-black/60 overflow-hidden min-h-[160px]">
        {/* Retro CCTV Scanlines Overlay */}
        <div className="absolute inset-0 bg-cctv-scanlines pointer-events-none opacity-20" />
        {/* VHS Glitch effects */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none opacity-40 animate-vhs-grain" />

        {/* Outer Window outline */}
        <div className="w-24 h-36 border-2 border-zinc-700 bg-zinc-950 relative flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.02)]">
          {/* Window Panes cross */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-zinc-800" />
            <div className="h-full w-[1px] bg-zinc-800" />
          </div>

          {/* Glowing Room Backlight */}
          <div className={`absolute inset-0 bg-yellow-500/5 transition-all duration-[2000ms] ${isPresent ? "opacity-100" : "opacity-0"}`} />

          {/* Silhouette Figure - Fades out */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isPresent ? 1 : 0 }}
            transition={{ duration: 2.0, ease: "easeInOut" }}
            className="w-16 h-28 relative z-10 flex items-end justify-center"
          >
            {/* Vector Silhouette shape */}
            <svg
              viewBox="0 0 100 150"
              className="w-full h-full text-zinc-950 fill-current drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] filter brightness-[0.05]"
            >
              <path d="M50,15 C40,15 32,23 32,35 C32,47 40,55 50,55 C60,55 68,47 68,35 C68,23 60,15 50,15 Z M50,58 C32,58 18,75 18,95 L18,145 C18,148 20,150 23,150 L77,150 C80,150 82,148 82,145 L82,95 C82,75 68,58 50,58 Z" />
            </svg>
          </motion.div>

          {/* CCTV Overlay Text */}
          <div className="absolute top-1 left-1.5 text-[7px] text-zinc-500 font-bold uppercase tracking-wider">
            CAM_402_DOOR
          </div>
        </div>

        {/* Diagnostic Status Box */}
        <div className="absolute bottom-2 right-2 p-1.5 bg-black/90 border border-zinc-900 rounded font-mono text-[7px] text-left space-y-0.5">
          <div className="flex items-center gap-1">
            <span className="text-zinc-600 font-bold">DETECTOR:</span>
            <span className={`font-black ${isPresent ? "text-red-500" : "text-emerald-500"}`}>
              {isPresent ? "ACTIVE" : "STABLE"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zinc-600 font-bold">THERMAL:</span>
            <span className="text-zinc-400">{isPresent ? "36.8°C" : "18.2°C"}</span>
          </div>
        </div>
      </div>

      {/* Controls & Telemetry Dashboard */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
          <div className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isPresent ? "bg-red-500 animate-pulse" : "bg-zinc-600"}`} />
            <span>PRESENCE: <span className={isPresent ? "text-red-400 font-bold" : "text-zinc-500"}>{isPresent ? "DETECTED" : "ABSENT"}</span></span>
          </div>
          <span className="text-[9px] text-zinc-500">
            {isPresent ? "ROOM OCCUPIED" : "VACANT // ANOMALOUS DEPARTURE"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleMonitorFeed}
            disabled={isSolved || !isPresent}
            className={`py-1.5 px-3 border rounded text-[9px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 font-mono ${
              !isPresent
                ? "bg-zinc-900 border-zinc-950 text-zinc-600 cursor-default"
                : "bg-zinc-950 border-zinc-800 hover:border-red-500/60 hover:text-red-400 cursor-pointer"
            }`}
          >
            <EyeOff size={10} />
            Monitor Feed
          </button>

          <button
            type="button"
            onClick={handleResetFeed}
            disabled={isSolved || isPresent}
            className={`py-1.5 px-3 border rounded text-[9px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 font-mono ${
              isPresent || isSolved
                ? "bg-zinc-900 border-zinc-950 text-zinc-600 cursor-default"
                : "bg-zinc-950 border-zinc-800 hover:border-zinc-500/60 hover:text-zinc-300 cursor-pointer"
            }`}
          >
            <ShieldAlert size={10} />
            Reset Camera
          </button>
        </div>
      </div>

      <style jsx>{`
        .bg-cctv-scanlines {
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.4) 50%
          ),
          linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.03),
            rgba(0, 255, 0, 0.01),
            rgba(0, 0, 255, 0.03)
          );
          background-size: 100% 4px, 6px 100%;
        }
      `}</style>
    </div>
  );
}

export default DisappearingMan;
