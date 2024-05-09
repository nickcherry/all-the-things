import { Item, ItemWithLocation } from '~/type/item';

function hasLocationAlerts(item: Item): item is ItemWithLocation {
  return !!(item.due.notifications.enabled && item.due.notifications.location);
}

export { hasLocationAlerts };
