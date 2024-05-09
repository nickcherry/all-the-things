import { useMemo } from 'react';

import { Item } from '~/type/item';
import { isComplete } from '~/util/item/isComplete';

function useIsOverdue({ item }: { item: Item }) {
  return useMemo(() => {
    if (isComplete(item)) {
      return false;
    }

    const now = Date.now();

    if (item.due.type === 'by_date' && item.due.date < now) {
      return true;
    }

    if (item.due.type === 'by_time' && item.due.time < now) {
      return true;
    }

    return false;
  }, [item]);
}

export { useIsOverdue };
