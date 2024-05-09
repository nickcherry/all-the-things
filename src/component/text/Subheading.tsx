import { FC, memo } from 'react';

import { useTheme } from '~/context/ThemeProvider';

import { Text, TextProps } from './Text';

type SubheadingProps = TextProps;

const Subheading: FC<SubheadingProps> = memo(({ style, ...props }) => {
  const { t } = useTheme();

  return (
    <Text
      style={[
        t.textXs,
        t.textMuted,
        { marginBottom: 6 },
        t.fontSemibold,
        style,
      ]}
      {...props}
    />
  );
});

Subheading.displayName = 'Subheading';

export { Subheading };
