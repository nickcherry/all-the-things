import { ItemDue } from '~/type/item';
import { Settings } from '~/type/settings';

function getDateNotificationTime({
  due,
  settings,
}: {
  due: ItemDue;
  settings: Settings;
}) {
  if (
    due.type === 'by_date' &&
    due.notifications.enabled &&
    due.notifications.notificationTime
  ) {
    return due.notifications.notificationTime;
  }

  return settings.dateNotificationTime;
}

export { getDateNotificationTime };
