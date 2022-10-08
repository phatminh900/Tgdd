import { AuthComponent, Input } from "components";
import BtnSubmit from "components/btn/btn-submit/btn-submit.component";
import { ResponseStatusMessage } from "interfaces/response.interface";

import {
  LoaderFunctionArgs,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { forgotPasswordReactRouter } from "service/user.service";
import useForgotPasswordHook from "./forgot-password.hook";

const ForgotPassword = () => {
  const forgotPasswordValue = useActionData() as ResponseStatusMessage;

  const { userEmail, changeUserValue, error, success } =
    useForgotPasswordHook(forgotPasswordValue);
  const navigation = useNavigation();
  return (
    <AuthComponent successMessage={success} isSuccess={true} error={error}>
      <Input
        value={userEmail.email}
        onChange={changeUserValue}
        label="Email"
        id="email"
        type="email"
      />
      <BtnSubmit
        isLoading={navigation.state === "submitting"}
        isSuccess={
          forgotPasswordValue ? forgotPasswordValue.status === "success" : false
        }
        text={
          navigation.state === "submitting"
            ? "submitting..."
            : "Send email to reset password"
        }
      />
    </AuthComponent>
  );
};

export default ForgotPassword;
export const action = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const userEmail = {
    email: formData.get("email") as string,
  };
  try {
    const data = await forgotPasswordReactRouter(userEmail);
    return data;
  } catch (error) {
    const err = error as { status: string; message: string };
    if (err.status === "fail") {
      return err;
    }
    throw err;
  }
};
