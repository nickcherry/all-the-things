import { describe, expect, it } from 'bun:test';

import { itemCateogryId, notificationSound } from '~/constant/notification';
import { days, hours } from '~/constant/time';
import { getNotificationRequestsForTime } from '~/util/item/getNotificationRequestsForTime';

describe('getNotificationRequestsForTime later', () => {
  const data = {
    id: '1',
    type: 'view_item',
  };

  const now = new Date(new Date().setFullYear(2024, 2, 5)).setHours(
    11,
    0,
    0,
    0,
  );

  describe('non-recurring', () => {
    it('should schedule a notification', () => {
      const requests = getNotificationRequestsForTime({
        id: '1',
        name: 'boop',
        now,
        numRecurringNotificationsForTime: 3,
        due: {
          type: 'by_time',
          time: now + hours.one * 5, // 4pm
          notifications: {
            enabled: true,
            offsetInMinutes: 15,
            location: undefined,
          },
          recurring: { type: 'never' },
        },
      });

      expect(requests.length).toEqual(1);
      expect(requests[0].content).toEqual({
        title: 'Todo All The Things',
        subtitle: 'boop',
        body: 'Due by 4pm',
        sound: notificationSound,
        categoryIdentifier: itemCateogryId,
        data,
      });
      expect(requests[0].trigger).toEqual(
        // 4pm - 15 minutes = 3:45pm
        new Date(now).setHours(15, 45, 0, 0),
      );
    });
  });

  describe('recurring', () => {
    it('should schedule notifications', () => {
      const requests = getNotificationRequestsForTime({
        id: '1',
        name: 'boop',
        now,
        numRecurringNotificationsForTime: 3,
        due: {
          type: 'by_time',
          time: now + hours.one * 5, // 4pm
          notifications: {
            enabled: true,
            offsetInMinutes: 15,
            location: undefined,
          },
          recurring: { type: 'daily' },
        },
      });

      expect(requests.length).toEqual(3);

      requests.forEach((request) => {
        expect(request.content).toEqual({
          title: 'Todo All The Things',
          subtitle: 'boop',
          body: 'Due by 4pm',
          sound: notificationSound,
          categoryIdentifier: itemCateogryId,
          data,
        });
      });

      const firstExpectedTrigger = new Date(now).setHours(15, 45, 0, 0); // 4pm - 15 minutes = 3:45pm

      expect(requests[0].trigger).toEqual(firstExpectedTrigger);
      expect(requests[1].trigger).toEqual(firstExpectedTrigger + days.one);
      expect(requests[2].trigger).toEqual(firstExpectedTrigger + days.one * 2);
    });
  });
});
