import { FC, memo, useCallback } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { ItemField } from '~/component/item/form/ItemField';
import { Text } from '~/component/text/Text';
import { inifiteMaxTapDuration } from '~/constant/gesture';
import { SetBottomSheetContent } from '~/type/bottomSheet';
import { formatDateRelative } from '~/util/date/formatDateRelative';

import { DateInputBottomSheetContent } from './DateInputBottomSheetContent';

type DateInputProps = {
  date: Date;
  setBottomSheetContent: SetBottomSheetContent;
  setDate: (date: Date) => void;
};

const DateInput: FC<DateInputProps> = memo(
  ({ date, setBottomSheetContent, setDate }) => {
    const onPress = useCallback(() => {
      setBottomSheetContent({
        content: <DateInputBottomSheetContent date={date} setDate={setDate} />,
      });
    }, [date, setBottomSheetContent, setDate]);

    const tapGesture = Gesture.Tap()
      .maxDuration(inifiteMaxTapDuration)
      .shouldCancelWhenOutside(true)
      .onFinalize(() => {
        runOnJS(onPress)();
      });

    return (
      <ItemField
        label="Date"
        value={
          <GestureDetector gesture={tapGesture}>
            <Text>{formatDateRelative({ capitalize: true, date })}</Text>
          </GestureDetector>
        }
      />
    );
  },
);

DateInput.displayName = 'DateInput';

export { DateInput };
