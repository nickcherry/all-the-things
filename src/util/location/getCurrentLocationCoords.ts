import {
  getCurrentPositionAsync,
  LocationAccuracy,
  LocationObjectCoords,
} from 'expo-location';

async function getCurrentLocationCoords(): Promise<LocationObjectCoords> {
  const { coords } = await getCurrentPositionAsync({
    accuracy: LocationAccuracy.Balanced,
  });
  return coords;
}

export { getCurrentLocationCoords };
