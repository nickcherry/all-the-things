import crypto from 'react-native-quick-crypto';

function initPolyfills() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalThis.crypto = crypto as any;
}

export { initPolyfills };
