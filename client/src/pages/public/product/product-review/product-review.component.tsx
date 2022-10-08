import { useState } from "react";
import { GiAlliedStar } from "react-icons/gi";
import { v4 as uuidv4 } from "uuid";

import styles from "./product-review.module.scss";
import { Modal, Ratings, ReviewOverall, UserReview } from "components";
import { type ProductProps } from "../product.hook";
import PhoneNoReview from "./product-no-review.component";
import useModalHook from "components/ui/modal/modal.hook";
// img
import ProductReviewRating from "./product-review-rating.components";
import { ReviewDocument, sendReview } from "service/review.service";
import { useAppDispatch } from "store/hooks.store";
import { useLocation, useNavigate } from "react-router-dom";
const ProductReview = ({ currentProduct }: ProductProps) => {
  const { isOpenModal, onToggleModal, setIsOpenModal } = useModalHook();
  const dispatch = useAppDispatch();
  const [currentRating, setCurrentRating] = useState(0);

  const onPreChooseRating = (rating: number) => {
    setCurrentRating(rating);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const onSubmitReview = async (review: ReviewDocument, productId: string) => {
    const data = await dispatch(
      sendReview(
        currentProduct.category as "laptops" | "phones",
        review,
        productId
      )
    );

    setTimeout(() => {
      onToggleModal();
      // navigate(0);
    }, 1000);
  };
  if (!currentProduct) return null;
  return (
    <div id="reviews" className={styles["product-reviews"]}>
      <h3 className={styles.title}>Đánh giá {currentProduct?.title}</h3>
      {currentProduct.ratingQuantity > 0 && (
        <div className=" gap-8px flex-vt-ct">
          <p className={styles["product-reviews__ratingAvg"]}>
            {currentProduct.ratingAverage}
          </p>

          <ReviewOverall
            ratingQuantity={currentProduct.ratingQuantity}
            ratingAverage={currentProduct.ratingAverage}
          />
          <p className={styles["product-reviews__rating-text"]}>
            {currentProduct.ratingQuantity} Đánh giá
          </p>
        </div>
      )}
      <div className={`${styles["product-reviews-modal__box"]} `}>
        <Modal isOpen={isOpenModal}>
          <ProductReviewRating
            onSubmitReview={onSubmitReview}
            isOpenModal={isOpenModal}
            userPreChooseRating={currentRating}
            currentProduct={currentProduct}
            onToggleModal={onToggleModal}
            onPreChooseRating={onPreChooseRating}
            setIsOpenModal={setIsOpenModal}
          />
        </Modal>
      </div>
      {!(currentProduct.ratingQuantity > 0) && (
        <PhoneNoReview
          onSubmitReview={onSubmitReview}
          isOpenModal={isOpenModal}
          onPreChooseRating={onPreChooseRating}
          userPreChooseRating={currentRating}
          onToggleModal={onToggleModal}
        />
      )}
      {currentProduct.ratingQuantity > 0 && (
        <>
          <Ratings
            reviews={currentProduct.reviews}
            ratingQuantity={currentProduct.ratingQuantity}
          />

          {currentProduct.reviews.slice(0, 2).map((review) => (
            <UserReview key={uuidv4()} review={review} />
          ))}
          <div
            className={`${styles["product-reviews__actions"]} flex gap-12px`}
          >
            <button
              onClick={() => onToggleModal()}
              className={`flex-both-ct btn--blue`}
            >
              <GiAlliedStar />
              Viết đánh giá
            </button>
            <button
              onClick={() => {
                navigate(location.pathname + "/reviews");
              }}
              className="btn--border-blue"
            >
              Xem {currentProduct.ratingQuantity} đánh giá
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductReview;
