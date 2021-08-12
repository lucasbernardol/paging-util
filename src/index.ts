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

export interface Options {
  total: number;
  maxLimit?: number;
  /**
   * @default 10
   */
  limit?: number;

  /**
   * @default 1
   */
  page?: number;
  /**
   * @example const pages = [1, 2, 3, ...];
   * @default false
   */
  calculateRange?: boolean;
}

export interface Pagination {
  items: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
  offSet?: number;
}

export interface PaginationOutput {
  pagination: Pagination;
  range?: number[] | null;
}
