import { describe, expect, it } from 'bun:test';

import { itemCateogryId, notificationSound } from '~/constant/notification';
import { days } from '~/constant/time';
import { Settings } from '~/type/settings';
import { getNotificationRequestsForDate } from '~/util/item/getNotificationRequestsForDate';

describe('getNotificationRequestsForDate tomorrow', () => {
  const now = new Date(new Date().setFullYear(2024, 2, 5)).setHours(
    10,
    0,
    0,
    0,
  );

  const settings = {} as Settings;

  const data = { type: 'view_item', id: '1' };

  describe('non-recurring', () => {
    it('should schedule a notification', () => {
      const requests = getNotificationRequestsForDate({
        id: '1',
        name: 'boop',
        numRecurringNotifications: 3,
        settings,
        due: {
          type: 'by_date',
          date: now + days.one,
          notifications: {
            enabled: true,
            offsetInDays: 1,
            notificationTime: new Date(0).setHours(12, 0, 0, 0),
            location: undefined,
          },
          recurring: { type: 'never' },
        },
        now,
      });

      expect(requests.length).toEqual(1);

      expect(requests[0].content).toEqual({
        title: 'Todo All The Things',
        subtitle: 'boop',
        body: 'Due tomorrow',
        sound: notificationSound,
        categoryIdentifier: itemCateogryId,
        data,
      });

      expect(requests[0].trigger).toEqual(new Date(now).setHours(12, 0, 0, 0));
    });
  });
});
