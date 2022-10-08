import React from "react";
import styles from "./btn-buy.module.scss";
const BtnBuy = ({ text, onClick }: { text: string; onClick?: () => void }) => {
  return (
    <button onClick={onClick} className={styles["btn-buy"]}>
      {text}
    </button>
  );
};

export default BtnBuy;
