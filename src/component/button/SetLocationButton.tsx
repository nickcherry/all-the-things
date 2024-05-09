import * as Haptics from 'expo-haptics';
import { FC, memo, useCallback } from 'react';
import { Pressable, ViewStyle } from 'react-native';

import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';

type SetLocationButtonProps = {
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
};

const SetLocationButton: FC<SetLocationButtonProps> = memo(
  ({ disabled, onPress: onPressParam, style }) => {
    const { t } = useTheme();

    const onPress = useCallback(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onPressParam();
    }, [onPressParam]);

    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={[
          t.bgButton,
          t.pY6,
          t.rounded3xl,
          disabled && t.opacity25,
          style,
        ]}
      >
        <Text style={[t.textButton, t.fontSemibold, t.textCenter, t.textXl]}>
          Set location
        </Text>
      </Pressable>
    );
  },
);

export { SetLocationButton };
