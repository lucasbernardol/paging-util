/**
 * @function
 */
export function offSetCalculation(page: number, limit: number) {
  const totalArgumentsIsLessThanTwo = arguments.length < 2;

  if (totalArgumentsIsLessThanTwo) {
    return null;
  }

  return (page - 1) * limit;
}

/**
 * @constant
 */
const lessThanOneNaNFunction = (value: number) => {
  return value < 1 || isNaN(value);
};

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

  const { minLimit = minItemsPerPage, maxLimit = maxItemsPerPage } = context;

  const { total, limit = minLimit, page = firstPage, setRange } = context;

  /**
   * - items
   */
  const items = Number(total);

  const totalInputLessThanOneOrNaN = lessThanOneNaNFunction(items);

  if (totalInputLessThanOneOrNaN) {
    return null;
  }

  /**
   * - limit
   */
  let totalItemsPerPage = Number(limit);

  const limitInputIsLessThanOneNaN = lessThanOneNaNFunction(totalItemsPerPage);

  totalItemsPerPage = limitInputIsLessThanOneNaN ? minLimit : totalItemsPerPage;

  totalItemsPerPage =
    totalItemsPerPage > maxLimit ? maxLimit : totalItemsPerPage;

  /**
   * - pages
   */
  const pages = Math.max(firstPage, Math.ceil(items / totalItemsPerPage));

  /**
   * - current page index
   */
  let currentPage = Number(page);

  const pageInputIsLessThanOneNaN = lessThanOneNaNFunction(currentPage);

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
  const offSet = offSetCalculation(currentPage, totalItemsPerPage);

  /**
   * - pagination range
   */
  const calculatedPaginationRange = setRange ? range(firstPage, pages) : null;

  /**
   * - first, last result
   */
  const firstResult = offSetCalculation(currentPage, totalItemsPerPage);

  const lastResult = Math.min(firstResult + totalItemsPerPage - 1, items - 1);

  /**
   * - total results
   */
  const results = Math.min(lastResult - firstResult + 1, items);

  return {
    pagination: {
      total: items,
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
