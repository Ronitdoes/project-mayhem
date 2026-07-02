"use client";

import { motion } from "framer-motion";

export default function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center z-50 pointer-events-auto"
    >
      <div className="relative flex items-center justify-center">
        {/* Glowing circular loader */}
        <div className="w-16 h-16 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        {/* Inner ambient glow */}
        <div className="absolute w-12 h-12 bg-blue-500/5 rounded-full blur-sm"></div>
      </div>
      <motion.p
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="mt-6 text-[10px] font-mono text-blue-400 uppercase tracking-[0.25em] font-bold text-center"
      >
        Authenticating Secure Comm-Link...
      </motion.p>
    </motion.div>
  );
}
