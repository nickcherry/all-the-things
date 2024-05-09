import { describe, expect, it } from 'bun:test';

import { itemCateogryId, notificationSound } from '~/constant/notification';
import { days, weeks } from '~/constant/time';
import { Settings } from '~/type/settings';
import { getNotificationRequestsForDate } from '~/util/item/getNotificationRequestsForDate';

describe('getNotificationRequestsForDate past', () => {
  // Tuesday, March 5, 2024
  const now = new Date(new Date().setFullYear(2024, 2, 5)).setHours(
    10,
    0,
    0,
    0,
  );

  const notificationTime = new Date().setHours(7, 0, 0, 0);

  const settings = {} as Settings;

  const data = { type: 'view_item', id: '1' };

  describe('non-recurring', () => {
    it('should not schedule anything', () => {
      const requests = getNotificationRequestsForDate({
        id: '1',
        name: 'boop',
        now,
        numRecurringNotifications: 3,
        settings,
        due: {
          type: 'by_date',
          date: now - 2 * days.one,
          notifications: {
            enabled: true,
            offsetInDays: 1,
            notificationTime,
            location: undefined,
          },
          recurring: { type: 'never' },
        },
      });

      expect(requests.length).toEqual(0);
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
          settings,
          due: {
            type: 'by_date',
            date: now - days.one * 10, // Saturday, February 24, 2024
            notifications: {
              enabled: true,
              offsetInDays: 1,
              notificationTime,
              location: undefined,
            },
            recurring: { type: 'weekly' },
          },
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
          new Date(new Date().setFullYear(2024, 2, 9)).setHours(7, 0, 0, 0) -
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
          settings,
          due: {
            type: 'by_date',
            date: now - days.one * 10, // Saturday, February 24, 2024
            notifications: {
              enabled: true,
              offsetInDays: 2,
              notificationTime,
              location: undefined,
            },
            recurring: { type: 'monthly' },
          },
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
          new Date(new Date().setFullYear(2024, 2, 24)).setHours(7, 0, 0, 0) -
            days.one * 2, // offset
        );
        expect(requests[1].trigger).toEqual(
          new Date(new Date().setFullYear(2024, 3, 24)).setHours(7, 0, 0, 0) -
            days.one * 2, // offset
        );
        expect(requests[2].trigger).toEqual(
          new Date(new Date().setFullYear(2024, 4, 24)).setHours(7, 0, 0, 0) -
            days.one * 2, // offset
        );
      });
    });

    describe('yearly', () => {
      it('should schedule notifications 1', () => {
        const requests = getNotificationRequestsForDate({
          id: '1',
          name: 'boop',
          now,
          numRecurringNotifications: 3,
          settings,
          due: {
            type: 'by_date',
            date: now - days.one * 75, // Thursday, December 21, 2023
            notifications: {
              enabled: true,
              offsetInDays: 7,
              notificationTime,
              location: undefined,
            },
            recurring: { type: 'yearly' },
          },
        });

        expect(requests.length).toEqual(3);

        requests.forEach((request) => {
          expect(request.content).toEqual({
            title: 'Todo All The Things',
            subtitle: 'boop',
            body: 'Due in 7 days',
            sound: notificationSound,
            categoryIdentifier: itemCateogryId,
            data,
          });
        });

        expect(requests[0].trigger).toEqual(
          new Date(new Date().setFullYear(2024, 11, 21)).setHours(7, 0, 0, 0) -
            weeks.one,
        );

        expect(requests[1].trigger).toEqual(
          new Date(new Date().setFullYear(2025, 11, 21)).setHours(7, 0, 0, 0) -
            weeks.one,
        );
        expect(requests[2].trigger).toEqual(
          new Date(new Date().setFullYear(2026, 11, 21)).setHours(7, 0, 0, 0) -
            weeks.one,
        );
      });

      it('should schedule notifications 2', () => {
        const requests = getNotificationRequestsForDate({
          id: '1',
          name: 'boop',
          now,
          numRecurringNotifications: 3,
          settings,
          due: {
            type: 'by_date',
            date: now - days.one * 300, // Wednesday, May 10, 2023
            notifications: {
              enabled: true,
              offsetInDays: 7,
              notificationTime,
              location: undefined,
            },
            recurring: { type: 'yearly' },
          },
        });

        expect(requests.length).toEqual(3);

        requests.forEach((request) => {
          expect(request.content).toEqual({
            title: 'Todo All The Things',
            subtitle: 'boop',
            body: 'Due in 7 days',
            sound: notificationSound,
            categoryIdentifier: itemCateogryId,
            data,
          });
        });

        expect(requests[0].trigger).toEqual(
          new Date(new Date().setFullYear(2024, 4, 10)).setHours(7, 0, 0, 0) -
            weeks.one,
        );

        expect(requests[1].trigger).toEqual(
          new Date(new Date().setFullYear(2025, 4, 10)).setHours(7, 0, 0, 0) -
            weeks.one,
        );

        expect(requests[2].trigger).toEqual(
          new Date(new Date().setFullYear(2026, 4, 10)).setHours(7, 0, 0, 0) -
            weeks.one,
        );
      });
    });
  });
});
