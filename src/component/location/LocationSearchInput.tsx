import { FontAwesome } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useForegroundPermissions } from 'expo-location';
import debounce from 'lodash/debounce';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Pressable,
  TextInput as RNTextInput,
  View,
  ViewStyle,
} from 'react-native';

import { TextInput } from '~/component/textinput/TextInput';
import {
  defaultLocationRadius,
  minLocationQueryLength,
} from '~/constant/location';
import { defaultHitSlop } from '~/constant/pressable';
import { useTheme } from '~/context/ThemeProvider';
import { Location } from '~/type/item';
import { getFullyQualifiedCurrentLocation } from '~/util/location/getFullyQualifiedCurrentLocation';
import { getLocationSuggestions } from '~/util/location/getLocationSuggestions';

import { SuggestedLocations } from './SuggestedLocations';

type LocationSearchInputProps = {
  location: Location | undefined;
  setLocation: (location: Location) => void;
  onInputFocus: () => void;
  onInputBlur: () => void;
  style?: ViewStyle | ViewStyle[];
};

const LocationSearchInput: FC<LocationSearchInputProps> = memo(
  ({ location, onInputBlur, onInputFocus, setLocation, style }) => {
    const { t } = useTheme();

    const [currentLocation, setCurrentLocation] = useState<Location>();
    const inputRef = useRef<RNTextInput>(null);

    const [foregroundPermissions, requestForegroundPermissions] =
      useForegroundPermissions();

    const [query, setQuery] = useState(location?.address || '');
    const [suggestedLocations, setSuggestedLocations] = useState<Location[]>();

    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

    const isValidQuery = query.trim().length >= minLocationQueryLength;

    useEffect(() => {
      const init = async () => {
        if (foregroundPermissions?.granted) {
          const nextCurrentLocation = await getFullyQualifiedCurrentLocation({
            radius: location?.radius || defaultLocationRadius,
          });
          setCurrentLocation(nextCurrentLocation);
        }
      };

      init();
    }, [foregroundPermissions?.granted, location?.radius]);

    const onCurrentLocationPress = useCallback(async () => {
      inputRef.current?.blur();
      onInputBlur();

      const permissions = await requestForegroundPermissions();

      if (!permissions.granted) {
        Alert.alert(
          'To use your current location, enable location sharing in system settings',
        );
      } else {
        if (currentLocation) {
          setLocation(currentLocation);
          setQuery(currentLocation.address);
        }

        const nextCurrentLocation = await getFullyQualifiedCurrentLocation({
          radius: location?.radius || defaultLocationRadius,
        });
        setCurrentLocation(nextCurrentLocation);
        setLocation(nextCurrentLocation);
        setQuery(nextCurrentLocation.address);
      }
    }, [
      currentLocation,
      location?.radius,
      onInputBlur,
      requestForegroundPermissions,
      setLocation,
    ]);

    const updateSuggestions = useMemo(
      () =>
        debounce(
          async ({
            currentLocation: currentLocationForUpdate,
            query: queryForUpdate,
          }: {
            currentLocation: Location | undefined;
            query: string;
          }) => {
            setIsFetchingSuggestions(true);
            const nextSuggestions = await getLocationSuggestions({
              currentLocation: currentLocationForUpdate,
              query: queryForUpdate,
              radius: location?.radius || defaultLocationRadius,
            });
            setSuggestedLocations(nextSuggestions);
            setIsFetchingSuggestions(false);
          },
          300,
          { leading: false, trailing: true },
        ),
      [location?.radius],
    );

    const onSuggestedLocationPress = useCallback(
      (suggestedLocation: Location) => {
        Haptics.selectionAsync();
        setLocation(suggestedLocation);
        setQuery(suggestedLocation.address);
        inputRef.current?.blur();
        onInputBlur();
        setIsFetchingSuggestions(false);
      },
      [onInputBlur, setLocation],
    );

    useEffect(() => {
      setQuery(location?.address || '');
    }, [location]);

    useEffect(() => {
      if (isValidQuery) {
        updateSuggestions({ currentLocation, query });
      }
    }, [currentLocation, isValidQuery, query, updateSuggestions]);

    return (
      <View style={[t.mT4, style]}>
        <View style={[t.pX4]}>
          <TextInput
            inputRef={inputRef}
            autoFocus={!location}
            style={[t.textBase, t.pR8]}
            placeholder="Enter an address"
            onFocus={() => {
              setIsInputFocused(true);
              onInputFocus();
            }}
            onBlur={() => {
              setIsInputFocused(false);
              onInputBlur();
            }}
            value={query}
            onChangeText={setQuery}
          />
          <Pressable
            hitSlop={defaultHitSlop}
            onPress={onCurrentLocationPress}
            style={[
              t.absolute,
              t.right0,
              t.mR4,
              t.roundedFull,
              t.justifyCenter,
              t.itemsCenter,
              t.bgButton,
              { height: 22, width: 22 },
            ]}
          >
            <FontAwesome
              name="location-arrow"
              size={14}
              style={[t.textButton, t.mX1]}
            />
          </Pressable>
        </View>
        <View style={[t.absolute, t.wFull, t.mT6]}>
          <SuggestedLocations
            currentLocation={location}
            isFetching={isFetchingSuggestions}
            isInputFocused={isInputFocused}
            locations={suggestedLocations}
            isValidQuery={isValidQuery}
            onLocationPress={onSuggestedLocationPress}
          />
        </View>
      </View>
    );
  },
);

LocationSearchInput.displayName = 'LocationSearchInput';

export { LocationSearchInput };
