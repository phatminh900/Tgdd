import { AuthComponent, Input } from "components";
import BtnSubmit from "components/btn/btn-submit/btn-submit.component";
import useSignupHook from "./signup.hook";
import {
  Link,
  LoaderFunctionArgs,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { signupReactRouter } from "service/user.service";

import { IUser } from "context/auth.context";
import {
  ResponseStatusData,
  ResponseStatusMessage,
} from "interfaces/response.interface";
import { ROUTES } from "app-constants/navigation.constant";
const SignUp = () => {
  const signupData = useActionData() as
    | ResponseStatusData<IUser>
    | undefined
    | ResponseStatusMessage;

  const { userValue, changeUserValue, error } = useSignupHook(signupData);
  const navigation = useNavigation();

  return (
    <AuthComponent error={error}>
      <Input
        value={userValue.name}
        onChange={changeUserValue}
        label="Name"
        id="name"
        type="text"
      />
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
      <Input
        onChange={changeUserValue}
        label="PasswordConfirm"
        id="passwordConfirm"
        value={userValue.passwordConfirm}
        type="password"
      />
      {/* <Link  */}

      <BtnSubmit
        isLoading={navigation.state === "submitting"}
        isSuccess={signupData ? signupData.status === "success" : false}
        text={navigation.state === "submitting" ? "Submitting..." : "Signup"}
      />
      <Link
        state={{ prevPath: ROUTES.SIGNUP }}
        className="navigate-auth-link"
        to={ROUTES.LOGIN}
      >
        Already have an account? Login here.
      </Link>
    </AuthComponent>
  );
};

export default SignUp;

export const action = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();

  const userValue = {
    email: formData.get("email")! as string,
    password: formData.get("password")! as string,
    name: formData.get("name")! as string,
    passwordConfirm: formData.get("passwordconfirm")! as string,
  };
  try {
    const userData = await signupReactRouter(userValue);
  
    return userData;
  } catch (err) {
    return err;
  }
};
