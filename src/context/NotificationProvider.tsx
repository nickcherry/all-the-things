import * as Notifications from 'expo-notifications';
import {
  createContext,
  FC,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';

import { storageKeys } from '~/constant/storage';
import {
  NotificationRequest,
  ScheduledNotification,
  ScheduledNotifications,
} from '~/type/notifications';
import { storage } from '~/util/storage';

type ScheduleNotifications = (params: {
  key: string;
  requests: NotificationRequest[];
}) => Promise<ScheduledNotification[]>;

type RemoveNotifications = (params: { key: string }) => Promise<void>;

type GetNotifications = (params: { key: string }) => ScheduledNotification[];

type NotificationContextValue = {
  getNotifications: GetNotifications;
  removeNotifications: RemoveNotifications;
  scheduleNotifications: ScheduleNotifications;
};

const NotificationContext = createContext<NotificationContextValue>({
  getNotifications: () => [],
  removeNotifications: async () => undefined,
  scheduleNotifications: async () => [],
});

type NotificationProviderProps = {
  children: ReactNode;
};

const saveNotifications = (notifications: ScheduledNotifications) =>
  storage.set(storageKeys.notifications, JSON.stringify(notifications));

const NotificationProvider: FC<NotificationProviderProps> = memo(
  ({ children }) => {
    const notifications = useRef(
      useMemo(
        (): ScheduledNotifications =>
          JSON.parse(
            storage.getString(storageKeys.notifications) || JSON.stringify({}),
          ),
        [],
      ),
    ).current;

    const scheduleNotifications: ScheduleNotifications = useCallback(
      async ({ key, requests }) => {
        const scheduled: ScheduledNotification[] = [];

        for (const request of requests) {
          const id = await Notifications.scheduleNotificationAsync(request);
          scheduled.push({ id, trigger: request.trigger });
        }

        notifications[key] = scheduled;
        saveNotifications(notifications);
        return scheduled;
      },
      [notifications],
    );

    const removeNotifications: RemoveNotifications = useCallback(
      async ({ key }) => {
        const scheduled = notifications[key] || [];
        delete notifications[key];

        for (const { id } of scheduled) {
          await Notifications.cancelScheduledNotificationAsync(id);
        }

        saveNotifications(notifications);
      },
      [notifications],
    );

    const getNotifications: GetNotifications = useCallback(
      ({ key }) => {
        return notifications[key] || [];
      },
      [notifications],
    );

    const value = useMemo(
      () => ({ getNotifications, removeNotifications, scheduleNotifications }),
      [getNotifications, removeNotifications, scheduleNotifications],
    );

    return (
      <NotificationContext.Provider value={value}>
        {children}
      </NotificationContext.Provider>
    );
  },
);

NotificationProvider.displayName = 'NotificationProvider';

function useNotifications() {
  return useContext(NotificationContext);
}

export { NotificationProvider, useNotifications };
