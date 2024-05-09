import {
  getBackgroundPermissionsAsync,
  hasStartedGeofencingAsync,
  LocationObjectCoords,
  LocationRegion,
  PermissionStatus,
  requestBackgroundPermissionsAsync,
  startGeofencingAsync,
  stopGeofencingAsync,
} from 'expo-location';
import compact from 'lodash/compact';

import { locationTaskName } from '~/constant/location';
import { Item } from '~/type/item';
import { trackError } from '~/util/error/trackError';
import { hasLocationAlerts } from '~/util/item/hasLocationAlerts';
import { waitForTaskToBeDefined } from '~/util/task/waitForTaskToBeDefined';

import { getCurrentLocationCoords } from './getCurrentLocationCoords';
import { getDistanceBetweenCoords } from './getDistanceBetweenCoords';
import { updateStoredLocationAlertHistory } from './task/updateStoredLocationHistory';

// https://docs.expo.dev/versions/latest/sdk/location/#geofencing-methods
const maxNumRegions = 20;

async function registerLocationAlerts({
  items: itemsParam,
}: {
  items: Item[];
}) {
  const items = itemsParam
    .sort((a, b) => a.createdAt - b.createdAt)
    .slice(0, maxNumRegions);

  let currentLocationCoords: LocationObjectCoords | undefined;

  let permissions = await getBackgroundPermissionsAsync();

  if (items.length > 0 && permissions.status === PermissionStatus.GRANTED) {
    try {
      currentLocationCoords = await getCurrentLocationCoords();
    } catch {
      trackError(
        'Could not retrieve current location coordinates when registering location alerts',
      );
    }
  }

  const regions: LocationRegion[] = compact(
    items.map((item) => {
      if (!hasLocationAlerts(item)) {
        return;
      }

      const identifier = item.id;
      const { latitude, longitude, radius } = item.due.notifications.location;

      if (currentLocationCoords) {
        const distance = getDistanceBetweenCoords(
          currentLocationCoords,
          item.due.notifications.location,
        );

        if (distance > radius) {
          updateStoredLocationAlertHistory({
            identifier,
            updates: { lastExitedAt: Date.now() },
          });
        }
      }

      return {
        identifier,
        latitude: latitude,
        longitude: longitude,
        radius: radius,
        notifyOnEnter: true,
        notifyOnExit: false,
      };
    }),
  );

  await waitForTaskToBeDefined({ name: locationTaskName });

  if (regions.length === 0) {
    const shouldStop = await hasStartedGeofencingAsync(locationTaskName);

    if (shouldStop) {
      await stopGeofencingAsync(locationTaskName);
    }
  } else {
    if (!permissions.granted && permissions.canAskAgain) {
      permissions = await requestBackgroundPermissionsAsync();
    }
    if (permissions.granted) {
      await startGeofencingAsync(locationTaskName, regions);
    }
  }
}

export { registerLocationAlerts };
