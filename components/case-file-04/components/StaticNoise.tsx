"use client";

import React from "react";
import { motion } from "framer-motion";

export const StaticNoise: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Glitch horizontal lines */}
      <motion.div
        className="absolute w-full h-[2px] bg-emerald-400/20 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
        animate={{
          top: ["0%", "100%", "30%", "70%", "10%"],
          opacity: [0.3, 0.7, 0.2, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute w-full h-[1px] bg-emerald-500/15"
        animate={{
          top: ["100%", "0%", "80%", "20%"],
          opacity: [0.1, 0.5, 0.2, 0.6],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default StaticNoise;
