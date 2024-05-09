import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, memo, useMemo } from 'react';
import { ScrollView, View } from 'react-native';

import { FullscreenLoader } from '~/component/loader/FullscreenLoader';
import { Text } from '~/component/text/Text';
import { useItems } from '~/context/ItemProvider';
import { useNotifications } from '~/context/NotificationProvider';
import { useTheme } from '~/context/ThemeProvider';
import { useSystemNotifications } from '~/hook/notification/useSystemNotifications';
import { RootStackParamList } from '~/type/navigation';
import {
  ScheduledNotification,
  SystemNotification,
} from '~/type/notifications';
import { formatDateTimeAbsolute } from '~/util/date/formatDateTimeAbsolute';
import { buildScreen } from '~/util/screen/buildScreen';

type DebugNotificationsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DebugNotifications'
>;

const DebugNotificationsScreen = buildScreen<DebugNotificationsScreenProps>(
  {
    insetTop: false,
    insetBottom: true,
  },
  () => {
    const { t } = useTheme();
    const { getNotifications } = useNotifications();
    const { items: itemsMap } = useItems();

    const allSystemNotifications = useSystemNotifications();
    const allScheduledNotifications = useMemo(() => {
      const items = Object.values(itemsMap);
      const result: Record<string, ScheduledNotification> = {};

      items.forEach((item) => {
        getNotifications({ key: item.id }).forEach((notification) => {
          result[notification.id] = notification;
        });
      });

      return result;
    }, [getNotifications, itemsMap]);

    const scheduledNotifications = useMemo(() => {
      if (!allSystemNotifications) {
        return;
      }

      return Object.values(allScheduledNotifications).filter((notification) => {
        return !allSystemNotifications[notification.id];
      });
    }, [allScheduledNotifications, allSystemNotifications]);

    const systemNotifications = useMemo(() => {
      if (!allSystemNotifications) {
        return;
      }

      return Object.values(allSystemNotifications).filter((notification) => {
        return !allScheduledNotifications[notification.identifier];
      });
    }, [allScheduledNotifications, allSystemNotifications]);

    if (!systemNotifications || !scheduledNotifications) {
      return <FullscreenLoader />;
    }

    if (
      systemNotifications.length === 0 &&
      scheduledNotifications.length === 0
    ) {
      return (
        <View style={[t.p4, t.flex1, t.justifyCenter, t.itemsCenter]}>
          <Text style={[t.textCenter]}>
            System notifications are synchronized with scheduled notifications
          </Text>
        </View>
      );
    }

    return (
      <ScrollView>
        {scheduledNotifications.map((scheduledNotification) => (
          <ScheduledNotificationDetails
            key={scheduledNotification.id}
            scheduledNotification={scheduledNotification}
          />
        ))}
        {systemNotifications.map((systemNotification) => (
          <SystemNotificationDetails
            key={systemNotification.identifier}
            systemNotification={systemNotification}
          />
        ))}
      </ScrollView>
    );
  },
);

DebugNotificationsScreen.displayName = 'DebugNotificationsScreen';

type ScheduledNotificationDetailsProps = {
  scheduledNotification: ScheduledNotification;
};

const ScheduledNotificationDetails: FC<ScheduledNotificationDetailsProps> =
  memo(({ scheduledNotification }) => {
    const { t } = useTheme();

    return (
      <View style={[t.pX4, t.pY1]}>
        <Text style={[t.textXs]}>
          Scheduled notification {scheduledNotification.id} (
          {formatDateTimeAbsolute({
            date: new Date(scheduledNotification.trigger),
          })}
          ) has no corresponding system notification.
        </Text>
      </View>
    );
  });

ScheduledNotificationDetails.displayName = 'ScheduledNotificationDetails';

type SystemNotificationDetailsProps = {
  systemNotification: SystemNotification;
};

const SystemNotificationDetails: FC<SystemNotificationDetailsProps> = memo(
  ({ systemNotification }) => {
    const { t } = useTheme();

    return (
      <View style={[t.pX4, t.pY1]}>
        <Text style={[t.textXs]}>
          System notification {systemNotification.identifier} has no
          corresponding scheduled notification.{' '}
          {JSON.stringify(systemNotification)}
        </Text>
      </View>
    );
  },
);

export { DebugNotificationsScreen };
