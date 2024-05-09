import { Item } from '~/type/item';
import { compareAlphabetically } from '~/util/item/sort/compare/compareAlphabetically';

function sortByAlphabetically({ items }: { items: Item[] }) {
  return items.sort((a, b) => {
    return compareAlphabetically(a, b);
  });
}

export { sortByAlphabetically };
