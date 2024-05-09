import { FC, memo } from 'react';
// eslint-disable-next-line no-restricted-imports
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

import { useTheme } from '~/context/ThemeProvider';

export type TextProps = RNTextProps;

const Text: FC<TextProps> = memo(({ style, ...props }) => {
  const { colors, t } = useTheme();

  return (
    <RNText
      style={[t.textBase, t.fontRegular, t.textDefault, style]}
      selectionColor={colors.textSelection}
      {...props}
    />
  );
});

Text.displayName = 'Text';

export { Text };
