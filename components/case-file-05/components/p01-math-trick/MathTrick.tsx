"use client";

import React, { useState } from "react";
import { useCaseStore } from "../../CaseFileProvider";
import { HexConverter } from "./HexConverter";
import { DigitCards } from "./DigitCards";

export default function MathTrick() {
  const solved = useCaseStore((state) => state.solved);
  const isSolved = solved.includes(1);

  const [step, setStep] = useState<"convert" | "cards">(isSolved ? "cards" : "convert");
  const [decimalVal, setDecimalVal] = useState(isSolved ? "1597463007" : "");

  const handleCorrectDecimal = (decimal: string) => {
    setDecimalVal(decimal);
    setStep("cards");
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 space-y-6">
      {step === "convert" && (
        <HexConverter onCorrectDecimal={handleCorrectDecimal} />
      )}
      
      {step === "cards" && (
        <div className="space-y-6">
          <DigitCards decimal={decimalVal} onAnimationComplete={() => {}} />
          
          {isSolved && (
            <div className="p-5 border border-emerald-500/30 bg-emerald-950/10 rounded-lg text-center font-serif text-sm italic text-emerald-300 leading-relaxed shadow-lg animate-fade-in">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest block text-emerald-400 mb-2 not-italic">
                // ANCHOR LORE RECORDED
              </span>
              &ldquo;Answer to the Ultimate Question of Life, the Universe, and Everything... is 42.&rdquo;
              <span className="block text-[10px] font-mono text-zinc-500 mt-2 not-italic">
                &mdash; The Hitchhiker&apos;s Guide to the Galaxy
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
