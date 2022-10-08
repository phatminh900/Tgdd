import React from "react";
import { action as signupAction } from "./signup.container";
const Signup = React.lazy(() => import("./signup.container"));
export { Signup, signupAction };
