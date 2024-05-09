import { Item } from '~/type/item';

function compareAlphabetically(a: Item, b: Item) {
  return a.name.localeCompare(b.name);
}

export { compareAlphabetically };
