import { LocationRegion } from 'expo-location';
import { NotificationContentInput } from 'expo-notifications';
import * as Notifications from 'expo-notifications';

import { notificationSound, notificationTitle } from '~/constant/notification';
import { days, minutes } from '~/constant/time';
import { ViewItemPushNotificationData } from '~/type/notifications';
import { trackError } from '~/util/error/trackError';
import { getStoredItems } from '~/util/item/getStoredItems';
import { hasLocationAlerts } from '~/util/item/hasLocationAlerts';
import { isComplete } from '~/util/item/isComplete';
import { shortenAddress } from '~/util/location/shortenAddress';

import { getStoredLocationAlertHistory } from './getStoredLocationAlertHistory';
import { updateStoredLocationAlertHistory } from './updateStoredLocationHistory';

function handleEnterRegion({ region }: { region: LocationRegion }) {
  const items = getStoredItems();

  if (!region.identifier) {
    trackError(`Location alert region did not have an identifier`);
    return;
  }

  const now = Date.now();

  const itemId = region.identifier;

  updateStoredLocationAlertHistory({
    identifier: itemId,
    updates: { lastEnteredAt: now },
  });

  const item = items[itemId];
  if (!item) {
    trackError(`Could not find item for location alert: ${itemId}`);
    return;
  }

  if (!hasLocationAlerts(item) || isComplete(item)) {
    return;
  }

  if (now < item.createdAt + minutes.one) {
    return;
  }

  const history = getStoredLocationAlertHistory();
  const historyEntry = history[itemId];

  if (historyEntry) {
    const lastExitedAt = historyEntry.lastEnteredAt || 0;
    const lastNotifiedAt = historyEntry.lastNotifiedAt || 0;

    if (lastNotifiedAt > lastExitedAt && lastNotifiedAt > now - days.one) {
      return;
    }

    if (lastNotifiedAt > now - minutes.fifteen) {
      return;
    }
  }

  const data: ViewItemPushNotificationData = {
    type: 'view_item',
    id: item.id,
  };

  const content: NotificationContentInput = {
    title: notificationTitle,
    subtitle: item.name,
    body: `You are near ${shortenAddress({ address: item.due.notifications.location.address })}`,
    data,
    sound: notificationSound,
  };

  const trigger = { seconds: 1 };

  Notifications.scheduleNotificationAsync({ content, trigger });

  updateStoredLocationAlertHistory({
    identifier: itemId,
    updates: { lastNotifiedAt: Date.now() },
  });
}

export { handleEnterRegion };
