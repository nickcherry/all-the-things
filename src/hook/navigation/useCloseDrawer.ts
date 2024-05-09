import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

function useCloseDrawer() {
  const navigation = useNavigation();

  return useCallback(() => {
    navigation.dispatch(DrawerActions.closeDrawer());
  }, [navigation]);
}

export { useCloseDrawer };
