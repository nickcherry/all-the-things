import { CompleteItem, Item } from '~/type/item';

function isComplete(item: Item): item is CompleteItem {
  return !!(item.status.name === 'complete' && !isNaN(item.status.completedAt));
}

export { isComplete };
