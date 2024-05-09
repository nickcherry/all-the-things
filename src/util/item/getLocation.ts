import { ItemDue } from '~/type/item';

function getLocation({ due }: { due: ItemDue }) {
  if (due.notifications.enabled) {
    return due.notifications.location;
  }
}

export { getLocation };
