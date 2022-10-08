import React from "react";
import { loader as orderUserHistoryLoader } from "./order-user-history.component.";
import { loader as orderDetailSpecificLoader } from "./order-detail-specific.component";
import { action as userPersonalInfoAction } from "./user-personal-information.component";
import OrderUserHistory from "./order-user-history.component.";
import OrderDetailSpecific from "./order-detail-specific.component";
import UserPersonalInformation from "./user-personal-information.component";
const OrderHistory = React.lazy(() => import("./order-history.container"));
export {
  OrderHistory,
  orderUserHistoryLoader,
  userPersonalInfoAction,
  OrderUserHistory,
  orderDetailSpecificLoader,
  OrderDetailSpecific,
  UserPersonalInformation,
};
