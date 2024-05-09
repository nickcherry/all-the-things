import { describe, expect, it } from 'bun:test';

import { getDifference } from './getDifference';

describe('getDifference', () => {
  it('should diff the sets', () => {
    expect(
      getDifference(new Set(['a', 'c', 'e']), new Set(['b', 'd'])).sort(),
    ).toEqual(['a', 'b', 'c', 'd', 'e']);

    expect(
      getDifference(
        new Set(['a', 'b', 'c', 'd', 'e']),
        new Set(['a', 'b', 'c', 'd', 'e']),
      ).sort(),
    ).toEqual([]);

    expect(
      getDifference(
        new Set(['a', 'b', 'c', 'd', 'e']),
        new Set(['a', 'b', 'c']),
      ).sort(),
    ).toEqual(['d', 'e']);
  });
});
