"use client";

import React from "react";

export function VinylSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-zinc-950/60 border border-zinc-900 rounded-lg shadow-inner relative overflow-hidden select-none min-h-[300px]">
      <div className="absolute top-3 left-3 text-[9px] text-zinc-500 font-bold uppercase tracking-widest font-mono">
        // INTERSTELLAR DISK TELEMETRY
      </div>

      {/* Turntable Outer Ring & Platter */}
      <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center relative shadow-[0_0_30px_rgba(218,165,32,0.1)]">
        {/* Specular metallic highlight background */}
        <div className="absolute inset-1 rounded-full bg-radial-gradient from-zinc-800 via-zinc-950 to-black pointer-events-none" />

        {/* The Golden Record itself - spins! */}
        <svg
          viewBox="0 0 400 400"
          className="w-56 h-56 sm:w-64 sm:h-64 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] spin-element"
        >
          <defs>
            {/* Realistic gold metallic radial gradient */}
            <radialGradient id="goldDisc" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
              <stop offset="0%" stopColor="#fff2af" />
              <stop offset="25%" stopColor="#daa520" />
              <stop offset="50%" stopColor="#b8860b" />
              <stop offset="75%" stopColor="#ffd700" />
              <stop offset="90%" stopColor="#b8860b" />
              <stop offset="100%" stopColor="#8b6508" />
            </radialGradient>
            
            {/* Center label dark gold gradient */}
            <linearGradient id="centerLabel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d2a04" />
              <stop offset="50%" stopColor="#1a1101" />
              <stop offset="100%" stopColor="#3d2a04" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Group that undergoes infinite rotation */}
          <g className="animate-spin-vinylOrigin">
            {/* Outer golden disc boundary */}
            <circle cx="200" cy="200" r="190" fill="url(#goldDisc)" stroke="#8b6508" strokeWidth="2" />
            
            {/* Concentric groove paths simulating vinyl sound track rings */}
            <circle cx="200" cy="200" r="175" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="165" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
            <circle cx="200" cy="200" r="155" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="145" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.75" />
            <circle cx="200" cy="200" r="135" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="125" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.75" />
            <circle cx="200" cy="200" r="115" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="105" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />

            {/* Inner Gold Section border */}
            <circle cx="200" cy="200" r="95" fill="none" stroke="#8b6508" strokeWidth="1.5" />

            {/* ETCHINGS: Pulsar Map, Hydrogen Transition, Stylus Instructions */}
            {/* 1. Hydrogen Atom Spin-Flip Transition (Bottom-Right) */}
            <g transform="translate(250, 240) scale(0.65)" stroke="#664c00" strokeWidth="2" fill="none">
              <circle cx="20" cy="20" r="10" />
              <circle cx="60" cy="20" r="10" />
              <line x1="30" y1="20" x2="50" y2="20" />
              {/* Spin markers */}
              <line x1="20" y1="5" x2="20" y2="10" />
              <polygon points="20,5 17,9 23,9" fill="#664c00" />
              <line x1="60" y1="35" x2="60" y2="30" />
              <polygon points="60,35 57,31 63,31" fill="#664c00" />
            </g>

            {/* 2. Pulsar Map: Origin point with 14 lines radiating outward (Left) */}
            <g transform="translate(140, 190) scale(0.65)" stroke="#664c00" strokeWidth="1.5" opacity="0.8">
              {/* Radiating pulsar lines */}
              <line x1="0" y1="0" x2="-80" y2="-40" />
              <line x1="0" y1="0" x2="-95" y2="10" />
              <line x1="0" y1="0" x2="-70" y2="60" />
              <line x1="0" y1="0" x2="-40" y2="-75" />
              <line x1="0" y1="0" x2="-20" y2="90" />
              <line x1="0" y1="0" x2="30" y2="-90" />
              <line x1="0" y1="0" x2="60" y2="-60" />
              <line x1="0" y1="0" x2="80" y2="40" />
              <line x1="0" y1="0" x2="40" y2="95" />
              <line x1="0" y1="0" x2="-10" y2="-100" />
              {/* Binary marks along one of the lines */}
              <line x1="-30" y1="-15" x2="-25" y2="-25" />
              <line x1="-50" y1="-25" x2="-45" y2="-35" />
              <circle cx="0" cy="0" r="3" fill="#664c00" />
            </g>

            {/* 3. Stylus play diagram (Top Right) */}
            <g transform="translate(240, 110) scale(0.7)" stroke="#664c00" strokeWidth="1.5" fill="none">
              <circle cx="30" cy="30" r="25" />
              <circle cx="30" cy="30" r="4" fill="#664c00" />
              {/* Stylus line */}
              <path d="M 5,30 A 25,25 0 0,1 55,30" strokeDasharray="3,3" />
              <line x1="30" y1="5" x2="30" y2="-15" />
              <circle cx="30" cy="-15" r="3" />
            </g>

            {/* Dark gold center label sticker */}
            <circle cx="200" cy="200" r="50" fill="url(#centerLabel)" stroke="#b8860b" strokeWidth="2" />
            <circle cx="200" cy="200" r="42" fill="none" stroke="#daa520" strokeWidth="0.5" strokeDasharray="2,3" />

            {/* NASA/Voyager Text in center */}
            <text
              x="200"
              y="180"
              fill="#ffd700"
              fontSize="7"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
              letterSpacing="0.1em"
              opacity="0.8"
            >
              VOYAGER I
            </text>
            <text
              x="200"
              y="225"
              fill="#ffd700"
              fontSize="6"
              fontFamily="monospace"
              textAnchor="middle"
              letterSpacing="0.05em"
              opacity="0.6"
            >
              JULY 1977
            </text>

            {/* Spindle hole rim & opening */}
            <circle cx="200" cy="200" r="14" fill="#0c0c0e" stroke="#ffd700" strokeWidth="1.5" />
          </g>
        </svg>

        {/* Dynamic Specular Reflection Overlay (Non-spinning highlights) */}
        <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0 mix-blend-overlay" />
        <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-bl from-white/0 via-white/5 to-white/0 mix-blend-overlay" />

        {/* Sleek metallic spindle pin in center */}
        <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-zinc-400 via-zinc-600 to-zinc-900 border border-zinc-500 shadow-md flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
        </div>

        {/* Stylus needle arm unit floating over the record */}
        <div className="absolute -top-4 -right-4 w-28 h-40 pointer-events-none z-20 flex flex-col items-center">
          <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-[4px_6px_8px_rgba(0,0,0,0.6)]">
            {/* Pivot Joint base */}
            <circle cx="80" cy="20" r="15" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5" />
            <circle cx="80" cy="20" r="6" fill="#09090b" />
            
            {/* Arm shaft metal rod */}
            <path d="M 80,20 Q 75,60 55,90 L 40,115" fill="none" stroke="#d4d4d8" strokeWidth="3" strokeLinecap="round" />
            <path d="M 80,20 Q 75,60 55,90 L 40,115" fill="none" stroke="#a1a1aa" strokeWidth="1" strokeLinecap="round" />
            
            {/* Stylus head cartridge */}
            <g transform="translate(30,110) rotate(-25)">
              <rect x="0" y="0" width="16" height="24" rx="2" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
              <rect x="4" y="22" width="8" height="4" fill="#ef4444" /> {/* Red brand marker on cartridge */}
              {/* Cyan LED glowing needle indicator */}
              <circle cx="8" cy="18" r="1.5" fill="#06b6d4" className="animate-pulse" />
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-1">
        <span className="text-[10px] text-zinc-500 font-mono tracking-widest select-none uppercase">
          STABILIZER ROTATION INDEX
        </span>
        <span className="text-xs font-mono font-bold text-amber-500 animate-pulse">
          16 2/3 RPM // LOCKED
        </span>
      </div>

      {/* Infinite Spin CSS Injector */}
      <style jsx global>{`
        @keyframes spin-vinyl {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-vinylOrigin {
          transform-origin: 200px 200px;
          animation: spin-vinyl 16s linear infinite;
          will-change: transform;
        }

        /* Accessibilty hook: Stops rotation if user enables reduce-motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-spin-vinylOrigin {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default VinylSpinner;
