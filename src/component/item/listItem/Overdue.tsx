import { Ionicons } from '@expo/vector-icons';
import { FC, memo } from 'react';

import { useTheme } from '~/context/ThemeProvider';
import { useIsOverdue } from '~/hook/item/useIsOverdue';
import { Item } from '~/type/item';

type OverdueProps = {
  item: Item;
};

const Overdue: FC<OverdueProps> = memo(({ item }) => {
  const { t } = useTheme();

  const isOverdue = useIsOverdue({ item });

  if (!isOverdue) {
    return null;
  }

  return (
    <Ionicons
      name="flame"
      size={14}
      style={[t.textOverdue, t.mR1, { marginLeft: -1, top: 5.5 }]}
    />
  );
});

Overdue.displayName = 'Overdue';

export { Overdue };
