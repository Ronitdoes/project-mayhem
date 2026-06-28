"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, Activity, ShieldAlert } from "lucide-react";

export function PlutoniumSphere() {
  const [domePos, setDomePos] = useState(20); // 0 (open) to 100 (fully closed / critical)
  const [isCritical, setIsCritical] = useState(false);
  const [flash, setFlash] = useState(false);

  // Trigger flash and criticality status when dome is fully closed (100)
  useEffect(() => {
    if (domePos >= 100) {
      setIsCritical(true);
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsCritical(false);
    }
  }, [domePos]);

  // Calculate exponential radiation CPM based on dome position
  const getCpm = () => {
    if (domePos >= 100) return 999999;
    // Starts at ~120, grows exponentially to ~85,000 before critical spike
    return Math.floor(120 + Math.pow(domePos / 10, 4.5) * 5);
  };

  const cpm = getCpm();

  // Glow shadow scaling based on proximity
  const shadowSpread = isCritical 
    ? "0 0 80px #00ff00, 0 0 160px #00ff00aa" 
    : `0 0 ${20 + (domePos / 1.5)}px rgba(0, 255, 0, ${0.1 + (domePos / 150)}), 0 0 ${40 + domePos}px rgba(0, 255, 0, ${0.05 + (domePos / 300)})`;

  return (
    <div className={`w-full bg-[#0d0d11] border rounded-lg p-5 sm:p-6 shadow-2xl relative overflow-hidden transition-all duration-300 ${
      isCritical ? "border-red-900/60 shadow-[0_0_25px_rgba(239,68,68,0.05)]" : "border-zinc-800/80"
    }`}>
      {/* Criticality Radiation Flash Layer */}
      {flash && (
        <div className="absolute inset-0 bg-emerald-500/80 mix-blend-screen pointer-events-none z-30 animate-[flashOut_0.5s_ease-out_forwards]" />
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Beryllium Chamber Display (7 Cols) */}
        <div className="md:col-span-7 flex flex-col items-center justify-center bg-black/40 border border-zinc-950 rounded-lg p-6 relative min-h-[300px]">
          <div className="absolute top-3 left-3 text-[9px] text-zinc-500 font-bold uppercase tracking-widest font-mono">
            // CHAMBER VIEWPORTS
          </div>

          {/* Graphical Core Container */}
          <div className="w-64 h-64 flex items-center justify-center relative select-none">
            {/* The Plutonium Sphere (Behind Beryllium dome halves) */}
            <div 
              className="w-24 h-24 rounded-full transition-all duration-300 relative z-10"
              style={{
                background: "radial-gradient(circle at 35% 35%, #a8ffa8, #006600, #001800)",
                boxShadow: shadowSpread,
                transform: `scale(${1 + (domePos / 500)})`,
                animation: isCritical ? "pulse-rapid 0.4s ease-in-out infinite" : "pulse-slow 2.5s ease-in-out infinite"
              }}
            />

            {/* Upper Beryllium Hemisphere */}
            <div 
              className="absolute w-36 h-[72px] bg-gradient-to-t from-zinc-700 via-zinc-800 to-zinc-900 border-t border-x border-zinc-600 rounded-t-full shadow-md z-20 transition-transform duration-100"
              style={{
                transform: `translateY(${-40 + (domePos * 0.4)}px)`,
                opacity: 0.85
              }}
            >
              {/* Beryllium texture shine */}
              <div className="w-full h-1/3 bg-white/5 rounded-t-full" />
            </div>

            {/* Lower Beryllium Hemisphere */}
            <div 
              className="absolute w-36 h-[72px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border-b border-x border-zinc-600 rounded-b-full shadow-md z-20"
              style={{
                transform: "translateY(36px)",
                opacity: 0.85
              }}
            />

            {/* Criticality screech grid visual indicator */}
            {isCritical && (
              <div className="absolute inset-0 border-2 border-red-500/20 rounded-full scale-110 animate-ping pointer-events-none" />
            )}
          </div>

          {/* Interactive Screwdriver Spacer Controller */}
          <div className="w-full max-w-sm mt-4 space-y-2 select-none">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-zinc-500 uppercase tracking-widest font-bold">SCREWDRIVER SHIM GAP</span>
              <span className={`font-bold ${isCritical ? "text-red-400" : "text-emerald-400"}`}>
                {isCritical ? "0.0 mm (CRITICAL)" : `${((100 - domePos) / 10).toFixed(1)} mm`}
              </span>
            </div>
            
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={domePos} 
              onChange={(e) => setDomePos(Number(e.target.value))}
              aria-label="Screwdriver Shim Gap Slider"
              className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 border border-zinc-800/80 focus:outline-none focus:ring-1 focus:ring-emerald-500" 
            />
            <div className="flex justify-between text-[8px] text-zinc-600 font-mono">
              <span>WIDE OPEN (SAFE)</span>
              <span>SLIDING DOME DOWN</span>
              <span>CONTACT (CRITICAL)</span>
            </div>
          </div>
        </div>

        {/* Telemetry Control Panel (5 Cols) */}
        <div className="md:col-span-5 w-full space-y-4 text-left font-mono">
          <div className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-lg space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                // DIAGNOSTIC LOG
              </span>
              <Activity size={12} className={isCritical ? "text-red-500 animate-pulse" : "text-zinc-500"} />
            </div>

            {/* Radiation CPM Display */}
            <div className="space-y-1">
              <div className="text-[9px] text-zinc-500 font-bold">GEIGER RADIATION DETECTOR</div>
              <div className={`text-2xl font-bold tracking-wider leading-none transition-colors duration-200 ${
                isCritical ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]" : "text-emerald-400"
              }`}>
                {cpm.toLocaleString()} <span className="text-xs">CPM</span>
              </div>
            </div>

            {/* Progress/Danger status bar */}
            <div className="w-full bg-zinc-900 h-2 rounded border border-zinc-800 overflow-hidden relative">
              <div 
                className={`h-full transition-all duration-100 ${
                  isCritical 
                    ? "bg-red-500 animate-pulse" 
                    : domePos > 70 
                    ? "bg-amber-500" 
                    : "bg-emerald-500"
                }`}
                style={{ width: `${domePos}%` }}
              />
            </div>

            {/* Safety status alert card */}
            <div className={`p-3 rounded border text-[10px] leading-relaxed transition-all duration-300 ${
              isCritical
                ? "bg-red-950/40 border-red-900 text-red-300"
                : domePos > 70
                ? "bg-amber-950/20 border-amber-900/50 text-amber-300"
                : "bg-emerald-950/10 border-emerald-900/20 text-emerald-400"
            }`}>
              {isCritical ? (
                <div className="flex items-start gap-2">
                  <ShieldAlert size={14} className="shrink-0 text-red-500" />
                  <div>
                    <span className="font-bold block uppercase tracking-wider text-red-400">CRITICALITY EXCURSION DETECTED</span>
                    Hemisphere dropped. Plutonium-239 core has crossed prompt critical. Beryllium shell is reflecting neutrons. Evacuate chamber!
                  </div>
                </div>
              ) : domePos > 70 ? (
                <div className="flex items-start gap-2">
                  <AlertTriangle size={14} className="shrink-0 text-amber-500 animate-pulse" />
                  <div>
                    <span className="font-bold block uppercase tracking-wider text-amber-400">WARNING: HIGH SUB-CRITICALITY</span>
                    Screwdriver blade slipping. Beryllium shell reflection coefficient exceeds safe margins. Neutron multiplication factor &gt; 0.95.
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                  <div>
                    <span className="font-bold block uppercase tracking-wider text-emerald-400">SUB-CRITICAL CORE STATUS</span>
                    Plutonium core is stable. Low background thermal neutron radiation levels detected.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* CSS keyframes for pulse & flash effects */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.02); filter: brightness(1.15); }
        }
        @keyframes pulse-rapid {
          0%, 100% { transform: scale(1.02); filter: brightness(1.2); }
          50% { transform: scale(1.06); filter: brightness(1.4); }
        }
        @keyframes flashOut {
          0% { opacity: 1; filter: brightness(2); }
          100% { opacity: 0; filter: brightness(1); }
        }
      `}</style>
    </div>
  );
}

export default PlutoniumSphere;
