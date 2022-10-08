import { ResponseStatusMessage } from "interfaces/response.interface";
import React, { useState } from "react";

const useForgotPasswordHook = (
  forgotPassword: ResponseStatusMessage | undefined
) => {
  const [userEmail, setUserEmail] = useState({
    email: "",
  });
  let error = null;
  if (forgotPassword && forgotPassword.status === "fail") {
    error = forgotPassword.message;
  }
  let success = undefined;
  if (forgotPassword && forgotPassword.status === "success") {
    success = forgotPassword.message;
  }
  const changeUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return {
    userEmail,
    changeUserValue,
    error,
    success,
  };
};

export default useForgotPasswordHook;
