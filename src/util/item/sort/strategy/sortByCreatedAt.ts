import { Item } from '~/type/item';
import { compareCreatedAt } from '~/util/item/sort/compare/compareCreatedAt';

function sortByCreatedAt({ items }: { items: Item[] }) {
  return items.sort((a, b) => {
    const createdAt = compareCreatedAt(a, b);
    return createdAt;
  });
}

export { sortByCreatedAt };
