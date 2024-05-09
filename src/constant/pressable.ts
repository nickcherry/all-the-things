import { Insets } from 'react-native';

function hitSlop(distance: number): Insets {
  return {
    top: distance,
    left: distance,
    bottom: distance,
    right: distance,
  };
}

export const defaultHitSlop = hitSlop(16);
