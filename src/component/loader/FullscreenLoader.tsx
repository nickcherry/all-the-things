import { FC, memo } from 'react';
import { View } from 'react-native';

import { Text } from '~/component/text/Text';
import { useTheme } from '~/context/ThemeProvider';

import { Loader } from './Loader';

type FullscreenLoaderProps = {
  message?: string;
};

const FullscreenLoader: FC<FullscreenLoaderProps> = memo(({ message }) => {
  const { t } = useTheme();

  return (
    <View style={[t.flex1, t.flexCol, t.itemsCenter, t.justifyCenter]}>
      <Loader />
      {message && <Text style={[t.mT2, t.textXs]}>{message}</Text>}
    </View>
  );
});

FullscreenLoader.displayName = 'FullscreenLoader';

export { FullscreenLoader };
