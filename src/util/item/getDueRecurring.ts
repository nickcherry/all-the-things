import { ItemDue, ItemDueRecurring } from '~/type/item';

function getDueRecurring({ due }: { due: ItemDue }): ItemDueRecurring {
  return due.recurring;
}

export { getDueRecurring };
