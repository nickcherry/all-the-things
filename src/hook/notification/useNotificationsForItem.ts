import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { useNotifications } from '~/context/NotificationProvider';
import { Item } from '~/type/item';

function useNotificationsForItem({ item }: { item: Item }) {
  const { getNotifications } = useNotifications();

  const [notifications, setNotifications] = useState(
    getNotifications({ key: item.id }),
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        setNotifications(getNotifications({ key: item.id }));
      }, 1000);
    }
  }, [getNotifications, isFocused, item.id]);

  return notifications;
}

export { useNotificationsForItem };
