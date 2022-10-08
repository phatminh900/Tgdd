import styles from "./user-personal-information.module.scss";
import { ROUTES } from "app-constants/navigation.constant";
import { Input } from "components";
import { useAuth } from "context/auth.context";
import {
  Form,
  LoaderFunctionArgs,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { updateUser } from "service/user.service";
import useUserPersonalInformation from "./user-personal-information.hook";
import {
  ResponseStatusData,
  ResponseStatusMessage,
} from "interfaces/response.interface";
import { IUserAccount } from "./order-history.interface";
import BtnSubmit from "components/btn/btn-submit/btn-submit.component";

const UserPersonalInformation = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const userPersonalInfoValue = useActionData() as
    | ResponseStatusData<IUserAccount>
    | ResponseStatusMessage;
  const { error } = useUserPersonalInformation(userPersonalInfoValue);
  const { pathname } = useLocation();
  const user = useAuth()?.user;
  if (!user) {
    navigate(ROUTES.LOGIN);
    return null;
  }
  return (
    <>
      <h3>Thông tin cá nhân</h3>
      <Form
        method="patch"
        action={pathname}
        className={`${styles["user-personal-info__form"]} grid-2-cols`}
      >
        <Input value={user.name} label="Name" id="user-name" type="text" />
        <Input
          disable={true}
          value={user.email}
          label="Name"
          id="user-name"
          type="text"
        />{" "}
        {error && (
          <p
            className={`${styles["user-personal-info__error"]} text-center error`}
          >
            {error}
          </p>
        )}
        <BtnSubmit
          className={`${styles["user-personal-info__btn"]} btn--blue flex-both-ct`}
          isLoading={navigation.state === "submitting"}
          isSuccess={
            userPersonalInfoValue && userPersonalInfoValue.status === "success"
          }
          text={
            navigation.state === "submitting" ? "Submitting..." : "Cập nhật"
          }
        />
        {/* <button
          className={`${styles["user-personal-info__btn"]} btn--blue flex-both-ct`}
        >
          Cập nhật
        </button> */}
      </Form>
    </>
  );
};

export default UserPersonalInformation;
export const action = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const userName = { name: formData.get("name")! as string };
  try {
    const data = await updateUser(userName);
    return data;
  } catch (error) {
    return error;
  }
};
