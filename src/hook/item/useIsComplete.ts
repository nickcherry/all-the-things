import { useMemo } from 'react';

import { Item } from '~/type/item';
import { isComplete } from '~/util/item/isComplete';

function useIsComplete({ item }: { item: Item }) {
  return useMemo(() => isComplete(item), [item]);
}

export { useIsComplete };
