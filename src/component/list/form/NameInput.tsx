import { FC, memo } from 'react';
import { ViewStyle } from 'react-native';

import { TextInput } from '~/component/textinput/TextInput';
import { useTheme } from '~/context/ThemeProvider';

type NameInputProps = {
  autoFocus: boolean;
  name: string;
  setName: (name: string) => void;
  style?: ViewStyle | ViewStyle[];
};

const NameInput: FC<NameInputProps> = memo(
  ({ autoFocus, name, setName, style }) => {
    const { t } = useTheme();

    return (
      <TextInput
        autoCorrect
        autoFocus={autoFocus}
        blurOnSubmit
        maxLength={32}
        numberOfLines={2}
        onChangeText={setName}
        placeholder="What's the name of your list?"
        style={[t.fontSemibold, style]}
        value={name}
      />
    );
  },
);

NameInput.displayName = 'NameInput';

export { NameInput };
