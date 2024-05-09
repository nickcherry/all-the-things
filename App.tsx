import 'react-native-gesture-handler';
import '@total-typescript/ts-reset';

import { initPolyfills } from './src/init/initPolyfills';

initPolyfills();

import { App } from './src/component/app/App';
import { initLogs } from './src/init/initLogs';
import { initNavigation } from './src/init/initNavigation';
import { initNotifications } from './src/init/initNotifications';
import { initSentry } from './src/init/initSentry';
import { initSplash } from './src/init/initSplash';
import { initTasks } from './src/init/initTasks';

initSentry();
initLogs();
initNavigation();
initNotifications();
initSplash();
initTasks();

export default App;
