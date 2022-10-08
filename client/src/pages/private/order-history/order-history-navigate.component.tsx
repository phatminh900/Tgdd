import React from "react";
import styles from "./order-history-navigate.module.scss";
import { GiNotebook } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "app-constants/navigation.constant";
const OrderHistoryNavigate = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <div
        className={`${styles["order-history__navigation"]} ${
          (pathname === ROUTES.ORDER_HISTORY ||
            (pathname.includes(`${ROUTES.ORDER_HISTORY}/`) &&
              !pathname.includes(ROUTES.PERSONAL_INFORMATION))) &&
          styles.active
        }`}
      >
        <Link to={ROUTES.ORDER_HISTORY}>
          <GiNotebook /> Danh sách đơn hàng đã mua
        </Link>
      </div>
      <div
        className={`${styles["order-history__navigation"]} ${
          pathname.includes(ROUTES.PERSONAL_INFORMATION) && styles.active
        }`}
      >
        <Link to={ROUTES.PERSONAL_INFORMATION}>
          <GiNotebook /> Thông tin cá nhân
        </Link>
      </div>
    </div>
  );
};

export default OrderHistoryNavigate;
