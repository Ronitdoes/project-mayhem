import {
  WORD_POOL,
  PERSISTENT_WORD,
  GRID_SIZE,
  PERSISTENT_INDEX,
} from "./constants";

export interface GhostWordItem {
  id: number;
  word: string;
  isPersistent: boolean;
}

export function generateGhostGrid(): GhostWordItem[] {
  const grid: GhostWordItem[] = [];
  const poolLength = WORD_POOL.length;

  for (let i = 0; i < GRID_SIZE; i++) {
    if (i === PERSISTENT_INDEX) {
      grid.push({
        id: i,
        word: PERSISTENT_WORD,
        isPersistent: true,
      });
    } else {
      const randomIndex = Math.floor(Math.random() * poolLength);
      grid.push({
        id: i,
        word: WORD_POOL[randomIndex],
        isPersistent: false,
      });
    }
  }

  return grid;
}

export function getRandomInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
