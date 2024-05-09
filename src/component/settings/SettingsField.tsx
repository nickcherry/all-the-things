import { FC, memo, ReactNode } from 'react';
import { ViewStyle } from 'react-native';

import { FormField } from '~/component/field/FormField';
import { useTheme } from '~/context/ThemeProvider';

type SettingsFieldProps = {
  label: ReactNode;
  info?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  value: ReactNode;
};

const SettingsField: FC<SettingsFieldProps> = memo(({ style, ...props }) => {
  const { t } = useTheme();

  return <FormField {...props} style={[t.itemsStart, style]} />;
});

SettingsField.displayName = 'SettingsField';

export { SettingsField };
