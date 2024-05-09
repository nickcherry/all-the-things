import { FC, memo, useEffect } from 'react';
import { Appearance } from 'react-native';

import { defaultResolvedColorScheme } from '~/constant/color';
import { useSettings } from '~/context/SettingsProvider';
import { useTheme } from '~/context/ThemeProvider';

const SyncColorScheme: FC = memo(() => {
  const { settings } = useSettings();
  const { setColorScheme } = useTheme();

  useEffect(() => {
    const sync = () => {
      if (settings.colorScheme === 'auto') {
        setColorScheme(
          Appearance.getColorScheme() || defaultResolvedColorScheme,
        );
      } else {
        setColorScheme(settings.colorScheme);
      }
    };

    const subscription = Appearance.addChangeListener(sync);

    sync();

    return () => {
      subscription.remove();
    };
  }, [setColorScheme, settings.colorScheme]);

  return null;
});

SyncColorScheme.displayName = 'SyncColorScheme';

export { SyncColorScheme };
