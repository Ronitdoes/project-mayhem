import { useState, useEffect, useRef } from "react";
import { generateGhostGrid, GhostWordItem, getRandomInterval } from "../lib/ghostGenerator";
import { INTERVAL_MIN_MS, INTERVAL_MAX_MS } from "../lib/constants";

export function useGhostWords() {
  const [words, setWords] = useState<GhostWordItem[]>(() => generateGhostGrid());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let mounted = true;

    const tick = () => {
      if (!mounted) return;
      setWords(generateGhostGrid());
      const nextDelay = getRandomInterval(INTERVAL_MIN_MS, INTERVAL_MAX_MS);
      timerRef.current = setTimeout(tick, nextDelay);
    };

    const initialDelay = getRandomInterval(INTERVAL_MIN_MS, INTERVAL_MAX_MS);
    timerRef.current = setTimeout(tick, initialDelay);

    return () => {
      mounted = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { words };
}
