import { CommonActions, useNavigation } from '@react-navigation/core';
import { useCallback } from 'react';

import { FullParamList, ScreenName } from '~/type/navigation';

const useNavigate = () => {
  const { dispatch } = useNavigation();

  return useCallback(
    <Name extends ScreenName>(name: Name, params: FullParamList[Name]) => {
      return dispatch(CommonActions.navigate(name, params));
    },
    [dispatch],
  );
};

export { useNavigate };
