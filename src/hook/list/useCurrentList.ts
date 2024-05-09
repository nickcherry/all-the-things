import { useMemo } from 'react';

import { useLists } from '~/context/ListProvider';

function useCurrentList() {
  const { currentListId, lists } = useLists();

  return useMemo(() => {
    return lists[currentListId];
  }, [currentListId, lists]);
}

export { useCurrentList };
