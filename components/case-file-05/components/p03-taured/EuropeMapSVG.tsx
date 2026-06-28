"use client";

import React from "react";

export function EuropeMapSVG() {
  return (
    <div className="w-full bg-zinc-950/60 border border-zinc-900 rounded-lg p-4 relative overflow-hidden select-none flex flex-col justify-between min-h-[300px]">
      <div className="absolute top-3 left-3 text-[9px] text-zinc-500 font-bold uppercase tracking-widest font-mono">
        // GEOGRAPHIC POSITIONING TELEMETRY
      </div>
      
      {/* SVG Map Container */}
      <div className="relative flex items-center justify-center w-full h-64 mt-4">
        {/* Radar Scanner Sweep Overlay */}
        <div className="absolute inset-0 bg-radial-sweep pointer-events-none opacity-5" />
        
        <svg
          viewBox="0 0 500 400"
          className="w-full h-full text-zinc-800 fill-current stroke-zinc-900 stroke-1"
        >
          {/* Map Grid Gridlines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(244, 63, 94, 0.03)" strokeWidth="1" />
            </pattern>
            
            {/* Pulsing Glow Gradient */}
            <radialGradient id="pulsingGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(239, 68, 68, 0.6)" />
              <stop offset="50%" stopColor="rgba(239, 68, 68, 0.2)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
            </radialGradient>
          </defs>

          {/* Background Grid Gridlines */}
          <rect width="100%" height="100%" fill="url(#grid)" stroke="none" />

          {/* Simplified Country Shapes for Western Europe */}
          
          {/* United Kingdom & Ireland */}
          <path 
            d="M 120 70 L 130 65 L 140 70 L 150 90 L 165 95 L 160 110 L 150 115 L 140 100 L 130 115 L 115 110 L 125 90 Z" 
            className="fill-zinc-900/60 stroke-zinc-800/80 hover:fill-zinc-850 transition-colors duration-200"
          />
          <path 
            d="M 90 90 L 105 85 L 110 95 L 100 115 L 85 110 Z" 
            className="fill-zinc-900/60 stroke-zinc-850/80"
          />
          
          {/* France */}
          <path 
            d="M 175 140 L 220 135 L 250 150 L 275 175 L 260 215 L 235 235 L 225 240 L 205 240 L 175 220 L 160 200 L 165 175 Z" 
            className="fill-zinc-900/90 stroke-zinc-800 hover:fill-zinc-850 transition-colors duration-200"
          />
          
          {/* Spain & Portugal */}
          <path 
            d="M 125 245 L 205 240 L 225 240 L 235 235 L 230 260 L 200 310 L 180 320 L 140 315 L 125 285 Z" 
            className="fill-zinc-900/90 stroke-zinc-800 hover:fill-zinc-850 transition-colors duration-200"
          />
          
          {/* Italy (partial) */}
          <path 
            d="M 275 210 L 290 220 L 315 250 L 335 295 L 350 310 L 335 320 L 310 280 L 285 245 Z" 
            className="fill-zinc-900/50 stroke-zinc-800/50"
          />
          
          {/* Central Europe / Germany (partial) */}
          <path 
            d="M 250 150 L 280 135 L 310 145 L 320 180 L 275 210 L 260 215 Z" 
            className="fill-zinc-900/50 stroke-zinc-800/50"
          />
          
          {/* Pulsing Beacon Circle (Target: Border of France and Spain, i.e., Andorra) */}
          {/* Andorra region is approximately at X: 220, Y: 240 */}
          <g transform="translate(220, 240)">
            {/* Broad Pulsing Glow Outer Ring */}
            <circle r="24" fill="url(#pulsingGlow)" className="animate-ping" style={{ animationDuration: '3s' }} />
            
            {/* Dynamic Radar Ring */}
            <circle r="12" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" style={{ animationDuration: '1.5s' }} />
            
            {/* Pin Target Dot */}
            <circle r="4" fill="#ef4444" className="shadow-lg" />
            <circle r="1" fill="#fff" />
          </g>

          {/* Coordinate Crosshairs */}
          <line x1="220" y1="160" x2="220" y2="320" stroke="rgba(239, 68, 68, 0.25)" strokeDasharray="3 3" />
          <line x1="140" y1="240" x2="300" y2="240" stroke="rgba(239, 68, 68, 0.25)" strokeDasharray="3 3" />
        </svg>

        {/* Floating Label */}
        <div className="absolute top-2/3 left-1/2 transform -translate-x-[40%] translate-y-3 bg-black/80 border border-red-500/50 px-2 py-1 rounded shadow-[0_0_10px_rgba(239,68,68,0.2)] font-mono text-[9px] text-red-400 select-none">
          <span className="font-bold text-white mr-1">TARGET COORD:</span> 42.50° N, 1.52° E
        </div>
      </div>

      {/* Info footer */}
      <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono mt-2 pt-2 border-t border-zinc-900/60">
        <span>SECTOR: 03-W-EUROPE</span>
        <span>STATUS: ANOMALOUS SIGNAL</span>
      </div>

      <style jsx global>{`
        @keyframes sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .bg-radial-sweep {
          background: conic-gradient(from 0deg at 50% 50%, rgba(239, 68, 68, 0.15) 0deg, transparent 90deg);
          animation: sweep 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default EuropeMapSVG;
