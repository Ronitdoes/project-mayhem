"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DIALOG_HINTS = [
  {
    title: "SIGNAL CORRUPTION & NETWORK TRACES",
    description: "The authentication gateway is configured as a simulated sandbox, intentionally denying standard credentials with a strict '401 Unauthorized' response. However, secure portal networks leave metadata traces in their transmission packages. Try entering arbitrary credentials, trigger the validation flow, and inspect your browser's DevTools Network Tab. Analyze the failed POST request to '/api/auth' and review the Response Headers to find redirect fields like 'x-hint'."
  },
  {
    title: "NODE BACKUP STORAGE LOCATION",
    description: "Interception of the network response headers directs you to a secondary path: '/api/backup'. Navigating to this endpoint directly (GET /api/backup) queries the node's backup configuration storage. The server response yields a clear JSON payload containing the administrator username, a placeholder password string, and a system instruction to 'Check Local Storage'. The true authorization credentials rely on local environment registers."
  },
  {
    title: "LOCAL STORAGE REGISTER INTERROGATION",
    description: "Web applications store environment configurations locally inside client-side registers. Access your browser's DevTools panel, navigate to the 'Application' (or 'Storage') tab, expand the 'Local Storage' hierarchy list, and click on the current domain ('http://localhost:3000'). Search for the key 'auth_hint' in the record table. It contains the decryption logic needed to translate the placeholder password."
  },
  {
    title: "KEY TRANSFORMATION & DECRYPTION",
    description: "Apply the transformation rule discovered in the local storage registry to the credentials retrieved from the backup API. Execute the decrypted login credentials in the terminal console to override safety locks, purge the gateway anomaly, and stabilize the timeline segment."
  }
];

interface HintConsoleProps {
  disabled?: boolean;
}

export default function HintConsole({ disabled }: HintConsoleProps) {
  const [revealedCount, setRevealedCount] = useState(0);

  const revealNext = () => {
    if (disabled || revealedCount >= DIALOG_HINTS.length) return;
    setRevealedCount((prev) => prev + 1);
  };

  const resetConsole = () => {
    if (disabled) return;
    setRevealedCount(0);
  };

  return (
    <div className="w-full bg-slate-950/40 backdrop-blur-md border border-blue-500/10 rounded-xl p-5 sm:p-6 shadow-[0_0_30px_rgba(30,58,138,0.05)] space-y-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <h3 className="text-xs font-bold font-mono tracking-wider text-blue-400 uppercase flex items-center gap-2">
          <svg className="w-3.5 h-3.5 animate-pulse text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Diagnostic Console
        </h3>
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
          Decipher Guidance System
        </span>
      </div>

      <div className="space-y-4 min-h-[140px] flex flex-col justify-between">
        <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
          {revealedCount === 0 ? (
            <p className="text-xs font-mono text-zinc-500 leading-relaxed italic text-center py-6">
              Console Idle. Intercept diagnostic transmissions below to decode the login mechanism overrides...
            </p>
          ) : (
            <div className="space-y-3.5">
              {DIALOG_HINTS.slice(0, revealedCount).map((hint, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900/30 border border-blue-500/5 rounded-lg p-3 space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold font-mono text-blue-500">
                      STEP_0{idx + 1}: {hint.title}
                    </span>
                    <span className="text-[8px] font-mono text-zinc-600">UNLOCKED</span>
                  </div>
                  <p className="text-xs font-mono text-zinc-300 leading-relaxed text-justify select-text">
                    {hint.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-white/5">
          <button
            onClick={revealNext}
            disabled={disabled || revealedCount >= DIALOG_HINTS.length}
            className="flex-1 py-2 px-3 bg-blue-950/20 hover:bg-blue-900/25 border border-blue-900/35 text-blue-300 text-[10px] font-mono font-bold uppercase tracking-wider rounded transition-all active:scale-98 disabled:opacity-45 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {revealedCount >= DIALOG_HINTS.length
              ? "◈ Diagnostics Complete"
              : `◈ Decrypt Directive (${revealedCount + 1}/${DIALOG_HINTS.length})`}
          </button>
          {revealedCount > 0 && (
            <button
              onClick={resetConsole}
              disabled={disabled}
              className="py-2 px-3 bg-zinc-900/40 hover:bg-zinc-800/40 border border-white/5 text-zinc-500 hover:text-zinc-300 text-[10px] font-mono font-bold uppercase tracking-wider rounded transition-all active:scale-98"
            >
              Clear Logs
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
