import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks.store";
import { appStateActions } from "./app-state-slice";
const useAppStateHook = (reset: boolean = false) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.appState.isLoading);
  const error = useAppSelector((state) => state.appState.error);
  const isSuccess = useAppSelector((state) => state.appState.isSuccess);
  //   use reset all state
  useEffect(() => {
    if (reset) dispatch(appStateActions.resetState());
  }, [reset, dispatch]);
  return { isLoading, error, isSuccess };
};

export default useAppStateHook;
