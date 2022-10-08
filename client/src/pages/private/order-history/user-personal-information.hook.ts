import { useEffect } from "react";
import { useAuth } from "context/auth.context";
import {
  ResponseStatusData,
  ResponseStatusMessage,
} from "interfaces/response.interface";
import { IUserAccount } from "./order-history.interface";

const useUserPersonalInformation = (
  userPersonalInfoValue:
    | ResponseStatusData<IUserAccount>
    | ResponseStatusMessage
    | undefined
) => {
  const auth = useAuth();
  let error = null;

  if (userPersonalInfoValue && "message" in userPersonalInfoValue)
    error = userPersonalInfoValue.message;
  useEffect(() => {
    if (userPersonalInfoValue && "data" in userPersonalInfoValue)
      auth?.setUserHandler(userPersonalInfoValue.data);
  }, [userPersonalInfoValue, auth]);
  return { error };
};

export default useUserPersonalInformation;
