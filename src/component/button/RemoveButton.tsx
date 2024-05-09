import { FC, memo } from 'react';
import { Pressable, ViewStyle } from 'react-native';

import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';

type RemoveButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
};

const RemoveButton: FC<RemoveButtonProps> = memo(
  ({ label, onPress, style }) => {
    const { t } = useTheme();
    return (
      <Pressable style={[style]} onPress={onPress}>
        <Text style={[t.textCenter, t.textRemoveButton]}>{label}</Text>
      </Pressable>
    );
  },
);

RemoveButton.displayName = 'RemoveButton';

export { RemoveButton };
