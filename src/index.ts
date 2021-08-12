/**
 * Max items per page
 * @constant
 */
export const maxItemsPerPage = 30;

/**
 * Min items per page
 * @constant
 */
export const minItemsPerPage = 10;

/**
 * Inital page
 * @constant
 */
export const firstPage = 1;

/**
 * Calculate range
 */
export function range(start: number, end: number): number[] | null {
  const argumentsLengthIsLessThanTwo = arguments.length < 2;

  if (argumentsLengthIsLessThanTwo) {
    return null;
  }

  const accumulator: number[] = [];

  const accumulatorArrayLength = end - start + 1;

  let interactionsIndex = 0;

  while (interactionsIndex < accumulatorArrayLength) {
    accumulator[interactionsIndex] = start + interactionsIndex;

    interactionsIndex++;
  }

  return accumulator.length ? accumulator : null;
}
