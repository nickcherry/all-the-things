import { FC, memo } from 'react';

import { Switch } from '~/component/switch/Switch';
import { useSettings } from '~/context/SettingsProvider';

import { SettingsField } from './SettingsField';

const AnalyticsEnabledInput: FC = memo(() => {
  const { settings, updateSettings } = useSettings();

  return (
    <SettingsField
      label="Share usage data"
      info="Help improve the product by anonymously sharing information like time spent using the app. We'll never collect personal information like your todos."
      value={
        <Switch
          value={settings.analyticsEnabled}
          onValueChange={async (analyticsEnabled) => {
            updateSettings({ analyticsEnabled });
          }}
        />
      }
    />
  );
});

AnalyticsEnabledInput.displayName = 'AnalyticsEnabledInput';

export { AnalyticsEnabledInput };
