import { ItemDue } from '~/type/item';

function getDueTime({
  due,
  fallback = new Date().setHours(12, 0, 0, 0),
}: {
  due: ItemDue;
  fallback?: number;
}) {
  if (due.type === 'by_time') {
    return new Date(due.time);
  }

  return new Date(fallback);
}

export { getDueTime };
