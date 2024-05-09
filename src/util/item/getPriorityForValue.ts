import { quantifiedPriority } from '~/constant/item';
import { ItemPriority } from '~/type/item';

function getPriorityForValue(value: number): ItemPriority {
  for (const priority in quantifiedPriority) {
    const typedPriority = priority as keyof typeof quantifiedPriority;

    if (quantifiedPriority[typedPriority] === value) {
      return typedPriority;
    }
  }

  throw new Error(`Unexpected priority value: ${value}`);
}

export { getPriorityForValue };
