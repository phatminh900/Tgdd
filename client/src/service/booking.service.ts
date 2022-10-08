import { JWTKEY } from "app-constants/browser.constatnt";
import Cookies from "js-cookie";
import { appStateActions } from "store/appState/app-state-slice";

import {
  getDataFromApi,
  getDataFromApiReactRouter,
  handleErrorApi,
  handleErrorApiReactRouter,
} from "utils/service.util";
import { AppDispatch } from "../store/main.store";

export const createBookingCheckout = (query: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await getDataFromApi(dispatch, `/api/v1/booking/${query}`, "get");
    } catch (err) {
      handleErrorApi(err, dispatch);
    } finally {
      dispatch(appStateActions.setFinishLoading());
    }
  };
};
export const getUserBookings = async () => {
  try {
    const { data } = await getDataFromApiReactRouter(
      `/api/v1/booking/my-booking`,
      "get",
      undefined,
      Cookies.get(JWTKEY)
    );
    return data;
  } catch (err) {
    return handleErrorApiReactRouter(err);
  }
};
export const getUserBooking = async (id: string) => {
  try {
    const { data } = await getDataFromApiReactRouter(
      `/api/v1/booking/my-booking/${id}`,
      "get",
      undefined,
      Cookies.get(JWTKEY)
    );
    return data;
  } catch (err) {
    return handleErrorApiReactRouter(err);
  }
};
