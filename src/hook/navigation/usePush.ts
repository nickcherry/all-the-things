import { StackActions, useNavigation } from '@react-navigation/core';
import { useCallback } from 'react';

import { RootStackParamList, RootStackScreenName } from '~/type/navigation';

const usePush = () => {
  const { dispatch } = useNavigation();

  return useCallback(
    <Name extends RootStackScreenName>(
      name: Name,
      params: RootStackParamList[Name],
    ) => {
      return dispatch(StackActions.push(name, params));
    },
    [dispatch],
  );
};

export { usePush };
