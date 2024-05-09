import { FC, memo, useCallback, useMemo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { ItemField } from '~/component/item/form/ItemField';
import { Text } from '~/component/text/Text';
import { inifiteMaxTapDuration } from '~/constant/gesture';
import { useTheme } from '~/context/ThemeProvider';
import { ItemDue, ItemDueRecurring, ItemDueType } from '~/type/item';
import { showActionSheet } from '~/util/actionsheet/showActionSheet';
import { getNameForDayOfWeek } from '~/util/date/getNameForDayOfWeek';
import { getOrdinalSuffix } from '~/util/date/getOrdinalSuffix';
import { getDueDate } from '~/util/item/getDueDate';
import { getSelectedOption } from '~/util/settings/getSelectedOption';
import { translateOptions } from '~/util/translation/translateOptions';

type RecurringInputProps = {
  due: ItemDue;
  recurring: ItemDueRecurring;
  setRecurring: (recurring: ItemDueRecurring) => void;
  type: ItemDueType;
};

const RecurringInput: FC<RecurringInputProps> = memo(
  ({ due, recurring, setRecurring, type }) => {
    const { scheme, t } = useTheme();

    const options = useMemo(() => {
      return translateOptions(
        'recurring',
        (() => {
          switch (type) {
            case 'whenever':
              return ['never', 'daily'];
            case 'by_date':
              return ['never', 'weekly', 'monthly', 'yearly'];
            case 'by_time':
              return ['never', 'daily'];
          }
        })(),
      );
    }, [type]);

    const selectedOption = useMemo(() => {
      return getSelectedOption({
        options,
        selectedValue: recurring.type,
        fallbackIndex: 0,
      });
    }, [options, recurring.type]);

    const onPress = useCallback(() => {
      showActionSheet({
        options,
        onSelect: (value) => {
          setRecurring({ type: value });
        },
        scheme,
      });
    }, [options, scheme, setRecurring]);

    const tapGesture = Gesture.Tap()
      .maxDuration(inifiteMaxTapDuration)
      .shouldCancelWhenOutside(true)
      .onFinalize(() => {
        runOnJS(onPress)();
      });

    const secondaryText = useMemo(() => {
      const date = getDueDate({ due });

      if (recurring.type === 'weekly') {
        return `Every ${getNameForDayOfWeek(date.getDay())}`;
      }

      if (recurring.type === 'monthly') {
        const dayOfMonth = date.getDate();
        return `On the ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)}`;
      }

      return null;
    }, [due, recurring.type]);

    return (
      <ItemField
        label="Repeats"
        value={
          <>
            <GestureDetector gesture={tapGesture}>
              <Text>{selectedOption.label}</Text>
            </GestureDetector>
            {secondaryText && (
              <Text style={[t.textXs, t.textMuted, t.textRight]}>
                {secondaryText}
              </Text>
            )}
          </>
        }
      />
    );
  },
);

RecurringInput.displayName = 'RecurringInput';

export { RecurringInput };
