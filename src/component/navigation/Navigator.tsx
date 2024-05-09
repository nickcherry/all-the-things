import {
  createNavigationContainerRef,
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { FC, memo, useMemo } from 'react';

import { FullscreenLoader } from '~/component/loader/FullscreenLoader';
import { useTheme } from '~/context/ThemeProvider';
import { useHandleNotification } from '~/hook/notification/useHandleNotification';
import { FullParamList } from '~/type/navigation';

import { Drawer } from './Drawer';

const Navigator: FC = memo(() => {
  const { scheme } = useTheme();
  const navigationRef = createNavigationContainerRef<FullParamList>();

  useHandleNotification(navigationRef);

  return (
    <NavigationContainer
      ref={navigationRef}
      fallback={<FullscreenLoader />}
      theme={useMemo(() => {
        const Theme = scheme === 'dark' ? DarkTheme : DefaultTheme;

        return {
          ...Theme,
          colors: {
            ...Theme.colors,
            background: 'transparent',
          },
        };
      }, [scheme])}
    >
      <Drawer />
    </NavigationContainer>
  );
});

Navigator.displayName = 'Navigator';

export { Navigator };
