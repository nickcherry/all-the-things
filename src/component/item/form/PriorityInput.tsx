import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import { FC, memo, useCallback } from 'react';
import { View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { PriorityIndicator } from '~/component/item/common/PriorityIndicator';
import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';
import { ItemPriority } from '~/type/item';
import { getPriorityForValue } from '~/util/item/getPriorityForValue';
import { getQuantifiedPriority } from '~/util/item/getQuantifiedPriority';

const priorityOptions: ItemPriority[] = [
  'lowest',
  'low',
  'medium',
  'high',
  'highest',
];

type PriorityInputProps = {
  priority: ItemPriority;
  setPriority: (priority: ItemPriority) => void;
  style?: ViewStyle | ViewStyle[];
};

const PriorityInput: FC<PriorityInputProps> = memo(
  ({ priority, setPriority: setPriorityParam, style }) => {
    const { colors, t } = useTheme();

    const setPriority = useCallback(
      (nextPriority: ItemPriority) => {
        Haptics.selectionAsync();
        setPriorityParam(nextPriority);
      },
      [setPriorityParam],
    );

    return (
      <View style={style}>
        <Text>Priority</Text>
        <View
          style={[t.flexRow, t.justifyBetween, t.mT2, { marginHorizontal: 0 }]}
        >
          <Text style={[t.textXs, t.fontSemibold, t.textMuted]}>Lowest</Text>
          <Text style={[t.textXs, t.fontSemibold, t.textMuted]}>Highest</Text>
        </View>
        <Slider
          style={[t.wFull, t.z10, t._mT1]}
          value={getQuantifiedPriority(priority)}
          onValueChange={(selectedValue) =>
            setPriority(getPriorityForValue(selectedValue))
          }
          minimumValue={0}
          maximumValue={4}
          step={1}
          minimumTrackTintColor={colors.bgSliderTrackLeft}
          maximumTrackTintColor={colors.bgSliderTrackRight}
          tapToSeek
        />
        <View style={[t.flexRow, t.justifyBetween, { marginHorizontal: 7 }]}>
          {priorityOptions.map((p) => (
            <GestureDetector
              key={p}
              gesture={Gesture.Tap().onFinalize(() => {
                runOnJS(setPriority)(p);
              })}
            >
              <View>
                <View
                  style={[
                    t.absolute,
                    t.z0,
                    { left: -20, right: -20, top: -40, bottom: -8 },
                  ]}
                />
                <PriorityIndicator
                  size="large"
                  priority={p}
                  style={[priority === p ? t.opacity100 : t.opacity25]}
                />
              </View>
            </GestureDetector>
          ))}
        </View>
      </View>
    );
  },
);

PriorityInput.displayName = 'PriorityInput';

export { PriorityInput };
