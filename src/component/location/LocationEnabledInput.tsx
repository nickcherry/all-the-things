import { FC, memo } from 'react';
import { ViewStyle } from 'react-native';

import { ItemField } from '~/component/item/form/ItemField';
import { Switch } from '~/component/switch/Switch';
import { defaultHitSlop } from '~/constant/pressable';

type LocationEnabledInputProps = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  style?: ViewStyle | ViewStyle[];
};

const LocationEnabledInput: FC<LocationEnabledInputProps> = memo(
  ({ enabled, setEnabled, style }) => {
    return (
      <ItemField
        label="Enabled"
        info="Receive notifications near a location"
        style={style}
        value={
          <Switch
            hitSlop={defaultHitSlop}
            value={enabled}
            onValueChange={setEnabled}
          />
        }
      />
    );
  },
);

LocationEnabledInput.displayName = 'LocationEnabledInput';

export { LocationEnabledInput };
