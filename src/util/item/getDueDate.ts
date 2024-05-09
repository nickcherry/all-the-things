import { days } from '~/constant/time';
import { ItemDue } from '~/type/item';

function getDueDate({ due }: { due: ItemDue }) {
  if (due.type === 'by_date') {
    return new Date(due.date);
  }

  return new Date(Date.now() + days.one);
}

export { getDueDate };
