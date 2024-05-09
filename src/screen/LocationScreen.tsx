import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { LocationForm } from '~/component/location/LocationForm';
import { RootStackParamList } from '~/type/navigation';
import { buildScreen } from '~/util/screen/buildScreen';

type LocationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Location'
>;

const LocationScreen = buildScreen<LocationScreenProps>(
  {},
  ({
    route: {
      params: { location, setLocation },
    },
  }) => {
    return <LocationForm location={location} setLocation={setLocation} />;
  },
);

LocationScreen.displayName = 'LocationScreen';

export { LocationScreen };
