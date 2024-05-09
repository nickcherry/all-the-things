import { describe, expect, it } from 'bun:test';

import { itemCateogryId, notificationSound } from '~/constant/notification';
import { hours } from '~/constant/time';
import { Settings } from '~/type/settings';
import { getNotificationRequestsForDate } from '~/util/item/getNotificationRequestsForDate';

describe('getNotificationRequestsForDate today', () => {
  const now = new Date(new Date().setFullYear(2024, 2, 5)).setHours(
    12,
    0,
    0,
    0,
  );

  const settings = {} as Settings;

  const data = { type: 'view_item', id: '1' };

  describe('non-recurring', () => {
    describe('notification time is in the past', () => {
      it('should not schedule anything', () => {
        const requests = getNotificationRequestsForDate({
          id: '1',
          name: 'boop',
          now,
          numRecurringNotifications: 3,
          settings,
          due: {
            type: 'by_date',
            date: now,
            notifications: {
              enabled: true,
              offsetInDays: 0,
              notificationTime: new Date().setHours(9, 0, 0, 0),
              location: undefined,
            },
            recurring: { type: 'never' },
          },
        });

        expect(requests.length).toEqual(0);
      });
    });

    describe('notification time is in the future', () => {
      it('should schedule a notification', () => {
        const requests = getNotificationRequestsForDate({
          id: '1',
          name: 'boop',
          now,
          numRecurringNotifications: 3,
          settings,
          due: {
            type: 'by_date',
            date: now + hours.one * 6,
            notifications: {
              enabled: true,
              offsetInDays: 0,
              notificationTime: new Date().setHours(15, 0, 0, 0),
              location: undefined,
            },
            recurring: { type: 'never' },
          },
        });

        expect(requests.length).toEqual(1);

        expect(requests[0].content).toEqual({
          title: 'Todo All The Things',
          subtitle: 'boop',
          body: 'Due today',
          sound: notificationSound,
          categoryIdentifier: itemCateogryId,
          data,
        });

        expect(requests[0].trigger).toEqual(
          new Date(now).setHours(15, 0, 0, 0),
        );
      });
    });
  });

  describe('recurring', () => {
    describe('weekly', () => {
      describe('first notification time is in the past', () => {
        it('should schedule notifications', () => {
          const requests = getNotificationRequestsForDate({
            id: '1',
            name: 'boop',
            now,
            numRecurringNotifications: 3,
            settings,
            due: {
              type: 'by_date',
              date: now,
              notifications: {
                enabled: true,
                offsetInDays: 0,
                notificationTime: new Date().setHours(9, 0, 0, 0),
                location: undefined,
              },
              recurring: { type: 'weekly' },
            },
          });

          expect(requests.length).toEqual(3);
          expect(requests[0].trigger).toEqual(
            new Date(new Date().setFullYear(2024, 2, 12)).setHours(9, 0, 0, 0),
          );
          expect(requests[1].trigger).toEqual(
            new Date(new Date().setFullYear(2024, 2, 19)).setHours(9, 0, 0, 0),
          );
          expect(requests[2].trigger).toEqual(
            new Date(new Date().setFullYear(2024, 2, 26)).setHours(9, 0, 0, 0),
          );
        });
      });

      describe('first notification time is in the future', () => {
        it('should schedule notifications', () => {
          const requests = getNotificationRequestsForDate({
            id: '1',
            name: 'boop',
            now,
            numRecurringNotifications: 3,
            settings,
            due: {
              type: 'by_date',
              date: now,
              notifications: {
                enabled: true,
                offsetInDays: 0,
                notificationTime: new Date().setHours(15, 0, 0, 0),
                location: undefined,
              },
              recurring: { type: 'weekly' },
            },
          });

          expect(requests.length).toEqual(3);
          expect(requests[0].trigger).toEqual(
            new Date(new Date().setFullYear(2024, 2, 5)).setHours(15, 0, 0, 0),
          );
          expect(requests[1].trigger).toEqual(
            new Date(new Date().setFullYear(2024, 2, 12)).setHours(15, 0, 0, 0),
          );
          expect(requests[2].trigger).toEqual(
            new Date(new Date().setFullYear(2024, 2, 19)).setHours(15, 0, 0, 0),
          );
        });
      });
    });

    describe('monthly', () => {
      describe('first notification time is in the past', () => {
        it('should schedule notifications', () => {
          const requests = getNotificationRequestsForDate({
            id: '1',
            name: 'boop',
            now,
            numRecurringNotifications: 3,
            settings,
            due: {
              type: 'by_date',
              date: now,
              notifications: {
                enabled: true,
                offsetInDays: 0,
                notificationTime: new Date().setHours(9, 0, 0, 0),
                location: undefined,
              },
              recurring: { type: 'monthly' },
            },
          });

          expect(requests.length).toEqual(3);
          expect(requests[0].trigger).toEqual(
            new Date(new Date().setFullYear(2024, 3, 5)).setHours(9, 0, 0, 0),
          );
          expect(requests[1].trigger).toEqual(
            new Date(new Date().setFullYear(2024, 4, 5)).setHours(9, 0, 0, 0),
          );
          expect(requests[2].trigger).toEqual(
            new Date(new Date().setFullYear(2024, 5, 5)).setHours(9, 0, 0, 0),
          );
        });
      });

      describe('first notification time is in the future', () => {
        it('should schedule notifications', () => {
          const requests = getNotificationRequestsForDate({
            id: '1',
            name: 'boop',
            now,
            numRecurringNotifications: 3,
            settings,
            due: {
              type: 'by_date',
              date: now,
              notifications: {
                enabled: true,
                offsetInDays: 0,
                notificationTime: new Date().setHours(15, 0, 0, 0),
                location: undefined,
              },
              recurring: { type: 'monthly' },
            },
          });

          expect(requests.length).toEqual(3);
          expect(requests[0].trigger).toEqual(
            new Date(new Date().setFullYear(2024, 2, 5)).setHours(15, 0, 0, 0),
          );
          expect(requests[1].trigger).toEqual(
            new Date(new Date().setFullYear(2024, 3, 5)).setHours(15, 0, 0, 0),
          );
          expect(requests[2].trigger).toEqual(
            new Date(new Date().setFullYear(2024, 4, 5)).setHours(15, 0, 0, 0),
          );
        });
      });
    });

    describe('yearly', () => {
      describe('first notification time is in the past', () => {
        it('should schedule notifications', () => {
          const requests = getNotificationRequestsForDate({
            id: '1',
            name: 'boop',
            now,
            numRecurringNotifications: 3,
            settings,
            due: {
              type: 'by_date',
              date: now,
              notifications: {
                enabled: true,
                offsetInDays: 0,
                notificationTime: new Date().setHours(9, 0, 0, 0),
                location: undefined,
              },
              recurring: { type: 'yearly' },
            },
          });

          expect(requests.length).toEqual(3);
          expect(requests[0].trigger).toEqual(
            new Date(new Date().setFullYear(2025, 2, 5)).setHours(9, 0, 0, 0),
          );
          expect(requests[1].trigger).toEqual(
            new Date(new Date().setFullYear(2026, 2, 5)).setHours(9, 0, 0, 0),
          );
          expect(requests[2].trigger).toEqual(
            new Date(new Date().setFullYear(2027, 2, 5)).setHours(9, 0, 0, 0),
          );
        });
      });

      describe('first notification time is in the future', () => {
        it('should schedule notifications', () => {
          const requests = getNotificationRequestsForDate({
            id: '1',
            name: 'boop',
            now,
            numRecurringNotifications: 3,
            settings,
            due: {
              type: 'by_date',
              date: now,
              notifications: {
                enabled: true,
                offsetInDays: 0,
                notificationTime: new Date().setHours(15, 0, 0, 0),
                location: undefined,
              },
              recurring: { type: 'yearly' },
            },
          });

          expect(requests.length).toEqual(3);
          expect(requests[0].trigger).toEqual(
            new Date(new Date().setFullYear(2024, 2, 5)).setHours(15, 0, 0, 0),
          );
          expect(requests[1].trigger).toEqual(
            new Date(new Date().setFullYear(2025, 2, 5)).setHours(15, 0, 0, 0),
          );
          expect(requests[2].trigger).toEqual(
            new Date(new Date().setFullYear(2026, 2, 5)).setHours(15, 0, 0, 0),
          );
        });
      });
    });
  });
});
