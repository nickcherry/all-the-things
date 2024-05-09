import { ReactNode } from 'react';

import {
  ItemDue,
  ItemDueRecurringType,
  ItemNotificationOffsetInDays,
  ItemNotificationOffsetInMinutes,
  ItemPriority,
  LocationRadius,
} from '~/type/item';
import { SortItemsBy } from '~/type/list';
import { CleanUpAfterCompleted, ColorScheme } from '~/type/settings';

export const translations = {
  cleanUpAfterCompleted: {
    '15 minutes': 'After 15 mins',
    '1 day': 'After 1 day',
    never: 'Never',
  } satisfies Record<CleanUpAfterCompleted, ReactNode>,
  colorScheme: {
    auto: 'Auto',
    light: 'Light',
    dark: 'Dark',
  } satisfies Record<ColorScheme, ReactNode>,
  due: {
    whenever: 'Whenever',
    by_date: 'By date',
    by_time: 'By time',
  } satisfies Record<ItemDue['type'], ReactNode>,
  locationRadius: {
    100: '100 yards',
    1610: '1 mile',
    16094: '10 miles',
  } satisfies Record<LocationRadius, string>,
  notificationOffsetInMinutes: {
    0: 'At the time',
    15: '15 mins before',
    30: '30 mins before',
    60: '1 hour before',
    120: '2 hours before',
    240: '4 hours before',
    480: '8 hours before',
  } satisfies Record<ItemNotificationOffsetInMinutes, ReactNode>,
  notificationOffsetInDays: {
    0: 'On the day',
    1: '1 day before',
    2: '2 days before',
    3: '3 days before',
    7: '1 week before',
  } satisfies Record<ItemNotificationOffsetInDays, ReactNode>,
  priority: {
    lowest: 'Lowest',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    highest: 'Highest',
  } satisfies Record<ItemPriority, ReactNode>,
  recurring: {
    never: 'Never',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
  } satisfies Record<ItemDueRecurringType, ReactNode>,
  sortStrategy: {
    alphabetically: 'Alphabetically',
    created: 'Created',
    due: 'Due',
    priority: 'Priority',
  } satisfies Record<SortItemsBy, ReactNode>,
};
