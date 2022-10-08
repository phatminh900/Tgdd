import React from "react";
import { action as resetPasswordAction } from "./reset-password.container";
const ResetPassword = React.lazy(() => import("./reset-password.container"));

export { ResetPassword, resetPasswordAction };
