import merge from 'lodash/merge';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { storageKeys } from '~/constant/storage';
import { Settings } from '~/type/settings';
import { buildSettings } from '~/util/settings/buildSettings';
import { storage } from '~/util/storage';

type UpdateSettings = (settings: Partial<Settings>) => void;

type SettingsContextValue = {
  settings: Settings;
  updateSettings: UpdateSettings;
};

const SettingsContext = createContext<SettingsContextValue>({
  settings: buildSettings(),
  updateSettings: () => undefined,
});

type SettingsProviderProps = {
  children: ReactNode;
};

const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState(
    useMemo(
      () =>
        buildSettings(
          JSON.parse(
            storage.getString(storageKeys.settings) || JSON.stringify({}),
          ),
        ),
      [],
    ),
  );

  const updateSettings: UpdateSettings = useCallback((updates) => {
    setSettings((prevSettings) => merge({}, prevSettings, updates));
  }, []);

  useEffect(() => {
    storage.set(storageKeys.settings, JSON.stringify(settings));
  }, [settings]);

  const value = useMemo(
    () => ({ settings, updateSettings }),
    [settings, updateSettings],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.displayName = 'SettingsProvider';

function useSettings() {
  return useContext(SettingsContext);
}

export { SettingsProvider, useSettings };
