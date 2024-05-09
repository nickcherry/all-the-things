import { FC, memo } from 'react';

import { Switch } from '~/component/switch/Switch';
import { useSettings } from '~/context/SettingsProvider';
import { requestPushNotificationPermission } from '~/util/notification/requestPushNotificationPermission';

import { SettingsField } from './SettingsField';

type DefaultNotificationsEnabledInputProps = {
  syncCanSendNotifications: () => void;
};

const DefaultNotificationsEnabledInput: FC<DefaultNotificationsEnabledInputProps> =
  memo(({ syncCanSendNotifications }) => {
    const { settings, updateSettings } = useSettings();

    return (
      <SettingsField
        label="Default enabled"
        info="Whether to receive notifications when an item's due date/time is coming up"
        value={
          <Switch
            value={settings.defaultNotificationsEnabled}
            onValueChange={async (defaultNotificationsEnabled) => {
              updateSettings({ defaultNotificationsEnabled });

              if (defaultNotificationsEnabled) {
                await requestPushNotificationPermission();
                syncCanSendNotifications();
              }
            }}
          />
        }
      />
    );
  });

DefaultNotificationsEnabledInput.displayName =
  'DefaultNotificationsEnabledInput';

export { DefaultNotificationsEnabledInput };
