import * as Haptics from 'expo-haptics';
import { FC, memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';

type SaveButtonProps = {
  disabled?: boolean;
  onPress: () => void;
};

const SaveButton: FC<SaveButtonProps> = memo(
  ({ disabled, onPress: onPressParam }) => {
    const { t } = useTheme();

    const onPress = useCallback(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onPressParam();
    }, [onPressParam]);

    return (
      <Pressable onPress={onPress} disabled={disabled}>
        <View
          style={[t.bgButton, t.pY6, t.rounded3xl, disabled && t.opacity25]}
        >
          <Text style={[t.textButton, t.fontSemibold, t.textCenter, t.textXl]}>
            Save
          </Text>
        </View>
      </Pressable>
    );
  },
);

export { SaveButton };
