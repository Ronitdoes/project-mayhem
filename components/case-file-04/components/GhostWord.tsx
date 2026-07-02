"use client";

import React from "react";
import { motion } from "framer-motion";
import { GhostWordItem } from "../lib/ghostGenerator";

interface GhostWordProps {
  item: GhostWordItem;
}

export const GhostWord: React.FC<GhostWordProps> = ({ item }) => {
  return (
    <motion.span
      className="inline-block font-mono text-sm sm:text-base md:text-lg font-bold tracking-widest text-emerald-400 select-none transition-colors duration-75 text-center px-2 py-1"
      initial={{ opacity: 0.8 }}
      animate={{
        opacity: [0.85, 1, 0.75, 0.95],
        scale: [1, 1.02, 0.98, 1],
        x: [0, -0.5, 0.5, 0],
      }}
      transition={{
        duration: 0.12,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
      style={{
        textShadow: "0 0 8px rgba(16, 185, 129, 0.6), 0 0 2px rgba(255, 255, 255, 0.4)",
      }}
    >
      {item.word}
    </motion.span>
  );
};

export default GhostWord;
