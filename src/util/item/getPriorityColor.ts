import { ItemPriority } from '~/type/item';
import { getTheme } from '~/util/theme/getTheme';

function getPriorityColor({
  colors,
  priority,
}: {
  colors: ReturnType<typeof getTheme>['colors'];
  priority: ItemPriority;
}) {
  const priorityColors: Record<ItemPriority, string> = {
    lowest: colors.bgPriorityLowest,
    low: colors.bgPriorityLow,
    medium: colors.bgPriorityMedium,
    high: colors.bgPriorityHigh,
    highest: colors.bgPriorityHighest,
  };

  return priorityColors[priority];
}

export { getPriorityColor };
