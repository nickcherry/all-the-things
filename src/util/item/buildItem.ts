import merge from 'lodash/merge';

import { Item } from '~/type/item';
import { Settings } from '~/type/settings';
import { generateUuid } from '~/util/identifier/generateUuid';

function buildItem({
  item,
  settings,
}: {
  item: Partial<Item> & Pick<Item, 'listId'>;
  settings: Settings;
}): Item {
  const itemDefaults: Omit<Item, 'listId'> = {
    createdAt: 0,
    due: {
      type: 'whenever',
      recurring: { type: 'never' },
      notifications: { enabled: false },
    },
    id: generateUuid(),
    name: '',
    priority: settings.defaultTodoItemPriority || 'medium',
    status: { name: 'pending' },
    updatedAt: 0,
  };

  return merge(itemDefaults, item);
}

export { buildItem };
