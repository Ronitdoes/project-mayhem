"use client";

import React from "react";
import { useCaseStore } from "../../CaseFileProvider";
import { PlutoniumSphere } from "./PlutoniumSphere";
import { IncidentTimeline } from "./IncidentTimeline";
import { Radio } from "lucide-react";

export function DemonCore() {
  const solved = useCaseStore((state) => state.solved);
  const isSolved = solved.includes(7); // Puzzle #7 is Demon Core

  return (
    <div className="p-4 sm:p-6 w-full space-y-8 select-text">
      {/* Glitch Victory Header if Solved */}
      {isSolved && (
        <div className="w-full bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-5 flex flex-col items-center justify-center relative overflow-hidden text-center scanlines shadow-[0_0_20px_rgba(16,185,129,0.05)]">
          {/* Scanline backdrop overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none" />
          
          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-mono text-xs uppercase tracking-[0.2em] font-bold">
              <Radio size={14} className="animate-pulse" />
              ANOMALY RECORD PURGED
            </div>
            
            {/* The CRT Glitch Title */}
            <h3 
              className="glitch-text text-3xl md:text-4xl font-extrabold uppercase font-mono tracking-widest text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.6)] py-2 select-none"
              data-text="DEMON CORE"
            >
              DEMON CORE
            </h3>

            <p className="text-[11px] leading-relaxed text-emerald-500/80 font-mono max-w-lg mx-auto">
              Temporal stability index recovered. The prompt criticality sequence has been locked. 
              The 6.2 kg subcritical plutonium mass is successfully stabilized.
            </p>
          </div>
        </div>
      )}

      {/* Grid containing Sphere simulator and timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: Incident Timeline (5 cols) */}
        <div className="lg:col-span-5 w-full">
          <IncidentTimeline />
        </div>

        {/* Right column: Interactive Plutonium core (7 cols) */}
        <div className="lg:col-span-7 w-full">
          <PlutoniumSphere />
        </div>
      </div>

      {/* CSS-in-JS `<style>` tag for CRT Glitch Effects */}
      <style jsx global>{`
        /* Glitch styles */
        .glitch-text {
          position: relative;
          color: #10b981; /* Emerald 500 */
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #ff00c8;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }

        .glitch-text::after {
          left: -2px;
          text-shadow: -2px 0 #00e6ff, 0 2px #ff00c8;
          clip: rect(85px, 450px, 140px, 0);
          animation: glitch-anim2 1s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
          0% {
            clip-path: inset(40% 0 61% 0);
          }
          20% {
            clip-path: inset(92% 0 1% 0);
          }
          40% {
            clip-path: inset(25% 0 58% 0);
          }
          60% {
            clip-path: inset(80% 0 5% 0);
          }
          80% {
            clip-path: inset(11% 0 85% 0);
          }
          100% {
            clip-path: inset(50% 0 43% 0);
          }
        }

        @keyframes glitch-anim2 {
          0% {
            clip-path: inset(10% 0 85% 0);
            transform: skew(0.5deg);
          }
          10% {
            clip-path: inset(80% 0 5% 0);
            transform: skew(-1deg);
          }
          20% {
            clip-path: inset(30% 0 60% 0);
            transform: skew(0.8deg);
          }
          30% {
            clip-path: inset(70% 0 15% 0);
            transform: skew(-0.5deg);
          }
          40% {
            clip-path: inset(5% 0 90% 0);
            transform: skew(1.2deg);
          }
          50% {
            clip-path: inset(95% 0 1% 0);
            transform: skew(-0.8deg);
          }
          60% {
            clip-path: inset(45% 0 50% 0);
            transform: skew(0.3deg);
          }
          70% {
            clip-path: inset(20% 0 75% 0);
            transform: skew(-1.5deg);
          }
          80% {
            clip-path: inset(85% 0 10% 0);
            transform: skew(0.9deg);
          }
          90% {
            clip-path: inset(55% 0 40% 0);
            transform: skew(-0.3deg);
          }
          100% {
            clip-path: inset(15% 0 80% 0);
            transform: skew(0deg);
          }
        }

        /* Scanlines scan visual texture */
        .scanlines::after {
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          background-size: 100% 3px, 6px 100%;
          pointer-events: none;
          z-index: 20;
          opacity: 0.85;
        }
      `}</style>
    </div>
  );
}

export default DemonCore;
