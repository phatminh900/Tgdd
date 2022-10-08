import React from "react";
import { IReviewDocument } from "pages/public/review/review.interface";
import { AiFillStar } from "react-icons/ai";

import { v4 as uuidv4 } from "uuid";
import styles from "./ratings.module.scss";
const Rating = ({
  reviews,
  ratingQuantity,
  className,
}: {
  reviews: IReviewDocument[];
  ratingQuantity: number;
  className?: string;
}) => {
  const ratings = Array.from({ length: 5 }, (_, i) => ({
    id: uuidv4(),
    number: 5 - i,
    ratingsNumberQuantity: reviews?.filter((review) => review.rating === 5 - i)
      .length,
  }));
  return (
    <ul className={`${styles.ratings} ${className}`}>
      {ratings.map((rating) => {
        const ratingPercentage =
          (rating.ratingsNumberQuantity! / ratingQuantity) * 100;
        return (
          <li key={rating.id} className={` flex-vt-ct gap-6px`}>
            <span>{rating.number}</span>
            <span>
              <AiFillStar />
            </span>
            <p className={styles.ratings__progress}>
              <span
                className={styles["ratings__progress--fill"]}
                style={{
                  width: `${ratingPercentage}%`,
                }}
              ></span>
            </p>
            <p className={styles.ratings__percentage}>
              {String(ratingPercentage).includes(".")
                ? ratingPercentage.toFixed(1)
                : ratingPercentage}
              %
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default Rating;
