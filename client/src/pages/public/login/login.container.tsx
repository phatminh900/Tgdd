import { AuthComponent, Input } from "components";

import useLoginHook from "./login.hook";
import BtnSubmit from "components/btn/btn-submit/btn-submit.component";
import {
  Link,
  LoaderFunctionArgs,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { ROUTES } from "app-constants/navigation.constant";
import { loginReactRouter } from "service/user.service";
import { IUser } from "context/auth.context";
import {
  ResponseStatusData,
  ResponseStatusMessage,
} from "interfaces/response.interface";

const Login = () => {
  const loginData = useActionData() as
    | ResponseStatusData<IUser>
    | undefined
    | ResponseStatusMessage;

  const { userValue, changeUserValue, error } = useLoginHook(loginData);

  const navigation = useNavigation();
  return (
    <AuthComponent error={error}>
      <Input
        value={userValue.email}
        onChange={changeUserValue}
        label="Email"
        id="email"
        type="email"
      />
      <Input
        onChange={changeUserValue}
        label="Password"
        id="password"
        value={userValue.password}
        type="password"
      />
      {/* <Link  */}
      <BtnSubmit
        isLoading={navigation.state === "submitting"}
        isSuccess={loginData ? loginData.status === "success" : false}
        text={navigation.state === "submitting" ? "Logging..." : "Login"}
      />
      <Link className="navigate-auth-link" to={ROUTES.SIGNUP}>
        Signup here.
      </Link>
      <Link className="navigate-auth-link" to={ROUTES.FORGOTPASSWORD}>
        Forgot your password? Click here to reset password.
      </Link>
    </AuthComponent>
  );
};

export default Login;
export const action = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();

  const userValue = {
    email: formData.get("email")! as string,
    password: formData.get("password")! as string,
  };
  try {
    const userData = await loginReactRouter(userValue);

    return userData;
  } catch (err) {
    return err;
  }
};
