import { Settings } from '~/type/settings';

export const settings = {
  recurringRolloverTime: new Date().setHours(3, 0, 0, 0),
} as Settings;

export const notifications = { enabled: false } as const;
