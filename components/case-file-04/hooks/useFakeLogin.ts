import { useState } from "react";
import { login } from "../lib/fakeAuth";
import { isValidUsername } from "../lib/validators";

export function useFakeLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  const performLogin = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    // Simulate Network/Server delay (800–1200 ms)
    const delay = Math.floor(Math.random() * 400) + 800;
    await new Promise((resolve) => setTimeout(resolve, delay));

    let isDbCorrect = false;

    if (isValidUsername(username)) {
      try {
        const res = await fetch("/api/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            caseId: "04",
            puzzleKey: "fake_login",
            answer: password,
          }),
        });
        const data = await res.json();
        isDbCorrect = data.success && data.correct;
      } catch (err) {
        console.error("Failed to query API for authentication verification:", err);
      }
    }

    if (isDbCorrect) {
      setLoading(false);
      setAuthenticated(true);
      return true;
    } else {
      // Fire fake auth request to make Network tab interesting
      const result = await login();
      setError(result.error);
      setLoading(false);
      return false;
    }
  };

  return {
    loading,
    error,
    authenticated,
    performLogin,
    setError,
  };
}
