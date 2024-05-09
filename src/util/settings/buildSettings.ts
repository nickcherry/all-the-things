import merge from 'lodash/merge';

import { defaultColorScheme } from '~/constant/color';
import { defaultDateNotificationTime } from '~/constant/notification';
import { Settings } from '~/type/settings';

function buildSettings(settings?: Settings): Settings {
  const settingsDefaults: Settings = {
    analyticsEnabled: true,
    cleanUpAfterCompleted: '1 day',
    colorScheme: defaultColorScheme,
    defaultNotificationsEnabled: true,
    defaultTodoItemPriority: 'medium',
    dateNotificationTime: defaultDateNotificationTime,
    recurringRolloverTime: new Date(new Date().setHours(3, 0, 0, 0)).getTime(),
  };

  return merge(settingsDefaults, settings);
}

export { buildSettings };
