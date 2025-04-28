/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @param {T[]} array - The array to shuffle
 * @returns {T[]} A new shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
  // Create a copy of the array to avoid mutating the original
  const result = [...array];

  // Fisher-Yates shuffle algorithm
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
