import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import { ResolvedColorScheme } from '~/type/settings';
import { getTheme } from '~/util/theme/getTheme';

type ThemeContextValue = ReturnType<typeof getTheme> & {
  setColorScheme: (schemeColor: ResolvedColorScheme) => void;
};

const ThemeContext = createContext<ThemeContextValue>(
  'ThemeProvider must be added to react tree' as never,
);

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ResolvedColorScheme>('light');

  const theme = useMemo(() => getTheme({ scheme: colorScheme }), [colorScheme]);

  const value = useMemo(() => ({ ...theme, setColorScheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeProvider, useTheme };
