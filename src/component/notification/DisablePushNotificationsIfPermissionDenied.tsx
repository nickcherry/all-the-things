import * as Notifications from 'expo-notifications';
import { FC, memo, useEffect } from 'react';

import { useSettings } from '~/context/SettingsProvider';

const DisablePushNotificationsIfPermissionDenied: FC = memo(() => {
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    const check = async () => {
      if (settings.defaultNotificationsEnabled) {
        const permission = await Notifications.getPermissionsAsync();

        if (!permission.granted && !permission.canAskAgain) {
          updateSettings({ defaultNotificationsEnabled: false });
        }
      }
    };

    check();
  }, [settings.defaultNotificationsEnabled, updateSettings]);
  return null;
});

DisablePushNotificationsIfPermissionDenied.displayName =
  'DisablePushNotificationsIfPermissionDenied';

export { DisablePushNotificationsIfPermissionDenied };
