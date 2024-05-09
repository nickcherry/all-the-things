import { describe, it } from 'bun:test';

import { assertRollover } from '~/util/item/shouldRolloverTests/shared';

describe('shouldRollover daily', () => {
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

  it('should rollover', () => {
    assertRollover({
      expected: true,
      now,
      rolloverTime,
      item: {
        status: {
          name: 'complete',
          completedAt: new Date(now).setHours(1, 0, 0, 0),
        },
        due: { type: 'whenever', recurring: { type: 'daily' } },
      },
    });
  });

  it('should not rollover', () => {
    assertRollover({
      expected: false,
      now,
      rolloverTime,
      item: {
        status: { name: 'complete', completedAt: rolloverTime.valueOf() },
        due: { type: 'whenever', recurring: { type: 'daily' } },
      },
    });
  });
});
