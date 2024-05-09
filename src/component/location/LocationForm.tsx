import { useBackgroundPermissions } from 'expo-location';
import { FC, memo, useCallback, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { SetLocationButton } from '~/component/button/SetLocationButton';
import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';
import { usePop } from '~/hook/navigation/usePop';
import { useAnimatedStyle } from '~/hook/reanimated/useAnimatedStyle';
import { Location } from '~/type/item';

import { LocationEnabledInput } from './LocationEnabledInput';
import { LocationMap } from './LocationMap';
import { LocationRadius } from './LocationRadius';
import { LocationSearchInput } from './LocationSearchInput';

const maxUnderlayOpacity = 1;

type LocationFormProps = {
  location: Location | undefined;
  setLocation: (location: Location | undefined) => void;
};

const LocationForm: FC<LocationFormProps> = memo(
  ({ location: itemLocation, setLocation: setItemLocation }) => {
    const { t } = useTheme();
    const pop = usePop();

    const [location, setLocation] = useState(itemLocation);
    const [enabled, setEnabled] = useState(!!location);

    const underlayOpacity = useSharedValue(0);

    const [isInputFocused, setIsInputFocused] = useState(false);

    const onInputFocus = useCallback(() => {
      cancelAnimation(underlayOpacity);
      underlayOpacity.value = withTiming(maxUnderlayOpacity, { duration: 150 });
    }, [underlayOpacity]);

    const onInputBlur = useCallback(() => {
      underlayOpacity.value = withTiming(0, { duration: 150 });
      setIsInputFocused(false);
    }, [underlayOpacity]);

    const [backgroundPermissions, requestBackgroundPermissions] =
      useBackgroundPermissions();

    const save = useCallback(() => {
      setItemLocation(location);
      pop();
    }, [location, pop, setItemLocation]);

    const underlayAnimatedStyle = useAnimatedStyle(() => {
      return { opacity: underlayOpacity.value };
    }, [underlayOpacity]);

    if (
      backgroundPermissions &&
      !backgroundPermissions.canAskAgain &&
      !backgroundPermissions.granted
    ) {
      return (
        <View style={[t.p4, t.flex1]}>
          <Text style={[t.textCenter]}>
            {
              "To receive location alerts you'll need to set location sharing to Always in iOS settings."
            }
          </Text>
          <Text
            style={[t.textSm, t.textCenter, t.fontSemibold, t.textMuted, t.mT4]}
          >
            {`Settings : All The Things : Location : Always`}
          </Text>
        </View>
      );
    }

    return (
      <View style={[t.flex1, t.justifyBetween, t.mT4]}>
        <View style={[t.hFull, t.flexShrink, t.flexGrow0, t.z10]}>
          <Animated.View
            pointerEvents={isInputFocused ? 'auto' : 'none'}
            style={[
              t.bgScreen,
              t.absolute,
              t.inset0,
              t.z10,
              underlayAnimatedStyle,
            ]}
          />
          <LocationEnabledInput
            style={[t.mT0, t.pX4, t.z20]}
            enabled={enabled}
            setEnabled={async (nextEnabled: boolean) => {
              const disable = () => {
                setEnabled(false);
                setLocation(undefined);
              };

              const enable = () => setEnabled(true);

              if (!nextEnabled) {
                disable();
              } else {
                enable();

                const permissions = await requestBackgroundPermissions();

                if (!permissions.granted) {
                  disable();
                } else {
                  enable();
                }
              }
            }}
          />
          {enabled && (
            <LocationSearchInput
              style={[t.z20]}
              location={location}
              onInputFocus={onInputFocus}
              onInputBlur={onInputBlur}
              setLocation={setLocation}
            />
          )}
          {enabled && location && (
            <LocationRadius
              style={[t.pX4, t.pT5]}
              location={location}
              setLocation={setLocation}
            />
          )}
          {enabled && location && (
            <LocationMap
              style={[t.z0, t.mY4]}
              location={location}
              setLocation={setLocation}
            />
          )}
        </View>
        <SetLocationButton
          style={[t.mX4]}
          onPress={save}
          disabled={enabled && !location}
        />
      </View>
    );
  },
);

LocationForm.displayName = 'LocationForm';

export { LocationForm };
