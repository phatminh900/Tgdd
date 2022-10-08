import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import CartList from "./cart-list.component";
import styles from "./cart.module.scss";
import CartSummary from "./cart-summary.component";
import CartUserInfo from "./cart-user-info.component";

import CartNothing from "./cart-nothing.component";
import CartPromotion from "./cart-discount.component";
import CartTemporarySummary from "./cart-temporary-summary.component";
import useCartHook from "./cart.hook";
import { useAuth } from "context/auth.context";
import { ROUTES } from "app-constants/navigation.constant";

const Cart = () => {
  const user = useAuth()?.user;
  const { cart, checkout } = useCartHook();
  const content = (
    <>
      <div className={`${styles.cart__header} flex-vt-ct`}>
        <Link to="/">
          <AiOutlineLeft /> Xem thêm sản phẩm khác
        </Link>
        <p>Your cart</p>
      </div>
      <div className={styles.cart__body}>
        <CartList />
        <CartTemporarySummary />
        {user ? (
          <>
            <CartUserInfo />
            <CartPromotion />
            <CartSummary checkout={checkout} />
          </>
        ) : (
          <div className={styles["cart__user-login"]}>
            <p>Please login first to purchase.</p>
            <Link to={ROUTES.LOGIN}>Login Here</Link>
          </div>
        )}
      </div>
    </>
  );
  return (
    <div className={styles.cart}>{cart.length ? content : <CartNothing />}</div>
  );
};

export default Cart;
