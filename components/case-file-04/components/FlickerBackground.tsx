"use client";

import React from "react";
import { motion } from "framer-motion";

export const FlickerBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Dark background base */}
      <div className="absolute inset-0 bg-[#040906]" />

      {/* Radial CRT vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,28,15,0.4)_0%,rgba(1,5,2,0.95)_85%)]" />

      {/* CRT Scanlines overlay */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))",
          backgroundSize: "100% 3px, 6px 100%",
        }}
      />

      {/* Occasional screen flicker opacity pulse */}
      <motion.div
        className="absolute inset-0 bg-emerald-950/10 pointer-events-none"
        animate={{
          opacity: [0.05, 0.15, 0.02, 0.12, 0.04],
        }}
        transition={{
          duration: 0.25,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default FlickerBackground;
