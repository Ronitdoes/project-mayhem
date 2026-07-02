"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, FormEvent } from "react";
import UsernameField from "./UsernameField";
import PasswordField from "./PasswordField";
import LoginButton from "./LoginButton";
import LoginStatus from "./LoginStatus";

interface LoginCardProps {
  username: string;
  password: string;
  setUsername: (val: string) => void;
  setPassword: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
  loading: boolean;
  error: string | null;
  disabled: boolean;
}

export default function LoginCard({
  username,
  password,
  setUsername,
  setPassword,
  onSubmit,
  loading,
  error,
  disabled,
}: LoginCardProps) {
  const controls = useAnimation();

  useEffect(() => {
    if (error) {
      controls.start({
        x: [0, -10, 10, -10, 10, -10, 10, 0],
        transition: { duration: 0.4, ease: "easeInOut" },
      });
    }
  }, [error, controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={controls}
      onViewportEnter={() => controls.start({ opacity: 1, y: 0 })}
      className="w-full max-w-md bg-slate-950/40 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-xl shadow-[0_0_40px_rgba(30,58,138,0.15)] flex flex-col space-y-6 select-none relative"
    >
      {/* Aesthetic Border Highlight */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-t-xl" />

      {/* Top Protocol Status Indicators */}
      <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-3">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Protocol Node: Active
        </span>
        <span>Secure Clearance Lvl 4</span>
      </div>

      {/* Header Profile Title */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 rounded-full border border-blue-500/20 bg-blue-950/20 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 className="text-xl font-bold font-mono tracking-widest text-white uppercase mt-3">
          Chronos Terminal
        </h1>
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Administrative Console Gatekeeper
        </p>
      </div>

      {/* Form Credentials Input */}
      <form onSubmit={onSubmit} className="space-y-5">
        <UsernameField value={username} onChange={setUsername} disabled={disabled || loading} />
        <PasswordField value={password} onChange={setPassword} disabled={disabled || loading} />

        <div className="pt-2">
          <LoginButton loading={loading} disabled={disabled} />
        </div>
      </form>

      {/* Status Log Messages */}
      <LoginStatus error={error} />

      {/* Decorative Matrix Watermark */}
      <div className="text-center border-t border-white/5 pt-3">
        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
          System Node · ID: CF-04-ADMIN-GATE-808
        </span>
      </div>
    </motion.div>
  );
}
