import { FC, memo } from 'react';

import { useTheme } from '~/context/ThemeProvider';

import { Text, TextProps } from './Text';

type InfoTextProps = TextProps;

const InfoText: FC<InfoTextProps> = memo(({ style, ...props }) => {
  const { t } = useTheme();

  return <Text style={[t.textXs, t.textMuted, style]} {...props} />;
});

InfoText.displayName = 'InfoText';

export { InfoText };
