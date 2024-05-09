import { FC, memo, useCallback } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { ItemField } from '~/component/item/form/ItemField';
import { Text } from '~/component/text/Text';
import { inifiteMaxTapDuration } from '~/constant/gesture';
import { SetBottomSheetContent } from '~/type/bottomSheet';
import { formatTime } from '~/util/date/formatTime';

import { TimeInputBottomSheetContent } from './TimeInputBottomSheetContent';

type TimeInputProps = {
  time: Date;
  setBottomSheetContent: SetBottomSheetContent;
  setTime: (time: Date) => void;
};

const TimeInput: FC<TimeInputProps> = memo(
  ({ setBottomSheetContent, setTime, time }) => {
    const onPress = useCallback(() => {
      setBottomSheetContent({
        content: <TimeInputBottomSheetContent time={time} setTime={setTime} />,
      });
    }, [setBottomSheetContent, setTime, time]);

    const tapGesture = Gesture.Tap()
      .maxDuration(inifiteMaxTapDuration)
      .shouldCancelWhenOutside(true)
      .onFinalize(() => {
        runOnJS(onPress)();
      });

    return (
      <ItemField
        label="Time"
        value={
          <GestureDetector gesture={tapGesture}>
            <Text>{formatTime({ capitalize: true, time })}</Text>
          </GestureDetector>
        }
      />
    );
  },
);

TimeInput.displayName = 'TimeInput';

export { TimeInput };
