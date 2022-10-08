import Price from "components/price/price.component";
import React from "react";
import useCartListHook from "./cart-list.hook";
import styles from "./cart-temporary-summary.module.scss";
const CartTemporarySummary = () => {
  const cart = useCartListHook();
  const totalProducts = cart.reduce(
    (totalProduct, pro) => totalProduct + pro.quantity,
    0
  );
  const totalPrice = cart.reduce(
    (totalProduct, pro) => totalProduct + pro.price * pro.quantity,
    0
  );
  return (
    <div className={`${styles["cart__summary"]} flex-vt-ct`}>
      <p>Tạm tính ({totalProducts}) sản phẩm:</p>
      <Price price={totalPrice} />
    </div>
  );
};

export default CartTemporarySummary;
