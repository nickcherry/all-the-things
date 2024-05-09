import { FC, memo } from 'react';
// eslint-disable-next-line no-restricted-imports
import DatePickerLib, {
  DatePickerProps as DatePickerPropsLib,
} from 'react-native-date-picker';

import { useTheme } from '~/context/ThemeProvider';

type DatePickerProps = DatePickerPropsLib;

const DatePicker: FC<DatePickerProps> = memo(({ locale, theme, ...props }) => {
  const { scheme } = useTheme();

  return (
    <DatePickerLib theme={theme || scheme} locale={locale || 'en'} {...props} />
  );
});

DatePicker.displayName = 'DatePicker';

export { DatePicker };
