/***********************************************************************/
/* Priority */
/***********************************************************************/

export type ItemPriority = 'lowest' | 'low' | 'medium' | 'high' | 'highest';

/***********************************************************************/
/* Recurring */
/***********************************************************************/

export const dueWheneverRecurringTypes = ['never', 'daily'] as const;
export const dueByDateRecurringTypes = [
  'never',
  'weekly',
  'monthly',
  'yearly',
] as const;
export const dueByTimeRecurringTypes = ['never', 'daily'] as const;

export type DueWheneverRecurringType =
  (typeof dueWheneverRecurringTypes)[number];
export type DueByDateRecurringType = (typeof dueByDateRecurringTypes)[number];
export type DueByTimeRecurringType = (typeof dueByTimeRecurringTypes)[number];

export type ItemDueWheneverRecurring = { type: DueWheneverRecurringType };
export type ItemDueByTimeRecurring = { type: DueByTimeRecurringType };
export type ItemDueByDateRecurring = { type: DueByDateRecurringType };

export type ItemDueRecurring =
  | ItemDueWheneverRecurring
  | ItemDueByTimeRecurring
  | ItemDueByDateRecurring;

export type ItemDueRecurringType = ItemDueRecurring['type'];

export const isDueWheneverRecurring = (
  recurring: ItemDueRecurring,
): recurring is ItemDueWheneverRecurring =>
  dueWheneverRecurringTypes.includes(
    recurring.type as DueWheneverRecurringType,
  );

export const isDueByDateRecurring = (
  recurring: ItemDueRecurring,
): recurring is ItemDueByDateRecurring =>
  dueByDateRecurringTypes.includes(recurring.type as DueByDateRecurringType);

export const isDueByTimeRecurring = (
  recurring: ItemDueRecurring,
): recurring is ItemDueByTimeRecurring =>
  dueByTimeRecurringTypes.includes(recurring.type as DueByTimeRecurringType);

/***********************************************************************/
/* Notifications */
/***********************************************************************/

export type DueWheneverNotifications =
  | { enabled: false }
  | { enabled: true; location: Location | undefined };

export type DueByDateNotifications =
  | { enabled: false }
  | {
      enabled: true;
      offsetInDays: ItemNotificationOffsetInDays;
      notificationTime: number;
      location: Location | undefined;
    };
export type DueByTimeNotifications =
  | { enabled: false }
  | {
      enabled: true;
      offsetInMinutes: ItemNotificationOffsetInMinutes;
      location: Location | undefined;
    };

export const notificationOffsetInDays = [0, 1, 2, 3, 7] as const;
export const notificationOffsetInMinutes = [
  0, 15, 30, 60, 120, 240, 480,
] as const;

export type ItemNotificationOffsetInDays =
  (typeof notificationOffsetInDays)[number];

export type ItemNotificationOffsetInMinutes =
  (typeof notificationOffsetInMinutes)[number];

/***********************************************************************/
/* Status */
/***********************************************************************/

export type ItemPendingStatus = { name: 'pending' };
export type ItemCompleteStatus = { name: 'complete'; completedAt: number };

export type ItemStatus = ItemPendingStatus | ItemCompleteStatus;

/***********************************************************************/
/* Due */
/***********************************************************************/

export type ItemDueWhenever = {
  type: 'whenever';
  recurring: ItemDueWheneverRecurring;
  notifications: DueWheneverNotifications;
};

export type ItemDueByTime = {
  type: 'by_time';
  recurring: ItemDueByTimeRecurring;
  time: number;
  notifications: DueByTimeNotifications;
};

export type ItemDueByDate = {
  type: 'by_date';
  date: number;
  recurring: { type: DueByDateRecurringType };
  notifications: DueByDateNotifications;
};

export type ItemDue = ItemDueWhenever | ItemDueByTime | ItemDueByDate;
export type ItemDueType = ItemDue['type'];

/***********************************************************************/
/* Location */
/***********************************************************************/

export const locationRadiuses = [100, 1610, 16094] as const;

// in meters ~ 100 yards, 1 mile, 10 miles
export type LocationRadius = (typeof locationRadiuses)[number];

export type Location = {
  latitude: number;
  longitude: number;
  address: string;
  radius: LocationRadius;
};

export type ItemWithLocation = Item & {
  due: { notifications: { enabled: true; location: Location } };
};

export type LocationAlertHistoryEntry = {
  lastEnteredAt?: number;
  lastExitedAt?: number;
  lastNotifiedAt?: number;
};

export type LocationAlertHistory = Record<
  string,
  LocationAlertHistoryEntry | undefined
>;

/***********************************************************************/
/* Items */
/***********************************************************************/

export type Item = {
  createdAt: number;
  due: ItemDue;
  id: string;
  listId: string;
  name: string;
  priority: ItemPriority;
  status: ItemStatus;
  updatedAt: number;
};

export type CompleteItem = Item & { status: ItemCompleteStatus };

export type Items = Record<string, Item>;
