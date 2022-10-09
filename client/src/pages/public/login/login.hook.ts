import React, { useState, useEffect } from "react";
import { useAuth } from "context/auth.context";
import { IUser } from "context/auth.context";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "app-constants/navigation.constant";
import {
  ResponseStatusData,
  ResponseStatusMessage,
} from "interfaces/response.interface";
import { JWTKEY } from "app-constants/browser.constatnt";
import Cookies from "js-cookie";

const isIncludes = (pathname: string, ...path: string[]) =>
  path.some((p) => pathname.includes(p));

const useLoginHook = (
  loginData: ResponseStatusMessage | ResponseStatusData<IUser> | undefined
) => {
  const auth = useAuth();
  const [userValue, setUserValue] = useState({
    email: "",
    password: "",
    "user-name": "",
  });
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  let error = null;
  // just singleString is err message
  if (loginData && "message" in loginData) error = loginData.message;
  const changeUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    if (loginData && "data" in loginData) {
      auth?.setUserHandler(loginData.data);

      const timer = setTimeout(() => {
        // dont navigate back to these links
        if (
          isIncludes(
            state?.prevPath || "",
            ROUTES.FORGOTPASSWORD,
            ROUTES.RESETPASSWORD,
            ROUTES.SIGNUP
          )
        ) {
          return navigate(ROUTES.HOME_PAGE, { replace: true });
        }

        navigate(-1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // User login navigate to home page
    if (auth?.user && Cookies.get(JWTKEY)) {
      return navigate("/");
    }
  }, [loginData, navigate, auth, pathname, state?.prevPath]);
  return {
    userValue,
    changeUserValue,
    error,
  };
};

export default useLoginHook;
