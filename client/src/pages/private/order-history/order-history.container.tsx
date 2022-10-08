import React, { useEffect } from "react";
import { ROUTES } from "app-constants/navigation.constant";
import { useAuth } from "context/auth.context";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import OrderHistoryNavigate from "./order-history-navigate.component";

import styles from "./order-history.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import Cookies from "js-cookie";
import { JWTKEY } from "app-constants/browser.constatnt";
const OrderHistory = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = useAuth();
  const user = auth?.user;

  useEffect(() => {
    if (!user || !Cookies.get(JWTKEY))
      navigate(`${ROUTES.LOGIN}`, {
        replace: true,
        state: { prevPath: pathname },
      });
  }, [navigate, user, pathname]);

  // error means can't get bookings
  if (!user) return null;
  return (
    <section className={styles["order-history"]}>
      <OrderHistoryNavigate />
      <div>
        <div
          className={`${styles["order-history__greeting"]} flex-space-between`}
        >
          <h3>
            Chào <span>{user.name}</span> -<span>{user.email}</span>
          </h3>
          <button
            onClick={() => {
              auth.removeUserHandler();
              navigate(ROUTES.HOME_PAGE);
            }}
          >
            Thoát tài khoản
          </button>
        </div>
        <div className={`${styles["order-history__greeting--small"]}`}>
          <div className="flex-vt-ct gap-12px">
            <p className={`${styles["order-history__info-title"]} text-bold `}>
              Thông tin cá nhân
            </p>
            <Link className="color-tertiary" to={ROUTES.PERSONAL_INFORMATION}>
              Chỉnh sửa{" "}
            </Link>
            <button
              className={`${styles["order-history__btn-logout"]} color-tertiary`}
              onClick={() => {
                auth.removeUserHandler();
                navigate(ROUTES.HOME_PAGE);
              }}
            >
              Đăng xuất
            </button>
          </div>
          <div>
            <p className="flex-vt-ct gap-8px">
              <IoPersonAddOutline /> {user.name}
            </p>
            <p className="flex-vt-ct gap-8px">
              <AiOutlineMail /> {user.email}
            </p>
          </div>
        </div>
        <div className={styles["order-history__list-box"]}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;
