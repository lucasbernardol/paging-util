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

/**
 * @function
 */
export function paginate(options: Options): OutPut {
  const {
    total: items,
    minLimit = minItemsPerPage,
    maxLimit = maxItemsPerPage,
    limit = minLimit,
    page = firstPage,
    setRange = true,
  } = options || {};

  /**
   * - total
   */
  const total = Number(items);

  const totalIsLessThanZeroNaN = total < 0 || isNaN(total);

  if (totalIsLessThanZeroNaN) return null;

  /**
   * - limit `number`
   */
  let totalItemsPerPage = Number(limit);

  const limitInputIsLessThanOneNaN = isLessThanOneNaN(totalItemsPerPage);

  if (limitInputIsLessThanOneNaN) {
    /**
     * @default 10
     */
    totalItemsPerPage = minLimit;
  } else if (totalItemsPerPage > maxLimit) {
    totalItemsPerPage = maxLimit;
  }

  /**
   * - pages `number`
   */
  const pages = Math.max(firstPage, Math.ceil(total / totalItemsPerPage));

  /**
   * - current page `number`
   */
  let current = Number(page);

  const pageInputIsLessThanOneNaN = isLessThanOneNaN(current);

  if (pageInputIsLessThanOneNaN) {
    /**
     * @default 1
     */
    current = firstPage;
  } else if (current > pages) {
    current = pages;
  }

  /**
   * - hasNext `boolean`
   * - hasPrevious `boolean`
   *
   * - next `number`
   * - previous `number`
   */
  const hasNext = current < pages;

  const hasPrevious = current > firstPage;

  const next = hasNext ? current + 1 : null;

  const previous = hasPrevious ? current - 1 : null;

  /**
   * - offSet `number`
   */
  const offSet = offsetBased(current, totalItemsPerPage);

  /**
   * - range
   */
  const calculatedRange: number[] = setRange ? range(firstPage, pages) : null;

  /**
   * - first index `number`
   * - last index `number`
   */
  const firstIndex = offsetBased(current, totalItemsPerPage);

  let lastIndex = Math.min(firstIndex + totalItemsPerPage - 1, total - 1);

  lastIndex = lastIndex < 0 ? 0 : lastIndex;

  /**
   * - results `number`
   */
  const length = Math.min(lastIndex - firstIndex + 1, total);

  return {
    offSet,
    pagination: {
      total,
      pages,
      current,
      firstPage,
      limit: totalItemsPerPage,
      firstIndex,
      lastIndex,
      next,
      previous,
      hasNext,
      hasPrevious,
      length,
    },
    range: calculatedRange,
  };
}

export interface Options {
  /**
   * total number of items to be paged
   */
  total: number;
  maxLimit?: number;
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
  current: number;
  firstPage: number;
  limit: number;
  next: number | null;
  previous: number | null;
  hasNext: boolean;
  hasPrevious: boolean;
  firstIndex: number;
  lastIndex: number;
  length: number;
}

export interface OutPut {
  pagination: Pagination;
  /**
   * Pagination, `Offset-based`
   */
  offSet: number;
  /**
   * Array of pages
   */
  range: number[] | null;
}
