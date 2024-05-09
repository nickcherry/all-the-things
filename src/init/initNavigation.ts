import { enableFreeze, enableScreens } from 'react-native-screens';

import {
  shouldEnableScreens,
  shouldFreezeScreens,
} from '~/constant/navigation';

function initNavigation() {
  enableScreens(shouldEnableScreens);
  enableFreeze(shouldFreezeScreens);
}

export { initNavigation };
