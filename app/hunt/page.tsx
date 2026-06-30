"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isCaseCompleted } from "@/components/case-progress";

export default function HuntPage() {
  const [completedList, setCompletedList] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // 1. Initial client-side check from local storage & cookies
    const list: Record<string, boolean> = {};
    const caseFilesNums = Array.from({ length: 9 }, (_, i) => String(i + 1).padStart(2, "0"));
    caseFilesNums.forEach((num) => {
      list[num] = isCaseCompleted(num);
    });
    setCompletedList(list);

    // 2. Fetch latest from database API and sync
    async function syncProgress() {
      try {
        let res = await fetch("/api/cases/progress");
        let data = await res.json();
        
        // Auto-authenticate session if it is not active
        if (data.success && !data.authenticated) {
          const authRes = await fetch('/hunt/case-07/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Demo Agent', email: 'agent@aetherion.org' }),
          });
          const authData = await authRes.json();
          if (authData.success) {
            // Re-fetch progress after establishing the session
            res = await fetch("/api/cases/progress");
            data = await res.json();
          }
        }

        if (data.success && data.completedCases) {
          const apiCompleted = data.completedCases as Record<string, boolean>;
          let changed = false;
          
          for (const num of caseFilesNums) {
            // A. If DB says it's completed but client doesn't know -> sync DB to client
            if (apiCompleted[num] && !list[num]) {
              list[num] = true;
              localStorage.setItem(`case-${num}-completed`, "true");
              document.cookie = `case-${num}-completed=true; path=/; max-age=31536000; SameSite=Lax`;
              changed = true;
            }
            // B. If client says it's completed but DB doesn't know -> sync client to DB
            else if (!apiCompleted[num] && list[num]) {
              await fetch("/api/cases/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ caseId: num }),
              });
            }
          }
          
          if (changed) {
            setCompletedList({ ...list });
          }
        }
      } catch (err) {
        console.error("Failed to sync case progress:", err);
      }
    }
    syncProgress();
  }, []);

  const caseFiles = Array.from({ length: 9 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return `Case-File-${num}`;
  });

  return (
    <main 
      className="flex flex-col items-center min-h-screen w-full text-white pt-16 md:pt-24 px-6 pb-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Hunt/Background-Image.png')",
      }}
    >
      {/* Premium dark cinematic overlays */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)] pointer-events-none z-0" />

      <h1 className="relative z-10 font-serif text-2xl md:text-4xl tracking-[0.2em] text-zinc-100 uppercase select-none mb-12 md:mb-16">
        Choose Case File
      </h1>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {caseFiles.map((fileName, index) => {
          const num = String(index + 1).padStart(2, "0");
          const isCompleted = completedList[num];

          if (isCompleted) {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center h-36 md:h-44 bg-zinc-950/20 border border-emerald-950/40 rounded-xl p-6 relative overflow-hidden select-none cursor-not-allowed group"
              >
                {/* Muted green matrix overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-500/[0.01]" />
                
                <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-emerald-500/25 uppercase line-through transition-colors duration-300">
                  {fileName}
                </span>
                
                <div className="absolute bottom-3 right-4 font-mono text-[9px] tracking-[0.2em] text-emerald-500/60 bg-emerald-950/20 px-2 py-0.5 border border-emerald-500/20 rounded">
                  SECURED
                </div>
              </div>
            );
          }

          return (
            <Link
              key={index}
              href={
                fileName === "Case-File-01"
                  ? "/hunt/case-01"
                  : fileName === "Case-File-02"
                  ? "/hunt/case-02"
                  : fileName === "Case-File-03"
                  ? "/hunt/case-03"
                  : fileName === "Case-File-04"
                  ? "/hunt/case-04"
                  : fileName === "Case-File-05"
                  ? "/hunt/case-05"
                  : fileName === "Case-File-06"
                  ? "/hunt/case-06"
                  : fileName === "Case-File-07"
                  ? "/hunt/case-07"
                  : fileName === "Case-File-08"
                  ? "/hunt/case-08"
                  : "#"
              }
              className="flex items-center justify-center h-36 md:h-44 bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.12)] hover:-translate-y-1 group relative overflow-hidden"
            >
              {/* Subtle glow border effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-zinc-400 group-hover:text-cyan-400 transition-colors uppercase duration-300">
                {fileName}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
