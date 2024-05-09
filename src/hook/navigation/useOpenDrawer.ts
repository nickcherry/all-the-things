import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

function useOpenDrawer() {
  const navigation = useNavigation();

  return useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);
}

export { useOpenDrawer };
