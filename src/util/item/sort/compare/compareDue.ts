import { Item } from '~/type/item';

function compareDue(a: Item, b: Item) {
  // If the items are both due by time, earlier due time comes first.
  if (a.due.type === 'by_time' && b.due.type === 'by_time') {
    return a.due.time - b.due.time;
  }

  // If the items are both due by date, earlier due date comes first.
  if (a.due.type === 'by_date' && b.due.type === 'by_date') {
    return a.due.date - b.due.date;
  }

  // If one item is due by time and the other is due by date, the one due by time comes first if the date is in the past.
  if (a.due.type === 'by_time' && b.due.type === 'by_date') {
    return new Date().valueOf() - b.due.date;
  }

  // If one item is due by time and the other is due by date, the one due by time comes first if the date is in the past.
  if (b.due.type === 'by_time' && a.due.type === 'by_date') {
    return a.due.date - new Date().valueOf();
  }

  // If one item has a due date or due time and the other is due whenever, the one with the due date/time comes first.
  if (a.due.type !== 'whenever') {
    return -1;
  }

  // If one item has a due date or due time and the other is due whenever, the one with the due date/time comes first.
  if (b.due.type !== 'whenever') {
    return 1;
  }

  return 0;
}

export { compareDue };
