/**
 * @constant
 */
const firstPage = 1;

/**
 * @constant
 */
const maxItemsPerPage = 30;

/**
 * @constant
 */
const minItemsPerPage = 10;

export function calculateRange(start: number, end: number): number[] | null {
  const argumentsLengthIsLessThanTwo = arguments.length < 2;

  if (argumentsLengthIsLessThanTwo) return null;

  const accumulator: number[] = [];

  const lastInteraction = end - start + 1;

  let interactions = 0;

  while (interactions < lastInteraction) {
    accumulator[interactions] = start + interactions;

    interactions++;
  }

  return accumulator.length ? accumulator : null;
}

export interface Options {
  total: number;
  maxLimit?: number;
  minLimit?: number;
  /**
   * @default 10
   */
  limit?: number;

  /**
   * @default 1
   */
  page?: number;
  /**
   * @default false
   */
  setRange?: boolean;
  /**
   * @default false
   */
  setStatic?: boolean;
}

export interface Static {
  minItemsPerPage: number;
  maxItemsPerPage: number;
}

export interface Pagination {
  total: number;
  pages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  next: number | null;
  previous: number | null;
  firstIndex?: number;
  lastIndex?: number;
  maxLimit?: number;
  minLimit?: number;
  offSet?: number;
  range?: number[] | null;
  static?: Static | null;
}

const lessThanOneOrNaN = (v: number) => v < 1 || isNaN(v);

export function paginate(options: Options): Pagination {
  const {
    total,
    limit = minItemsPerPage,
    page = firstPage,
    minLimit = minItemsPerPage,
    maxLimit = maxItemsPerPage,
    setRange = false,
    setStatic = false,
  } = options || {};

  const totalItems = Number(total);

  const totalInputIsNaNLessThanOne = lessThanOneOrNaN(totalItems);

  if (totalInputIsNaNLessThanOne) {
    return null;
  }

  /**
   *  - Total items per page
   */
  let totalItemsPerPage = Number(limit);

  const limitInputIsLessThanOneNaN = lessThanOneOrNaN(totalItemsPerPage);

  if (limitInputIsLessThanOneNaN) {
    /**
     * default: 10
     */
    totalItemsPerPage = minLimit;
  } else if (totalItemsPerPage > maxLimit) {
    totalItemsPerPage = maxLimit;
  }

  const totalPages = Math.ceil(totalItems / totalItemsPerPage) || firstPage;

  /**
   * - Current page index
   */
  let currentPage = Number(page);

  const pageInputIsLessThanOneNaN = lessThanOneOrNaN(currentPage);

  if (pageInputIsLessThanOneNaN) {
    /**
     * default: 1
     */
    currentPage = firstPage;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  /**
   * - Previous
   * - Next
   */
  const hasNextPage = currentPage < totalPages;

  const hasPreviousPage = currentPage > firstPage;

  const next = hasNextPage ? currentPage + 1 : null;

  const previous = hasPreviousPage ? currentPage - 1 : null;

  /**
   * - offSet
   * - take
   */
  const firstIndex = (currentPage - 1) * totalItemsPerPage;

  const lastIndex = Math.min(
    firstIndex + totalItemsPerPage - 1,
    totalItems - 1
  );

  /**
   * - calculate range
   */
  const range = setRange ? calculateRange(firstPage, totalPages) : null;

  /**
   * - static values
   */
  const staticValues: Static = setStatic
    ? { minItemsPerPage, maxItemsPerPage }
    : null;

  return {
    total: totalItems,
    pages: totalPages,
    currentPage,
    limit: totalItemsPerPage,
    maxLimit,
    minLimit,
    next,
    previous,
    hasNextPage,
    hasPreviousPage,
    offSet: firstIndex,
    firstIndex,
    lastIndex,
    range,
    static: staticValues,
  };
}
