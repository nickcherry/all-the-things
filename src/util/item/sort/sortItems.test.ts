import { describe, expect, it } from 'bun:test';

import { days, hours } from '~/constant/time';
import { Item, ItemPriority } from '~/type/item';
import { List } from '~/type/list';

import { sortItems } from './sortItems';

describe('sortItems', () => {
  const now = new Date().valueOf();
  const today = now;
  const yesterday = new Date(now - days.one).valueOf();
  const tomorrow = new Date(now + days.one).valueOf();
  const inOneHour = new Date(now + hours.one).valueOf();
  const oneHourAgo = new Date(now - hours.one).valueOf();

  const notifications = { enabled: false } as const;

  const assertOrder = (
    items: (Partial<Item> & { id: string; priority: ItemPriority })[],
    list: Pick<List, 'sortItemsBy'>,
    expected: string[],
  ) => {
    expect(
      sortItems({
        items: items as Item[],
        list: list as List,
      }).map((item) => item.id),
    ).toEqual(expected);
  };

  describe('priority', () => {
    const list: Pick<List, 'sortItemsBy'> = {
      sortItemsBy: 'priority',
    };

    it('sorts items by descending priority', () => {
      assertOrder(
        [
          { id: 'low', priority: 'low' },
          { id: 'medium', priority: 'medium' },
          { id: 'high', priority: 'high' },
        ],
        list,
        ['high', 'medium', 'low'],
      );

      assertOrder(
        [
          { id: 'high', priority: 'high' },
          { id: 'medium', priority: 'medium' },
          { id: 'low', priority: 'low' },
        ],
        list,
        ['high', 'medium', 'low'],
      );
    });

    it('sorts items by ascending due date', () => {
      assertOrder(
        [
          {
            id: 'yesterday',
            priority: 'medium',
            due: {
              type: 'by_date',
              date: yesterday,
              notifications,
              recurring: { type: 'never' },
            },
          },
          {
            id: 'today',
            priority: 'medium',
            due: {
              type: 'by_date',
              date: today,
              notifications,
              recurring: { type: 'never' },
            },
          },
          {
            id: 'tomorrow',
            priority: 'medium',
            due: {
              type: 'by_date',
              date: tomorrow,
              notifications,
              recurring: { type: 'never' },
            },
          },
        ],
        list,
        ['yesterday', 'today', 'tomorrow'],
      );

      assertOrder(
        [
          {
            id: 'tomorrow',
            priority: 'medium',
            due: {
              type: 'by_date',
              date: tomorrow,
              notifications,
              recurring: { type: 'never' },
            },
          },
          {
            id: 'today',
            priority: 'medium',
            due: {
              type: 'by_date',
              date: today,
              notifications,
              recurring: { type: 'never' },
            },
          },
          {
            id: 'yesterday',
            priority: 'medium',
            due: {
              type: 'by_date',
              date: yesterday,
              notifications,
              recurring: { type: 'never' },
            },
          },
        ],
        list,
        ['yesterday', 'today', 'tomorrow'],
      );
    });

    it('sorts recurring items before non-recurring items', () => {
      assertOrder(
        [
          {
            id: 'not-recurring',
            priority: 'medium',
            due: {
              type: 'whenever',
              recurring: { type: 'never' },
              notifications,
            },
          },
          {
            id: 'recurring',
            priority: 'medium',
            due: {
              type: 'whenever',
              recurring: { type: 'daily' },
              notifications,
            },
          },
        ],
        list,
        ['recurring', 'not-recurring'],
      );

      assertOrder(
        [
          {
            id: 'recurring',
            priority: 'medium',
            due: {
              type: 'whenever',
              recurring: { type: 'daily' },
              notifications,
            },
          },
          {
            id: 'not-recurring',
            priority: 'medium',
            due: {
              type: 'whenever',
              recurring: { type: 'never' },
              notifications,
            },
          },
        ],
        list,
        ['recurring', 'not-recurring'],
      );
    });

    it('sorts items by ascending due time', () => {
      assertOrder(
        [
          {
            id: 'oneHourAgo',
            priority: 'medium',
            due: {
              type: 'by_time',
              time: oneHourAgo,
              recurring: { type: 'never' },
              notifications,
            },
          },
          {
            id: 'now',
            priority: 'medium',
            due: {
              type: 'by_time',
              time: now,
              recurring: { type: 'never' },
              notifications,
            },
          },
          {
            id: 'inOneHour',
            priority: 'medium',
            due: {
              type: 'by_time',
              time: inOneHour,
              recurring: { type: 'never' },
              notifications,
            },
          },
        ],
        list,
        ['oneHourAgo', 'now', 'inOneHour'],
      );

      assertOrder(
        [
          {
            id: 'inOneHour',
            priority: 'medium',
            due: {
              type: 'by_time',
              time: inOneHour,
              recurring: { type: 'never' },
              notifications,
            },
          },
          {
            id: 'now',
            priority: 'medium',
            due: {
              type: 'by_time',
              time: now,
              recurring: { type: 'never' },
              notifications,
            },
          },
          {
            id: 'oneHourAgo',
            priority: 'medium',
            due: {
              type: 'by_time',
              time: oneHourAgo,
              recurring: { type: 'never' },
              notifications,
            },
          },
        ],
        list,
        ['oneHourAgo', 'now', 'inOneHour'],
      );
    });
  });
});
