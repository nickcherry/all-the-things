import { BottomSheetView } from '@gorhom/bottom-sheet';
import { FC, memo } from 'react';

import { DatePicker } from '~/component/datepicker/DatePicker';
import { useTheme } from '~/context/ThemeProvider';

type DateInputBottomSheetContentProps = {
  date: Date;
  setDate: (date: Date) => void;
};

const DateInputBottomSheetContent: FC<DateInputBottomSheetContentProps> = memo(
  ({ date, setDate }) => {
    const { t } = useTheme();

    return (
      <BottomSheetView style={[t.flex1, t.justifyEnd, t.itemsCenter]}>
        <DatePicker mode="date" date={date} onDateChange={setDate} />
      </BottomSheetView>
    );
  },
);

DateInputBottomSheetContent.displayName = 'DateInputBottomSheetContent';

export { DateInputBottomSheetContent };
