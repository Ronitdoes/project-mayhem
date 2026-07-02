"use client";

import React, { useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface SuccessOverlayProps {
  onSolved?: () => void;
}

export const SuccessOverlay: React.FC<SuccessOverlayProps> = ({ onSolved }) => {
  const handleProceed = useCallback(() => {
    if (onSolved) {
      onSolved();
    } else {
      if (typeof window !== "undefined") {
        window.location.href = "/hunt/case-04";
      }
    }
  }, [onSolved]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleProceed();
    }, 4000);
    return () => clearTimeout(timer);
  }, [handleProceed]);

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-6 text-center border-2 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.3)]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center mb-4 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
        <svg className="w-8 h-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-xl sm:text-2xl font-black font-mono text-emerald-400 tracking-wider uppercase mb-2">
        PERSISTENT SIGNAL DETECTED
      </h2>

      <p className="text-xs sm:text-sm font-mono text-emerald-200/90 tracking-widest uppercase mb-1">
        MEMORY FRAGMENT RESTORED
      </p>

      <p className="text-xs font-mono text-zinc-400 tracking-widest uppercase mb-6">
        PUZZLE COMPLETE
      </p>

      <button
        type="button"
        onClick={handleProceed}
        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-black font-mono text-xs font-bold tracking-widest uppercase rounded border border-emerald-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)]"
      >
        PROCEED →
      </button>
    </motion.div>
  );
};

export default SuccessOverlay;
