import { FC, memo, useCallback } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { ItemField } from '~/component/item/form/ItemField';
import { Text } from '~/component/text/Text';
import { inifiteMaxTapDuration } from '~/constant/gesture';
import { useTheme } from '~/context/ThemeProvider';
import {
  ItemNotificationOffsetInDays,
  notificationOffsetInDays,
} from '~/type/item';
import { showActionSheet } from '~/util/actionsheet/showActionSheet';
import { translate } from '~/util/translation/translate';
import { translateOptions } from '~/util/translation/translateOptions';
import { Mutable } from '~/util/type';

const offsetInDaysOptions = translateOptions(
  'notificationOffsetInDays',
  notificationOffsetInDays as Mutable<typeof notificationOffsetInDays>,
);

type OffsetInDaysInputProps = {
  offsetInDays: ItemNotificationOffsetInDays;
  setOffsetInDays: (offsetInDays: ItemNotificationOffsetInDays) => void;
};

const OffsetInDaysInput: FC<OffsetInDaysInputProps> = memo(
  ({ offsetInDays, setOffsetInDays }) => {
    const { scheme } = useTheme();

    const onPress = useCallback(() => {
      showActionSheet({
        options: offsetInDaysOptions,
        onSelect: setOffsetInDays,
        scheme,
      });
    }, [scheme, setOffsetInDays]);

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
            <Text>{translate('notificationOffsetInDays', offsetInDays)}</Text>
          </GestureDetector>
        }
      />
    );
  },
);

OffsetInDaysInput.displayName = 'OffsetInDaysInput';

export { OffsetInDaysInput };
