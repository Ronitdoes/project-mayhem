"use client";

import { motion } from "framer-motion";

interface LoginButtonProps {
  loading: boolean;
  disabled: boolean;
}

export default function LoginButton({ loading, disabled }: LoginButtonProps) {
  return (
    <motion.button
      type="submit"
      disabled={disabled || loading}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-[0.2em] rounded border border-blue-500/30 transition-all duration-200 cursor-pointer shadow-lg shadow-blue-950/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <div className="w-3.5 h-3.5 border border-white/20 border-t-white rounded-full animate-spin"></div>
          <span>Authenticating...</span>
        </>
      ) : (
        <>
          <span>Establish Comm-Link</span>
        </>
      )}
    </motion.button>
  );
}
