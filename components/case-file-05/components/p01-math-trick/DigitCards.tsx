"use client";

import React, { useEffect } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

interface DigitCardsProps {
  decimal: string;
  onAnimationComplete: () => void;
}

export function DigitCards({ decimal, onAnimationComplete }: DigitCardsProps) {
  const shouldReduceMotion = useReducedMotion();
  const digits = decimal.split(""); // ['1', '5', '9', '7', '4', '6', '3', '0', '0', '7']

  useEffect(() => {
    if (shouldReduceMotion) {
      onAnimationComplete();
    }
  }, [shouldReduceMotion, onAnimationComplete]);

  // Framer motion variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 15,
      scale: shouldReduceMotion ? 1 : 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
  };

  return (
    <div className="space-y-6 p-5 bg-zinc-950/60 border border-zinc-900 rounded-lg shadow-inner text-left font-mono">
      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-2">
        // STAGGERED TIMELINE SEGMENTATION
      </span>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => {
          if (!shouldReduceMotion) {
            // Trigger sum counter tick after a short delay
            setTimeout(onAnimationComplete, 400);
          }
        }}
        className="flex flex-wrap gap-2.5 justify-center py-4"
      >
        {digits.map((digit, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className="w-10 h-14 sm:w-12 sm:h-16 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-md shadow-md text-xl sm:text-2xl font-black text-emerald-400 font-mono relative overflow-hidden"
          >
            {/* Top half lines overlay */}
            <div className="absolute inset-x-0 top-0 h-1/2 border-b border-black/40 bg-white/2" />
            <span>{digit}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-[10px] text-zinc-500 text-center uppercase tracking-wider">
        Analyzing digits for fast inverse square root constant...
      </div>
    </div>
  );
}
