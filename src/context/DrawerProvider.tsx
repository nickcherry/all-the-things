import {
  createContext,
  FC,
  memo,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import { useItems } from './ItemProvider';

type DrawerContentValue = {
  swipeEdgeEnabled: boolean;
  setSwipeEdgeEnabled: (enabled: boolean) => void;
};

const DrawerContext = createContext<DrawerContentValue>({
  swipeEdgeEnabled: true,
  setSwipeEdgeEnabled: () => undefined,
});

type DrawerProviderProps = {
  children: ReactNode;
};

const DrawerProvider: FC<DrawerProviderProps> = memo(({ children }) => {
  const { hasCreatedFirstItem } = useItems();
  const [swipeEdgeEnabled, setSwipeEdgeEnabled] = useState(true);

  const value = useMemo(
    () => ({
      swipeEdgeEnabled: hasCreatedFirstItem && swipeEdgeEnabled,
      setSwipeEdgeEnabled,
    }),
    [hasCreatedFirstItem, swipeEdgeEnabled],
  );

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
});

DrawerProvider.displayName = 'DrawerProvider';

function useDrawer() {
  return useContext(DrawerContext);
}

export { DrawerProvider, useDrawer };
