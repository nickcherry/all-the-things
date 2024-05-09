import * as Haptics from 'expo-haptics';
import { ActionSheetIOS } from 'react-native';

import { ResolvedColorScheme } from '~/type/settings';

function showActionSheet<Label extends string, Value extends string | number>({
  includeCancel = true,
  options: optionsParam,
  onSelect,
  scheme,
}: {
  includeCancel?: boolean;
  options: { label: Label; value: Value }[];
  onSelect: (value: Value) => void;
  scheme: ResolvedColorScheme;
}) {
  const options: string[] = optionsParam.map(({ label }) => label);

  let cancelButtonIndex: number | undefined = undefined;

  if (includeCancel) {
    options.push('Cancel');
    cancelButtonIndex = options.length - 1;
  }

  ActionSheetIOS.showActionSheetWithOptions(
    { cancelButtonIndex, options, userInterfaceStyle: scheme },
    (index) => {
      if (index !== cancelButtonIndex) {
        Haptics.selectionAsync();
        onSelect(optionsParam[index].value);
      }
    },
  );
}

export { showActionSheet };
