import { Item } from '~/type/item';
import { isRecurring } from '~/util/item/isRecurring';

function compareRecurring(a: Item, b: Item) {
  const isRecurringA = isRecurring(a.due);
  const isRecurringB = isRecurring(b.due);

  if (isRecurringA && isRecurringB) {
    return 0;
  }

  if (isRecurringA) {
    return -1;
  }

  if (isRecurringB) {
    return 1;
  }

  return 0;
}

export { compareRecurring };
