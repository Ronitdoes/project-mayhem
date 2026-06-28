"use client";

import React from "react";

const CIPHER_LINES_MAIN = [
  "EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJ",
  "YQTQUXQBQVYUVLLTREVJYQTMKYRDMFD",
  "VFPJUDEEHZWETZYVGWHKKQETGFQJNCE",
  "GGWHKK?DQMCPFQZDQMMIAGPFXHQRLG",
  "TIMVMZJANQLVKQEDAGDVFRPJUNGEUNA",
  "QZGZLECGYUXUEENJTBJLBQCRTBJDFHRR",
  "YIZETKZEMVDUFKSJHKFWHKUWQLSZFTI",
  "HHDDDUVH?DWKBFUFPWNTDFIYCUQZERE",
  "EVLDKFEZMOQQJLTTUGSYQPFEUNLAVIDX",
  "FLGGTEZ?FKZBSFDQVGOGIPUFXHHDRKF",
  "FHQNTGPUAECNUVPDJMQCLQUMUNEDFQ",
  "ELZZVRRGKFFVOEEXBDMVPNFQXEZLGRE",
  "DNQFMPNZGLFLPMRJQYALMGNUVPDXVKP",
  "DQUMEBEDMHDAFMJGZNUPLGEWJLLAETG",
  "ENDYAHROHNLSRHEOCPTEOIBIDYSHNAIA",
  "CHTNREYULDSLLSLLNOHSNOSMRWXMNE",
  "TPRNGATIHNRARPESLNNELEBLPIIACAE",
  "WMTWNDITEENRAHCTENEUDRETNHAEOE",
  "TFOLSEDTIWENHAEIOYTEYQHEENCTAYCR",
  "EIFTBRSPAMHHEWENATAMATEGYEERLB",
  "TEEFOASFIOTUETUAEOTOARMAEERTNRTI",
  "BSEDDNIAAHTTMSTEWPIEROAGRIEWFEB",
  "AECTDDHILCEIHSITEGOEAOSDDRYDLORIT",
  "RKLMLEHAGTDHARDPNEOHMGFMFEUHE",
  "ECDMRIPFEIMEHNLSSTTRTVDOHW?"
];

const CIPHER_LINES_K4 = [
  "OBKROUXOGHULBSOLIFBBWFLRVQQPRNGKSSO",
  "TWTQSJQSSEKZZWATJKLUDIAWINFBNYP",
  "VTTMZFPKWGDKZXTJCDIGKUHUAUEKCAR"
];

export function CipherPanel() {
  return (
    <div className="w-full bg-[#121216] border border-zinc-800/80 rounded-lg p-4 sm:p-6 shadow-2xl relative overflow-hidden select-text text-left font-mono">
      {/* Textured metal background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/5 via-transparent to-black/30 pointer-events-none" />
      
      {/* Engraved Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3 mb-4 select-none">
        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
          // CYCLICAL VIGENÈRE MATRIX
        </span>
        <span className="text-[9px] px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded">
          COPPER SCREEN S-2
        </span>
      </div>

      {/* Main Cipher Grid */}
      <div className="space-y-0.5 text-xs sm:text-sm tracking-widest text-zinc-300 relative z-10 leading-normal max-w-full overflow-x-auto">
        <div style={{ textShadow: "1px 1px 1px rgba(255,255,255,0.05), -1px -1px 1px rgba(0,0,0,0.8)" }}>
          {CIPHER_LINES_MAIN.map((line, idx) => (
            <div key={idx} className="whitespace-nowrap hover:text-emerald-400/80 transition-colors duration-200">
              {line}
            </div>
          ))}
        </div>

        {/* Separator / Divider */}
        <div className="py-2 flex items-center gap-2 select-none">
          <div className="h-[1px] bg-zinc-800/80 flex-1" />
          <span className="text-[8px] text-zinc-600 font-bold tracking-widest font-sans">K4 BOUNDARY</span>
          <div className="h-[1px] bg-zinc-800/80 flex-1" />
        </div>

        {/* K4 Block (pulsing red highlight) */}
        <div 
          className="p-3 bg-red-950/10 border border-red-900/20 hover:border-red-900/50 rounded relative group/k4 transition-all duration-300 shadow-[inset_0_0_12px_rgba(239,68,68,0.02)] animate-[pulse_3s_ease-in-out_infinite]"
          style={{ textShadow: "1px 1px 1px rgba(239,68,68,0.1), -1px -1px 1px rgba(0,0,0,0.9)" }}
        >
          {CIPHER_LINES_K4.map((line, idx) => (
            <div key={idx} className="text-red-400/90 whitespace-nowrap font-bold hover:text-red-300 transition-colors duration-200">
              {line}
            </div>
          ))}

          {/* Absolute Badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5 select-none bg-red-950/80 border border-red-800/50 text-[8px] text-red-400 font-bold px-2 py-0.5 rounded tracking-widest uppercase shadow-md opacity-90 group-hover/k4:opacity-100 transition-opacity">
            <span className="w-1 h-1 rounded-full bg-red-500 animate-ping" />
            STILL UNSOLVED — 2026
          </div>
        </div>
      </div>

      {/* Embedded style for pulse animations just in case */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; border-color: rgba(239, 68, 68, 0.2); box-shadow: inset 0 0 12px rgba(239,68,68,0.02); }
          50% { opacity: 0.95; border-color: rgba(239, 68, 68, 0.4); box-shadow: inset 0 0 20px rgba(239,68,68,0.06); }
        }
      `}</style>
    </div>
  );
}

export default CipherPanel;
