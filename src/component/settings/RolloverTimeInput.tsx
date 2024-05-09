import { BottomSheetView } from '@gorhom/bottom-sheet';
import { FC, memo } from 'react';
import { Pressable } from 'react-native';
import { t } from 'react-native-tailwindcss';

import { DatePicker } from '~/component/datepicker/DatePicker';
import { Text } from '~/component/text/Text';
import { defaultHitSlop } from '~/constant/pressable';
import { useSettings } from '~/context/SettingsProvider';
import { SetBottomSheetContent } from '~/type/bottomSheet';
import { formatTime } from '~/util/date/formatTime';

import { SettingsField } from './SettingsField';

type RolloverTimeInputProps = {
  setBottomSheetContent: SetBottomSheetContent;
};

const RolloverTimeInput: FC<RolloverTimeInputProps> = memo(
  ({ setBottomSheetContent }) => {
    const { settings, updateSettings } = useSettings();

    return (
      <SettingsField
        label="Rollover time"
        info="When recurring items get reset"
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
                      date={new Date(settings.recurringRolloverTime)}
                      mode="time"
                      onDateChange={(recurringRolloverTime) => {
                        updateSettings({
                          recurringRolloverTime:
                            recurringRolloverTime.getTime(),
                        });
                      }}
                    />
                  </BottomSheetView>
                ),
              });
            }}
          >
            <Text>
              {formatTime({ time: new Date(settings.recurringRolloverTime) })}
            </Text>
          </Pressable>
        }
      />
    );
  },
);

RolloverTimeInput.displayName = 'RolloverTimeInput';

export { RolloverTimeInput };
