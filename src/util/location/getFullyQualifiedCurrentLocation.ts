import { Location, LocationRadius } from '~/type/item';

import { getAddressForCoords } from './getAddressForCoords';
import { getCurrentLocationCoords } from './getCurrentLocationCoords';

async function getFullyQualifiedCurrentLocation({
  radius,
}: {
  radius: LocationRadius;
}): Promise<Location> {
  const coords = await getCurrentLocationCoords();

  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
    address: await getAddressForCoords({ coords }),
    radius,
  };
}

export { getFullyQualifiedCurrentLocation };
