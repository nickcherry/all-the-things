import { FC, memo } from 'react';
import { ActivityIndicator } from 'react-native';

const Loader: FC = memo(() => {
  return <ActivityIndicator />;
});

Loader.displayName = 'Loader';

export { Loader };
