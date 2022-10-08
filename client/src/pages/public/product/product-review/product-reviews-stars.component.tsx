import React from "react";
import { v4 as uuidv4 } from "uuid";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "./product-review.module.scss";
import { ProductReviewRatingProps } from "./product-review-rating.components";
interface PhoneReviewsStarsProps
  extends Omit<
    ProductReviewRatingProps,
    "setIsOpenModal" | "currentProduct" | "onSubmitReview"
  > {
  onSetUserRating?: (rating: number) => void;
}

const ProductReviewStars = ({
  isOpenModal,
  onToggleModal,
  onSetUserRating,
  onPreChooseRating,
  userPreChooseRating,
}: PhoneReviewsStarsProps) => {
  return (
    <ul className={`${styles["product-reviews__stars"]} flex-both-ct`}>
      {Array.from({ length: 5 }, (_, i) => (
        <li key={uuidv4()}>
          <button
            type="button"
            data-rating-number={i + 1}
            onClick={(e) => {
              !isOpenModal && onToggleModal();
              //already open modal
              isOpenModal &&
                onSetUserRating &&
                onSetUserRating(
                  +(e.target as HTMLElement).closest("button")?.dataset
                    .ratingNumber!
                );
            }}
            onMouseLeave={() => {
              onPreChooseRating && onPreChooseRating(0);
              !isOpenModal && onSetUserRating && onSetUserRating(0);
            }}
            onMouseEnter={(e) => {
              onPreChooseRating &&
                onPreChooseRating(
                  +(e.target as HTMLElement).closest("button")?.dataset
                    .ratingNumber!
                );

              onSetUserRating &&
                onSetUserRating(
                  +(e.target as HTMLElement).closest("button")?.dataset
                    .ratingNumber!
                );
            }}
          >
            {i + 1 <= userPreChooseRating ? <AiFillStar /> : <AiOutlineStar />}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProductReviewStars;
