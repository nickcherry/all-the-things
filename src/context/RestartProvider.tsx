import {
  createContext,
  FC,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { FullscreenLoader } from '~/component/loader/FullscreenLoader';

type RestartContextValue = {
  restart: () => void;
};

const RestartContext = createContext<RestartContextValue>({
  restart: () => undefined,
});

type RestartProviderProps = {
  children: ReactNode;
};

const RestartProvider: FC<RestartProviderProps> = memo(({ children }) => {
  const [isRestarting, setIsRestarting] = useState(false);

  const restart = useCallback(() => {
    setIsRestarting(true);
    setTimeout(() => setIsRestarting(false), 1000);
  }, []);

  const value = useMemo(() => ({ restart }), [restart]);

  if (isRestarting) {
    return <FullscreenLoader />;
  }

  return (
    <RestartContext.Provider value={value}>{children}</RestartContext.Provider>
  );
});

RestartProvider.displayName = 'RestartProvider';

function useRestart() {
  return useContext(RestartContext);
}

export { RestartProvider, useRestart };
