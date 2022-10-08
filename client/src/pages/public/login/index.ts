import React from "react";
import { action as loginAction } from "./login.container";
const Login = React.lazy(() => import("./login.container"));

export { Login, loginAction };
