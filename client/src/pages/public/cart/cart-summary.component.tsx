import BtnBuy from "components/btn/btn-buy/btn-buy.component";
import Price from "components/price/price.component";
import React from "react";
import useCartStateHook from "store/cart/cart-slice.hook";
import useCartSummaryHook from "./cart-summary.hook";
import styles from "./cart-summary.module.scss";

interface CartSummaryProps {
  checkout: () => Promise<
    | {
        payload: any;
        type: string;
      }
    | undefined
  >;
}
const CartSummary = ({ checkout }: CartSummaryProps) => {
  const cartState = useCartStateHook();
  const { totalPrice } = useCartSummaryHook();

  return (
    <div className={styles.summary}>
      <div className={`${styles.total} flex-vt-ct`}>
        <p className="text-bold">Tổng tiền </p>
        <Price price={cartState.priceAfterApplyingDiscount || totalPrice} />
      </div>
      <BtnBuy text="Mua ngay" onClick={checkout} />
    </div>
  );
};

export default CartSummary;
