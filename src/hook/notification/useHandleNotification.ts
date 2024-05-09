import {
  CommonActions,
  NavigationContainerRefWithCurrent,
  StackActions,
} from '@react-navigation/native';
import { Notification, useLastNotificationResponse } from 'expo-notifications';
import { useCallback, useEffect, useRef } from 'react';

import { useItems } from '~/context/ItemProvider';
import { FullParamList, ScreenName } from '~/type/navigation';
import { getPushNotificationData } from '~/util/notification/getPushNotificationData';
import { sleep } from '~/util/promise/sleep';
const waitForNavigatorInterval = 500;
const maxWaitForNavigatorAttempts = 5;

function useHandleNotification(
  navigationRefProp: NavigationContainerRefWithCurrent<FullParamList>,
) {
  const { items } = useItems();

  const navigationRef = useRef(navigationRefProp);
  navigationRef.current = navigationRefProp;

  const handledNotifications = useRef(new Set<string>()).current;

  const lastNotification = useLastNotificationResponse();

  const handleNotification = useCallback(
    async (notification: Notification) => {
      const { identifier } = notification.request;
      if (handledNotifications.has(identifier)) {
        return;
      }

      handledNotifications.add(identifier);

      const data = getPushNotificationData(notification);

      if (!data) {
        console.error(
          'No data for notification:',
          JSON.stringify(notification, null, 2),
        );
        return;
      }

      const waitForNavigator = async () => {
        let waitForNavigatorAttempts = 0;

        while (
          !navigationRef.current.isReady() &&
          waitForNavigatorAttempts++ < maxWaitForNavigatorAttempts
        ) {
          await sleep(waitForNavigatorInterval);
        }

        if (!navigationRef.current.isReady()) {
          console.error('Navigator not ready');
        }
      };

      const navigate = async <N extends ScreenName>(
        screen: N,
        params: FullParamList[N],
      ) => {
        await waitForNavigator();
        return navigationRef.current.dispatch(
          CommonActions.navigate(screen, params),
        );
      };

      const push = async <N extends ScreenName>(
        screen: N,
        params: FullParamList[N],
      ) => {
        await waitForNavigator();
        return navigationRef.current.dispatch(
          StackActions.push(screen, params),
        );
      };

      switch (data.type) {
        case 'view_item':
          if (items[data.id]) {
            push('EditItem', { item: items[data.id] });
          }
          break;
        default:
          navigate('List', {});
      }
    },
    [handledNotifications, items],
  );

  useEffect(() => {
    if (lastNotification) {
      handleNotification(lastNotification.notification);
    }
  }, [handleNotification, lastNotification, navigationRef]);
}

export { useHandleNotification };
