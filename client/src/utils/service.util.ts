import axios, { AxiosError } from "axios";
import { appStateActions } from "store/appState/app-state-slice";
import { AppDispatch } from "store/main.store";
import { setAuthorizationHeader } from "./auth.util";
interface ErrorOptional {
  status: string;
  message: string;
}
type HTTPMethod = "get" | "post" | "patch" | "delete";

// in order to set jwt
const getToApi = (url: string, data: undefined, jwt?: string) => {
  return jwt ? axios.get(url, setAuthorizationHeader(jwt)) : axios.get(url);
};
const postToApi = (url: string, data: any, jwt?: string) => {
  return jwt
    ? axios.post(`${url}`, data, setAuthorizationHeader(jwt))
    : axios.post(`${url}`, data);
};
const patchToApi = (url: string, data: any, jwt?: string) => {
  return jwt
    ? axios.patch(`${url}`, data, setAuthorizationHeader(jwt))
    : axios.patch(`${url}`, data);
};
// in order to set jwt

const deleteToApi = (url: string, data: undefined, jwt?: string) => {
  return jwt
    ? axios.delete(url, setAuthorizationHeader(jwt))
    : axios.delete(url);
};
const getTypeHttpMethod = (type: HTTPMethod) => {
  switch (type) {
    case "get":
      return getToApi;
    case "post":
      return postToApi;
    case "patch":
      return patchToApi;
    case "delete":
      return deleteToApi;
    default:
      const _exhaustiveCheck: never = type;
      return _exhaustiveCheck;
  }
};
// getTypeHttpMethod('get')()
export const handleErrorApi = (error: any, dispatch: AppDispatch) => {
  const err = error as AxiosError;

  const response = err.response;
  const errData = response?.data;
  const errMessage = (errData as ErrorOptional).message;
  dispatch(appStateActions.setError(errMessage));
};
export const handleErrorApiReactRouter = (error: any) => {
  const err = error as AxiosError;
  const response = err.response;
  const errData = response?.data;
  const errMessage = (errData as ErrorOptional).message;
  throw errData;
};
export const getDataFromApiReactRouter = async (
  url: string,
  type: HTTPMethod,
  data?: any,
  jwt?: string
): Promise<{
  status: string;
  data: object | any[];
  token?: string;
  message?: string;
}> => {
  // clear all products before getting new one
  const { data: dataApi } = await getTypeHttpMethod(type)(url, data, jwt);
  return dataApi;
};
export const getDataFromApi = async (
  dispatch: AppDispatch,
  url: string,
  type: HTTPMethod,
  data?: any,
  jwt?: string
): Promise<{
  status: string;
  data: object | any[];
  token?: string;
  message?: string;
}> => {
  dispatch(appStateActions.setIsLoading());
  dispatch(appStateActions.resetState());

  // clear all products before getting new one
  const { data: dataApi } = await getTypeHttpMethod(type)(url, data, jwt);
  dispatch(appStateActions.setFinishLoading());
  dispatch(appStateActions.setIsSuccess());
  return dataApi;
};
