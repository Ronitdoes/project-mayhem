"use client";

import { motion } from "framer-motion";

interface LoginStatusProps {
  error: string | null;
}

export default function LoginStatus({ error }: LoginStatusProps) {
  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2.5 bg-rose-950/20 border border-rose-900/50 p-3 rounded-lg text-rose-400 text-xs font-mono"
    >
      <svg
        className="w-4 h-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>{error}</span>
    </motion.div>
  );
}
