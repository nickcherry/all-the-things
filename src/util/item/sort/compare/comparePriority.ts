import { Item } from '~/type/item';
import { getQuantifiedPriority } from '~/util/item/getQuantifiedPriority';

function comparePriority(a: Item, b: Item) {
  const priorityDiff =
    getQuantifiedPriority(b.priority) - getQuantifiedPriority(a.priority);

  return priorityDiff;
}

export { comparePriority };
