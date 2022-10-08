import React from "react";
import Price from "components/price/price.component";
import styles from "./order-user-history.module.scss";
import { useAuth } from "context/auth.context";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { getUserBookings } from "service/booking.service";
import useOrderUserHistoryHook from "./order-user-history.hook";
import { MdRemoveShoppingCart } from "react-icons/md";

import { IUserBooking } from "./order-history.interface";
const OrderUserHistory = () => {
  const user = useAuth()?.user;
  const navigate = useNavigate();
  const bookings = useLoaderData() as IUserBooking[];
  const { error } = useOrderUserHistoryHook(bookings);
  if (!user || error) return null;
  if (!bookings.length || !bookings)
    return (
      <div
        className={`${styles["order-history__nothing"]} gap-12px flex-both-ct`}
      >
        <MdRemoveShoppingCart />
        <p>Không có sản phẩm nào trong giỏ hàng</p>

        <button className="btn--border-blue" onClick={() => navigate("/")}>
          Về trang chủ
        </button>
      </div>
    );
  return (
    <>
      <h3>Tất cả đơn hàng đã mua</h3>
      <div className={styles["order-history__category"]}>
        <div>Đơn hàng</div>
        <div>Sản Phẩm</div>
        <div>Giá</div>
        <div>Ngày mua</div>
      </div>
      <ul className={styles["order-history__list"]}>
        {bookings.map((booking, i) => (
          <li key={booking._id} className={styles["order-history__item"]}>
            <div className="flex-vt-ct ">#{i + 1}</div>
            <div
              className={`${styles["order-history__product-details"]} flex gap-8px`}
            >
              <img src={booking.products[0].imgCover} alt="Product " />
              <div className={`${styles["order-history__products-name"]} flex`}>
                <Link to={booking._id} className="flex">
                  {booking.products[0].title + " "}

                  {booking.products.length > 1 && (
                    <>
                      và
                      <span>
                        &nbsp; {booking.products.length - 1} sản phẩm khác
                      </span>
                    </>
                  )}
                </Link>
                <Link
                  className={styles["order-history__link"]}
                  to={booking._id}
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
            <div className={styles["order-history__order-price"]}>
              <Price price={booking.total} />
            </div>
            <div className={styles["order-history__order-date"]}>
              <p>{new Date(booking.createdAt).toLocaleDateString("vi-vn")}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default OrderUserHistory;

export const loader = async () => {
  try {
    // No jwt no login

    return await getUserBookings();
  } catch (error) {
    return error;
  }
};
