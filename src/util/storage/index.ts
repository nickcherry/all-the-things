import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
  id: `the-daily-todo`,
});

export { storage };
