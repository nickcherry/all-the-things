import { ItemDue } from '~/type/item';

function getDueNotifications({ due }: { due: ItemDue }) {
  return due.notifications;
}

export { getDueNotifications };
