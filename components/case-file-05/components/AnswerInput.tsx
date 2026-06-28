"use client";

import React from "react";
import { useAnswerValidation } from "../hooks/useAnswerValidation";
import { Send, AlertTriangle, XCircle } from "lucide-react";

interface AnswerInputProps {
  puzzleId: number;
}

export function AnswerInput({ puzzleId }: AnswerInputProps) {
  const {
    inputValue,
    setInputValue,
    isShaking,
    isPartial,
    message,
    submitAnswer,
  } = useAnswerValidation(puzzleId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAnswer();
  };

  return (
    <div className="w-full max-w-xl mx-auto my-6 font-mono">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
      
      <form onSubmit={handleSubmit} className={`flex flex-col gap-2.5 ${isShaking ? "animate-shake" : ""}`}>
        <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold text-left">
          Input Core Decryption Key:
        </label>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter decrypted answer..."
            aria-label="Answer"
            aria-describedby={`puzzle-clue-${puzzleId}`}
            className={`flex-1 px-4 py-3 bg-zinc-950/60 border rounded text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:ring-1 transition-all duration-300 ${
              isPartial 
                ? "border-amber-500/80 focus:ring-amber-500 focus:border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.1)]"
                : "border-zinc-800 focus:ring-emerald-500 focus:border-emerald-500 focus:shadow-[0_0_8px_rgba(16,185,129,0.15)]"
            }`}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/80 hover:border-emerald-700 text-emerald-400 font-bold rounded cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 active:scale-98 shadow-md"
          >
            <span>SUBMIT</span>
            <Send size={14} />
          </button>
        </div>
      </form>

      {message && (
        <div
          className={`mt-3 flex items-center gap-2.5 px-4 py-3 border rounded text-xs transition-all duration-300 animate-fade-in ${
            isPartial
              ? "bg-amber-950/20 border-amber-900/50 text-amber-400"
              : "bg-red-950/20 border-red-900/50 text-red-400"
          }`}
        >
          {isPartial ? (
            <AlertTriangle size={15} className="shrink-0 animate-bounce" />
          ) : (
            <XCircle size={15} className="shrink-0" />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}

export default AnswerInput;
