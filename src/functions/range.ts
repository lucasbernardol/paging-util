import { isUndefined } from '../utils/isUndefined';

/**
 * @function range Calculate range or array of pages
 */
export function range(start: number, stop?: number, step = 1): number[] {
  const accumulator: number[] = [];

  let steps = Number(step);

  const stepIsEqualZeroNaN = steps === 0 || isNaN(steps);

  if (stepIsEqualZeroNaN) return accumulator; // []

  const stopParamIsUndefined = isUndefined(stop);

  if (stopParamIsUndefined) {
    stop = start;
    start = 0;
  }

  const startIsGreaterThanStop = steps > 0 && start > stop;

  if (startIsGreaterThanStop) steps *= -1; // [4, 3, 2, 1]

  let interactionsIndex = start;
  while (steps > 0 ? interactionsIndex <= stop : interactionsIndex >= stop) {
    accumulator.push(interactionsIndex);

    interactionsIndex += steps;
  }

  return accumulator;
}
