import React from "react";
import formatCurrency from "utils/formatCurrency";
import styles from "./price.module.scss";
const Price = ({ price }: { price: number }) => {
  return <p className={styles.price}> {formatCurrency(price)} ₫</p>;
};

export default Price;
