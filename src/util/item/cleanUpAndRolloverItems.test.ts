import { describe, expect, it } from 'bun:test';

import { Item } from '~/type/item';
import { List } from '~/type/list';
import { Settings } from '~/type/settings';
import { getDueDate } from '~/util/item/getDueDate';
import { buildList } from '~/util/list/buildList';

import { buildItem } from './buildItem';
import { cleanUpAndRolloverItems } from './cleanUpAndRolloverItems';

describe('cleanUpAndRolloverItems', () => {
  const now = new Date(
    new Date(new Date().setFullYear(2024, 1, 27)).setHours(13, 0, 0, 0),
  ).valueOf();

  const settings = {} as Settings;
  const notifications = { enabled: false } as const;

  const item = (partialItem: Partial<Item>) =>
    buildItem({ item: partialItem as Item, settings });
  const list = (partialList: Partial<List>) => buildList({ list: partialList });

  it('should delete orphaned items', () => {
    expect(
      Object.keys(
        cleanUpAndRolloverItems({
          now,
          forceImmediateCleanup: true,
          items: {
            item1: item({ id: 'item1', listId: 'list1' }),
            item2: item({ id: 'item2', listId: 'list2' }),
          },
          lists: {
            list2: list({ id: 'list2' }),
          },
          settings: {} as Settings,
        }),
      ),
    ).toEqual(['item2']);
  });

  it('should delete completed non-recurring items', () => {
    expect(
      Object.keys(
        cleanUpAndRolloverItems({
          now,
          forceImmediateCleanup: true,
          items: {
            item1: item({
              id: 'item1',
              listId: 'list1',
              status: { name: 'complete', completedAt: 0 },
            }),
            item2: item({
              id: 'item2',
              listId: 'list1',
              status: { name: 'pending' },
            }),
            item3: item({
              id: 'item3',
              listId: 'list1',
              status: { name: 'complete', completedAt: 0 },
            }),
          },
          lists: {
            list1: list({ id: 'list1' }),
          },
          settings: {} as Settings,
        }),
      ),
    ).toEqual(['item2']);

    it('should not delete completed recurring items', () => {
      expect(
        Object.keys(
          cleanUpAndRolloverItems({
            now,
            forceImmediateCleanup: true,
            items: {
              item1: item({
                id: 'item1',
                listId: 'list1',
                status: { name: 'complete', completedAt: 0 },
                due: {
                  type: 'whenever',
                  recurring: { type: 'daily' },
                  notifications,
                },
              }),
              item2: item({
                id: 'item2',
                listId: 'list1',
                status: { name: 'pending' },
              }),
              item3: item({
                id: 'item3',
                listId: 'list1',
                status: { name: 'complete', completedAt: 0 },
                due: {
                  type: 'by_time',
                  recurring: { type: 'daily' },
                  time: 0,
                  notifications: { enabled: false },
                },
              }),
              item4: item({
                id: 'item4',
                listId: 'list1',
                status: { name: 'complete', completedAt: 0 },
                due: {
                  type: 'by_date',
                  recurring: { type: 'weekly' },
                  date: 0,
                  notifications: { enabled: false },
                },
              }),
              item5: item({
                id: 'item5',
                listId: 'list1',
                status: { name: 'complete', completedAt: 0 },
                due: {
                  type: 'by_date',
                  recurring: { type: 'monthly' },
                  date: 0,
                  notifications: { enabled: false },
                },
              }),
              item6: item({
                id: 'item6',
                listId: 'list1',
                status: { name: 'complete', completedAt: 0 },
                due: {
                  type: 'by_date',
                  recurring: { type: 'never' },
                  date: 0,
                  notifications: { enabled: false },
                },
              }),
            },
            lists: {
              list1: list({ id: 'list1' }),
            },
            settings: {} as Settings,
          }),
        ),
      ).toEqual(['item1', 'item2', 'item3', 'item4', 'item5']);
    });

    it('should restore daily recurring items that have passed their rollover time', () => {
      const item1 = Object.values(
        cleanUpAndRolloverItems({
          now,
          forceImmediateCleanup: true,
          items: {
            item1: item({
              id: 'item1',
              listId: 'list1',
              status: { name: 'complete', completedAt: 0 },
              due: {
                type: 'whenever',
                recurring: { type: 'daily' },
                notifications,
              },
            }),
          },
          lists: {
            list1: list({ id: 'list1' }),
          },
          settings: {} as Settings,
        }),
      )[0];

      expect(item1.status).toEqual({ name: 'pending' });
    });

    it('should not restore daily recurring items that have not passed their rollover time', () => {
      const item1 = Object.values(
        cleanUpAndRolloverItems({
          now,
          forceImmediateCleanup: true,
          items: {
            item1: item({
              id: 'item1',
              listId: 'list1',
              status: { name: 'complete', completedAt: now - 1 },
              due: {
                type: 'whenever',
                recurring: { type: 'daily' },
                notifications,
              },
            }),
          },
          lists: {
            list1: list({ id: 'list1' }),
          },
          settings: {} as Settings,
        }),
      )[0];

      expect(item1.status).toEqual({ name: 'complete', completedAt: now - 1 });
    });
  });

  it('should rollover weekly recurring items', () => {
    const item1Date = new Date().setFullYear(2024, 1, 1); // Thursday
    const item2Date = new Date().setFullYear(2024, 2, 4);

    const { item1, item2 } = cleanUpAndRolloverItems({
      now: new Date().setFullYear(2024, 2, 5),
      items: {
        item1: item({
          id: 'item1',
          listId: 'list1',
          status: { name: 'complete', completedAt: 0 },
          due: {
            type: 'by_date',
            date: item1Date,
            recurring: { type: 'weekly' },
            notifications: { enabled: false },
          },
        }),
        item2: item({
          id: 'item2',
          listId: 'list1',
          status: { name: 'complete', completedAt: 0 },
          due: {
            type: 'by_date',
            date: item2Date,
            recurring: { type: 'weekly' },
            notifications: { enabled: false },
          },
        }),
      },
      lists: {
        list1: list({ id: 'list1' }),
      },
      settings: {
        recurringRolloverTime: new Date().setHours(0, 0, 0, 0),
      } as Settings,
    });

    expect(item1.status).toEqual({ name: 'pending' });
    expect(getDueDate({ due: item1.due }).valueOf()).toEqual(
      new Date(new Date().setFullYear(2024, 2, 7)).setHours(0, 0, 0, 0),
    );
    expect(item2.status).toEqual({ name: 'complete', completedAt: 0 });
    expect(getDueDate({ due: item2.due }).valueOf()).toEqual(
      item2Date.valueOf(),
    );
  });

  it('should rollover monthly recurring items', () => {
    const item2Date = new Date().setFullYear(2024, 1, 29);

    const { item1, item2 } = cleanUpAndRolloverItems({
      now: new Date().setFullYear(2024, 2, 5),
      items: {
        item1: item({
          id: 'item1',
          listId: 'list1',
          status: { name: 'complete', completedAt: 0 },
          due: {
            type: 'by_date',
            date: new Date().setFullYear(2024, 1, 1),
            recurring: { type: 'monthly' },
            notifications: { enabled: false },
          },
        }),
        item2: item({
          id: 'item2',
          listId: 'list1',
          status: { name: 'complete', completedAt: 0 },
          due: {
            type: 'by_date',
            date: item2Date,
            recurring: { type: 'monthly' },
            notifications: { enabled: false },
          },
        }),
      },
      lists: {
        list1: list({ id: 'list1' }),
      },
      settings: {
        recurringRolloverTime: new Date().setHours(0, 0, 0, 0),
      } as Settings,
    });

    expect(item1.status).toEqual({ name: 'pending' });
    expect(getDueDate({ due: item1.due }).valueOf()).toEqual(
      new Date(new Date().setFullYear(2024, 3, 1)).setHours(0, 0, 0, 0),
    );
    expect(item2.status).toEqual({ name: 'complete', completedAt: 0 });
    expect(getDueDate({ due: item2.due })).toEqual(new Date(item2Date));
  });
});
