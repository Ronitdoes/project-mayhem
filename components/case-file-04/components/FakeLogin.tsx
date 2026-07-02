"use client";

import React, { useState, useEffect } from "react";
import { PuzzleProps } from "../types";
import { useFakeLogin } from "../hooks/useFakeLogin";
import { initAuthHint } from "../lib/localStorage";
import { SOUND_HOOKS } from "../constants";
import LoginCard from "./LoginCard";
import SuccessScreen from "./SuccessScreen";
import LoadingOverlay from "./LoadingOverlay";
import HintConsole from "./HintConsole";

export default function FakeLogin({
  onSolved,
  onFailed,
  disabled = false,
}: PuzzleProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, authenticated, performLogin } = useFakeLogin();

  // Set the clue in Local Storage when the page first loads
  useEffect(() => {
    initAuthHint();
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || loading || authenticated) return;

    const isSuccess = await performLogin(username, password);

    if (isSuccess) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SOUND_HOOKS.onSuccess));
      }
      if (onSolved) {
        onSolved();
      }
    } else {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SOUND_HOOKS.onError));
      }
      if (onFailed) {
        onFailed();
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#070b19] overflow-y-auto p-4 md:p-8">
      {/* Sleek dashboard grids and matrix nodes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl flex flex-col md:grid md:grid-cols-12 gap-6 items-start justify-center">
        {authenticated ? (
          <div className="md:col-span-12 flex justify-center w-full">
            <SuccessScreen />
          </div>
        ) : (
          <>
            {/* Left Column: Login Card */}
            <div className="w-full md:col-span-6 lg:col-span-5 flex justify-center">
              <LoginCard
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                onSubmit={handleLoginSubmit}
                loading={loading}
                error={error}
                disabled={disabled}
              />
            </div>

            {/* Right Column: Hint Console */}
            <div className="w-full md:col-span-6 lg:col-span-7">
              <HintConsole disabled={disabled} />
            </div>
          </>
        )}
      </div>

      {loading && <LoadingOverlay />}
    </div>
  );
}
