import uniqBy from 'lodash/uniqBy';
import { FC, memo } from 'react';
import { View } from 'react-native';

import { Loader } from '~/component/loader/Loader';
import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';
import { Location } from '~/type/item';

import { SuggestedLocation } from './SuggestedLocation';

type SuggestedLocationsProps = {
  currentLocation: Location | undefined;
  isFetching: boolean;
  isInputFocused: boolean;
  locations: Location[] | undefined;
  isValidQuery: boolean;
  onLocationPress: (location: Location) => void;
};

const SuggestedLocations: FC<SuggestedLocationsProps> = memo(
  ({
    currentLocation,
    isFetching,
    isInputFocused,
    locations,
    onLocationPress,
    isValidQuery,
  }) => {
    const { t } = useTheme();

    if (!isInputFocused || !isValidQuery) {
      return null;
    }

    if (isFetching) {
      return (
        <View style={[t.pT12]}>
          <Loader />
        </View>
      );
    }

    if (!locations) {
      return null;
    }

    if (locations.length === 0) {
      return (
        <Text
          style={[t.pT4, t.pX4, t.textMuted, t.textSm]}
        >{`We didn't find any matches`}</Text>
      );
    }

    const filteredLocations = uniqBy(
      locations.filter(
        (suggestedLocation) =>
          suggestedLocation.address !== currentLocation?.address,
      ),
      ({ address }) => address,
    );

    if (filteredLocations.length === 0) {
      return null;
    }

    return (
      <View style={[t.pT6]}>
        <Text style={[t.textSm, t.textMuted, t.fontSemibold, t.pX4]}>
          Suggestions
        </Text>
        {filteredLocations.map((suggestedLocation, index) => (
          <SuggestedLocation
            key={suggestedLocation.address}
            index={index}
            suggestedLocation={suggestedLocation}
            onPress={() => onLocationPress(suggestedLocation)}
          />
        ))}
      </View>
    );
  },
);

SuggestedLocations.displayName = 'SuggestedLocations';

export { SuggestedLocations };
