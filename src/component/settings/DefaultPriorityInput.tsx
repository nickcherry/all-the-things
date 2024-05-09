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

const defaultPriorityOptions = translateOptions('priority', [
  'lowest',
  'low',
  'medium',
  'high',
  'highest',
]);

const DefaultPriorityInput: FC = memo(() => {
  const { scheme } = useTheme();
  const { settings, updateSettings } = useSettings();

  const selectedDefaultPriority = useMemo(
    () =>
      getSelectedOption({
        fallbackIndex: 1,
        options: defaultPriorityOptions,
        selectedValue: settings.defaultTodoItemPriority,
      }),
    [settings.defaultTodoItemPriority],
  );

  return (
    <SettingsField
      label="Default priority"
      value={
        <Pressable
          hitSlop={defaultHitSlop}
          onPress={() =>
            showActionSheet({
              options: defaultPriorityOptions,
              onSelect: (defaultTodoItemPriority) =>
                updateSettings({ defaultTodoItemPriority }),
              scheme,
            })
          }
        >
          <Text>{selectedDefaultPriority.label}</Text>
        </Pressable>
      }
    />
  );
});

DefaultPriorityInput.displayName = 'DefaultPriorityInput';

export { DefaultPriorityInput };
