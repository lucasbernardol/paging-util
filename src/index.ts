const isLessThanOneNaN = (value: number) => value < 1 || isNaN(value);

const firstPage = 1;
const maxItemsPerPage = 30;
const minItemsPerPage = 10;

/**
 * Calculate, pagination `offset-based`
 * @param current - current page
 * @param limit total items `resources` to show per page.
 */
export function offsetBased(current: number, limit: number) {
  return (current - 1) * limit;
}

/**
 * @function
 */
export function range(start: number, stop?: number, step: number = 1) {
  const accumulator: number[] = [];

  let steps = Number(step);

  const stepIsEqualZeroNaN = steps === 0 || isNaN(steps);
  if (stepIsEqualZeroNaN) return accumulator;

  /**
   * - stops
   */
  const stopIsUndefined = typeof stop === 'undefined';

  if (stopIsUndefined) {
    stop = start;
    start = 0;
  }

  const startIsGreaterThanStop = steps > 0 && start > stop;
  if (startIsGreaterThanStop) steps *= -1;

  /**
   * - range
   */
  let interactionsIndex = start;

  while (steps > 0 ? interactionsIndex <= stop : interactionsIndex >= stop) {
    accumulator.push(interactionsIndex);

    interactionsIndex += steps;
  }

  return accumulator;
}

export interface Options {
  /**
   * total number of items to be paged
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
   * Total number of items per page, defaults to `10`
   * @default 10
   */
  limit?: number;
  /**
   * current active page, default `1`
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

  const totalInputLessThanOneOrNaN = isLessThanOneNaN(total);

  if (totalInputLessThanOneOrNaN) return null;

  /**
   * - limit
   */
  let totalItemsPerPage = Number(limit);

  const limitInputIsLessThanOneNaN = isLessThanOneNaN(totalItemsPerPage);

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

  const pageInputIsLessThanOneNaN = isLessThanOneNaN(currentPage);

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
  const calculatedRange = setRange ? range(firstPage, pages) : null;

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
    range: calculatedRange,
  };
}
