import { defaultNotificationOffsetInDays } from '~/constant/notification';
import { ItemDue, ItemNotificationOffsetInDays } from '~/type/item';

function getNotificationOffsetInDays({
  due,
}: {
  due: ItemDue;
}): ItemNotificationOffsetInDays {
  if (due.type === 'by_date' && due.notifications.enabled) {
    return due.notifications.offsetInDays;
  }

  return defaultNotificationOffsetInDays;
}

export { getNotificationOffsetInDays };
