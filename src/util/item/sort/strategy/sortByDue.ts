import { Item } from '~/type/item';
import { compareCreatedAt } from '~/util/item/sort/compare/compareCreatedAt';
import { compareDue } from '~/util/item/sort/compare/compareDue';
import { comparePriority } from '~/util/item/sort/compare/comparePriority';
import { compareRecurring } from '~/util/item/sort/compare/compareRecurring';

function sortByDue({ items }: { items: Item[] }) {
  return items.sort((a, b) => {
    const due = compareDue(a, b);

    if (due !== 0) {
      return due;
    }

    const priority = comparePriority(a, b);

    if (priority !== 0) {
      return priority;
    }

    const recurring = compareRecurring(a, b);

    if (recurring !== 0) {
      return recurring;
    }

    const createdAt = compareCreatedAt(a, b);
    return createdAt;
  });
}

export { sortByDue };
