import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isLoading: boolean;
  error: null | string;
  isSuccess: boolean;
}
const initialState: AppState = {
  isLoading: false,
  error: null,
  isSuccess: false,
};
const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setIsLoading(state: AppState) {
      state.isLoading = true;
    },

    setFinishLoading(state: AppState) {
      state.isLoading = false;
    },
    setError(state: AppState, action: PayloadAction<any>) {
      state.error = action.payload;
    },
    setIsSuccess(state: AppState) {
      state.isSuccess = true;
    },
    resetState(state: AppState) {
      state.error = null;
      // state.isLoading = false;
      state.isSuccess = false;
    },
  },
});

export const appStateActions = appStateSlice.actions;
export default appStateSlice.reducer;
