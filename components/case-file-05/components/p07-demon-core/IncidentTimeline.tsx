"use client";

import React from "react";
import { AlertCircle, Calendar } from "lucide-react";

interface Incident {
  date: string;
  name: string;
  role: string;
  accident: string;
  consequence: string;
}

const INCIDENTS: Incident[] = [
  {
    date: "Aug 21, 1945",
    name: "Harry Daghlian",
    role: "24-year-old Physicist",
    accident: "Dropped a heavy tungsten carbide brick onto the plutonium sphere, which served as a neutron reflector and pushed the core to prompt criticality.",
    consequence: "Quickly disassembled the pile, but received an estimated 5.1 Sieverts of ionizing radiation. Died 25 days later from acute radiation syndrome."
  },
  {
    date: "May 21, 1946",
    name: "Louis Slotin",
    role: "35-year-old Physicist",
    accident: "Using a flathead screwdriver to hold a beryllium dome shell open above the core. The blade slipped, dropping the dome and initiating criticality.",
    consequence: "Instantly flipped the dome off to save colleagues. Received a massive dose of 21 Sieverts. Died 9 days later."
  }
];

export function IncidentTimeline() {
  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between select-none">
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest font-mono">
          // LAUNCH INCIDENT FILES
        </span>
        <span className="text-[9px] text-red-500 font-mono flex items-center gap-1.5 uppercase tracking-wider">
          <AlertCircle size={10} className="animate-pulse" />
          Criticality Incidents
        </span>
      </div>

      {/* Timeline wrapper */}
      <div className="relative pl-6 border-l border-zinc-800/80 space-y-6 text-left">
        {INCIDENTS.map((item, idx) => (
          <div 
            key={idx} 
            className="group relative flex flex-col gap-2 p-4 bg-zinc-950/40 border border-zinc-900 hover:border-red-900/40 rounded-lg transition-all duration-300 shadow-md"
          >
            {/* Timeline Connector Pin */}
            <span className="absolute -left-[31px] top-5 w-2.5 h-2.5 rounded-full bg-zinc-900 border-2 border-zinc-700 group-hover:border-red-500 transition-colors duration-300 z-10" />

            {/* Glowing red criticality node next to the pin */}
            <span className="absolute -left-[35px] top-[16px] w-[18px] h-[18px] rounded-full bg-red-500/10 scale-0 group-hover:scale-100 group-hover:animate-ping transition-transform duration-500 z-0 pointer-events-none" />

            {/* Meta row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] font-mono select-none">
              <span className="text-zinc-500 flex items-center gap-1">
                <Calendar size={11} className="text-zinc-600" />
                {item.date}
              </span>
              <span className="text-red-500/80 font-bold uppercase tracking-widest text-[8px] animate-pulse">
                CRITICALITY ANOMALY #{idx + 1}
              </span>
            </div>

            {/* Title / Name */}
            <div>
              <h4 className="text-sm font-bold text-zinc-200 group-hover:text-red-400 transition-colors duration-200">
                {item.name}
              </h4>
              <span className="text-[10px] text-zinc-500 italic block">
                {item.role}
              </span>
            </div>

            {/* Description details */}
            <p className="text-[11px] leading-relaxed text-zinc-400 font-mono mt-1">
              <strong className="text-zinc-300">Accident:</strong> {item.accident}
            </p>

            <p className="text-[11px] leading-relaxed text-zinc-500 font-mono border-t border-zinc-900/60 pt-2 mt-1">
              <strong className="text-zinc-400">Consequence:</strong> {item.consequence}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncidentTimeline;
