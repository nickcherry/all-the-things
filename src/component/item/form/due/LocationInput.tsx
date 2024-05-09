import { useBackgroundPermissions } from 'expo-location';
import { FC, memo, useCallback } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import { ItemField } from '~/component/item/form/ItemField';
import { Text } from '~/component/text/Text';
import { inifiteMaxTapDuration } from '~/constant/gesture';
import { useTheme } from '~/context/ThemeProvider';
import { usePush } from '~/hook/navigation/usePush';
import { Location } from '~/type/item';
import { shortenAddress } from '~/util/location/shortenAddress';

type LocationInputProps = {
  location: Location | undefined;
  setLocation: (location: Location | undefined) => void;
};

const LocationInput: FC<LocationInputProps> = memo(
  ({ location, setLocation }) => {
    const { t } = useTheme();
    const push = usePush();

    const [permission] = useBackgroundPermissions();

    const onPress = useCallback(() => {
      push('Location', { location, setLocation });
    }, [location, push, setLocation]);

    const tapGesture = Gesture.Tap()
      .maxDuration(inifiteMaxTapDuration)
      .shouldCancelWhenOutside(true)
      .onFinalize(() => {
        runOnJS(onPress)();
      });

    return (
      <ItemField
        label="Location"
        value={
          <GestureDetector gesture={tapGesture}>
            <Text numberOfLines={1} style={[t.textRight, { width: 180 }]}>
              {permission && !permission.canAskAgain && !permission.granted
                ? 'Disabled'
                : location
                  ? shortenAddress({ address: location.address })
                  : 'None'}
            </Text>
          </GestureDetector>
        }
      />
    );
  },
);

LocationInput.displayName = 'LocationInput';

export { LocationInput };
