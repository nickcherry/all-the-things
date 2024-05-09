import { describe, it } from 'bun:test';

import { assertRollover } from '~/util/item/shouldRolloverTests/shared';

describe('shouldRollover yearly', () => {
  it('should rollover', () => {
    // October 25th at noon
    const now = new Date(new Date().setFullYear(2024, 9, 25)).setHours(
      12,
      0,
      0,
      0,
    );

    // October 24th at 1am
    const completedAt = new Date(new Date().setFullYear(2024, 9, 24)).setHours(
      1,
      0,
      0,
      0,
    );

    // October 24th at 6am - time shouldn't matter
    const dueDate = new Date(new Date().setFullYear(2024, 9, 24)).setHours(
      6,
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
          recurring: { type: 'yearly' },
        },
      },
    });
  });

  it('should not rollover', () => {
    // October 25th at noon
    const now = new Date(new Date().setFullYear(2024, 9, 25)).setHours(
      12,
      0,
      0,
      0,
    );

    // October 24th at 5am
    const completedAt = new Date(new Date().setFullYear(2024, 9, 24)).setHours(
      5,
      0,
      0,
      0,
    );

    // October 24th at 6am - time shouldn't matter
    const dueDate = new Date(new Date().setFullYear(2024, 9, 24)).setHours(
      6,
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
          recurring: { type: 'yearly' },
        },
      },
    });
  });
});
