import {
  FIRST_PAGE,
  MIN_ITEMS_PER_PAGE,
  MAX_ITEMS_PER_PAGE,
} from './constants/paging';

/**
 * @interface Options
 */
export interface Options {
  records: number;

  /**
   * @default
   *  const page = 1;
   */
  page?: number;

  /**
   * @default
   *  const MIN_LIMIT= 10;
   */
  limit?: number;

  /**
   * @default false
   */
  setRange?: boolean;

  max?: number;
  min?: number;
}

/**
 * @interface Constants
 */
export interface Constants {
  FIRST_PAGE: number;
  MIN_LIMIT: number;
  MAX_LIMIT: number;
}

/**
 * @interface Output
 */
export interface Output {
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

export interface LessThanOneOrNaNOutput {
  isInvalid: boolean;
  parsedValue: number;
}

const isUndefined = (value: any) => typeof value === 'undefined';

/**
 * - Util
 * @function lessThanOneOrNaN
 */
export function lessThanOneNaN<T = any>(value: T): LessThanOneOrNaNOutput {
  const parseInputToNumber = Number(value);

  const isInvalid = parseInputToNumber < 1 || isNaN(parseInputToNumber);

  return {
    parsedValue: parseInputToNumber,
    isInvalid,
  };
}

/**
 * - Calculate Offset based pagination.
 * @function offsetBased
 */
export function offsetBased(page: number, limit?: number) {
  const { parsedValue, isInvalid } = lessThanOneNaN(limit);

  const totalPerPage = isInvalid ? MIN_ITEMS_PER_PAGE : parsedValue;

  return ((Number(page) || FIRST_PAGE) - 1) * totalPerPage;
}

/**
 * - Calculate range
 * @function range
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

/**
 * @description Main function: "paginate"
 * @function paginate
 */
export function paginate(options: Options): Output | null {
  const { records: total, limit: totalItemsPerPage, page } = options;

  /** Fix constants  */
  let MIN_LIMIT: number;

  let MAX_LIMIT: number;

  const minLimitLessThanOneNaN = lessThanOneNaN(options.min);

  MIN_LIMIT = minLimitLessThanOneNaN.isInvalid
    ? MIN_ITEMS_PER_PAGE
    : minLimitLessThanOneNaN.parsedValue;

  const maxLimitLessThanOneNaN = lessThanOneNaN(options.max);

  MAX_LIMIT = maxLimitLessThanOneNaN.isInvalid
    ? MAX_ITEMS_PER_PAGE
    : maxLimitLessThanOneNaN.parsedValue;

  /**
   * - records: `number`
   */
  const records = Number(total);

  const recordsIsLessThanZeroNaN = records < 0 || isNaN(records);

  if (recordsIsLessThanZeroNaN) {
    return null;
  }

  /**
   * @description limit: `number`
   **/
  let limit: number = Number(totalItemsPerPage);

  const limitLessThanOneNaNResult = lessThanOneNaN(limit);

  limit = limitLessThanOneNaNResult.isInvalid ? MIN_LIMIT : limit;

  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }

  /**
   * - totalPages: `number`
   */
  const totalPages = Math.max(FIRST_PAGE, Math.ceil(records / limit));

  /**
   * @description - current: `number`
   */
  let currentPage = Number(page);

  const currentIsLessThanOneNaN = lessThanOneNaN(currentPage);

  currentPage = currentIsLessThanOneNaN.isInvalid ? FIRST_PAGE : currentPage;

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  /**
   * - next `number`
   *
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

  if (lastIndex < 0) {
    lastIndex = 0;
  }

  /**
   * - range: `number[]`
   */
  const rangeArray = options?.setRange ? range(FIRST_PAGE, totalPages) : null;

  /**
   * Total results
   * - length: `number`
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
    range: rangeArray,
    offset,
    constants: {
      MIN_LIMIT,
      MAX_LIMIT,
      FIRST_PAGE,
    },
  };
}
