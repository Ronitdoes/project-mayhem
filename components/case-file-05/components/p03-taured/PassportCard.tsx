"use client";

import React from "react";
import { Shield } from "lucide-react";

export function PassportCard() {
  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-lg border border-amber-900/40 relative overflow-hidden select-none shadow-2xl bg-zinc-950 font-mono text-zinc-300 transition-all duration-300 hover:border-amber-700/60 hover:shadow-[0_0_20px_rgba(217,119,6,0.1)]">
      {/* Aged Paper Overlay using CSS gradients & absolute positioning */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-noise" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              rgba(217, 119, 6, 0.03) 0px,
              rgba(217, 119, 6, 0.03) 2px,
              transparent 2px,
              transparent 12px
            ),
            linear-gradient(135deg, rgba(30, 20, 10, 0.8) 0%, rgba(10, 10, 10, 0.95) 100%)
          `
        }}
      />
      
      {/* Red/Brown passport border lines inside */}
      <div className="relative z-10 border border-amber-900/20 p-4 rounded bg-black/40 flex flex-col gap-4">
        {/* Header */}
        <div className="border-b border-amber-900/30 pb-2 flex justify-between items-center">
          <div className="text-left">
            <h4 className="text-[10px] font-bold text-amber-600/80 tracking-widest uppercase">
              PASSPORT // PASSEPORT
            </h4>
            <h3 className="text-sm font-black text-amber-500 tracking-[0.2em] font-serif uppercase">
              TAURED
            </h3>
          </div>
          <Shield size={24} className="text-amber-700/60 animate-pulse" />
        </div>

        {/* Profile Details & Photo */}
        <div className="grid grid-cols-3 gap-3 items-start">
          {/* Photo Placeholder / Silhouette */}
          <div className="col-span-1 border border-amber-900/30 bg-zinc-900/80 rounded aspect-[3/4] p-1.5 flex flex-col justify-between items-center relative overflow-hidden">
            <div className="w-full h-full bg-zinc-850 flex items-center justify-center relative rounded-sm">
              {/* Silhouette Vector */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-zinc-700 fill-current opacity-70"
              >
                <path d="M50,15 A18,18 0 0,0 32,33 A18,18 0 0,0 35,42 A28,28 0 0,0 20,68 A4,4 0 0,0 24,72 L76,72 A4,4 0 0,0 80,68 A28,28 0 0,0 65,42 A18,18 0 0,0 68,33 A18,18 0 0,0 50,15 Z" />
              </svg>
              {/* Retro scanlines */}
              <div className="absolute inset-0 bg-scanlines opacity-20" />
            </div>
            <div className="text-[7px] text-zinc-500 font-bold tracking-widest mt-1 text-center select-none uppercase">
              TRAVELER #03
            </div>
          </div>

          {/* Core metadata (2 cols) */}
          <div className="col-span-2 space-y-2.5 text-left text-[9px]">
            <div>
              <span className="text-[7px] text-zinc-500 block uppercase tracking-wider font-bold">
                Surname / Nom
              </span>
              <span className="text-zinc-200 font-bold uppercase text-[10px]">UNKNOWN</span>
            </div>
            <div>
              <span className="text-[7px] text-zinc-500 block uppercase tracking-wider font-bold">
                Given Names / Prénoms
              </span>
              <span className="text-zinc-200 uppercase">THE TRAVELER</span>
            </div>
            <div>
              <span className="text-[7px] text-zinc-500 block uppercase tracking-wider font-bold">
                Nationality / Nationalité
              </span>
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest animate-pulse">
                TAURED
              </span>
            </div>
            <div>
              <span className="text-[7px] text-zinc-500 block uppercase tracking-wider font-bold">
                Place of Birth / Lieu de naissance
              </span>
              <span className="text-zinc-400 uppercase">TAURED CITY</span>
            </div>
          </div>
        </div>

        {/* Lower Metadata */}
        <div className="grid grid-cols-2 gap-3 text-left text-[9px] border-t border-amber-900/20 pt-3">
          <div>
            <span className="text-[7px] text-zinc-500 block uppercase tracking-wider font-bold">
              Date of Issue / Date de délivrance
            </span>
            <span className="text-zinc-300">14 JUL 1954</span>
          </div>
          <div>
            <span className="text-[7px] text-zinc-500 block uppercase tracking-wider font-bold">
              Date of Expiry / Date d'expiration
            </span>
            <span className="text-zinc-300">13 JUL 1959</span>
          </div>
          <div className="col-span-2">
            <span className="text-[7px] text-zinc-500 block uppercase tracking-wider font-bold">
              Authority / Autorité
            </span>
            <span className="text-red-500/80 font-bold uppercase tracking-wider">
              DETAINED - TOKYO INTL AIRPORT (HANEDA)
            </span>
          </div>
        </div>

        {/* Machine Readable Zone (MRZ) */}
        <div className="border-t border-dashed border-amber-900/30 pt-2.5 mt-1 font-mono text-[8px] tracking-[0.18em] text-zinc-500 select-all leading-normal text-left">
          P&lt;TAUTRAVELER&lt;&lt;UNKNOWN&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />
          T95104X8&lt;&lt;TAU5407149M5907138&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;02
        </div>
      </div>

      <style jsx>{`
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .bg-scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0,0,0,0.3) 50%,
            rgba(0,0,0,0.3)
          );
          background-size: 100% 4px;
        }
      `}</style>
    </div>
  );
}

export default PassportCard;
