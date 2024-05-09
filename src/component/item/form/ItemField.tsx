import { FC, memo, ReactNode } from 'react';
import { ViewStyle } from 'react-native';

import { FormField } from '~/component/field/FormField';
import { useTheme } from '~/context/ThemeProvider';

type ItemFieldProps = {
  label: ReactNode;
  info?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  value: ReactNode;
};

const ItemField: FC<ItemFieldProps> = memo(({ style, ...props }) => {
  const { t } = useTheme();

  return <FormField {...props} style={[t.mT6, style]} />;
});

ItemField.displayName = 'ItemField';

export { ItemField };
