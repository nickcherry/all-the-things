import * as Notifications from 'expo-notifications';

async function cancelAllScheduledNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export { cancelAllScheduledNotifications };
