import { FC, memo } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';
import { Location } from '~/type/item';

type SuggestedLocationProps = {
  index: number;
  onPress?: () => void;
  suggestedLocation: Location;
};

const SuggestedLocation: FC<SuggestedLocationProps> = memo(
  ({ index, onPress, suggestedLocation }) => {
    const { t } = useTheme();

    return (
      <Pressable onPress={onPress}>
        <View
          style={[
            t.p4,
            index > 0 && [t.borderSuggestedLocation, t.borderTHairline],
          ]}
        >
          <Text numberOfLines={1} style={[t.textSm]}>
            {suggestedLocation.address}
          </Text>
        </View>
      </Pressable>
    );
  },
);

SuggestedLocation.displayName = 'SuggestedLocation';

export { SuggestedLocation };
