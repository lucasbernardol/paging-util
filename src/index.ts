import {
  FIRST_PAGE,
  MIN_ITEMS_PER_PAGE,
  MAX_ITEMS_PER_PAGE,
} from './constants/paging';

export interface Options {
  /**
   * @default 1
   */
  page?: number;

  /**
   * @default 10
   */
  limit?: number;
  records: number;

  /**
   * @default false
   */
  setRange?: boolean;

  max?: number;
  min?: number;
}

export interface Constants {
  MIN_LIMIT: number;
  MAX_LIMIT: number;
}

export interface OutPut {
  records: number;
  totalPages: number;
  currentPage: number;
  firstPage: number;
  limit: number;
  next: number | null;
  previous: number | null;
  hasNext: boolean;
  hasPrevious: boolean;
  firstIndex: number;
  lastIndex: number;
  length: number;

  range: number[] | null;
  offset: number;
  constants: Constants;
}

function isUndefined(value: any): boolean {
  return typeof value === 'undefined';
}

/**
 * @function lessThanOneNaN
 */
function lessThanOneNaN(value: any): boolean {
  return value < 1 || isNaN(value);
}

/**
 * - Offset-based pagination.
 */
export function offsetBased(page: number, limit?: number) {
  const limitInput = lessThanOneNaN(limit) ? MIN_ITEMS_PER_PAGE : Number(limit);

  const offset = ((Number(page) || FIRST_PAGE) - 1) * limitInput;

  return offset;
}

/**
 * @function range
 */
export function range(start: number, stop?: number, step: number = 1) {
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

  if (startIsGreaterThanStop) steps *= -1;

  let interactionsIndex = start;
  while (steps > 0 ? interactionsIndex <= stop : interactionsIndex >= stop) {
    accumulator.push(interactionsIndex);

    interactionsIndex += steps;
  }

  return accumulator;
}

/**
 * @function paginate
 */
export function paginate(options: Options) {
  const { page, limit: take, records: total, max, min } = options || {};

  /**
   *  MIN_LIMIT && MAX_LIMIT
   */
  const MIN_LIMIT = lessThanOneNaN(min) ? MIN_ITEMS_PER_PAGE : Number(min);

  const MAX_LIMIT = lessThanOneNaN(max) ? MAX_ITEMS_PER_PAGE : Number(max);

  /**
   * - records: `number`
   */
  const records = Number(total);

  const recordsIsLessThanZeroNaN = records < 0 || isNaN(records);

  if (recordsIsLessThanZeroNaN) return null;

  /**
   * - limit
   */
  let limit: number = Number(take);

  const limitIsLessThanOneNaN = lessThanOneNaN(take);

  if (limitIsLessThanOneNaN) {
    // Default: 10
    limit = MIN_LIMIT;
  } else if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }

  /**
   * - pages: `number`
   */
  const totalPages = Math.max(FIRST_PAGE, Math.ceil(records / limit));

  /**
   * - current: `number`
   */
  let currentPage = Number(page);

  const currentIsLessThanOneNaN = lessThanOneNaN(currentPage);

  if (currentIsLessThanOneNaN) {
    // Default: 1
    currentPage = FIRST_PAGE;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  /**
   * - next `number`
   * - previous `number`
   */
  const hasNext = currentPage < totalPages;

  const hasPrevious = currentPage > FIRST_PAGE;

  const next = hasNext ? currentPage + 1 : null;

  const previous = hasPrevious ? currentPage - 1 : null;

  /**
   * - offset `number`
   */
  const offset = offsetBased(currentPage, limit);

  /**
   * - firstIndex: `number`
   *
   * - lastIndex: `number`
   */
  const firstIndex = offsetBased(currentPage, limit);

  let lastIndex = Math.min(firstIndex + limit - 1, records - 1);

  if (lastIndex < 0) lastIndex = 0;

  /**
   * - range: `number[]`
   */
  const arrayOfPages = options?.setRange ? range(FIRST_PAGE, totalPages) : null;

  /**
   * - length
   */
  const length = Math.min(lastIndex - firstIndex + 1, records);

  return {
    records,
    totalPages,
    currentPage,
    firstPage: FIRST_PAGE,
    limit,
    next,
    previous,
    hasNext,
    hasPrevious,
    firstIndex,
    lastIndex,
    length,

    offset,
    constants: {
      MIN_LIMIT,
      MAX_LIMIT,
    },

    range: arrayOfPages,
  };
}
