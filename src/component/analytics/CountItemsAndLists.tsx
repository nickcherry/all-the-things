import { FC, memo, useEffect } from 'react';

import { useItems } from '~/context/ItemProvider';
import { useLists } from '~/context/ListProvider';
import { useCaptureEvent } from '~/hook/analytics/useCaptureEvent';

const CountItemsAndLists: FC = memo(() => {
  const captureEvent = useCaptureEvent();
  const { items } = useItems();
  const { lists } = useLists();

  useEffect(() => {
    captureEvent('count-items-and-lists', {
      items: Object.keys(items).length,
      lists: Object.keys(lists).length,
    });
  }, [captureEvent, items, lists]);

  return null;
});

export { CountItemsAndLists };
