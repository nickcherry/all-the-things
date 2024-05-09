import { describe, expect, it } from 'bun:test';

import { getDistanceInDays } from './getDistanceInDays';

describe('getDistanceInDays', () => {
  it('computes distance in days', () => {
    type DateForAssertion = { year: number; month: number; day: number };

    const assertDistance = (
      a: DateForAssertion,
      b: DateForAssertion,
      distance: number,
    ) => {
      const dateA = new Date();
      dateA.setFullYear(a.year, a.month - 1, a.day);
      const dateB = new Date();
      dateB.setFullYear(b.year, b.month - 1, b.day);

      expect(getDistanceInDays(dateA, dateB)).toEqual(distance);
    };

    assertDistance(
      { year: 2024, month: 2, day: 19 },
      { year: 2024, month: 2, day: 19 },
      0,
    );

    assertDistance(
      { year: 2024, month: 2, day: 19 },
      { year: 2024, month: 2, day: 21 },
      2,
    );

    assertDistance(
      { year: 2024, month: 2, day: 19 },
      { year: 2024, month: 2, day: 1 },
      -18,
    );
  });
});
