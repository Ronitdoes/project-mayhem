import { useState } from "react";
import { validateAnswer } from "@/lib/validateAnswer";
import { morsePuzzleData } from "@/data/morseTransmission";

export function useMorsePuzzle() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [hintIndex, setHintIndex] = useState(-1);
  const [isSolved, setIsSolved] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async () => {
    if (isVerifying) return;
    setIsVerifying(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseId: "09",
          puzzleKey: "morse",
          answer: answer
        })
      });
      const data = await res.json();
      if (data.success && data.correct) {
        setIsSolved(true);
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsVerifying(false);
    }
  };

  const showNextHint = () => {
    if (hintIndex < morsePuzzleData.hints.length - 1) {
      setHintIndex((prev) => prev + 1);
    }
  };

  return {
    answer,
    setAnswer,
    error,
    setError,
    hintIndex,
    isSolved,
    handleSubmit,
    showNextHint,
    story: morsePuzzleData.story,
    transmission: morsePuzzleData.transmission,
    hints: morsePuzzleData.hints,
    title: morsePuzzleData.title,
  };
}
