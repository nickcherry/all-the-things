import {
  GeofencingEventType,
  LocationGeofencingEventType,
  LocationRegion,
} from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import { locationTaskName } from '~/constant/location';
import { trackError } from '~/util/error/trackError';

import { handleEnterRegion } from './handleEnterRegion';
import { handleExitRegion } from './handleExitRegion';

// https://docs.expo.dev/versions/latest/sdk/location/#locationstartgeofencingasynctaskname-regions
function defineLocationAlertTask() {
  TaskManager.defineTask<{
    eventType: GeofencingEventType;
    region: LocationRegion;
  }>(locationTaskName, ({ data, error }) => {
    if (error) {
      trackError(error);
      return;
    }

    switch (data.eventType) {
      case LocationGeofencingEventType.Enter:
        return handleEnterRegion({ region: data.region });
      case LocationGeofencingEventType.Exit:
        handleExitRegion({ region: data.region });
    }
  });
}

export { defineLocationAlertTask };
