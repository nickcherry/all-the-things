import { googlePlacesApiKey } from '~/constant/env';
import {
  defaultMaxNumSuggestedLocations,
  suggestedLocationsSearchRadius,
} from '~/constant/location';
import { Location, LocationRadius } from '~/type/item';
import { trackError } from '~/util/error/trackError';

import { cleanUpFormattedAddress } from './cleanUpFormattedAddress';

type GooglePlacesResponse = {
  results: {
    formatted_address: string;
    geometry: {
      location: { lat: number; lng: number };
    };
    place_id: string;
  }[];
  status:
    | 'OK'
    | 'ZERO_RESULTS'
    | 'INVALID_REQUEST'
    | 'OVER_QUERY_LIMIT'
    | 'REQUEST_DENIED'
    | 'UNKNOWN_ERROR';
};

async function getLocationSuggestions({
  currentLocation,
  maxNumResults = defaultMaxNumSuggestedLocations,
  query,
  radius,
}: {
  currentLocation: Location | undefined;
  maxNumResults?: number;
  query: string;
  radius: LocationRadius;
}): Promise<Location[]> {
  // https://developers.google.com/maps/documentation/places/web-service/search-text
  const params = new URLSearchParams();
  params.append('query', query);
  params.append('radius', suggestedLocationsSearchRadius.toString());
  params.append('key', googlePlacesApiKey);

  const fallback: Location[] = [];

  if (currentLocation) {
    params.append(
      'location',
      `${currentLocation.latitude},${currentLocation.longitude}`,
    );
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?${params.toString()}`,
    );

    const data: GooglePlacesResponse = await res.json();

    if (data.status !== 'OK') {
      return fallback;
    }
    return data.results
      .map((result) => ({
        latitude: result.geometry.location.lat,
        address: cleanUpFormattedAddress({ address: result.formatted_address }),
        longitude: result.geometry.location.lng,
        radius,
      }))
      .slice(0, maxNumResults);
  } catch (error) {
    trackError(error);
    return fallback;
  }
}

export { getLocationSuggestions };
