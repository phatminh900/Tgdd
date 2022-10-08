import React from "react";
import styles from "./quantity-box.module.scss";

const QuantityBox = ({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (prev: React.SetStateAction<number>) => void;
}) => {
  return (
    <div className={`${styles["quantity-box"]} flex-vt-ct`}>
      <button
        onClick={() => {
          if (quantity === 1) return;
          setQuantity((prev) => --prev);
        }}
        style={{
          color: quantity === 1 ? "#777" : "var(--color-tertiary)",
        }}
        className={`${styles["quantity-box__btn-quantity"]} ${styles["quantity-box__btn-quantity--decrease"]}`}
      >
        &ndash;
      </button>
      <div className={styles["quantity-box__quantity"]}>{quantity}</div>
      <button
        onClick={() => setQuantity((prev) => ++prev)}
        className={`${styles["quantity-box__btn-quantity"]} ${styles["quantity-box__btn-quantity--increase"]}`}
      >
        +
      </button>
    </div>
  );
};

export default QuantityBox;
