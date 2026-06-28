"use client";

import React, { useState } from "react";

interface HexConverterProps {
  onCorrectDecimal: (decimal: string) => void;
}

export function HexConverter({ onCorrectDecimal }: HexConverterProps) {
  const [hexInput, setHexInput] = useState("");
  const targetHex = "5f3759df";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Strip leading "0x" or "0X" if typed/pasted
    if (val.toLowerCase().startsWith("0x")) {
      val = val.substring(2);
    }
    // Filter to hex characters only
    val = val.replace(/[^0-9a-fA-F]/g, "");
    setHexInput(val);
  };

  const parsedDecimal = hexInput ? parseInt(hexInput, 16).toString() : "";
  const isMatch = hexInput.toLowerCase() === targetHex.toLowerCase();

  return (
    <div className="space-y-6 p-5 bg-zinc-950/60 border border-zinc-900 rounded-lg shadow-inner text-left font-mono">
      <div className="space-y-1">
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">
          // TARGET HEXADECIMAL CONSTANT
        </span>
        <div className="text-xl font-bold text-emerald-400 font-mono tracking-wider bg-black/40 border border-zinc-900 rounded-md px-4 py-2.5 inline-block">
          0x5f3759df
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="hex-input" className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">
          Input Hexadecimal String to Convert:
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="hex-input"
            type="text"
            value={hexInput}
            onChange={handleInputChange}
            placeholder="e.g. 5f3759df"
            maxLength={12}
            aria-label="Hexadecimal input"
            className="flex-1 px-4 py-3 bg-black/60 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-zinc-100 placeholder-zinc-700 rounded transition-all duration-300 font-mono focus:outline-none min-h-[44px]"
          />
          {isMatch && (
            <button
              onClick={() => onCorrectDecimal(parsedDecimal)}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider rounded cursor-pointer transition-all duration-300 active:scale-98 min-h-[44px]"
            >
              Break it down
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
