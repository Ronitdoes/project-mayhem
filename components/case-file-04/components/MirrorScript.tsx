"use client";

import React, { useState, useEffect } from "react";
import { PuzzleProps } from "../types";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

export default function MirrorScriptPuzzle({
  onSolved,
  onFailed,
  disabled = false,
}: PuzzleProps) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [shakeError, setShakeError] = useState(false);

  const controls = useAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || isVerifying || isCorrect) return;
    setIsVerifying(true);
    setShakeError(false);

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseId: "04",
          puzzleKey: "mirror_script",
          answer: answer,
        }),
      });
      const data = await res.json();
      if (data.success && data.correct) {
        setIsCorrect(true);
        setSubmitted(true);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("onSuccess"));
        }
        setTimeout(() => {
          if (onSolved) {
            onSolved();
          }
        }, 2500);
      } else {
        setIsCorrect(false);
        setSubmitted(true);
        setShakeError(true);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("onError"));
        }
        if (onFailed) {
          onFailed();
        }
      }
    } catch (err) {
      console.error(err);
      setIsCorrect(false);
      setSubmitted(true);
      setShakeError(true);
      if (onFailed) {
        onFailed();
      }
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (shakeError) {
      controls.start({
        x: [0, -10, 10, -10, 10, -10, 10, 0],
        transition: { duration: 0.4, ease: "easeInOut" },
      });
    }
  }, [shakeError, controls]);

  const codeSnippet = `function reveal() {
    const key = "LAVINRAC";
    const step1 = key.split("").reverse().join("");
    const step2 = step1.toLowerCase();
    return step2 + " 17";
}
// O/p : carnival 17`;

  const mirroredCode = codeSnippet
    .split("\n")
    .map((line) => {
      if (line.includes("const step1 =")) {
        return "????????????";
      }
      return line;
    })
    .join("\n");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050004] overflow-y-auto p-4 md:p-8 relative">
      {/* Background Ambience & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Ambient Red Spotlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-red-950/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={controls}
        onViewportEnter={() => controls.start({ opacity: 1, y: 0 })}
        className={`w-full max-w-2xl bg-slate-950/40 backdrop-blur-md border p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-500 relative flex flex-col space-y-6 select-none ${
          isCorrect
            ? "border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
            : "border-red-900/30 shadow-[0_0_30px_rgba(220,38,38,0.08)]"
        }`}
      >
        {/* Top Highlight line */}
        <div
          className={`absolute top-0 inset-x-0 h-1 rounded-t-xl transition-all duration-500 ${
            isCorrect
              ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"
              : "bg-gradient-to-r from-red-600 via-rose-600 to-red-600"
          }`}
        />

        {/* Top Protocol Status Indicators */}
        <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-3">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                isCorrect ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
            {isCorrect ? "Refraction Node: Decrypted" : "Refraction Node: Active"}
          </span>
          <span>Security Clearance Lvl 4</span>
        </div>

        {/* Header Title */}
        <div className="text-center space-y-2">
          <h1
            className={`text-2xl font-bold font-mono tracking-widest uppercase transition-colors duration-500 ${
              isCorrect ? "text-emerald-400" : "text-red-500"
            }`}
          >
            Case File: CF-04-AB-2903
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 italic max-w-md mx-auto">
            "The reflections are not showing us; they are showing everything that came before us."
          </p>
        </div>

        {/* Mirrored Code Terminal */}
        <div className="relative">
          {/* Header Bar */}
          <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-950/80 border-t border-x border-white/5 rounded-t-lg">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
            <span className="text-[9px] font-mono text-zinc-600 ml-2 uppercase tracking-widest">
              refraction_matrix.log
            </span>
          </div>

          <div
            className={`p-6 rounded-b-lg border-b border-x bg-black/90 font-mono text-xs leading-relaxed transition-all duration-500 overflow-x-auto text-center flex items-center justify-center ${
              isCorrect ? "border-emerald-500/20 text-emerald-400/80" : "border-red-950/60 text-red-500/90"
            }`}
            style={{ transform: "scaleX(-1)" }}
          >
            <pre className="inline-block text-left">{mirroredCode}</pre>
          </div>

          <div className="absolute -top-7 right-1 text-[8px] font-mono text-zinc-500 uppercase tracking-widest animate-pulse">
            Reflected Spectrum Intercept
          </div>
        </div>

        {/* Decoder Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 block font-bold">
              Decrypted Code Output
            </label>
            <div className="relative">
              {/* Keyboard Icon */}
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-600">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M18 12h.01M7 16h10" />
                </svg>
              </div>

              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={disabled || isCorrect || isVerifying}
                placeholder={isCorrect ? "COGNITIVE ALIGNMENT RESTORED" : "Enter code output..."}
                className={`w-full bg-slate-900/60 border outline-none rounded pl-10 pr-4 py-2.5 text-sm font-mono text-white transition-all placeholder:text-zinc-700 disabled:opacity-50 ${
                  isCorrect
                    ? "border-emerald-500/30 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
                    : "border-white/10 focus:border-red-600 focus:ring-1 focus:ring-red-600/50"
                }`}
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={disabled || isCorrect || isVerifying}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] rounded border transition-all duration-200 cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              isCorrect
                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400 shadow-emerald-950/20"
                : "bg-red-950/20 border-red-900/35 text-red-400 hover:text-red-300 hover:bg-red-900/10 shadow-red-950/20"
            }`}
          >
            {isVerifying ? (
              <>
                <div className="w-3.5 h-3.5 border border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
                <span>Verifying Alignment...</span>
              </>
            ) : isCorrect ? (
              <span>Sequence purges successful</span>
            ) : (
              <span>Submit Answer</span>
            )}
          </motion.button>
        </form>

        {/* Status Message */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`flex items-center gap-2.5 border p-3 rounded-lg text-xs font-mono transition-all ${
                isCorrect
                  ? "bg-emerald-950/15 border-emerald-500/20 text-emerald-400"
                  : "bg-rose-950/15 border-rose-500/20 text-rose-400"
              }`}
            >
              {isCorrect ? (
                <>
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>ACCESS GRANTED: Fragment Restored successfully.</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>ACCESS DENIED: Incorrect Reflection string. Re-examine standard values.</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Watermark */}
        <div className="text-center border-t border-white/5 pt-3">
          <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
            Refraction Console · ID: CF-04-REFRACT-901
          </span>
        </div>
      </motion.div>
    </div>
  );
}
