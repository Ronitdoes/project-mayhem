export function isValidUsername(username: string): boolean {
  return username.trim() === "admin";
}

export function isGhostAnswerCorrect(answer: string): boolean {
  return answer.trim().toUpperCase() === "GHOST";
}
