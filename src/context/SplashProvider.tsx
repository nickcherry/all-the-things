import * as SplashScreen from 'expo-splash-screen';
import {
  createContext,
  FC,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, Dimensions, Easing, Image } from 'react-native';

import { sleep } from '~/util/promise/sleep';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const splash = require('../../assets/image/splash.png');

type SplashContextValue = {
  hideSplash: () => void;
};

const SplashContext = createContext<SplashContextValue>({
  hideSplash: () => undefined,
});

type SplashProviderProps = {
  children: ReactNode;
};

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const SplashProvider: FC<SplashProviderProps> = memo(({ children }) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const [hasAnimatedOut, setHasAnimatedOut] = useState(false);

  const hideSplash = useCallback(async () => {
    if (hasAnimatedOut) {
      return;
    }

    await sleep(120);
    await SplashScreen.hideAsync();

    Animated.timing(opacity, {
      toValue: 0,
      duration: 150,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setHasAnimatedOut(true);
    });
  }, [hasAnimatedOut, opacity]);

  const value = useMemo(() => ({ hideSplash }), [hideSplash]);

  return (
    <SplashContext.Provider value={value}>
      {!hasAnimatedOut && (
        <Animated.View
          pointerEvents="none"
          style={{
            height,
            left: 0,
            opacity,
            position: 'absolute',
            top: 0,
            width,
            zIndex: 100,
          }}
        >
          <Image
            style={{ width: '100%', height: '100%' }}
            source={splash}
            resizeMode="contain"
          />
        </Animated.View>
      )}
      {children}
    </SplashContext.Provider>
  );
});

SplashProvider.displayName = 'SplashProvider';

function useSplash() {
  return useContext(SplashContext);
}

export { SplashProvider, useSplash };
