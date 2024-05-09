import { LocationRegion } from 'expo-location';

import { trackError } from '~/util/error/trackError';

import { updateStoredLocationAlertHistory } from './updateStoredLocationHistory';

function handleExitRegion({ region }: { region: LocationRegion }) {
  if (!region.identifier) {
    trackError(`Location alert region does not have an identifier`);
    return;
  }

  updateStoredLocationAlertHistory({
    identifier: region.identifier,
    updates: { lastExitedAt: Date.now() },
  });
}

export { handleExitRegion };
