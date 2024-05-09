import { useMemo } from 'react';

import { useItems } from '~/context/ItemProvider';
import { List } from '~/type/list';
import { sortItems } from '~/util/item/sort/sortItems';

function useListItems({ list }: { list: List }) {
  const { items } = useItems();

  return useMemo(() => {
    return sortItems({
      items: Object.values(items).filter((item) => item.listId === list.id),
      list,
    });
  }, [items, list]);
}

export { useListItems };
