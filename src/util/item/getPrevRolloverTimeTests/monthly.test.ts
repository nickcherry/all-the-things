import { describe, expect, it } from 'bun:test';

import { getPrevRolloverTime } from '~/util/item/getPrevRolloverTime';
import {
  notifications,
  settings,
} from '~/util/item/getPrevRolloverTimeTests/shared';

// March 6th, 2024 at noon
const now = new Date(new Date().setFullYear(2024, 2, 6)).setHours(12, 0, 0, 0);

describe('getPrevDueDate monthly', () => {
  it('should get the prev due date 1', () => {
    expect(
      getPrevRolloverTime({
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
            type: 'monthly',
          },
          notifications,
        },
      }),
    ).toEqual(
      new Date(new Date().setFullYear(2024, 2, 3)).setHours(3, 0, 0, 0),
    );
  });

  it('should get the prev due date 2', () => {
    expect(
      getPrevRolloverTime({
        now,
        settings,
        due: {
          type: 'by_date',
          date: new Date(new Date().setFullYear(2026, 9, 9)).setHours(
            15,
            0,
            0,
            0,
          ),
          recurring: {
            type: 'monthly',
          },
          notifications,
        },
      }),
    ).toEqual(
      new Date(new Date().setFullYear(2024, 1, 9)).setHours(3, 0, 0, 0),
    );
  });
});
