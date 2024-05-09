import { NotificationContentInput } from 'expo-notifications';

import {
  itemCateogryId,
  notificationSound,
  notificationTitle,
} from '~/constant/notification';
import { days, weeks } from '~/constant/time';
import { ItemDueByDate } from '~/type/item';
import {
  NotificationRequest,
  ViewItemPushNotificationData,
} from '~/type/notifications';
import { Settings } from '~/type/settings';
import { getDistanceInDaysInWords } from '~/util/date/getDistanceInDaysInWords';

import { getDateNotificationTime } from './getDateNotificationTime';
import { getNextOccurrence } from './getNextOccurrence';
import { getNotificationOffsetInDays } from './getNotificationOffsetInDays';

function getNotificationRequestsForDate({
  due,
  id,
  name,
  now,
  numRecurringNotifications,
  settings,
}: {
  id: string;
  due: ItemDueByDate;
  name: string;
  now: number;
  numRecurringNotifications: number;
  settings: Settings;
}): NotificationRequest[] {
  const notificationTimeAsDate = new Date(
    getDateNotificationTime({ due, settings }),
  );

  const offsetInDays = getNotificationOffsetInDays({ due });
  const offset = offsetInDays * days.one;

  const requests: NotificationRequest[] = [];

  const data: ViewItemPushNotificationData = { type: 'view_item', id };
  const content: NotificationContentInput = {
    title: notificationTitle,
    subtitle: name,
    categoryIdentifier: itemCateogryId,
    body: `Due ${getDistanceInDaysInWords({ distance: offsetInDays })}`,
    data,
    sound: notificationSound,
  };

  const adjustForNotificationTimeOffset = (date: number) => {
    return (
      new Date(date).setHours(
        notificationTimeAsDate.getHours(),
        notificationTimeAsDate.getMinutes(),
        notificationTimeAsDate.getSeconds(),
        notificationTimeAsDate.getMilliseconds(),
      ) - offset
    );
  };

  if (due.recurring.type === 'never') {
    const trigger = adjustForNotificationTimeOffset(due.date);

    if (now < trigger) {
      requests.push({ content, trigger });
    }
  } else if (due.recurring.type === 'weekly') {
    const dueDayOfWeek = new Date(due.date).getDay();

    const firstTrigger = adjustForNotificationTimeOffset(
      getNextOccurrence({
        now,
        increment: days.one,
        doesMatch: (date) =>
          new Date(date).getDay() === dueDayOfWeek &&
          now < adjustForNotificationTimeOffset(date),
      }),
    );

    for (let i = 0; i < numRecurringNotifications; i++) {
      requests.push({
        content,
        trigger: firstTrigger + i * weeks.one,
      });
    }
  } else if (due.recurring.type === 'monthly') {
    const dueDayOfMonth = new Date(due.date).getDate();

    let trigger = adjustForNotificationTimeOffset(
      getNextOccurrence({
        now,
        increment: days.one,
        doesMatch: (date) =>
          new Date(date).getDate() === dueDayOfMonth &&
          now < adjustForNotificationTimeOffset(date),
      }),
    );

    for (let i = 0; i < numRecurringNotifications; i++) {
      requests.push({
        content,
        trigger,
      });

      trigger = new Date(trigger).setMonth(new Date(trigger).getMonth() + 1);
    }
  } else if (due.recurring.type === 'yearly') {
    const thisYear = new Date(now).getFullYear();
    const dueDateThisYear = adjustForNotificationTimeOffset(
      new Date(due.date).setFullYear(thisYear),
    );
    const startingYear = now > dueDateThisYear ? thisYear + 1 : thisYear;

    for (let i = 0; i < numRecurringNotifications; i++) {
      requests.push({
        content,
        trigger: adjustForNotificationTimeOffset(
          new Date(due.date).setFullYear(startingYear + i),
        ),
      });
    }
  }

  return requests;
}

export { getNotificationRequestsForDate };
