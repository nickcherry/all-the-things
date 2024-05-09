import * as Sentry from '@sentry/react-native';

function trackError(error: unknown) {
  console.error(error);
  Sentry.captureException(error);
}

export { trackError };
