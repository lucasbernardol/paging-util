/**
 * @constant
 */
export const first = {
  options: {
    total: 19,
    limit: 10,
    page: 2,
  },
  expected: {
    total: 19,
    pages: 2,
    currentPage: 2,
    firstPage: 1,
    limit: 10,
    next: null,
    previous: 1,
    hasNextPage: false,
    hasPreviousPage: true,
    firstResult: 10,
    lastResult: 18,
    results: 9,
  },
};
