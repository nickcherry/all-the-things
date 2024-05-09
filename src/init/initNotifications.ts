import * as Notifications from 'expo-notifications';

import {
  itemCategoryActions,
  itemCateogryId,
  notificationSound,
} from '~/constant/notification';
import { days, hours, minutes } from '~/constant/time';

function initNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async (_notification) => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      };
    },
  });

  Notifications.setNotificationCategoryAsync(itemCateogryId, [
    {
      buttonTitle: 'Dismiss',
      identifier: itemCategoryActions.dismiss,
      options: {
        opensAppToForeground: false,
      },
    },

    {
      buttonTitle: 'Snooze 15 minutes',
      identifier: itemCategoryActions.snooze15Mins,
      options: {
        opensAppToForeground: false,
      },
    },
    {
      buttonTitle: 'Snooze 2 hours',
      identifier: itemCategoryActions.snooze2Hours,
      options: {
        opensAppToForeground: false,
      },
    },
    {
      buttonTitle: 'Snooze 1 day',
      identifier: itemCategoryActions.snooze15Mins,
      options: {
        opensAppToForeground: false,
      },
    },
  ]);

  Notifications.addNotificationResponseReceivedListener(async (response) => {
    const snooze = async (seconds: number) => {
      const { content, identifier } = response.notification.request;

      const snoozeRequest: Notifications.NotificationRequestInput = {
        identifier: `${identifier}_${Date.now()}`,
        content: {
          title: content.title,
          subtitle: content.subtitle,
          body: content.body,
          sound: notificationSound,
          categoryIdentifier: itemCateogryId,
          data: content.data,
        },
        trigger: { seconds },
      };

      await Notifications.scheduleNotificationAsync(snoozeRequest);
    };

    switch (response.actionIdentifier) {
      case itemCategoryActions.snooze15Mins:
        await snooze(minutes.fifteen);
        break;
      case itemCategoryActions.snooze2Hours:
        await snooze(hours.two);
        break;
      case itemCategoryActions.snooze1Day:
        await snooze(days.one);
        break;
    }
  });
}

export { initNotifications };
