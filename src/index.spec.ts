import { paginate, range, offSetCalculation } from './index';

describe('Paging: suite', () => {
  it('should be able to calculate the range', () => {
    const expected = [1, 2, 3, 4, 5];

    const calculatedRange = range(1, 5);

    expect(expected.length).toBe(calculatedRange.length);

    expect(calculatedRange).toEqual(expected);
  });

  it('should be able to calculate the pagination offset', () => {
    const limit = 10;

    /**
     * - offSet, page 1
     */
    const { offSet } = paginate({ total: 100, page: 1, limit });

    /**
     * - offSet, page 2
     */
    const offSet2 = offSetCalculation(2, limit);

    /**
     * - offSet, page 3
     */
    const offSet3 = offSetCalculation(3, limit);

    expect(offSet).toBe(0);
    expect(offSet2).toBe(10);
    expect(offSet3).toBe(20);
  });
});
