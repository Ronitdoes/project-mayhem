import React, { useState } from "react";
import { Terminal, Key, CornerDownLeft, AlertCircle } from "lucide-react";

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
}

export function AnswerInput({ onSubmit }: AnswerInputProps) {
  const [value, setValue] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setErrorMsg(null);

    const trimmed = value.trim();
    if (!trimmed) {
      setErrorMsg("Input cannot be empty.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseId: "09",
          puzzleKey: "stage2",
          answer: trimmed
        })
      });
      const data = await res.json();
      if (data.success && data.correct) {
        onSubmit(trimmed);
      } else {
        setErrorMsg("INVALID KEYWORD: ACCESS DENIED");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("CONNECTION ERROR. PLEASE RETRY.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md font-mono space-y-3">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Glow wrapper */}
        <div className={`absolute inset-0 -m-[1px] rounded-xl bg-gradient-to-r ${
          errorMsg ? "from-red-500/20 to-red-500/30" : "from-cyan-500/10 to-cyan-500/20"
        } opacity-75 blur-sm transition-all duration-300 group-hover:opacity-100`} />

        <div className={`relative flex items-center bg-zinc-950/90 border rounded-xl overflow-hidden px-4 py-2 transition-colors duration-300 ${
          errorMsg ? "border-red-500/50" : "border-cyan-500/30 group-hover:border-cyan-400/50"
        }`}>
          {/* Console icon */}
          <span className="text-zinc-600 mr-3 select-none flex items-center">
            <Terminal size={16} className={`${errorMsg ? "text-red-500" : "text-cyan-500"}`} />
            <span className="ml-1 text-xs text-zinc-500 font-bold">{">"}</span>
          </span>

          {/* Actual Input */}
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            placeholder="Recovered Keyword"
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-700 outline-none border-none py-1.5 uppercase font-semibold tracking-widest disabled:text-zinc-600"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading || !value.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/50 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/20 disabled:bg-transparent disabled:border-zinc-800 text-cyan-400 hover:text-cyan-200 disabled:text-zinc-600 text-xs font-bold rounded-lg uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-95"
          >
            <span>Submit</span>
            <CornerDownLeft size={12} />
          </button>
        </div>
      </form>

      {/* Error state */}
      {errorMsg && (
        <div className="flex items-center gap-1.5 text-[10px] text-red-500 font-semibold px-2 animate-pulse uppercase tracking-wider">
          <AlertCircle size={12} />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
