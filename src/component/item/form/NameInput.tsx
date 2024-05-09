import { FC, memo } from 'react';
import { ViewStyle } from 'react-native';

import { TextInput } from '~/component/textinput/TextInput';
import { useTheme } from '~/context/ThemeProvider';

type NameInputProps = {
  name: string;
  setName: (name: string) => void;
  style?: ViewStyle | ViewStyle[];
};

const NameInput: FC<NameInputProps> = memo(({ name, setName, style }) => {
  const { t } = useTheme();

  return (
    <TextInput
      autoFocus={!name}
      autoCorrect
      blurOnSubmit
      maxLength={160}
      multiline
      numberOfLines={3}
      onChangeText={setName}
      placeholder="What's on the agenda?"
      style={[t.fontSemibold, style]}
      value={name}
    />
  );
});

NameInput.displayName = 'NameInput';

export { NameInput };
