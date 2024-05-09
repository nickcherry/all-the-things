import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FC, memo, ReactNode, Suspense, useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FullscreenLoader } from '~/component/loader/FullscreenLoader';
import { DismissSplash } from '~/component/splash/DismissSplash';
import { useDrawer } from '~/context/DrawerProvider';
import { useTheme } from '~/context/ThemeProvider';
import { TouchOutsideProvider } from '~/context/TouchOutsideProvider';

type ScreenProps = {
  background: 'transparent' | 'opaque';
  children: ReactNode;
  insetTop: boolean;
  insetBottom: boolean;
};

const Screen: FC<ScreenProps> = memo(
  ({ background, children, insetTop, insetBottom }) => {
    const { t } = useTheme();
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const { canGoBack } = useNavigation();
    const { setSwipeEdgeEnabled } = useDrawer();

    useEffect(() => {
      if (isFocused) {
        setSwipeEdgeEnabled(!canGoBack());
      }
    }, [isFocused, canGoBack, setSwipeEdgeEnabled]);

    return (
      <View
        style={[
          t.flex1,
          background === 'transparent' ? t.bgTransparent : t.bgScreen,
          insetTop // https://reactnavigation.org/docs/handling-safe-area/#use-the-hook-for-more-control
            ? { paddingTop: insets.top }
            : { paddingLeft: insets.left, paddingRight: insets.right },
          insetBottom ? { paddingBottom: insets.bottom } : {},
        ]}
      >
        <DismissSplash />
        <Suspense fallback={<FullscreenLoader />}>
          <TouchOutsideProvider>{children}</TouchOutsideProvider>
        </Suspense>
      </View>
    );
  },
);

Screen.displayName = 'Screen';

export { Screen };
