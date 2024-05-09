import { PostHogProvider } from 'posthog-react-native';
import { FC, memo, ReactNode } from 'react';

import { useSettings } from './SettingsProvider';

type AnalyticsProviderProps = {
  children: ReactNode;
};

const AnalyticsProvider: FC<AnalyticsProviderProps> = memo(({ children }) => {
  const { settings } = useSettings();

  return (
    <PostHogProvider
      apiKey="phc_NujJmSygS0WDVDfLQ9Fk0YWNyXsmSMkJ1o7FvpXSca"
      autocapture={{
        captureScreens: false,
      }}
      debug={false}
      options={{
        enable: settings.analyticsEnabled,
        host: 'https://app.posthog.com',
      }}
    >
      {children}
    </PostHogProvider>
  );
});

AnalyticsProvider.displayName = 'AnalyticsProvider';

export { AnalyticsProvider };
