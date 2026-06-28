"use client";

import { useCaseStore } from "../CaseFileProvider";

export function ProgressBar() {
  const solved = useCaseStore((state) => state.solved);
  const activePuzzle = useCaseStore((state) => state.activePuzzle);
  const total = 8;
  const solvedCount = solved.length;

  return (
    <div className="flex flex-col items-center sm:items-end gap-1.5 select-none font-mono">
      <div className="flex items-center gap-3">
        <span className="text-[10px] sm:text-xs font-bold tracking-widest text-zinc-400 uppercase">
          Timeline Stability:
        </span>
        <span className="text-xs sm:text-sm font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
          {solvedCount} / {total} Solved
        </span>
      </div>

      {/* Segmented Progress Bar */}
      <div className="flex gap-1.5 h-2 w-48 sm:w-56 bg-zinc-950 p-0.5 rounded-sm border border-zinc-800/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
        {Array.from({ length: total }).map((_, idx) => {
          const puzzleId = idx + 1;
          const isSolved = solved.includes(puzzleId);
          const isActive = activePuzzle === puzzleId;

          return (
            <div
              key={idx}
              className={`flex-1 rounded-xs transition-all duration-500 ${
                isSolved
                  ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                  : isActive
                  ? "bg-amber-500/50 animate-pulse border border-amber-500/70"
                  : "bg-zinc-800/80"
              }`}
              title={`Puzzle ${puzzleId}: ${
                isSolved ? "Solved" : isActive ? "Active" : "Locked"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
export default ProgressBar;
