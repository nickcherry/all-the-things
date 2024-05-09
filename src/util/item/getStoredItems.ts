import { storageKeys } from '~/constant/storage';
import { Items } from '~/type/item';
import { storage } from '~/util/storage';

function getStoredItems(): Items {
  return JSON.parse(storage.getString(storageKeys.items) || JSON.stringify({}));
}

export { getStoredItems };
