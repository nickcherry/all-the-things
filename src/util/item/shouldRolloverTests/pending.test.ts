import { describe, it } from 'bun:test';

import { assertRollover } from '~/util/item/shouldRolloverTests/shared';

describe('shouldRollover pending', () => {
  const now = new Date(new Date().setFullYear(2024, 2, 2)).setHours(
    12,
    0,
    0,
    0,
  );

  const rolloverTimeAsDate = new Date(
    new Date().setHours(3, 0, 0, 0), // 3 am
  );

  const rolloverTime = rolloverTimeAsDate.valueOf();

  it('should not rollover', () => {
    assertRollover({
      expected: false,
      now,
      rolloverTime,
      item: {
        status: { name: 'pending' },
        due: { type: 'whenever', recurring: { type: 'daily' } },
      },
    });
  });
});
