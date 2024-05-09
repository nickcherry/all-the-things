import { Notification } from 'expo-notifications';

import { NotificationData } from '~/type/notifications';

const getPushNotificationData = (notification: Notification) => {
  return notification.request.content.data as
    | NotificationData
    | null
    | undefined;
};

export { getPushNotificationData };
