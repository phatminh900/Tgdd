import React from "react";
import styles from "./product-promotions.module.scss";
import { type ProductProps } from "./product.hook";
import { v4 as uuidv4 } from "uuid";

const ProductPromotions = ({ currentProduct }: ProductProps) => {
  return (
    <ul className={styles.promotions}>
      <div className={styles["promotions__header"]}>
        <h4>Khuyến mãi</h4>
        <p>Giá và khuyến mãi dự kiến áp dụng đến 23:59 | 28/10</p>
      </div>
      {currentProduct?.promotion.map((pro, i) => (
        <li className="flex-vt-ct" key={uuidv4()}>
          <span className={`${styles["promotions__order"]} flex-both-ct`}>
            {i + 1}
          </span>
          <span>{pro}</span>
        </li>
      ))}
    </ul>
  );
};

export default ProductPromotions;
