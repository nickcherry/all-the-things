import { useMemo } from 'react';

import { useLists } from '~/context/ListProvider';

function useSortedLists() {
  const { lists } = useLists();

  return useMemo(
    () => Object.values(lists).sort((a, b) => a.name.localeCompare(b.name)),
    [lists],
  );
}

export { useSortedLists };
