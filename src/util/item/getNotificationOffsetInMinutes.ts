import { defaultNotificationOffsetInMinutes } from '~/constant/notification';
import { ItemDue, ItemNotificationOffsetInMinutes } from '~/type/item';

function getNotificationOffsetInMinutes({
  due,
}: {
  due: ItemDue;
}): ItemNotificationOffsetInMinutes {
  if (due.type === 'by_time' && due.notifications.enabled) {
    return due.notifications.offsetInMinutes;
  }
  return defaultNotificationOffsetInMinutes;
}

export { getNotificationOffsetInMinutes };
