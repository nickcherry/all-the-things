import { Entypo, Fontisto } from '@expo/vector-icons';
import { FC, memo } from 'react';
import { View, ViewStyle } from 'react-native';

import { useTheme } from '~/context/ThemeProvider';
import { useHasNotificationsEnabled } from '~/hook/item/useHasNotificationsEnabled';
import { useIsComplete } from '~/hook/item/useIsComplete';
import { Item } from '~/type/item';
import { hasLocationAlerts } from '~/util/item/hasLocationAlerts';

type NotificationProps = {
  item: Item;
};

const Notification: FC<NotificationProps> = memo(({ item }) => {
  const { t } = useTheme();

  const hasNotificationsEnabled = useHasNotificationsEnabled({ item });
  const isComplete = useIsComplete({ item });

  if (!hasNotificationsEnabled) {
    return null;
  }

  const baseIconStyle: ViewStyle[] = [
    isComplete && t.lineThrough,
    isComplete ? t.textItemCompleted : t.textDefault,
  ];

  return (
    <View style={[t.flexRow, t.itemsCenter, t.hFull]}>
      <Fontisto
        name="bell"
        size={12.5}
        style={[...baseIconStyle, { top: 2.5 }]}
      />
      {hasLocationAlerts(item) && (
        <Entypo
          name="location-pin"
          style={[...baseIconStyle, { left: 2, top: 3 }]}
          size={15.5}
        />
      )}
    </View>
  );
});

Notification.displayName = 'Notification';

export { Notification };
