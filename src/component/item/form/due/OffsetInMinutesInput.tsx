import { FC, memo, useCallback } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { ItemField } from '~/component/item/form/ItemField';
import { Text } from '~/component/text/Text';
import { inifiteMaxTapDuration } from '~/constant/gesture';
import { useTheme } from '~/context/ThemeProvider';
import {
  ItemNotificationOffsetInMinutes,
  notificationOffsetInMinutes,
} from '~/type/item';
import { showActionSheet } from '~/util/actionsheet/showActionSheet';
import { translate } from '~/util/translation/translate';
import { translateOptions } from '~/util/translation/translateOptions';
import { Mutable } from '~/util/type';

const offsetInMinutesOptions = translateOptions(
  'notificationOffsetInMinutes',
  notificationOffsetInMinutes as Mutable<typeof notificationOffsetInMinutes>,
);

type OffsetInMinutesInputProps = {
  offsetInMinutes: ItemNotificationOffsetInMinutes;
  setOffsetInMinutes: (
    offsetInMinutes: ItemNotificationOffsetInMinutes,
  ) => void;
};

const OffsetInMinutesInput: FC<OffsetInMinutesInputProps> = memo(
  ({ offsetInMinutes, setOffsetInMinutes }) => {
    const { scheme } = useTheme();

    const onPress = useCallback(() => {
      showActionSheet({
        options: offsetInMinutesOptions,
        onSelect: setOffsetInMinutes,
        scheme,
      });
    }, [scheme, setOffsetInMinutes]);

    const tapGesture = Gesture.Tap()
      .maxDuration(inifiteMaxTapDuration)
      .shouldCancelWhenOutside(true)
      .onFinalize(() => {
        runOnJS(onPress)();
      });

    return (
      <ItemField
        label="Remind me"
        value={
          <GestureDetector gesture={tapGesture}>
            <Text>
              {translate('notificationOffsetInMinutes', offsetInMinutes)}
            </Text>
          </GestureDetector>
        }
      />
    );
  },
);

OffsetInMinutesInput.displayName = 'OffsetInMinutesInput';

export { OffsetInMinutesInput };
