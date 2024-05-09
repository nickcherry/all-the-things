import { FC, memo, useCallback } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { ItemField } from '~/component/item/form/ItemField';
import { Text } from '~/component/text/Text';
import { inifiteMaxTapDuration } from '~/constant/gesture';
import { SetBottomSheetContent } from '~/type/bottomSheet';
import { formatTime } from '~/util/date/formatTime';

import { TimeInputBottomSheetContent } from './TimeInputBottomSheetContent';
type DateNotificationTimeInputProps = {
  notificationTime: Date;
  setBottomSheetContent: SetBottomSheetContent;
  setNotificationTime: (notificationTime: Date) => void;
};

const DateNotificationTimeInput: FC<DateNotificationTimeInputProps> = memo(
  ({ notificationTime, setBottomSheetContent, setNotificationTime }) => {
    const onPress = useCallback(() => {
      setBottomSheetContent({
        content: (
          <TimeInputBottomSheetContent
            time={notificationTime}
            setTime={setNotificationTime}
          />
        ),
      });
    }, [notificationTime, setBottomSheetContent, setNotificationTime]);

    const tapGesture = Gesture.Tap()
      .maxDuration(inifiteMaxTapDuration)
      .shouldCancelWhenOutside(true)
      .onFinalize(() => {
        runOnJS(onPress)();
      });

    return (
      <ItemField
        label="Notification time"
        value={
          <GestureDetector gesture={tapGesture}>
            <Text>
              {formatTime({ capitalize: true, time: notificationTime })}
            </Text>
          </GestureDetector>
        }
      />
    );
  },
);

DateNotificationTimeInput.displayName = 'DateNotificationTimeInput';

export { DateNotificationTimeInput };
