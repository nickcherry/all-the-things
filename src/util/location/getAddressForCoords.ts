import { reverseGeocodeAsync } from 'expo-location';
import compact from 'lodash/compact';

import { cleanUpFormattedAddress } from './cleanUpFormattedAddress';

async function getAddressForCoords({
  coords,
}: {
  coords: { latitude: number; longitude: number };
}) {
  const addresses = await reverseGeocodeAsync(coords, {
    useGoogleMaps: false,
  });
  const address = addresses[0];
  const { latitude, longitude } = coords;

  return address
    ? cleanUpFormattedAddress({
        address:
          address.formattedAddress ||
          compact(
            [
              address.name ||
                `${address.streetNumber || ''} ${address.street || ''}`,
              address.city,
              `${address.region || ''} ${address.postalCode || ''}`,
              address.country,
            ].map((part) => part?.trim()),
          ).join(', '),
      })
    : [latitude, longitude].join(', ');
}

export { getAddressForCoords };
