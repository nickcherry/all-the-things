import { FC, memo, useCallback } from 'react';
import { ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { FormField } from '~/component/field/FormField';
import { Text } from '~/component/text/Text';
import { inifiteMaxTapDuration } from '~/constant/gesture';
import { useTheme } from '~/context/ThemeProvider';
import { Location, locationRadiuses } from '~/type/item';
import { showActionSheet } from '~/util/actionsheet/showActionSheet';
import { translate } from '~/util/translation/translate';
import { translateOptions } from '~/util/translation/translateOptions';
import { Mutable } from '~/util/type';

type LocationRadiusProps = {
  location: Location;
  setLocation: (location: Location) => void;
  style?: ViewStyle | ViewStyle[];
};

const LocationRadius: FC<LocationRadiusProps> = memo(
  ({ location, setLocation, style }) => {
    const { scheme } = useTheme();

    const onPress = useCallback(() => {
      showActionSheet({
        options: translateOptions(
          'locationRadius',
          locationRadiuses as Mutable<typeof locationRadiuses>,
        ),
        onSelect: (radius) => {
          setLocation({ ...location, radius });
        },
        scheme,
      });
    }, [location, scheme, setLocation]);

    const tapGesture = Gesture.Tap()
      .maxDuration(inifiteMaxTapDuration)
      .shouldCancelWhenOutside(true)
      .onFinalize(() => {
        runOnJS(onPress)();
      });

    return (
      <FormField
        style={style}
        label="Radius"
        value={
          <GestureDetector gesture={tapGesture}>
            <Text>{translate('locationRadius', location.radius)}</Text>
          </GestureDetector>
        }
      />
    );
  },
);

LocationRadius.displayName = 'LocationRadius';

export { LocationRadius };
