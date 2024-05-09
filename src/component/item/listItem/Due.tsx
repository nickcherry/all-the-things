import { FC, memo, useMemo } from 'react';

import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';
import { Item } from '~/type/item';
import { formatDateRelative } from '~/util/date/formatDateRelative';
import { formatTime } from '~/util/date/formatTime';
import { isComplete as isComleteUtil } from '~/util/item/isComplete';

type DueProps = {
  item: Item;
};

const Due: FC<DueProps> = memo(({ item }) => {
  const { t } = useTheme();

  const text = useMemo(() => {
    if (item.due.type === 'by_date') {
      return `Due ${formatDateRelative({ date: new Date(item.due.date) })}`;
    }

    if (item.due.type === 'by_time') {
      return `Due at ${formatTime({ time: new Date(item.due.time) })}`;
    }

    return null;
  }, [item]);

  const isComplete = useMemo(() => isComleteUtil(item), [item]);

  if (!text) {
    return null;
  }

  return (
    <Text
      style={[
        t.fontRegular,
        t.mT1,
        t.textSm,
        t.mR2,
        isComplete && t.lineThrough,
        isComplete ? t.textItemCompleted : t.textDefault,
      ]}
    >
      {text}
    </Text>
  );
});

Due.displayName = 'Due';

export { Due };
