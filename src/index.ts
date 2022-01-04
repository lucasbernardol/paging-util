const lessThanOneNaN = (value: number): boolean => value < 1 || isNaN(value);

const FIRST_PAGE = 1;

const MAX_ITEMS_PER_PAGE = 30;

const MIN_ITEMS_PER_PAGE = 10;

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

export interface OutPut {
  /**
   * Pagination `Offset-based`
   */
  offset: number;
  /**
   * Array of pages
   */
  range: number[] | null;

  items: number;
  pages: number;
  current: number;
  limit: number;
  next: number | null;
  previous: number | null;
  hasNext: boolean;
  hasPrevious: boolean;
  firstPage: number;
  firstIndex: number;
  lastIndex: number;
  length: number;
}

export function offsetBased(current: number, limit?: number): number {
  const itemsToPagination = Number(limit) || MIN_ITEMS_PER_PAGE;

  return ((Number(current) || FIRST_PAGE) - 1) * itemsToPagination;
}

export function range(start: number, stop?: number, step: number = 1) {
  let steps = Number(step);

  const stepIsEqualZeroNaN = steps === 0 || isNaN(steps);

  if (stepIsEqualZeroNaN) return [];

  const stopIsUndefined = typeof stop === 'undefined';

  if (stopIsUndefined) {
    stop = start;
    start = 0;
  }

  const startIsGreaterThanStop = steps > 0 && start > stop;
  if (startIsGreaterThanStop) steps *= -1;

  const accumulator: number[] = [];
  let interactions = start;

  while (steps > 0 ? interactions <= stop : interactions >= stop) {
    accumulator.push(interactions);

    interactions += steps;
  }

  return accumulator;
}

/**
 * @function
 */
export function paginate(options: Options): OutPut | null {
  const {
    total: items,
    minLimit = MIN_ITEMS_PER_PAGE,
    maxLimit = MAX_ITEMS_PER_PAGE,
    limit = minLimit,
    page = FIRST_PAGE,
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

  const limitInputIsLessThanOneNaN = lessThanOneNaN(totalItemsPerPage);

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
  const pages = Math.max(FIRST_PAGE, Math.ceil(total / totalItemsPerPage));

  /**
   * - current page `number`
   */
  let current = Number(page);

  const pageInputIsLessThanOneNaN = lessThanOneNaN(current);

  if (pageInputIsLessThanOneNaN) {
    /**
     * @default 1
     */
    current = FIRST_PAGE;
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

  const hasPrevious = current > FIRST_PAGE;

  const next = hasNext ? current + 1 : null;

  const previous = hasPrevious ? current - 1 : null;

  /**
   * - offSet `number`
   */
  const offset = offsetBased(current, totalItemsPerPage);

  /**
   * - range
   */
  const calculatedRange: number[] = setRange ? range(FIRST_PAGE, pages) : null;

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
    offset,
    items: total,
    pages,
    current,
    firstPage: FIRST_PAGE,
    limit: totalItemsPerPage,
    firstIndex,
    lastIndex,
    next,
    previous,
    hasNext,
    hasPrevious,
    length,
    range: calculatedRange,
  };
}
