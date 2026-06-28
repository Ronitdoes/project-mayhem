"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

// Register the hook
gsap.registerPlugin(useGSAP);

interface CipherTextProps {
  startDecrypt: boolean;
}

const PLAINTEXT = "IT WAS EARLY SPRING WARM AND SULTRY GLOWED THE AFTERNOON THE VERY BREEZES SEEMED TO BREATHE A MUTUAL COMPASSION";

// Homophonic substitution symbol map
const CIPHER_MAP: Record<string, string> = {
  'A': '†', 'B': '‡', 'C': '§', 'D': '¶', 'E': 'ε', 'F': 'φ', 'G': 'λ', 'H': 'η', 
  'I': 'ι', 'J': 'θ', 'K': 'κ', 'L': 'μ', 'M': 'π', 'N': 'ν', 'O': 'ο', 'P': 'σ', 
  'Q': 'χ', 'R': 'ρ', 'S': 'ψ', 'T': 'τ', 'U': 'υ', 'V': 'ω', 'W': 'ξ', 'X': 'ζ', 
  'Y': 'ψ', 'Z': 'δ', ' ': ' '
};

export function CipherText({ startDecrypt }: CipherTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Staggered substitution swap using GSAP
  useGSAP(() => {
    if (!startDecrypt) return;

    // Slide out/fade out cipher chars
    gsap.to(".cipher-char", {
      opacity: 0,
      y: -10,
      scale: 0.7,
      duration: 0.35,
      stagger: 0.03, // 30ms stagger as specified
      ease: "power1.in"
    });

    // Slide in/fade in decrypted plain chars
    gsap.to(".plain-char", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.35,
      stagger: 0.03, // 30ms stagger as specified
      ease: "back.out(1.2)"
    });
  }, { scope: containerRef, dependencies: [startDecrypt] });

  // Tokenize string to keep formatting structure and word wraps intact
  const words = PLAINTEXT.split(" ");

  return (
    <div 
      ref={containerRef}
      className="relative w-full p-6 sm:p-8 bg-[#f5ebd6] border-2 border-[#d0be9f] rounded-lg shadow-[inset_0_0_50px_rgba(101,84,65,0.25),0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden font-serif select-none text-left"
    >
      {/* Decorative Aged Paper Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#e8dac0] opacity-80 pointer-events-none" />
      
      {/* Wax Stamp/Parchment Red Badge */}
      <div className="absolute top-4 right-4 sm:top-5 sm:right-6 border-2 border-red-600/80 text-red-600/80 px-2 py-0.5 rounded font-mono font-black text-[9px] uppercase tracking-widest rotate-[-4deg] shadow-[0_0_8px_rgba(220,38,38,0.15)] select-none">
        UNSOLVED FOR 150 YEARS
      </div>

      <div className="space-y-4 relative z-10">
        {/* Document Header */}
        <div className="border-b border-[#e1d2b8] pb-3 text-left">
          <span className="text-[9px] text-[#8c785d] font-mono tracking-widest uppercase block mb-1">
            // GRAHAM'S MAGAZINE // W.B. TYLER CRYPTOGRAMS
          </span>
          <h4 className="text-sm font-bold text-[#5c4a37] uppercase tracking-wide">
            Passage II: Polyalphabetic Homophonic Cipher
          </h4>
        </div>

        {/* The Cipher Text Block with individual character mapping */}
        <div className="text-base sm:text-lg leading-relaxed flex flex-wrap gap-x-3 gap-y-2 mt-4 max-w-full font-bold select-none">
          {words.map((word, wIdx) => (
            <div key={wIdx} className="flex shrink-0">
              {word.split("").map((char, cIdx) => {
                const cipherSymbol = CIPHER_MAP[char] || char;
                return (
                  <span 
                    key={cIdx} 
                    className="relative w-4 h-6 inline-block text-center"
                  >
                    {/* Cipher character representation */}
                    <span 
                      className="cipher-char absolute inset-0 text-[#84664a] font-serif flex items-center justify-center"
                    >
                      {cipherSymbol}
                    </span>
                    
                    {/* Plaintext character representation (hidden until triggered) */}
                    <span 
                      className="plain-char absolute inset-0 text-emerald-800 font-mono flex items-center justify-center opacity-0 translate-y-2 scale-90"
                    >
                      {char}
                    </span>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CipherText;
