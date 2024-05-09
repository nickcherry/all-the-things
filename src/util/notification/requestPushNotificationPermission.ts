import * as Notifications from 'expo-notifications';

import { sleep } from '~/util/promise/sleep';

async function requestPushNotificationPermission({
  delay,
}: {
  delay?: number;
} = {}) {
  const permissions = await Notifications.getPermissionsAsync();

  if (permissions.granted) {
    return permissions;
  }

  if (permissions.canAskAgain) {
    if (delay) {
      await sleep(delay);
    }

    return await Notifications.requestPermissionsAsync();
  }
}

export { requestPushNotificationPermission };
