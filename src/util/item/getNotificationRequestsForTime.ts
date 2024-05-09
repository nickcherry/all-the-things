import { NotificationContentInput } from 'expo-notifications';
import times from 'lodash/times';

import {
  defaultNumRecurringNotificationsForTime,
  itemCateogryId,
  notificationSound,
  notificationTitle,
} from '~/constant/notification';
import { days, minutes } from '~/constant/time';
import { ItemDueByTime } from '~/type/item';
import {
  NotificationRequest,
  ViewItemPushNotificationData,
} from '~/type/notifications';
import { formatTime } from '~/util/date/formatTime';

import { getNotificationOffsetInMinutes } from './getNotificationOffsetInMinutes';
function getNotificationRequestsForTime({
  id,
  due,
  name,
  now,
  numRecurringNotificationsForTime = defaultNumRecurringNotificationsForTime,
}: {
  id: string;
  due: ItemDueByTime;
  name: string;
  now: number;
  numRecurringNotificationsForTime: number;
}): NotificationRequest[] {
  const dueTimeAsDate = new Date(due.time);

  const dueTimeForToday = new Date(now)
    .setHours(
      dueTimeAsDate.getHours(),
      dueTimeAsDate.getMinutes(),
      dueTimeAsDate.getSeconds(),
      dueTimeAsDate.getMilliseconds(),
    )
    .valueOf();

  const offsetInMinutes = getNotificationOffsetInMinutes({ due });
  const offset = offsetInMinutes * minutes.one;

  const requests: NotificationRequest[] = [];

  const data: ViewItemPushNotificationData = { type: 'view_item', id };
  const content: NotificationContentInput = {
    title: notificationTitle,
    subtitle: name,
    body: `Due by ${formatTime({ time: new Date(due.time) })}`,
    sound: notificationSound,
    categoryIdentifier: itemCateogryId,
    data,
  };

  if (due.recurring.type === 'daily') {
    let trigger =
      now < dueTimeForToday - offset
        ? dueTimeForToday - offset
        : dueTimeForToday + days.one;

    times(numRecurringNotificationsForTime, () => {
      requests.push({ content, trigger });

      trigger += days.one;
    });
  } else if (now < dueTimeForToday - offset) {
    requests.push({
      content,
      trigger: dueTimeForToday - offset,
    });
  }

  return requests;
}

export { getNotificationRequestsForTime };
