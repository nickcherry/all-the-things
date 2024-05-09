import { ItemPriority } from '~/type/item';

export const minListItemHeight = 84;

export const quantifiedPriority: Record<ItemPriority, number> = {
  lowest: 0,
  low: 1,
  medium: 2,
  high: 3,
  highest: 4,
};
