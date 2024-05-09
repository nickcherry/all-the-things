import { CommonActions, useNavigation } from '@react-navigation/core';
import { useCallback } from 'react';

import {
  DrawerParamList,
  RootStackParamList,
  RootStackScreenName,
} from '~/type/navigation';

const stack: keyof DrawerParamList = 'RootStack';

// https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
function useNavigateToNestedStackScreen() {
  const { dispatch } = useNavigation();

  return useCallback(
    <Screen extends RootStackScreenName>(
      screen: Screen,
      params: RootStackParamList[Screen],
    ) => {
      return dispatch(CommonActions.navigate(stack, { params, screen }));
    },
    [dispatch],
  );
}

export { useNavigateToNestedStackScreen };
