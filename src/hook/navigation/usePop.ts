import { StackActions, useNavigation } from "@react-navigation/core";
import { useCallback } from "react";

const usePop = () => {
  const { dispatch } = useNavigation();

  return useCallback(
    (count = 1) => {
      return dispatch(StackActions.pop(count));
    },
    [dispatch],
  );
};

export { usePop };
