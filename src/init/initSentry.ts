import * as Sentry from '@sentry/react-native';

import { env, isProd, sentryDsn } from '~/constant/env';

function initSentry() {
  Sentry.init({
    debug: false,
    enabled: isProd,
    environment: env,
    dsn: sentryDsn,
  });
}

export { initSentry };
