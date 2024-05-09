import { BottomSheetView } from '@gorhom/bottom-sheet';
import { FC, memo } from 'react';

import { DatePicker } from '~/component/datepicker/DatePicker';
import { useTheme } from '~/context/ThemeProvider';

type TimeInputBottomSheetContentProps = {
  time: Date;
  setTime: (time: Date) => void;
};

const TimeInputBottomSheetContent: FC<TimeInputBottomSheetContentProps> = memo(
  ({ time, setTime }) => {
    const { t } = useTheme();

    return (
      <BottomSheetView style={[t.flex1, t.justifyEnd, t.itemsCenter]}>
        <DatePicker mode="time" date={time} onDateChange={setTime} />
      </BottomSheetView>
    );
  },
);

TimeInputBottomSheetContent.displayName = 'TimeInputBottomSheetContent';

export { TimeInputBottomSheetContent };
