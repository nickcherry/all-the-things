import { describe, expect, it } from 'bun:test';

import { itemCateogryId, notificationSound } from '~/constant/notification';
import { days, hours } from '~/constant/time';
import { getNotificationRequestsForTime } from '~/util/item/getNotificationRequestsForTime';

describe('getNotificationRequestsForTime earlier', () => {
  const now = new Date(new Date().setFullYear(2024, 2, 5)).setHours(
    10,
    0,
    0,
    0,
  );

  const data = { type: 'view_item', id: '1' };

  describe('non-recurring', () => {
    it('should not schedule anything', () => {
      const requests = getNotificationRequestsForTime({
        id: '1',
        name: 'boop',
        now,
        numRecurringNotificationsForTime: 3,
        due: {
          type: 'by_time',
          time: now - hours.one * 4,
          notifications: {
            enabled: true,
            offsetInMinutes: 15,
            location: undefined,
          },
          recurring: { type: 'never' },
        },
      });

      expect(requests.length).toEqual(0);
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
          time: now - hours.one * 4, // 6am
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
          body: 'Due by 6am',
          sound: notificationSound,
          categoryIdentifier: itemCateogryId,
          data,
        });
      });

      const firstExpectedTrigger = new Date(now + days.one).setHours(
        6,
        0,
        0,
        0,
      );

      expect(requests[0].trigger).toEqual(firstExpectedTrigger);
      expect(requests[1].trigger).toEqual(firstExpectedTrigger + days.one);
      expect(requests[2].trigger).toEqual(firstExpectedTrigger + days.one * 2);
    });
  });
});
