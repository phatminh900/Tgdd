import React from "react";
import styles from "./cart-nothing.module.scss";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const CartNothing = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.cart__nothing}>
      <div className={styles["cart__nothing--details"]}>
        <MdRemoveShoppingCart />
        <p>Không có sản phẩm nào trong giỏ hàng</p>

        <button className="btn--border-blue" onClick={() => navigate("/")}>
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default CartNothing;
