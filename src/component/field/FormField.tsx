import { FC, memo, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

import { InfoText } from '~/component/text/InfoText';
import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';

type FormFieldProps = {
  label: ReactNode;
  info?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  value: ReactNode;
};

const FormField: FC<FormFieldProps> = memo(({ info, label, style, value }) => {
  const { t } = useTheme();

  return (
    <View style={[t.flexRow, t.itemsCenter, t.justifyBetween, style]}>
      <View style={[t.flexShrink, t.mR6, t.flexShrink]}>
        {typeof label === 'string' ? <Text>{label}</Text> : label}
        {info && typeof info === 'string' ? (
          <InfoText style={[t.mT1]}>{info}</InfoText>
        ) : (
          info
        )}
      </View>
      <View style={[t.selfStretch, t.itemsEnd, t.flexShrink0]}>
        {typeof value === 'string' ? <Text>{value}</Text> : value}
      </View>
    </View>
  );
});

FormField.displayName = 'FormField';

export { FormField };
