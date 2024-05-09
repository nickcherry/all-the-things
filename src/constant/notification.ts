import {
  ItemNotificationOffsetInDays,
  ItemNotificationOffsetInMinutes,
} from '~/type/item';

export const notificationTitle = 'Todo All The Things';
export const notificationSound = 'notification.wav';

export const defaultNotificationOffsetInMinutes: ItemNotificationOffsetInMinutes = 60;
export const defaultNotificationOffsetInDays: ItemNotificationOffsetInDays = 1;

export const defaultDateNotificationTime = new Date(0).setHours(12, 0, 0, 0);

export const defaultNumRecurringNotificationsForTime = 7;
export const defaultNumRecurringNotificationsForDate = 3;

// Don't use the characters : or - in your category identifier. If you do, categories might not work as expected, as per https://docs.expo.dev/versions/latest/sdk/notifications/
export const itemCateogryId = 'item';
export const itemCategoryActions = {
  dismiss: 'item_dismiss',
  snooze15Mins: 'item_snooze_15_mins',
  snooze2Hours: 'item_snooze_2_hours',
  snooze1Day: 'item_snooze_1_day',
};
