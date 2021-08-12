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

export interface Static {
  maxItemsPerPage: number;
  minItemsPerPage: number;
  firstPage: number;
}

export interface PaginationOutput {
  pagination: Pagination;
  range?: number[] | null;
  static?: Static | null;
}

export function paginate(options: Options): PaginationOutput {
  const {
    total,
    limit = minItemsPerPage,
    page = firstPage,
    maxLimit = maxItemsPerPage,
    calculateRange = false,
  } = options || {};

  const items = Number(total);

  const totalInputIsNaNLessThanOne = items < 1 || isNaN(items);

  if (totalInputIsNaNLessThanOne) return null;

  /**
   * Calculate total items per page
   */
  let totalPerPage = Number(limit);

  const limitInputIsLessThanZeroNaN = totalPerPage < 1 || isNaN(totalPerPage);

  if (limitInputIsLessThanZeroNaN) {
    /**
     * default: 10
     */
    totalPerPage = minItemsPerPage;
  } else if (totalPerPage > maxLimit) {
    totalPerPage = maxLimit;
  }

  /**
   * Calculate total pages
   */
  const totalPages = Math.ceil(items / totalPerPage) || firstPage;

  /**
   * Calculate current page
   */
  let currentPage = Number(page);

  const pageInputIsLessThanZeroNaN = currentPage < 1 || isNaN(currentPage);

  if (pageInputIsLessThanZeroNaN) {
    currentPage = firstPage;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  /**
   * Previous and Next page
   */
  const hasNextPage = currentPage < totalPages;

  const hasPreviousPage = currentPage > firstPage;

  const nextPage = hasNextPage ? currentPage + 1 : null;

  const previousPage = hasPreviousPage ? currentPage - 1 : null;

  /**
   * Offset or take
   */
  const offSet = (currentPage - 1) * totalPerPage;

  /**
   * Pagination range
   */
  const pages = calculateRange ? range(firstPage, totalPages) : null;

  return {
    pagination: {
      items,
      totalPages,
      currentPage,
      limit: totalPerPage,
      hasNextPage,
      hasPreviousPage,
      nextPage,
      previousPage,
      offSet,
    },
    static: {
      firstPage,
      maxItemsPerPage,
      minItemsPerPage,
    },
    range: pages,
  };
}
