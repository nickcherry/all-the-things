import { storageKeys } from '~/constant/storage';
import { LocationAlertHistory } from '~/type/item';
import { storage } from '~/util/storage';

function getStoredLocationAlertHistory(): LocationAlertHistory {
  return JSON.parse(
    storage.getString(storageKeys.locationAlertHistory) || JSON.stringify({}),
  );
}

export { getStoredLocationAlertHistory };
