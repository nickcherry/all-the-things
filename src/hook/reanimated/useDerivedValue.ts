import {
  DerivedValue,
  // eslint-disable-next-line no-restricted-imports
  useDerivedValue as useDerivedValueLib,
} from 'react-native-reanimated';
import { DependencyList } from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';

function useDerivedValue<Value>(
  updater: () => Value,
  dependencies: DependencyList,
): DerivedValue<Value> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useDerivedValueLib(updater, dependencies);
}

export { useDerivedValue };
