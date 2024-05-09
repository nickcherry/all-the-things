import { quantifiedPriority } from '~/constant/item';
import { ItemPriority } from '~/type/item';

function getQuantifiedPriority(priority: ItemPriority) {
  return quantifiedPriority[priority];
}

export { getQuantifiedPriority };
