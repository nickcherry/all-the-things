import { describe, expect, it } from 'bun:test';

import { itemCateogryId, notificationSound } from '~/constant/notification';
import { days, weeks } from '~/constant/time';
import { Settings } from '~/type/settings';
import { getNotificationRequestsForDate } from '~/util/item/getNotificationRequestsForDate';

describe('getNotificationRequestsForDate future', () => {
  // Tuesday, March 5, 2024
  const now = new Date(new Date().setFullYear(2024, 2, 5)).setHours(
    10,
    0,
    0,
    0,
  );

  const notificationTime = new Date().setHours(17, 0, 0, 0);

  const settings = {} as Settings;

  const data = { type: 'view_item', id: '1' };

  describe('non-recurring', () => {
    it('should schedule a notification', () => {
      const requests = getNotificationRequestsForDate({
        id: '1',
        name: 'boop',
        now,
        numRecurringNotifications: 3,
        settings,
        due: {
          type: 'by_date',
          date: now + days.one * 100, // Thursday, June 13, 2024
          notifications: {
            enabled: true,
            offsetInDays: 1,
            notificationTime,
            location: undefined,
          },
          recurring: { type: 'never' },
        },
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
      expect(requests[0].trigger).toEqual(
        new Date(new Date().setFullYear(2024, 5, 12)).setHours(17, 0, 0, 0),
      );
    });
  });

  describe('recurring', () => {
    describe('weekly', () => {
      it('should schedule notifications', () => {
        const requests = getNotificationRequestsForDate({
          id: '1',
          name: 'boop',
          now,
          numRecurringNotifications: 3,
          due: {
            type: 'by_date',
            date: now + days.one * 100, // Thursday, June 13, 2024
            notifications: {
              enabled: true,
              offsetInDays: 1,
              notificationTime,
              location: undefined,
            },
            recurring: { type: 'weekly' },
          },
          settings,
        });

        expect(requests.length).toEqual(3);

        requests.forEach((request) => {
          expect(request.content).toEqual({
            title: 'Todo All The Things',
            subtitle: 'boop',
            body: 'Due tomorrow',
            sound: notificationSound,
            categoryIdentifier: itemCateogryId,
            data,
          });
        });

        const firstExpectedTrigger =
          new Date(new Date().setFullYear(2024, 2, 7)).setHours(17, 0, 0, 0) -
          days.one; // offset

        expect(requests[0].trigger).toEqual(firstExpectedTrigger);
        expect(requests[1].trigger).toEqual(firstExpectedTrigger + weeks.one);
        expect(requests[2].trigger).toEqual(
          firstExpectedTrigger + weeks.one * 2,
        );
      });
    });

    describe('monthly', () => {
      it('should schedule notifications', () => {
        const requests = getNotificationRequestsForDate({
          id: '1',
          name: 'boop',
          now,
          numRecurringNotifications: 3,
          due: {
            type: 'by_date',
            date: now + days.one * 100, // Thursday, June 13, 2024
            notifications: {
              enabled: true,
              offsetInDays: 2,
              notificationTime,
              location: undefined,
            },
            recurring: { type: 'monthly' },
          },
          settings,
        });

        expect(requests.length).toEqual(3);

        requests.forEach((request) => {
          expect(request.content).toEqual({
            title: 'Todo All The Things',
            subtitle: 'boop',
            body: 'Due in 2 days',
            sound: notificationSound,
            categoryIdentifier: itemCateogryId,
            data,
          });
        });

        expect(requests[0].trigger).toEqual(
          new Date(new Date().setFullYear(2024, 2, 13)).setHours(17, 0, 0, 0) -
            days.one * 2, // offset
        );
        expect(requests[1].trigger).toEqual(
          new Date(new Date().setFullYear(2024, 3, 13)).setHours(17, 0, 0, 0) -
            days.one * 2, // offset
        );

        expect(requests[2].trigger).toEqual(
          new Date(new Date().setFullYear(2024, 4, 13)).setHours(17, 0, 0, 0) -
            days.one * 2, // offset
        );
      });
    });

    describe('yearly', () => {
      it('should schedule notifications', () => {
        const requests = getNotificationRequestsForDate({
          id: '1',
          name: 'boop',
          now,
          numRecurringNotifications: 3,
          due: {
            type: 'by_date',
            date: now + days.one * 100, // Thursday, June 13, 2024
            notifications: {
              enabled: true,
              offsetInDays: 1,
              notificationTime,
              location: undefined,
            },
            recurring: { type: 'yearly' },
          },
          settings,
        });

        expect(requests.length).toEqual(3);

        requests.forEach((request) => {
          expect(request.content).toEqual({
            title: 'Todo All The Things',
            subtitle: 'boop',
            body: 'Due tomorrow',
            sound: notificationSound,
            categoryIdentifier: itemCateogryId,
            data,
          });
        });

        expect(requests[0].trigger).toEqual(
          new Date(new Date().setFullYear(2024, 5, 13)).setHours(17, 0, 0, 0) -
            days.one,
        );
        expect(requests[1].trigger).toEqual(
          new Date(new Date().setFullYear(2025, 5, 13)).setHours(17, 0, 0, 0) -
            days.one,
        );
        expect(requests[2].trigger).toEqual(
          new Date(new Date().setFullYear(2026, 5, 13)).setHours(17, 0, 0, 0) -
            days.one,
        );
      });
    });
  });
});
