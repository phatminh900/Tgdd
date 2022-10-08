import { JWTKEY } from "app-constants/browser.constatnt";
import Cookies from "js-cookie";
import { appStateActions } from "store/appState/app-state-slice";

import {
  getDataFromApi,
  getDataFromApiReactRouter,
  handleErrorApi,
} from "utils/service.util";
import { AppDispatch } from "../store/main.store";
export interface ReviewDocument {
  review: string;
  rating: number;
  productId: string;
  photo: any;
  user: string;
}
const sendReview = (
  type: "phones" | "laptops",
  review: ReviewDocument,
  productId: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(appStateActions.resetState());
      dispatch(appStateActions.setIsLoading());
      const { data } = await getDataFromApi(
        dispatch,
        `/api/v1/${type}/${productId}/reviews`,
        "post",
        review,
        Cookies.get(JWTKEY)
      );
      return { data };
    } catch (error) {
      handleErrorApi(error, dispatch);
    } finally {
      dispatch(appStateActions.setFinishLoading());
    }
  };
};
export const sendReviewReactRouter = async (
  type: "phones" | "laptops",
  review: ReviewDocument,
  productId: string
) => {
  try {
    const { data } = await getDataFromApiReactRouter(
      `/api/v1/${type}/${productId}/reviews`,
      "post",
      review,
      Cookies.get(JWTKEY)
    );
    return { data };
  } catch (error) {
    return error;
  }
};
export const getReviewReactRouter = async (
  type: "phones" | "laptops",
  slug: string
) => {
  try {
    const { data } = await getDataFromApiReactRouter(
      `/api/v1/reviews/${type}/${slug}`,
      "get"
    );
    return { data };
  } catch (error) {
    return error;
  }
};

export { sendReview };
