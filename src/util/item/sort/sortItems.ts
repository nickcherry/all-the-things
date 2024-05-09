import { Item } from '~/type/item';
import { List } from '~/type/list';

import { sortByAlphabetically } from './strategy/sortByAlphabetically';
import { sortByCreatedAt } from './strategy/sortByCreatedAt';
import { sortByDue } from './strategy/sortByDue';
import { sortByPriority } from './strategy/sortByPriority';

function sortItems({ items, list }: { items: Item[]; list: List }): Item[] {
  switch (list.sortItemsBy) {
    case 'alphabetically':
      return sortByAlphabetically({ items });
    case 'priority':
      return sortByPriority({ items });
    case 'due':
      return sortByDue({ items });
    case 'created':
      return sortByCreatedAt({ items });
    default:
      console.warn(`Unexpected sort strategy: ${list.sortItemsBy}`);
      return sortByPriority({ items });
  }
}

export { sortItems };
