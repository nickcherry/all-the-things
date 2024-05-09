import { storageKeys } from '~/constant/storage';
import { LocationAlertHistory, LocationAlertHistoryEntry } from '~/type/item';
import { storage } from '~/util/storage';

import { getStoredLocationAlertHistory } from './getStoredLocationAlertHistory';

function updateStoredLocationAlertHistory({
  identifier,
  updates,
}: {
  identifier: string;
  updates: Partial<LocationAlertHistoryEntry>;
}) {
  const prevHistory = getStoredLocationAlertHistory();

  const nextHistory: LocationAlertHistory = {
    ...prevHistory,
    [identifier]: {
      ...prevHistory[identifier],
      ...updates,
    },
  };

  return storage.set(
    storageKeys.locationAlertHistory,
    JSON.stringify(nextHistory),
  );
}

export { updateStoredLocationAlertHistory };
