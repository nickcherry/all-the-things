import { ConfigContext, ExpoConfig } from 'expo/config';

const isDev = false; // process.env.NODE_ENV !== 'production';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: isDev ? 'All The Things Dev' : 'All The Things',
  slug: 'todo-all-the-things',
  version: '1.0.32',
  orientation: 'portrait',
  icon: './assets/image/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/image/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  jsEngine: 'hermes',
  ios: {
    supportsTablet: false,
    bundleIdentifier: isDev
      ? 'com.nickcherry.simple-todo' // 'com.nickcherry.simple-todo.development'
      : 'com.nickcherry.simple-todo',
    buildNumber: '1',
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
      usesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/image/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: isDev
      ? 'com.nickcherry.simpletodo' // 'com.nickcherry.simpletodo.development'
      : 'com.nickcherry.simpletodo',
  },
  web: {
    favicon: './assets/image/favicon.png',
  },
  plugins: [
    'expo-font',
    [
      'expo-notifications',
      {
        sounds: ['./assets/audio/notification.wav'],
      },
    ],
    [
      'expo-updates',
      {
        username: 'nickcherry',
      },
    ],
    [
      'expo-location',
      {
        isIosBackgroundLocationEnabled: true,
        locationAlwaysAndWhenInUsePermission:
          'Allow $(PRODUCT_NAME) to use your location when in use or backgrounded.',
        locationAlwaysPermission:
          'Allow $(PRODUCT_NAME) to use your location in the background.',
        locationWhenInUsePermission:
          'Allow $(PRODUCT_NAME) to use your location when in use.',
      },
    ],
  ],
  owner: 'nickcherry',
  extra: {
    postHogApiKey: process.env.EXPO_PUBLIC_POST_HOG_API_KEY,
    sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    googlePlacesApiKey: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
    eas: {
      projectId: '9797215b-3881-43de-b091-33a579676458',
    },
  },
  runtimeVersion: '1.0.0',
  updates: {
    url: 'https://u.expo.dev/9797215b-3881-43de-b091-33a579676458',
  },
});
