// eslint-disable-next-line no-restricted-imports
import { useAnimatedStyle as useAnimatedStyleLib } from 'react-native-reanimated';
import {
  DefaultStyle,
  DependencyList,
} from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';

function useAnimatedStyle<Style extends DefaultStyle>(
  updater: () => Style,
  dependencies: DependencyList,
): Style {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useAnimatedStyleLib(updater, dependencies);
}

export { useAnimatedStyle };
