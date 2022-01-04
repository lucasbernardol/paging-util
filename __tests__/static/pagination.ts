/**
 * - First
 * @constant
 */
export const first = {
  options: {
    total: 19,
    limit: 10,
    page: 2,
  },
  expected: {
    offset: 10,
    items: 19,
    pages: 2,
    current: 2,
    firstPage: 1,
    limit: 10,
    next: null,
    previous: 1,
    hasNext: false,
    hasPrevious: true,
    firstIndex: 10,
    lastIndex: 18,
    length: 9,
    range: [1, 2],
  },
};

/**
 * - Second
 * @constant
 */
export const second = {
  options: {
    total: 100,
    limit: 10,
    page: 9,
  },
  expected: {
    offset: 80,
    items: 100,
    pages: 10,
    current: 9,
    firstPage: 1,
    limit: 10,
    next: 10,
    previous: 8,
    hasNext: true,
    hasPrevious: true,
    firstIndex: 80,
    lastIndex: 89,
    length: 10,
    range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
};

/**
 * - Third
 * @constant
 */
export const third = {
  options: second.options,
  expected: {
    ...second.expected,
    range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
};
