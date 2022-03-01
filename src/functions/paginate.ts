import {
  FIRST_PAGE,
  MAX_ITEMS_PER_PAGE,
  MIN_ITEMS_PER_PAGE,
} from '../constants';

import { lessThan } from '../utils/lessThanOne';
import { offsetBased } from './offset';
import { range as calculateRange } from './range';

/**
 * @interface Options
 */
export interface Options {
  records: number;
  page?: number;
  limit?: number;

  /**
   * @default false
   */
  setRange?: boolean;
  /**
   * @default true
   */
  setConstants?: boolean;
  max?: number;
  min?: number;
}

/**
 * @interface Pagination
 */
export interface Pagination {
  records: number;
  totalPages: number;
  currentPage: number;
  firstPage: number;
  limit: number;
  next: number | null;
  previous: number | null;
  hasNext: boolean;
  hasPrevious: boolean;
  isLastPage: boolean;
  firstIndex: number;
  lastIndex: number;
  length: number;
  range: number[] | null;
}

/**
 * @interface Constants
 */
export interface Constants {
  MIN_LIMIT: number;
  MAX_LIMIT: number;
}

/**
 * @interface Output
 */
export interface Output {
  offset: number;
  pagination: Pagination;
  constants: Constants | null;
}

/**
 * @function paginate Main function: "paginate"
 */
export function paginate(options: Options): Output {
  const {
    setConstants = true,
    min,
    max,
    records: total,
    limit: take,
    page,
  } = options || {};

  /** Fix constants  */
  const MIN_LIMIT = min || MIN_ITEMS_PER_PAGE;

  const MAX_LIMIT = max || MAX_ITEMS_PER_PAGE;

  /**
   * - records: `number`
   */
  const records = Number(total);

  const recordsInputIsLessThanZeroNaN = records < 0 || isNaN(records);

  if (recordsInputIsLessThanZeroNaN) return null;

  /**
   * @description limit: `number`
   **/
  let limit: number = Number(take);

  const limitLessThanOneNaN = lessThan(limit);

  limit = limitLessThanOneNaN ? MIN_LIMIT : limit;

  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }

  /**
   * - totalPages: `number`
   */
  const totalPages = Math.max(FIRST_PAGE, Math.ceil(records / limit));

  /**
   * @description current: `number`
   */
  let currentPage = Number(page);

  const currentIsLessThanOneNaN = lessThan(currentPage);

  currentPage = currentIsLessThanOneNaN ? FIRST_PAGE : currentPage;

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  /**
   * - next `number`
   * - previous `number`
   */
  const hasNext = currentPage < totalPages;

  const hasPrevious = currentPage > FIRST_PAGE;

  const isLastPage = currentPage === totalPages;

  const next = hasNext ? currentPage + 1 : null;

  const previous = hasPrevious ? currentPage - 1 : null;

  /**
   * - firstIndex: `number`
   * - lastIndex: `number`
   */
  const firstIndex = offsetBased(currentPage, limit);

  let lastIndex = Math.min(firstIndex + limit - 1, records - 1);

  if (lastIndex < 0) lastIndex = 0;

  /**
   * - range: `number[]`
   */
  let range: number[] = null;

  range = options?.setRange ? calculateRange(FIRST_PAGE, totalPages) : range;

  /**
   * - length: `number`
   */
  const length = Math.min(lastIndex - firstIndex + 1, records);

  const constants: Constants = setConstants ? { MIN_LIMIT, MAX_LIMIT } : null;

  return {
    offset: offsetBased(currentPage, limit),
    pagination: {
      records,
      totalPages,
      currentPage,
      firstPage: FIRST_PAGE,
      limit,
      next,
      previous,
      hasNext,
      hasPrevious,
      isLastPage,
      firstIndex,
      lastIndex,
      range,
      length,
    },
    constants,
  };
}
