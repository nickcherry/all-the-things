import { FontAwesome5 } from '@expo/vector-icons';
import { FC, memo } from 'react';
import { View } from 'react-native';

import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';
import { useIsComplete } from '~/hook/item/useIsComplete';
import { Item } from '~/type/item';
import { translate } from '~/util/translation/translate';

type RecurringProps = {
  item: Item;
};

const Recurring: FC<RecurringProps> = memo(({ item }) => {
  const { t } = useTheme();
  const isComplete = useIsComplete({ item });

  if (item.due.recurring.type === 'never') {
    return null;
  }

  return (
    <View style={[t.flexRow]}>
      <View style={{ height: 13, width: 17 }}>
        <Text
          style={[
            t.fontRegular,
            t.mT1,
            t.textSm,
            isComplete && t.lineThrough,
            isComplete ? t.textItemCompleted : t.textDefault,
            t.absolute,
            { top: 3.25 },
          ]}
        >
          <FontAwesome5 name="recycle" size={12} />
        </Text>
      </View>
      <Text
        style={[
          t.fontRegular,
          t.mT1,
          t.mR2,
          t.textSm,
          isComplete && t.lineThrough,
          isComplete ? t.textItemCompleted : t.textDefault,
        ]}
      >
        {translate('recurring', item.due.recurring.type)}
      </Text>
    </View>
  );
});

Recurring.displayName = 'Recurring';

export { Recurring };
