/**
 * @constant
 */
export const offsetBased = (current: number, limit: number) => {
  return (current - 1) * limit;
};

/**
 * @constant
 */
const inputLessThanOneOrNaN = (value: number) => value < 1 || isNaN(value);

const firstPage = 1;

const maxItemsPerPage = 30;

const minItemsPerPage = 10;

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

export interface Options {
  /**
   * - total items to paginate
   */
  total: number;
  /**
   * @default 30
   */
  maxLimit?: number;
  /**
   * @default 10
   */
  minLimit?: number;
  /**
   * - total items to show per page
   * @default 10
   */
  limit?: number;
  /**
   * - current page
   * @default 1
   */
  page?: number;
  /**
   * @default false
   */
  setRange?: boolean;
}

export interface Pagination {
  total: number;
  pages: number;
  currentPage: number;
  firstPage: number;
  limit: number;
  next: number | null;
  previous: number | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  firstResult: number;
  lastResult: number;
  results?: number;
}

export interface PaginationOutPut {
  pagination: Pagination;
  /**
   * Pagination, `Offset-based`
   */
  offSet: number;
  /**
   * Array of pages, calculated from `current` page
   */
  range: number[] | null;
}

/**
 * Calculate pagination
 * @function
 */
export function paginate(options: Options): PaginationOutPut | null {
  /**
   * - context, options
   */
  const context = options || ({} as Options);

  const {
    total: items,
    minLimit = minItemsPerPage,
    maxLimit = maxItemsPerPage,
    limit = minLimit,
    page = firstPage,
    setRange,
  } = context;

  /**
   * - total
   */
  const total = Number(items);

  const totalInputLessThanOneOrNaN = inputLessThanOneOrNaN(total);

  if (totalInputLessThanOneOrNaN) return null;

  /**
   * - limit
   */
  let totalItemsPerPage = Number(limit);

  const limitInputIsLessThanOneNaN = inputLessThanOneOrNaN(totalItemsPerPage);

  totalItemsPerPage = limitInputIsLessThanOneNaN ? minLimit : totalItemsPerPage;

  totalItemsPerPage =
    totalItemsPerPage > maxLimit ? maxLimit : totalItemsPerPage;

  /**
   * - pages
   */
  const pages = Math.max(firstPage, Math.ceil(total / totalItemsPerPage));

  /**
   * - current page index
   */
  let currentPage = Number(page);

  const pageInputIsLessThanOneNaN = inputLessThanOneOrNaN(currentPage);

  currentPage = pageInputIsLessThanOneNaN ? firstPage : currentPage;

  currentPage = currentPage > pages ? pages : currentPage;

  /**
   * - next
   * - previous
   *
   * - hasNextPage
   * - hasPreviousPage
   **/
  const hasNextPage = currentPage < pages;

  const hasPreviousPage = currentPage > firstPage;

  const next = hasNextPage ? currentPage + 1 : null;

  const previous = hasPreviousPage ? currentPage - 1 : null;

  /**
   * - offSet
   */
  const offSet = offsetBased(currentPage, totalItemsPerPage);

  /**
   * - pagination range
   */
  const calculatedPaginationRange = setRange ? range(firstPage, pages) : null;

  /**
   * - first, last results
   */
  const firstResult = offsetBased(currentPage, totalItemsPerPage);

  const lastResult = Math.min(firstResult + totalItemsPerPage - 1, total - 1);

  /**
   * - results
   */
  const results = Math.min(lastResult - firstResult + 1, total);

  return {
    pagination: {
      total,
      results,
      pages,
      currentPage,
      firstPage,
      limit: totalItemsPerPage,
      firstResult,
      lastResult,
      hasNextPage,
      hasPreviousPage,
      next,
      previous,
    },
    offSet,
    range: calculatedPaginationRange,
  };
}
