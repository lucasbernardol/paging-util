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

/**
 * @constant
 */
export const second = {
  options: {
    total: 100,
    limit: 10,
    page: 9,
  },
  expected: {
    total: 100,
    pages: 10,
    currentPage: 9,
    firstPage: 1,
    limit: 10,
    next: 10,
    previous: 8,
    hasNextPage: true,
    hasPreviousPage: true,
    firstResult: 80,
    lastResult: 89,
    results: 10,
  },
};

/**
 * @constant
 */
export const third = {
  options: second.options,
  expected: {
    ...second.expected,
    range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
};
