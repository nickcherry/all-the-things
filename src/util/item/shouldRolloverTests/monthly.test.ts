import { describe, it } from 'bun:test';

import { assertRollover } from '~/util/item/shouldRolloverTests/shared';

describe('shouldRollover monthly', () => {
  it('should rollover', () => {
    // Weds, Feb 20th at noon
    const now = new Date(new Date().setFullYear(2024, 1, 20)).setHours(
      12,
      0,
      0,
      0,
    );

    // Weds, Feb 18th at 1am
    const completedAt = new Date(new Date().setFullYear(2024, 1, 18)).setHours(
      1,
      0,
      0,
      0,
    );

    // Tues, Feb 19th at 5pm - time shouldn't matter
    const dueDate = new Date(new Date().setFullYear(2024, 1, 19)).setHours(
      17,
      0,
      0,
      0,
    );

    // 3am - time is all that matters
    const rolloverTime = new Date(new Date().setHours(3, 0, 0, 0)).valueOf();

    assertRollover({
      expected: true,
      now,
      rolloverTime,
      item: {
        status: {
          name: 'complete',
          completedAt,
        },
        due: {
          type: 'by_date',
          date: dueDate,
          recurring: { type: 'monthly' },
        },
      },
    });
  });

  it('should not rollover', () => {
    // Weds, Feb 20th at noon
    const now = new Date(new Date().setFullYear(2024, 1, 20)).setHours(
      12,
      0,
      0,
      0,
    );

    // Weds, Feb 20th at 1am
    const completedAt = new Date(new Date().setFullYear(2024, 1, 20)).setHours(
      1,
      0,
      0,
      0,
    );

    // Tues, Feb 19th at 5pm - time shouldn't matter
    const dueDate = new Date(new Date().setFullYear(2024, 1, 19)).setHours(
      17,
      0,
      0,
      0,
    );

    // 3am - time is all that matters
    const rolloverTime = new Date(new Date().setHours(3, 0, 0, 0)).valueOf();

    assertRollover({
      expected: false,
      now,
      rolloverTime,
      item: {
        status: {
          name: 'complete',
          completedAt,
        },
        due: {
          type: 'by_date',
          date: dueDate,
          recurring: { type: 'monthly' },
        },
      },
    });
  });
});
