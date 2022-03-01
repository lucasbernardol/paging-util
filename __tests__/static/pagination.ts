/**
 * - First
 * @constant
 */
export const first = {
  options: {
    records: 19,
    limit: 10,
    page: 2,
    setRange: false,
    max: 25,
  },
  expected: {
    offset: 10,
    pagination: {
      records: 19,
      totalPages: 2,
      currentPage: 2,
      firstPage: 1,
      limit: 10,
      next: null,
      previous: 1,
      hasNext: false,
      hasPrevious: true,
      isLastPage: true,
      firstIndex: 10,
      lastIndex: 18,
      length: 9,
      range: null,
    },
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
    pagination: {
      records: 100,
      totalPages: 10,
      currentPage: 9,
      firstPage: 1,
      limit: 10,
      next: 10,
      previous: 8,
      hasNext: true,
      hasPrevious: true,
      isLastPage: false,
      firstIndex: 80,
      lastIndex: 89,
      length: 10,
      range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    constants: {
      MIN_LIMIT: 20,
      MAX_LIMIT: 20,
    },
  },
};

/**
 * - Third
 * @constant
 */
export const third = {
  options: {
    ...second.options,
    min: 5,
    page: 10,
  },
  expected: {
    offset: 90,
    pagination: {
      records: 100,
      totalPages: 10,
      currentPage: 10,
      firstPage: 1,
      limit: 10,
      next: null,
      previous: 9,
      hasNext: false,
      hasPrevious: true,
      isLastPage: true,
      firstIndex: 90,
      lastIndex: 99,
      length: 10,
      range: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    constants: {
      MIN_LIMIT: 5,
      MAX_LIMIT: 20,
    },
  },
};
