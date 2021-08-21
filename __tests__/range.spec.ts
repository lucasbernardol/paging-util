import { range } from '../dist';

describe('Range: test suite', () => {
  it('should be able to calculate the range', () => {
    const expected = [1, 2, 3, 4, 5];

    const calculatedRange = range(1, 5);

    expect(expected.length).toBe(calculatedRange.length);

    expect(calculatedRange).toEqual(expected);
  });

  it('should have a Array with values: 1 to 10', () => {
    const length = 10;

    const paginationRange = range(1, length);

    for (let key = 1; key <= length; key++) {
      const expected = paginationRange[key - 1];

      expect(key).toBe(expected);
    }

    expect(paginationRange.length).toBe(length);
  });
});
