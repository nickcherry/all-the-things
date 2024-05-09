import Constants from 'expo-constants';

const env = process.env.NODE_ENV;
const isProd = env === 'production';
const isDev = !isProd;

const requireEnvVar = (name: string) => {
  const value = Constants.expoConfig?.extra
    ? Constants.expoConfig.extra[name]
    : undefined;

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const googlePlacesApiKey = requireEnvVar('googlePlacesApiKey');
const postHogApiKey = requireEnvVar('postHogApiKey');
const sentryDsn = requireEnvVar('sentryDsn');

export { env, googlePlacesApiKey, isDev, isProd, postHogApiKey, sentryDsn };
