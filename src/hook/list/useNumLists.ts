import { useMemo } from 'react';

import { useLists } from '~/context/ListProvider';

function useNumLists() {
  const { lists } = useLists();

  return useMemo(() => {
    return Object.keys(lists).length;
  }, [lists]);
}

export { useNumLists };
