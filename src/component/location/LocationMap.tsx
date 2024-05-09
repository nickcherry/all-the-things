import { FC, memo, useEffect, useMemo, useRef } from 'react';
import { View, ViewStyle } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { useTheme } from '~/context/ThemeProvider';
import { Location } from '~/type/item';
import { getAddressForCoords } from '~/util/location/getAddressForCoords';
import { metersToLatLong } from '~/util/location/metersToLatLong';

type LocationMapProps = {
  location: Location;
  setLocation: (location: Location) => void;
  style?: ViewStyle | ViewStyle[];
};

const LocationMap: FC<LocationMapProps> = memo(
  ({ location, setLocation, style }) => {
    const { t } = useTheme();
    const mapRef = useRef<MapView>(null);

    const { latitudeDelta, longitudeDelta } = useMemo(() => {
      const dist = metersToLatLong({
        latitude: location.latitude,
        longitude: location.longitude,
        meters: location.radius,
      });
      return { latitudeDelta: dist.latitude, longitudeDelta: dist.longitude };
    }, [location.latitude, location.longitude, location.radius]);

    const initialRegion = useMemo(
      () => ({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta,
        longitudeDelta,
      }),
      [latitudeDelta, location.latitude, location.longitude, longitudeDelta],
    );

    useEffect(() => {
      const syncRegion = () => {
        mapRef.current?.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta,
          longitudeDelta,
        });
      };

      syncRegion();
    }, [latitudeDelta, location, longitudeDelta]);

    return (
      <View style={[t.flex1, style]}>
        {
          <MapView
            ref={mapRef}
            showsUserLocation
            initialRegion={initialRegion}
            style={[t.hFull, t.wFull]}
          >
            <Marker
              draggable
              coordinate={location}
              onDragEnd={async (e) => {
                const coords = e.nativeEvent.coordinate;

                setLocation({
                  ...coords,
                  address: await getAddressForCoords({ coords }),
                  radius: location.radius,
                });
              }}
            />
          </MapView>
        }
      </View>
    );
  },
);

LocationMap.displayName = 'LocationMap';

export { LocationMap };
