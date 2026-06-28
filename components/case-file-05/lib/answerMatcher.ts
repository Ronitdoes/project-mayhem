import { PuzzleConfig } from "./puzzles.config";

export interface MatchResult {
  matched: boolean;
  partial: boolean;
  message?: string;
}

/**
 * Normalizes a string by converting it to lowercase,
 * removing punctuation and special characters, and trimming extra spaces.
 */
export function normalize(s: string): string {
  if (!s) return "";
  return s
    .toLowerCase()
    // Remove all punctuation/special characters (keep only alphanumeric characters and single spaces)
    .replace(/[^a-z0-9\s]/g, "")
    // Collapse multiple spaces into one
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Computes the Levenshtein distance between two strings.
 */
export function getLevenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,    // deletion
          dp[i][j - 1] + 1,    // insertion
          dp[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return dp[m][n];
}

/**
 * Computes similarity between two normalized strings as a percentage (0 to 1).
 */
export function getSimilarity(s1: string, s2: string): number {
  const dist = getLevenshteinDistance(s1, s2);
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 1.0;
  return 1 - dist / maxLen;
}

/**
 * Validates the user's input against the puzzle configuration.
 */
export function matchAnswer(input: string, config: PuzzleConfig): MatchResult {
  const normInput = normalize(input);
  
  if (!normInput) {
    return { matched: false, partial: false };
  }

  const normCanonical = normalize(config.answer);
  const normAliases = (config.aliases || []).map(normalize);

  // 1. Exact match against canonical answer (normalized)
  if (normInput === normCanonical) {
    return { matched: true, partial: false };
  }

  // 2. Exact match against aliases (normalized)
  if (normAliases.includes(normInput)) {
    return { matched: true, partial: false };
  }

  // 3. Fuzzy match using Levenshtein distance/similarity if fuzzyThreshold is below 1.0
  const threshold = config.fuzzyThreshold !== undefined ? config.fuzzyThreshold : 1.0;
  if (threshold < 1.0) {
    const similarityCanonical = getSimilarity(normInput, normCanonical);
    if (similarityCanonical >= threshold) {
      return { matched: true, partial: false };
    }

    for (const normAlias of normAliases) {
      const similarityAlias = getSimilarity(normInput, normAlias);
      if (similarityAlias >= threshold) {
        return { matched: true, partial: false };
      }
    }
  }

  // 4. Partial credit check: if input is a substring of the canonical answer (min length 3)
  if (normInput.length >= 3) {
    const isSubstringOfCanonical = normCanonical.includes(normInput);
    const isSubstringOfAnyAlias = normAliases.some(alias => alias.includes(normInput));

    if (isSubstringOfCanonical || isSubstringOfAnyAlias) {
      return {
        matched: false,
        partial: true,
        message: "Include the full answer — try again",
      };
    }
  }

  return { matched: false, partial: false };
}
