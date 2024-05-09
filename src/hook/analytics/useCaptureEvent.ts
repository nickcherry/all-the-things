import { usePostHog } from 'posthog-react-native';
import { useCallback } from 'react';

import { AnalyticsEvent } from '~/type/analytics';

function useCaptureEvent() {
  const posthog = usePostHog();

  return useCallback(
    <Event extends AnalyticsEvent>(
      type: Event['type'],
      data: Event['data'],
    ) => {
      if (posthog) {
        posthog.capture(type, data);
      }
    },
    [posthog],
  );
}

export { useCaptureEvent };
