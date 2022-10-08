import React from "react";
import styles from "./product-review.module.scss";

import ProductReviewStars from "./product-reviews-stars.component";

import { ProductReviewRatingProps } from "./product-review-rating.components";
interface ProductNoReviewProps
  extends Omit<ProductReviewRatingProps, "setIsOpenModal" | "currentProduct"> {}
const ProductNoReview = ({
  onToggleModal,
  isOpenModal,
  userPreChooseRating,
  onPreChooseRating,
}: ProductNoReviewProps) => {
  return (
    <>
      <p className={styles["product-reviews__notification"]}>
        Hãy đánh giá sản phẩm để giúp những khách hàng khác chọn được sản phẩm
        tốt nhất!
      </p>
      <div className={`${styles["product-reviews__action"]} flex-vt-ct`}>
        <p> Bạn cảm thấy sản phẩm này như thế nào? (chọn sao nhé)</p>
        <ProductReviewStars
          isOpenModal={isOpenModal}
          onToggleModal={onToggleModal}
          userPreChooseRating={userPreChooseRating}
          onPreChooseRating={onPreChooseRating}
        />
      </div>
    </>
  );
};

export default ProductNoReview;
