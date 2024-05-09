import merge from 'lodash/merge';
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

import { storageKeys } from '~/constant/storage';
import { storage } from '~/util/storage';

type FeatureFlags = {
  //
};

type UpdateFeatureFlags = (featureFlags: Partial<FeatureFlags>) => void;

const defaultFeatureFlags: FeatureFlags = {
  //
};

const initialFeatureFlags: FeatureFlags = merge(
  {},
  defaultFeatureFlags,
  JSON.parse(storage.getString(storageKeys.featureFlags) || JSON.stringify({})),
);

type FeatureFlagContextValue = {
  featureFlags: FeatureFlags;
  updateFeatureFlags: UpdateFeatureFlags;
};

const FeatureFlagContext = createContext<FeatureFlagContextValue>({
  featureFlags: defaultFeatureFlags,
  updateFeatureFlags: () => undefined,
});

type FeatureFlagProviderProps = {
  children: ReactNode;
};

const FeatureFlagProvider: FC<FeatureFlagProviderProps> = memo(
  ({ children }) => {
    const [featureFlags, setFeatureFlags] = useState(initialFeatureFlags);

    const updateFeatureFlags: UpdateFeatureFlags = useCallback((updates) => {
      setFeatureFlags((prevFeatureFlags) => {
        const nextFeatureFlags = {
          ...prevFeatureFlags,
          ...updates,
        };

        storage.set(storageKeys.featureFlags, JSON.stringify(nextFeatureFlags));

        return nextFeatureFlags;
      });
    }, []);

    const value = useMemo(
      () => ({ featureFlags, updateFeatureFlags }),
      [featureFlags, updateFeatureFlags],
    );

    return (
      <FeatureFlagContext.Provider value={value}>
        {children}
      </FeatureFlagContext.Provider>
    );
  },
);

FeatureFlagProvider.displayName = 'FeatureFlagProvider';

function useFeatureFlags() {
  return useContext(FeatureFlagContext);
}

export { defaultFeatureFlags, FeatureFlagProvider, useFeatureFlags };
