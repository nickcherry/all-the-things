import { describe, expect, it } from 'bun:test';

import { getNextRolloverTime } from '~/util/item/getNextRolloverTime';
import {
  notifications,
  settings,
} from '~/util/item/getNextRolloverTimeTests/shared';

// March 6th, 2024 at noon
const now = new Date(new Date().setFullYear(2024, 2, 6)).setHours(12, 0, 0, 0);

describe('getNextRolloverTime never', () => {
  it('should get the next due date', () => {
    expect(
      getNextRolloverTime({
        now,
        settings,
        due: {
          type: 'by_date',
          date: new Date(new Date().setFullYear(2024, 1, 3)).setHours(
            15,
            0,
            0,
            0,
          ),
          recurring: {
            type: 'never',
          },
          notifications,
        },
      }),
    ).toEqual(
      new Date(new Date().setFullYear(2024, 1, 3)).setHours(3, 0, 0, 0),
    );
  });
});
