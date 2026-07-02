"use client";

import { useState, useEffect } from "react";
import { useCaseStore } from "../CaseFileProvider";
import { calcScore } from "../lib/scoring";
import { matchAnswer } from "../lib/answerMatcher";
import { puzzlesConfig } from "../lib/puzzles.config";

export function useAnswerValidation(puzzleId: number) {
  const [inputValue, setInputValue] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isPartial, setIsPartial] = useState(false);
  const [message, setMessage] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const solved = useCaseStore((state) => state.solved);
  const hintsUsedMap = useCaseStore((state) => state.hintsUsed);
  const solvePuzzle = useCaseStore((state) => state.solvePuzzle);

  const isSolved = solved.includes(puzzleId);
  const hintsUsedCount = hintsUsedMap[puzzleId] || 0;

  // Reset input state when puzzle ID changes or is solved
  useEffect(() => {
    setInputValue("");
    setIsShaking(false);
    setIsPartial(false);
    setMessage("");
    setWrongAttempts(0);
  }, [puzzleId, isSolved]);

  const [isVerifying, setIsVerifying] = useState(false);

  const submitAnswer = async () => {
    if (isSolved || isVerifying) return;

    const config = puzzlesConfig.find((p) => p.id === puzzleId);
    if (!config) {
      setMessage("Error: Puzzle configuration not found.");
      return;
    }

    setIsVerifying(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseId: "05",
          puzzleKey: config.slug,
          answer: inputValue
        })
      });
      const data = await res.json();
      if (data.success && data.correct) {
        // Calculate final score based on hints used
        const finalScore = calcScore(config.points, hintsUsedCount);
        solvePuzzle(puzzleId, finalScore);
        setIsPartial(false);
        setMessage("");
      } else if (data.success && data.partial) {
        setIsPartial(true);
        setMessage("INCOMPLETE MATCH - Include the full answer. Try again.");
      } else {
        setIsPartial(false);
        setIsShaking(true);
        setWrongAttempts((prev) => prev + 1);
        setMessage("NO HISTORICAL CORRELATION DETECTED - Archive remains unstable.");
        
        // Auto-reset shake state after animation duration (e.g. 500ms)
        setTimeout(() => {
          setIsShaking(false);
        }, 500);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error validating answer. Try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    inputValue,
    setInputValue,
    isShaking,
    isPartial,
    isSolved,
    message,
    wrongAttempts,
    submitAnswer,
  };
}
