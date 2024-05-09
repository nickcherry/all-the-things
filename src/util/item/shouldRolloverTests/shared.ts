import { expect } from 'bun:test';
import merge from 'lodash/merge';
import { PartialDeep } from 'type-fest';

import { Item, ItemDueRecurring, ItemDueType } from '~/type/item';
import { Settings } from '~/type/settings';
import { shouldRollover } from '~/util/item/shouldRollover';

const assertRollover = ({
  item,
  expected,
  now,
  rolloverTime,
}: {
  item: PartialDeep<Item> &
    Required<{
      due: { type: ItemDueType; recurring: ItemDueRecurring };
    }>;
  expected: boolean;
  now: number;
  rolloverTime: number;
}) => {
  expect(
    shouldRollover({
      item: merge({} as PartialDeep<Item>, item) as Item,
      now,
      settings: { recurringRolloverTime: rolloverTime } as Settings,
    }),
  ).toEqual(expected);
};

export { assertRollover };
