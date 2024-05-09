import { FC, memo } from 'react';

import { ItemField } from '~/component/item/form/ItemField';
import { Switch } from '~/component/switch/Switch';
import { defaultHitSlop } from '~/constant/pressable';

type NotificationsEnabledInputProps = {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (notificationsEnabled: boolean) => void;
};

const NotificationsEnabledInput: FC<NotificationsEnabledInputProps> = memo(
  ({ notificationsEnabled, setNotificationsEnabled }) => {
    return (
      <ItemField
        label="Notifications"
        value={
          <Switch
            hitSlop={defaultHitSlop}
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        }
      />
    );
  },
);

NotificationsEnabledInput.displayName = 'NotificationsEnabledInput';

export { NotificationsEnabledInput };
