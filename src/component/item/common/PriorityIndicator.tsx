import { FC, memo } from 'react';
import { View, ViewStyle } from 'react-native';

import { useTheme } from '~/context/ThemeProvider';
import { ItemPriority } from '~/type/item';
import { getPriorityColor } from '~/util/item/getPriorityColor';

type PriorityIndicatorProps = {
  priority: ItemPriority;
  size?: 'normal' | 'large';
  style?: ViewStyle | ViewStyle[];
};

const PriorityIndicator: FC<PriorityIndicatorProps> = memo(
  ({ priority, size = 'normal', style }) => {
    const { colors, t } = useTheme();

    const diameter = size === 'normal' ? 12 : 18;

    return (
      <View
        style={[
          t.roundedFull,
          t.borderHairline,
          t.borderLight,
          {
            height: diameter,
            width: diameter,
            backgroundColor: getPriorityColor({ colors, priority }),
          },
          style,
        ]}
      />
    );
  },
);

PriorityIndicator.displayName = 'PriorityIndicator';

export { PriorityIndicator };
