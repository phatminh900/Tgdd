import React from "react";
import styles from "./order-detail-specific.module.scss";
import Price from "components/price/price.component";
import {
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getUserBooking } from "service/booking.service";
import { IUserBooking } from "./order-history.interface";
import { useAuth } from "context/auth.context";
import { ROUTES } from "app-constants/navigation.constant";

const OrderDetailSpecific = () => {
  const booking = useLoaderData() as IUserBooking;
  const navigate = useNavigate();
  const user = useAuth()?.user;
  const params = useParams();
  if (!user) {
    navigate(ROUTES.LOGIN);
    return null;
  }
  return (
    <div className={styles["order-history__specific"]}>
      <h3 className={styles["order-history__order-name"]}>
        Chi tiết đơn hàng #{params.id}
      </h3>
      <ul className={styles["order-history__product-list"]}>
        {booking.products.map((product) => (
          <li
            key={product.slug + product.currentColor}
            className={`${styles["order-history__product-item"]} `}
          >
            <Link
              to={`/${product.category}/${product.slug}`}
              className="flex gap-8px"
            >
              <div className="flex gap-10px">
                <img src={product.imgCover} alt="Product img" />
                <div
                  className={`${styles["order-history__product-details"]} flex-column flex-space-between`}
                >
                  <p className={styles["order-history__product-title"]}>
                    {product.title}
                  </p>
                  <div className="flex-space-between gap-12px">
                    <p>Màu : {product.currentColor}</p>
                    <p>Số lượng : {product.quantity}</p>
                  </div>
                </div>
              </div>
              <Price price={product.price * product.quantity} />
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles["order-history__summary"]}>
        <div className="flex-column">
          Tổng tiền :<Price price={booking.total} />
        </div>
      </div>
      <div className={styles["order-history__user-info"]}>
        <div>
          <p className="text-bold">Địa chỉ và thông tin người nhận hàng:</p>
          <ul>
            <li>
              {user.name} - {user.email}{" "}
            </li>
            <li>Địa chỉ nhận hàng: {booking.userAddress}</li>
            <li>
              Thời gian đặt hàng:{" "}
              {new Date("2022-10-07T02:48:37.852Z").toLocaleString("vi-vn")}
            </li>
          </ul>
        </div>
      </div>
      <div className={`${styles["order-history__navigate-back"]} flex-both-ct`}>
        <button
          onClick={() => navigate(ROUTES.ORDER_HISTORY)}
          className="btn--blue"
        >
          Quay trờ lại danh sách đơn hàng
        </button>
      </div>
    </div>
  );
};

export default OrderDetailSpecific;
export const loader = async ({ params }: LoaderFunctionArgs) => {
  return getUserBooking(params.id as string);
};
