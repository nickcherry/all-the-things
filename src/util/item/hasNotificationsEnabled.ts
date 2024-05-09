import { ItemDue } from '~/type/item';

function hasNotificationsEnabled(due: ItemDue) {
  return due.notifications.enabled;
}

export { hasNotificationsEnabled };
