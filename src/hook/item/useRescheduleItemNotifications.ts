import * as Notifications from 'expo-notifications';
import { useCallback } from 'react';

import { useItems } from '~/context/ItemProvider';
import { useNotifications } from '~/context/NotificationProvider';
import { useSettings } from '~/context/SettingsProvider';
import { trackError } from '~/util/error/trackError';
import { getNotificationRequests } from '~/util/item/getNotificationRequests';

function useRescheduleItemNotifications() {
  const { items } = useItems();
  const { scheduleNotifications } = useNotifications();
  const { settings } = useSettings();

  return useCallback(async () => {
    // Cancel all notifications.
    // This is a nuclear option, but it's efficient and ensures we don't have dupes.
    // At the moment, items are the only reason to set notifications, so this is fine.
    // If that ever changes, we'll need to go back to removing notifications individually by key.

    await Notifications.cancelAllScheduledNotificationsAsync();

    for (const item of Object.values(items)) {
      const key = item.id;

      // await removeNotifications({ key });

      try {
        await scheduleNotifications({
          key,
          requests: getNotificationRequests({ item, settings }),
        });
      } catch (error) {
        trackError(error);
      }
    }
  }, [items, scheduleNotifications, settings]);
}

export { useRescheduleItemNotifications };
