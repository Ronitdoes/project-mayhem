"use client";

import { motion } from "framer-motion";

export default function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md bg-slate-950/60 backdrop-blur-md border border-emerald-500/30 p-8 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col items-center justify-center text-center space-y-6"
    >
      <div className="w-16 h-16 rounded-full border-2 border-emerald-500/50 flex items-center justify-center bg-emerald-950/30 text-emerald-400 relative">
        <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping opacity-75"></div>
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold font-mono tracking-wider text-emerald-400 uppercase">
          Authentication Successful
        </h2>
        <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest leading-relaxed">
          Administrator Access Granted
        </p>
      </div>

      <div className="w-full border-t border-emerald-500/20 pt-4 flex flex-col items-center gap-1.5">
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
          Chronos Sync: STABILIZED
        </span>
        <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="bg-emerald-500 h-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          ></motion.div>
        </div>
        <span className="text-[8px] font-mono text-emerald-500/70 uppercase tracking-widest animate-pulse mt-1">
          Redirecting to command center...
        </span>
      </div>
    </motion.div>
  );
}
