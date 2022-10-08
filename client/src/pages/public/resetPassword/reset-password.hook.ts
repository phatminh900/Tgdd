import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { ResponseStatusMessage } from "interfaces/response.interface";
import { ROUTES } from "app-constants/navigation.constant";
const useResetPasswordHook = (
  resetPasswordData: ResponseStatusMessage | undefined
) => {
  const [userValue, setUserValue] = useState({
    password: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let error = null;
  if (resetPasswordData?.status === "fail") {
    error = resetPasswordData.message;
  }
  let successMessage = undefined;
  if (resetPasswordData?.status === "success") {
    successMessage = resetPasswordData.message;
  }
  const changeUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  useEffect(() => {
    if (resetPasswordData?.status === "success") {
      setTimeout(() => {
        navigate(ROUTES.LOGIN, {
          state: { prevPath: pathname },
          replace: true,
        });
      }, 1000);
    }
  }, [resetPasswordData, navigate, pathname]);
  return {
    userValue,
    successMessage,
    changeUserValue,
    error,
  };
};
export default useResetPasswordHook;
