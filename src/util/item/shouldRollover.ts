import { Item } from '~/type/item';
import { Settings } from '~/type/settings';
import { getPrevRolloverTime } from '~/util/item/getPrevRolloverTime';
import { isComplete } from '~/util/item/isComplete';
import { isRecurring } from '~/util/item/isRecurring';

function shouldRollover({
  item,
  now,
  settings,
}: {
  item: Item;
  now: number;
  settings: Settings;
}): boolean {
  if (!isRecurring(item.due)) {
    return false;
  }

  if (!isComplete(item)) {
    return false;
  }
  return (
    item.status.completedAt <
    getPrevRolloverTime({ due: item.due, now, settings })
  );
}

export { shouldRollover };
