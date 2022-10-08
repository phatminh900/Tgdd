import React, { useState, useEffect } from "react";
import { ROUTES } from "app-constants/navigation.constant";
import { IUser } from "context/auth.context";

import { useLocation, useNavigate } from "react-router-dom";
import {
  ResponseStatusData,
  ResponseStatusMessage,
} from "interfaces/response.interface";
const useSignupHook = (
  signupData: ResponseStatusMessage | ResponseStatusData<IUser> | undefined
) => {
  const [userValue, setUserValue] = useState({
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
  });
  const { pathname } = useLocation();
  let error = null;
  // just singleString is err message
  if (signupData && "message" in signupData) error = signupData.message;

  // if()
  const changeUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const navigate = useNavigate();
  // after 1s successfully signup redirect to login
  useEffect(() => {
    if (signupData && "data" in signupData) {
      const timer = setTimeout(() => {
        // redirect doesn't work :((
        navigate(ROUTES.LOGIN, { state: { prevPath: pathname } });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [signupData, navigate, pathname]);
  return {
    userValue,
    changeUserValue,
    error,
  };
};

export default useSignupHook;
