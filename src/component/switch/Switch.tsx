import { FC, memo } from 'react';
// eslint-disable-next-line no-restricted-imports
import { SwitchProps as SwitchPropsRN } from 'react-native';
// eslint-disable-next-line no-restricted-imports
import { Switch as SwitchRN } from 'react-native-gesture-handler';

import { useTheme } from '~/context/ThemeProvider';

type SwitchProps = SwitchPropsRN;

const Switch: FC<SwitchProps> = memo(({ ios_backgroundColor, ...props }) => {
  const { colors } = useTheme();

  return (
    <SwitchRN
      thumbColor={colors.switchThumb}
      trackColor={{ false: colors.switchTrackOff, true: colors.switchTrackOn }}
      ios_backgroundColor={ios_backgroundColor || colors.switchIosBgColor}
      {...props}
    />
  );
});

Switch.displayName = 'Switch';

export { Switch };
