import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';

import { useHasUnmountedRef } from '~/hook/mount/useHasUnmountedRef';
import { SystemNotifications } from '~/type/notifications';

function useSystemNotifications() {
  const [systemNotifications, setSystemNotifications] =
    useState<SystemNotifications>();

  const hasUnmountedRef = useHasUnmountedRef();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const syncSystemNotifications = async () => {
      const systemNotificationsArray =
        await Notifications.getAllScheduledNotificationsAsync();

      const nextSystemNotifications = systemNotificationsArray.reduce(
        (memo, systemNotification) => {
          memo[systemNotification.identifier] = systemNotification;
          return memo;
        },
        {} as SystemNotifications,
      );

      setSystemNotifications(nextSystemNotifications);

      if (!hasUnmountedRef.current) {
        timeout = setTimeout(syncSystemNotifications, 3000);
      }
    };

    syncSystemNotifications();

    return () => {
      clearTimeout(timeout);
    };
  }, [hasUnmountedRef]);

  return systemNotifications;
}

export { useSystemNotifications };
