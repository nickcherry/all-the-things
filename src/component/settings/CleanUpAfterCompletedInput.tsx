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

const cleanUpAfterCompletedOptions = translateOptions('cleanUpAfterCompleted', [
  'never',
  '15 minutes',
  '1 day',
]);

const fallbackIndex = cleanUpAfterCompletedOptions.findIndex(
  (option) => option.value === '1 day',
);

const CleanUpAfterCompletedInput: FC = memo(() => {
  const { scheme } = useTheme();
  const { settings, updateSettings } = useSettings();

  const selectedCleanUpAfterCompleted = useMemo(
    () =>
      getSelectedOption({
        fallbackIndex,
        options: cleanUpAfterCompletedOptions,
        selectedValue: settings.cleanUpAfterCompleted,
      }),
    [settings.cleanUpAfterCompleted],
  );

  return (
    <SettingsField
      label="Remove completed items"
      info="Only applies to non-recurring items"
      value={
        <Pressable
          hitSlop={defaultHitSlop}
          onPress={() =>
            showActionSheet({
              options: cleanUpAfterCompletedOptions,
              onSelect: (cleanUpAfterCompleted) =>
                updateSettings({ cleanUpAfterCompleted }),
              scheme,
            })
          }
        >
          <Text>{selectedCleanUpAfterCompleted.label}</Text>
        </Pressable>
      }
    />
  );
});

CleanUpAfterCompletedInput.displayName = 'CleanUpAfterCompletedInput';

export { CleanUpAfterCompletedInput };
