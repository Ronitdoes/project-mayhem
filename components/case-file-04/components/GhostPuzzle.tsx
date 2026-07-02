"use client";

import React, { useState } from "react";
import { PuzzleProps } from "../types";
import { useGhostWords } from "../hooks/useGhostWords";
import { isGhostAnswerCorrect } from "../lib/validators";
import { SOUND_HOOKS } from "../constants";
import FlickerBackground from "./FlickerBackground";
import StaticNoise from "./StaticNoise";
import GhostTerminal from "./GhostTerminal";
import SuccessOverlay from "./SuccessOverlay";

export default function GhostPuzzle({
  onSolved,
  onFailed,
  disabled = false,
}: PuzzleProps) {
  const { words } = useGhostWords();
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (disabled || isSuccess) return;

    if (!answer.trim()) return;

    if (isGhostAnswerCorrect(answer)) {
      setError(null);
      setIsSuccess(true);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SOUND_HOOKS.onSuccess));
      }
    } else {
      setError("SIGNAL LOST — TRY AGAIN");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SOUND_HOOKS.onError));
      }
      if (onFailed) {
        onFailed();
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#040906] overflow-hidden p-4 select-none font-mono">
      {/* Background visual effects */}
      <FlickerBackground />
      <StaticNoise />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-6">
        {/* Terminal Component */}
        <GhostTerminal words={words} />

        {/* Answer Form Input Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col sm:flex-row items-center gap-3 bg-black/70 border border-emerald-500/30 p-4 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.1)]"
        >
          <div className="flex-1 w-full flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/50 rounded px-3 py-2 focus-within:border-emerald-400 transition-colors">
            <span className="text-xs text-emerald-500 font-bold uppercase select-none">
              ANSWER:
            </span>
            <input
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (error) setError(null);
              }}
              placeholder="ENTER SIGNAL..."
              disabled={disabled || isSuccess}
              className="w-full bg-transparent text-emerald-300 font-mono text-sm uppercase outline-none placeholder-emerald-800"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <button
            type="submit"
            disabled={disabled || isSuccess || !answer.trim()}
            className="w-full sm:w-auto px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-black font-mono font-bold text-xs uppercase tracking-wider rounded border border-emerald-400 transition-all cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.3)] shrink-0"
          >
            [ VERIFY ]
          </button>
        </form>

        {/* Failure Error Banner */}
        {error && (
          <div className="text-red-400 text-xs tracking-widest font-bold uppercase animate-bounce bg-red-950/60 border border-red-500/50 px-4 py-2 rounded">
            ⚠ {error}
          </div>
        )}
      </div>

      {/* Success Overlay */}
      {isSuccess && <SuccessOverlay onSolved={onSolved} />}
    </div>
  );
}
