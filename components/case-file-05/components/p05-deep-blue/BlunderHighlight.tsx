"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface BlunderHighlightProps {
  isVisible: boolean;
}

export default function BlunderHighlight({ isVisible }: BlunderHighlightProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-x-4 bottom-24 z-20 flex justify-center pointer-events-none"
        >
          <div className="bg-red-950/90 border border-red-500/80 backdrop-blur-md rounded-lg p-4 shadow-[0_0_25px_rgba(239,68,68,0.25)] flex items-start gap-3 max-w-sm pointer-events-auto select-none">
            <div className="shrink-0 p-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-md animate-pulse">
              <AlertTriangle size={18} />
            </div>
            
            <div className="space-y-1 text-left">
              <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
                Tactical Anomaly
              </div>
              <p className="text-xs text-zinc-100 font-bold font-sans">
                Kasparov plays Bd6?? — a fatal mistake
              </p>
              <p className="text-[10px] text-zinc-400 font-mono leading-normal">
                This premature development allows White's knight sacrifice on e6, shattering Black's defensive integrity.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
