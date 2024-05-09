import { ItemDue } from '~/type/item';

function isRecurring(
  due: ItemDue,
): due is ItemDue & { recurring: { type: 'daily' | 'weekly' | 'monthly' } } {
  return due.recurring.type !== 'never';
}

export { isRecurring };
