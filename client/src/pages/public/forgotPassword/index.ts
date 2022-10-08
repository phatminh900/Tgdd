import React from "react";
import { action as forgotPasswordAction } from "./forgot-password.container";
const ForgotPassword = React.lazy(() => import("./forgot-password.container"));

export { ForgotPassword, forgotPasswordAction };
