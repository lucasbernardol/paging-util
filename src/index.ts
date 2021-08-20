/**
 * Calculate range
 * @function
 */
export function range(start?: number, end?: number): number[] | null {
  const totalArgumentsIsLessThanTwo = arguments.length < 2;

  if (totalArgumentsIsLessThanTwo) {
    return null;
  }

  const accumulator: number[] = [];

  let interactionsIndex = 0;

  while (interactionsIndex < end - start + 1) {
    accumulator[interactionsIndex] = start + interactionsIndex;

    interactionsIndex++;
  }

  return accumulator.length ? accumulator : null;
}

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

const lessThanOneOrNaN = (v: number) => v < 1 || isNaN(v);

export interface Options {
  total: number;
  max?: number;
  min?: number;
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
}

export interface Static {
  minItemsPerPage: number;
  maxItemsPerPage: number;
}

export interface Pagination {
  total: number;
  pages: number;
  current: number;
  limit: number;
  min?: number;
  max?: number;
  next: number | null;
  previous: number | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  firstIndex: number;
  lastIndex: number;
  offSet?: number;
  range?: number[] | null;
  static?: Static | null;
}

/**
 * Calculate pagination
 * @function
 */
export function paginate(options: Options): Pagination | null {
  const {
    total,
    limit = minItemsPerPage,
    page = firstPage,
    min = minItemsPerPage,
    max = maxItemsPerPage,
    setRange = false,
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
    totalItemsPerPage = min;
  } else if (totalItemsPerPage > max) {
    totalItemsPerPage = max;
  }

  /**
   * - total pages
   */
  const totalPages = Math.ceil(totalItems / totalItemsPerPage) || firstPage;

  /**
   * - Current page index
   */
  let current = Number(page);

  const pageInputIsLessThanOneNaN = lessThanOneOrNaN(current);

  if (pageInputIsLessThanOneNaN) {
    /**
     * default: 1
     */
    current = firstPage;
  } else if (current > totalPages) {
    current = totalPages;
  }

  /**
   * - Previous
   * - Next
   */
  const hasNextPage = current < totalPages;

  const hasPreviousPage = current > firstPage;

  const next = hasNextPage ? current + 1 : null;

  const previous = hasPreviousPage ? current - 1 : null;

  /**
   * - offSet
   * - take
   */
  const firstIndex = (current - 1) * totalItemsPerPage;

  const lastIndex = Math.min(
    firstIndex + totalItemsPerPage - 1,
    totalItems - 1
  );

  /**
   * - range
   */
  const calculatedRenge = setRange ? range(firstPage, totalPages) : null;

  return {
    total: totalItems,
    pages: totalPages,
    current,
    limit: totalItemsPerPage,
    max,
    min,
    firstIndex,
    lastIndex,
    next,
    previous,
    hasNextPage,
    hasPreviousPage,
    offSet: firstIndex,
    range: calculatedRenge,
  };
}
