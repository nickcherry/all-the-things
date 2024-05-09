import { BottomSheetView } from '@gorhom/bottom-sheet';
import { FC, memo } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { t } from 'react-native-tailwindcss';

import { DatePicker } from '~/component/datepicker/DatePicker';
import { Text } from '~/component/text/Text';
import { defaultHitSlop } from '~/constant/pressable';
import { useSettings } from '~/context/SettingsProvider';
import { SetBottomSheetContent } from '~/type/bottomSheet';
import { formatTime } from '~/util/date/formatTime';

import { SettingsField } from './SettingsField';

type DefaultDateNotificationTimeInputProps = {
  setBottomSheetContent: SetBottomSheetContent;
  style?: ViewStyle | ViewStyle[];
};

const DefaultDateNotificationTimeInput: FC<DefaultDateNotificationTimeInputProps> =
  memo(({ setBottomSheetContent, style }) => {
    const { settings, updateSettings } = useSettings();

    return (
      <SettingsField
        label="Default notification time"
        info="When to send notifications for items due by date"
        style={style}
        value={
          <Pressable
            hitSlop={defaultHitSlop}
            onPress={() => {
              setBottomSheetContent({
                content: (
                  <BottomSheetView
                    style={[t.flex1, t.justifyEnd, t.itemsCenter]}
                  >
                    <DatePicker
                      date={new Date(settings.dateNotificationTime)}
                      mode="time"
                      onDateChange={(dateNotificationTime) => {
                        updateSettings({
                          dateNotificationTime: dateNotificationTime.getTime(),
                        });
                      }}
                    />
                  </BottomSheetView>
                ),
              });
            }}
          >
            <Text>
              {formatTime({ time: new Date(settings.dateNotificationTime) })}
            </Text>
          </Pressable>
        }
      />
    );
  });

DefaultDateNotificationTimeInput.displayName =
  'DefaultDateNotificationTimeInput';

export { DefaultDateNotificationTimeInput };
