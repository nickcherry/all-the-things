import { describe, expect, it } from 'bun:test';

import { getNextOccurrence } from './getNextOccurrence';

describe('getNextOccurrence', () => {
  const now = new Date(
    new Date(new Date().setFullYear(2024, 1, 27)).setHours(13, 0, 0, 0),
  ).valueOf();

  it('should get the first future occurrence', () => {
    expect(
      getNextOccurrence({
        doesMatch: (date) => now !== date,
        now,
        increment: 1000,
      }),
    ).toEqual(now + 1000);

    expect(
      getNextOccurrence({
        doesMatch: (date) => now === date,
        now,
        increment: 1000,
      }),
    ).toEqual(now);
  });

  it('should throw to prevent infinite loops', () => {
    let didThrow = false;

    try {
      getNextOccurrence({ doesMatch: () => false, now, increment: 0 });
    } catch {
      didThrow = true;
    }

    expect(didThrow).toEqual(true);
  });
});
