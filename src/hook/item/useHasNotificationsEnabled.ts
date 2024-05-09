import { useMemo } from 'react';

import { Item } from '~/type/item';
import { hasNotificationsEnabled } from '~/util/item/hasNotificationsEnabled';

function useHasNotificationsEnabled({ item }: { item: Item }) {
  return useMemo(() => hasNotificationsEnabled(item.due), [item]);
}

export { useHasNotificationsEnabled };
