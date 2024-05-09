import { LogBox } from 'react-native';

function initLogs() {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state.',
  ]);
}

export { initLogs };
