/**
 * Calculates the score for a solved puzzle based on base points and hints used.
 * Each hint used deducts 50 points, with a minimum score of 0.
 */
export function calcScore(basePoints: number, hintsUsed: number): number {
  return Math.max(0, basePoints - hintsUsed * 50);
}
