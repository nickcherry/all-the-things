import { FC, memo, useEffect, useRef } from 'react';

import { useSettings } from '~/context/SettingsProvider';
import { useRescheduleItemNotifications } from '~/hook/item/useRescheduleItemNotifications';

const RescheduleItemNotifications: FC = memo(() => {
  const { settings } = useSettings();
  const rescheduleItemNotifications = useRescheduleItemNotifications();
  const hasRescheduledRef = useRef(false);
  const lastDateNotificationTimeRef = useRef(settings.dateNotificationTime);

  useEffect(() => {
    if (
      !hasRescheduledRef.current ||
      lastDateNotificationTimeRef.current !== settings.dateNotificationTime
    ) {
      hasRescheduledRef.current = true;
      lastDateNotificationTimeRef.current = settings.dateNotificationTime;
      rescheduleItemNotifications();
    }
  }, [rescheduleItemNotifications, settings.dateNotificationTime]);

  return null;
});

RescheduleItemNotifications.displayName = 'RescheduleItemNotifications';

export { RescheduleItemNotifications };
