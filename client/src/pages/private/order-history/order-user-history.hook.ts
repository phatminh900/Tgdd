import { ResponseStatusMessage } from "interfaces/response.interface";

import { IUserBooking } from "./order-history.interface";
const useOrderUserHistoryHook = (
  orderHistoryValue: ResponseStatusMessage | IUserBooking[]
) => {
  let error = null;
  if ("message" in orderHistoryValue) error = orderHistoryValue;

  return { error };
};

export default useOrderUserHistoryHook;
