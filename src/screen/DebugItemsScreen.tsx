import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { FC, memo, ReactNode, useMemo } from 'react';
import { Pressable, View } from 'react-native';

import { FullscreenLoader } from '~/component/loader/FullscreenLoader';
import { Text } from '~/component/text/Text';
import { useItems } from '~/context/ItemProvider';
import { useSettings } from '~/context/SettingsProvider';
import { useTheme } from '~/context/ThemeProvider';
import { usePush } from '~/hook/navigation/usePush';
import { useNotificationsForItem } from '~/hook/notification/useNotificationsForItem';
import { useSystemNotifications } from '~/hook/notification/useSystemNotifications';
import { Item } from '~/type/item';
import { RootStackParamList } from '~/type/navigation';
import {
  ScheduledNotification,
  SystemNotifications,
} from '~/type/notifications';
import { formatDateTimeAbsolute } from '~/util/date/formatDateTimeAbsolute';
import { formatTime } from '~/util/date/formatTime';
import { getNextRolloverTime } from '~/util/item/getNextRolloverTime';
import { getPrevRolloverTime } from '~/util/item/getPrevRolloverTime';
import { buildScreen } from '~/util/screen/buildScreen';

const leftColWidth = 100;

type DebugItemsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DebugItems'
>;

const DebugItemsScreen = buildScreen<DebugItemsScreenProps>(
  {
    insetTop: false,
    insetBottom: true,
  },
  () => {
    const { items: itemsMap } = useItems();
    const systemNotifications = useSystemNotifications();

    const items = useMemo(() => Object.values(itemsMap), [itemsMap]);

    const extraData = useMemo(
      () => ({ systemNotifications }),
      [systemNotifications],
    );

    if (!systemNotifications) {
      return <FullscreenLoader />;
    }

    return (
      <FlashList
        data={items}
        renderItem={({ item, index }) => (
          <RolloverListItem
            index={index}
            item={item}
            systemNotifications={systemNotifications}
          />
        )}
        extraData={extraData}
        estimatedItemSize={160}
      />
    );
  },
);

DebugItemsScreen.displayName = 'DebugItemsScreen';

type RolloverListItem = {
  index: number;
  item: Item;
  systemNotifications: SystemNotifications;
};

const RolloverListItem: FC<RolloverListItem> = memo(
  ({ index, item, systemNotifications }) => {
    const { sizes, t } = useTheme();
    const { settings } = useSettings();
    const push = usePush();

    const notifications = useNotificationsForItem({ item });

    return (
      <Pressable onPress={() => push('EditItem', { item })}>
        <View style={[t.p4, index > 0 && [t.borderDefault, t.borderTHairline]]}>
          <Text
            style={[t.fontSemibold, { marginLeft: leftColWidth + sizes.s1 }]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Field label="type" value={item.due.type} />

          {item.due.type === 'whenever' && (
            <Field label="recurring" value={item.due.recurring.type} />
          )}

          {item.due.type === 'by_time' && (
            <>
              <Field
                label="time"
                value={formatTime({ time: new Date(item.due.time) })}
              />
              <Field label="recurring" value={item.due.recurring.type} />
            </>
          )}

          {item.due.type === 'by_date' && (
            <>
              <Field
                label="date"
                value={formatDateTimeAbsolute({
                  date: new Date(item.due.date),
                })}
              />
              <Field label="recurring" value={item.due.recurring.type} />
              <Field
                label="prev due date"
                value={formatDateTimeAbsolute({
                  date: new Date(
                    getPrevRolloverTime({
                      due: item.due,
                      now: Date.now(),
                      settings,
                    }),
                  ),
                })}
              />
              <Field
                label="next due date"
                value={formatDateTimeAbsolute({
                  date: new Date(
                    getNextRolloverTime({
                      due: item.due,
                      now: Date.now(),
                      settings,
                    }),
                  ),
                })}
              />
            </>
          )}
          <Field
            label="notifications"
            value={
              <View style={[t.flexShrink]}>
                {notifications.length === 0 ? (
                  <Text style={[t.textXs]}>none</Text>
                ) : (
                  notifications.map((notification) => {
                    return (
                      <NotificationDetails
                        key={notification.id}
                        notification={notification}
                        systemNotifications={systemNotifications}
                      />
                    );
                  })
                )}
              </View>
            }
          />
        </View>
      </Pressable>
    );
  },
);

RolloverListItem.displayName = 'RolloverListItem';

type NotificationDetailsProps = {
  notification: ScheduledNotification;
  systemNotifications: SystemNotifications;
};

const NotificationDetails: FC<NotificationDetailsProps> = memo(
  ({ notification, systemNotifications }) => {
    const { t } = useTheme();

    return (
      <View>
        <Text style={[t.textXs]} numberOfLines={1}>
          {formatDateTimeAbsolute({ date: new Date(notification.trigger) })}
        </Text>
        {!systemNotifications[notification.id] && (
          <Text style={[t.textXs, t.fontSemibold, t.textRed600]}>
            ☝️ missing system notifications
          </Text>
        )}
      </View>
    );
  },
);

type FieldProps = {
  label: ReactNode;
  value: ReactNode;
};

const Field: FC<FieldProps> = memo(({ label, value }) => {
  const { t } = useTheme();

  return (
    <View style={[t.flexRow, t.mT1]}>
      {typeof label === 'string' ? (
        <Text
          style={[
            t.textXs,
            t.fontSemibold,
            t.textMuted,
            t.textRight,
            t.mR1,
            { minWidth: leftColWidth },
          ]}
        >
          {label}:
        </Text>
      ) : null}
      {typeof value === 'string' ? (
        <Text style={[t.textXs]}>{value}</Text>
      ) : (
        value
      )}
    </View>
  );
});

export { DebugItemsScreen };
