import cloneDeep from 'lodash/cloneDeep';

import { days, minutes } from '~/constant/time';
import { Items } from '~/type/item';
import { Lists } from '~/type/list';
import { Settings } from '~/type/settings';
import { getNextRolloverTime } from '~/util/item/getNextRolloverTime';

import { isRecurring } from './isRecurring';
import { shouldRollover } from './shouldRollover';

function getCleanupThreshold({
  forceImmediateCleanup,
  settings,
}: {
  forceImmediateCleanup?: boolean;
  settings: Settings;
}): number {
  if (forceImmediateCleanup) {
    return 0;
  }

  switch (settings.cleanUpAfterCompleted) {
    case 'never':
      return Number.POSITIVE_INFINITY;
    case '15 minutes':
      return minutes.fifteen;
    case '1 day':
      return days.one;
  }
}

function cleanUpAndRolloverItems({
  forceImmediateCleanup,
  items: itemsParam,
  lists,
  now,
  settings,
}: {
  forceImmediateCleanup?: boolean;
  items: Items;
  lists: Lists;
  now: number;
  settings: Settings;
}) {
  const items = cloneDeep(itemsParam);

  const cleanUpThreshold = getCleanupThreshold({
    forceImmediateCleanup,
    settings,
  });

  for (const id in items) {
    const item = items[id];

    // Remove oprhaned items
    if (!lists[item.listId]) {
      delete items[id];
      break;
    }

    // Rollover recuring items
    if (shouldRollover({ now, item, settings })) {
      item.status = { name: 'pending' };

      if (item.due.type === 'by_date') {
        item.due.date = getNextRolloverTime({ due: item.due, now, settings });
      }
      break;
    }

    // Remove non-recurring completed items that have gone beyond the cleanup threshold
    if (
      !isRecurring(item.due) &&
      item.status.name === 'complete' &&
      now - item.status.completedAt >= cleanUpThreshold
    ) {
      delete items[id];
    }
  }

  return items;
}

export { cleanUpAndRolloverItems };
