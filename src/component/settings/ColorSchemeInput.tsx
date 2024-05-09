import { FC, memo, useMemo } from 'react';
import { Pressable } from 'react-native';

import { Text } from '~/component/text/Text';
import { defaultHitSlop } from '~/constant/pressable';
import { useSettings } from '~/context/SettingsProvider';
import { useTheme } from '~/context/ThemeProvider';
import { showActionSheet } from '~/util/actionsheet/showActionSheet';
import { getSelectedOption } from '~/util/settings/getSelectedOption';
import { translateOptions } from '~/util/translation/translateOptions';

import { SettingsField } from './SettingsField';

const colorSchemeOptions = translateOptions('colorScheme', [
  'auto',
  'light',
  'dark',
]);

const ColorSchemeInput: FC = memo(() => {
  const { settings, updateSettings } = useSettings();
  const { scheme } = useTheme();

  const selectedColorScheme = useMemo(
    () =>
      getSelectedOption({
        fallbackIndex: 0,
        options: colorSchemeOptions,
        selectedValue: settings.colorScheme,
      }),
    [settings.colorScheme],
  );

  return (
    <SettingsField
      label="Color scheme"
      value={
        <Pressable
          hitSlop={defaultHitSlop}
          onPress={() =>
            showActionSheet({
              options: colorSchemeOptions,
              onSelect: (colorScheme) => updateSettings({ colorScheme }),
              scheme,
            })
          }
        >
          <Text>{selectedColorScheme.label}</Text>
        </Pressable>
      }
    />
  );
});

export { ColorSchemeInput };
