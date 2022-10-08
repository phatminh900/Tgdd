import { JWTKEY } from "app-constants/browser.constatnt";
import Cookies from "js-cookie";
import {
  getDataFromApiReactRouter,
  handleErrorApiReactRouter,
} from "utils/service.util";

const loginReactRouter = async (userValue: {
  email: string;
  password: string;
}) => {
  try {
    const data = await getDataFromApiReactRouter(
      "/api/v1/users/login",
      "post",
      userValue
    );
    return data;
  } catch (error) {
    return handleErrorApiReactRouter(error);
  }
};

const signupReactRouter = async (userValue: {
  email: string;
  name: string;
  passwordConfirm: string;
  password: string;
}) => {
  try {
    const data = await getDataFromApiReactRouter(
      "/api/v1/users/signup",
      "post",
      userValue
    );

    return data;
  } catch (error) {
    return handleErrorApiReactRouter(error);
  }
};
const forgotPasswordReactRouter = async (userValue: { email: string }) => {
  try {
    const data = await getDataFromApiReactRouter(
      "/api/v1/users/forgotPassword",
      "post",
      userValue
    );
    return data;
  } catch (error) {
    // throw error
    return handleErrorApiReactRouter(error);
  }
};

const resetPassword = async (
  token: string,
  userValue: {
    password: string;
    passwordConfirm: string;
  }
) => {
  try {
    const data = await getDataFromApiReactRouter(
      // temporary
      `/api/v1/users/resetPassword/${token}`,
      "patch",
      userValue
    );
    return data;
  } catch (error) {
    return handleErrorApiReactRouter(error);
  }
};
const updateUser = async (userName: { name: string }) => {
  try {
    const data = await getDataFromApiReactRouter(
      `/api/v1/users/updateMe`,
      "patch",
      userName,
      Cookies.get(JWTKEY)
    );
    return data;
  } catch (error) {
    return handleErrorApiReactRouter(error);
  }
};
export {
  resetPassword,
  updateUser,
  signupReactRouter,
  loginReactRouter,
  forgotPasswordReactRouter,
};
