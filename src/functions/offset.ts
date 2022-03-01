import { MIN_ITEMS_PER_PAGE, FIRST_PAGE } from '../constants';

import { lessThanOneNaN } from '../utils/lessThanOne';

/**
 * @function offsetBased - Offset-based pagination.
 */
export function offsetBased(page: number, limit?: number) {
  let totalPerPage: number;

  const limitIsLessThanOneNaN = lessThanOneNaN(limit);

  if (limitIsLessThanOneNaN.isInvalid) {
    totalPerPage = MIN_ITEMS_PER_PAGE;
  } else {
    /** number converted  */
    totalPerPage = limitIsLessThanOneNaN.parsedValue;
  }

  return ((Number(page) || FIRST_PAGE) - 1) * totalPerPage;
}
