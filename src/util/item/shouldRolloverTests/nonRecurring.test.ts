import { describe, it } from 'bun:test';

import { assertRollover } from '~/util/item/shouldRolloverTests/shared';

describe('shouldRollover non-recurring', () => {
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
        status: { name: 'complete', completedAt: 0 },
        due: { type: 'whenever', recurring: { type: 'never' } },
      },
    });
  });
});
