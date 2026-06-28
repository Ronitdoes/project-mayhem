"use client";

import { useCaseStore } from "../CaseFileProvider";
import { puzzlesConfig } from "../lib/puzzles.config";

export function useHints(puzzleId: number) {
  const hintsUsedMap = useCaseStore((state) => state.hintsUsed);
  const useHintAction = useCaseStore((state) => state.useHint);

  const unlockedCount = hintsUsedMap[puzzleId] || 0;
  const config = puzzlesConfig.find((p) => p.id === puzzleId);
  const availableHints = config ? config.hints : [];
  const unlockedHints = availableHints.slice(0, unlockedCount);

  const unlockNextHint = () => {
    if (unlockedCount >= availableHints.length) return false;

    const confirmUnlock = window.confirm(
      `Warning: Revealing this hint will deduct 50 points from this puzzle's potential score. Do you want to proceed?`
    );

    if (confirmUnlock) {
      useHintAction(puzzleId);
      return true;
    }
    return false;
  };

  return {
    unlockedCount,
    availableHints,
    unlockedHints,
    unlockNextHint,
    maxHints: availableHints.length,
  };
}
