"use client";

import React, { useMemo } from "react";

interface EEGWaveformProps {
  isThinkingOfLove: boolean;
}

export function EEGWaveform({ isThinkingOfLove }: EEGWaveformProps) {
  const width = 600;
  const height = 150;
  const centerY = height / 2;

  // Programmatically generate a detailed SVG path for the wave
  const pathData = useMemo(() => {
    const points: string[] = [];
    const steps = 150; // number of points to plot along the width
    const stepSize = width / steps;

    for (let i = 0; i <= steps; i++) {
      const x = i * stepSize;
      
      let y = centerY;
      
      if (!isThinkingOfLove) {
        // Calm standard EEG brainwaves: low frequency waves with minor random noise
        const wave1 = Math.sin(x * 0.04) * 12;
        const wave2 = Math.cos(x * 0.09) * 4;
        const wave3 = Math.sin(x * 0.015) * 6;
        const noise = Math.sin(x * 0.4) * 1.5; // low micro-variance
        y = centerY + wave1 + wave2 + wave3 + noise;
      } else {
        // "Thinking of Love": high emotional arousal and spike clusters in the center
        // Envelope curve that spikes in the center (from x = 120 to x = 480)
        let spikeEnvelope = 0;
        if (x > 100 && x < 500) {
          // Normalize to [0, 1] then sine envelope for smooth tapering
          const normalized = (x - 100) / 400;
          spikeEnvelope = Math.sin(normalized * Math.PI);
        }

        const baseWave = Math.sin(x * 0.035) * 8 + Math.cos(x * 0.01) * 4;
        
        // High frequency, high amplitude spikes clustered in the middle
        const intenseSpikes = (Math.sin(x * 0.18) * 22 + Math.cos(x * 0.45) * 16 + Math.sin(x * 0.8) * 8) * spikeEnvelope;
        
        // Add extra micro-jitter
        const loveJitter = Math.sin(x * 1.2) * 3 * spikeEnvelope;

        y = centerY + baseWave + intenseSpikes + loveJitter;
      }

      if (i === 0) {
        points.push(`M ${x.toFixed(1)} ${y.toFixed(1)}`);
      } else {
        points.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`);
      }
    }
    return points.join(" ");
  }, [isThinkingOfLove, centerY]);

  return (
    <div className="w-full bg-[#070b09] border border-emerald-950/60 rounded-lg p-4 font-mono select-none relative overflow-hidden">
      <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2 border-b border-emerald-950/40 pb-1.5">
        <span className="text-emerald-500/80 font-bold uppercase tracking-wider">
          EEG OSCILLOSCOPE MONITOR
        </span>
        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
          isThinkingOfLove 
            ? "bg-red-950/40 border border-red-900/60 text-red-400 animate-pulse" 
            : "bg-emerald-950/30 border border-emerald-900/20 text-emerald-400"
        }`}>
          {isThinkingOfLove ? "TELEMETRY: EMOTIONAL SPIKE (LOVE)" : "STATUS: ALPHA STATE SWEEP"}
        </span>
      </div>

      {/* Oscilloscope screen */}
      <div className="relative w-full overflow-hidden bg-black/80 rounded border border-emerald-950/80 aspect-[4/1] flex items-center justify-center">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,185,129,0.01)_5px,transparent_5px),linear-gradient(to_right,rgba(16,185,129,0.01)_5px,transparent_5px)] bg-[size:100px_100px] pointer-events-none border border-emerald-950/20" />

        {/* Waveform SVG */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full relative z-10"
          preserveAspectRatio="none"
        >
          {/* Center alignment line */}
          <line 
            x1="0" 
            y1={centerY} 
            x2={width} 
            y2={centerY} 
            stroke="rgba(16,185,129,0.08)" 
            strokeWidth="1" 
            strokeDasharray="4,8"
          />

          {/* Wave path */}
          <path
            key={isThinkingOfLove ? "love-wave" : "calm-wave"} // Forces remount to trigger dashoffset redraw sweep
            d={pathData}
            fill="none"
            stroke={isThinkingOfLove ? "#ef4444" : "#10b981"}
            strokeWidth={isThinkingOfLove ? "2" : "1.5"}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 1200,
              strokeDashoffset: 1200,
              animation: "eeg-draw 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
              filter: isThinkingOfLove 
                ? "drop-shadow(0 0 6px rgba(239, 68, 68, 0.5))" 
                : "drop-shadow(0 0 4px rgba(16, 185, 129, 0.4))",
            }}
          />
        </svg>

        {/* CRT Scanline and vignette cover effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none z-20" />
      </div>

      <div className="flex justify-between items-center text-[8px] text-zinc-600 mt-2 font-mono">
        <span>SWEEP: 250mm/s</span>
        <span>GAIN: x1.0 EEG</span>
        <span>COGNITIVE FILTER: ACTIVE</span>
      </div>

      {/* Draw path CSS animation */}
      <style jsx global>{`
        @keyframes eeg-draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default EEGWaveform;
