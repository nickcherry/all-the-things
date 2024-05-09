import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Pressable } from 'react-native';

import { useTheme } from './ThemeProvider';

type InputRef = { current: null | { blur: () => void } };
type SetInputRef = (ref: InputRef) => void;

type TouchOutsideContextValue = {
  setInputRef: SetInputRef;
};

const TouchOutsideContext = createContext<TouchOutsideContextValue>({
  setInputRef: () => undefined,
});

type TouchOutsideProviderProps = {
  children?: ReactNode;
};

const TouchOutsideProvider: FC<TouchOutsideProviderProps> = ({ children }) => {
  const { t } = useTheme();
  const [inputRef, setInputRef] = useState<InputRef>({ current: null });

  const value = useMemo(() => ({ setInputRef }), [setInputRef]);
  return (
    <TouchOutsideContext.Provider value={value}>
      <Pressable
        style={[t.flex1]}
        disabled={!inputRef.current}
        pointerEvents="box-none"
        onPress={() => {
          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
      >
        {children}
      </Pressable>
    </TouchOutsideContext.Provider>
  );
};

function useTouchOutside() {
  return useContext(TouchOutsideContext);
}

export { TouchOutsideProvider, useTouchOutside };
