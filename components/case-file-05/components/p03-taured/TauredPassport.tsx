"use client";

import React, { useState, useEffect } from "react";
import { useCaseStore } from "../../CaseFileProvider";
import PassportCard from "./PassportCard";
import EuropeMapSVG from "./EuropeMapSVG";
import DisappearingMan from "./DisappearingMan";
import { MapPin, Globe, Cpu } from "lucide-react";

export function TauredPassport() {
  const solved = useCaseStore((state) => state.solved);
  const isSolved = solved.includes(3); // Puzzle #3 is Taured Passport

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 select-text text-zinc-100 font-mono">
      {/* Dynamic Status Banner */}
      <div className={`w-full border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden transition-all duration-300 ${
        isSolved 
          ? "bg-emerald-950/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
          : "bg-zinc-950/30 border-zinc-900"
      }`}>
        <div className="space-y-1 relative z-10 text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
            <Cpu size={14} className={!isSolved ? "text-amber-500 animate-pulse" : "text-emerald-500"} />
            PARALLEL DIMENSION CORRELATION
          </div>
          <h3 className={`text-lg font-bold uppercase tracking-wider ${
            isSolved ? "text-emerald-400" : "text-zinc-200"
          }`}>
            {isSolved 
              ? "ANOMALY STABILIZED // Parallel Origin Confirmed" 
              : "GEOPOLITICAL DETECTOR MATRIX ACTIVE"}
          </h3>
          <p className="text-[11px] leading-relaxed text-zinc-400 max-w-2xl">
            {isSolved
              ? "The passport coordinates have been mapped to Andorra. The traveler's origin country of 'Taured' represents a temporal overlap that has now been successfully cataloged and stabilized."
              : "Haneda Airport security documents indicate a traveler carrying documents from an unknown country. Examine the passport, localized maps, and surveillance feeds to extract the country name."}
          </p>
        </div>

        {/* Status Indicator */}
        <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-zinc-900 rounded font-bold text-[10px] tracking-wider uppercase select-none">
          <span className={`w-2 h-2 rounded-full ${
            isSolved 
              ? "bg-emerald-500 animate-pulse" 
              : "bg-amber-500 animate-pulse"
          }`} />
          <span className={isSolved ? "text-emerald-400" : "text-amber-400"}>
            {isSolved ? "STABILIZED" : "ANOMALY ENIGMA"}
          </span>
        </div>
      </div>

      {/* Main Grid: Passport, Map, Surveillance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {/* Passport details (Aged Card) */}
        <div className="flex flex-col">
          <div className="text-left mb-2 text-zinc-500 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
            <Globe size={11} />
            [1. Traveler Document]
          </div>
          <PassportCard />
        </div>

        {/* Western Europe SVG Map */}
        <div className="flex flex-col">
          <div className="text-left mb-2 text-zinc-500 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
            <MapPin size={11} />
            [2. Coordinates Map]
          </div>
          <EuropeMapSVG />
        </div>

        {/* Surveillance Disappearing Man */}
        <div className="flex flex-col">
          <div className="text-left mb-2 text-zinc-500 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
            <Cpu size={11} />
            [3. Room Surveillance]
          </div>
          <DisappearingMan isSolved={isSolved} />
        </div>
      </div>
    </div>
  );
}

export default TauredPassport;
