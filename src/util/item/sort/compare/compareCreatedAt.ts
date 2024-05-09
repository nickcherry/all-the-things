import { Item } from '~/type/item';

function compareCreatedAt(a: Item, b: Item) {
  return a.createdAt - b.createdAt;
}

export { compareCreatedAt };
