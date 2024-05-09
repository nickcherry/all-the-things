import {
  NotificationRequest as ExpoNotificationRequest,
  NotificationRequestInput,
} from 'expo-notifications';

export type NotificationRequest = NotificationRequestInput & {
  trigger: number;
};

export type ScheduledNotification = {
  id: string;
  trigger: number;
};

export type ScheduledNotifications = Record<
  string,
  ScheduledNotification[] | undefined
>;

export type SystemNotification = ExpoNotificationRequest;

export type SystemNotifications = Record<string, SystemNotification>;

export type ViewItemPushNotificationData = { type: 'view_item'; id: string };

export type NotificationData = ViewItemPushNotificationData;
