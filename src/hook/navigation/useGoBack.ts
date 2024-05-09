import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

function useGoBack() {
  const navigation = useNavigation();

  return useCallback(() => {
    navigation.goBack();
  }, [navigation]);
}

export { useGoBack };
