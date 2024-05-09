import {
  defaultNumRecurringNotificationsForDate,
  defaultNumRecurringNotificationsForTime,
} from '~/constant/notification';
import { Item } from '~/type/item';
import { NotificationRequest } from '~/type/notifications';
import { Settings } from '~/type/settings';

import { getNotificationRequestsForDate } from './getNotificationRequestsForDate';
import { getNotificationRequestsForTime } from './getNotificationRequestsForTime';
import { hasNotificationsEnabled } from './hasNotificationsEnabled';
import { isComplete } from './isComplete';

function getNotificationRequests({
  item,
  settings,
}: {
  settings: Settings;
  item: Item;
}): NotificationRequest[] {
  if (isComplete(item) || !hasNotificationsEnabled(item.due)) {
    return [];
  }

  const now = Date.now();

  switch (item.due.type) {
    case 'whenever':
      return [];
    case 'by_date':
      return getNotificationRequestsForDate({
        id: item.id,
        due: item.due,
        name: item.name,
        now,
        numRecurringNotifications: defaultNumRecurringNotificationsForDate,
        settings,
      });
    case 'by_time':
      return getNotificationRequestsForTime({
        id: item.id,
        due: item.due,
        name: item.name,
        now,
        numRecurringNotificationsForTime:
          defaultNumRecurringNotificationsForTime,
      });
  }
}

export { getNotificationRequests };
