import { ItemPriority } from './item';

export type ColorScheme = 'auto' | 'light' | 'dark';
export type ResolvedColorScheme = Extract<ColorScheme, 'light' | 'dark'>;
export type CleanUpAfterCompleted = 'never' | '15 minutes' | '1 day';

export type Settings = {
  analyticsEnabled: boolean;
  cleanUpAfterCompleted: CleanUpAfterCompleted;
  colorScheme: ColorScheme;
  dateNotificationTime: number;
  defaultNotificationsEnabled: boolean;
  defaultTodoItemPriority: ItemPriority;
  recurringRolloverTime: number;
};
