/**
 * - First
 * @constant
 */
export const first = {
  options: {
    records: 19,
    limit: 10,
    page: 2,
    setRange: true,
    max: 25,
  },
  expected: {
    offset: 10,
    records: 19,
    totalPages: 2,
    currentPage: 2,
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
    constants: {
      MIN_LIMIT: 10,
      MAX_LIMIT: 25,
    },
  },
};

/**
 * - Second
 * @constant
 */
export const second = {
  options: {
    records: 100,
    limit: 10,
    page: 9,
    setRange: true,
    min: 20,
  },
  expected: {
    offset: 80,
    records: 100,
    totalPages: 10,
    currentPage: 9,
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
    constants: {
      MIN_LIMIT: 20,
      MAX_LIMIT: 30,
    },
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
