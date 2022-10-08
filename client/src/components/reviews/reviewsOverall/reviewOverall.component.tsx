import React from "react";

import { ImStarFull } from "react-icons/im";

import styles from "./reviewOverall.module.scss";
interface ReviewProps {
  ratingAverage: number;
  ratingQuantity: number;
  className?: string;
}
const ReviewsOverall = ({ ratingAverage, className }: ReviewProps) => {
  const stars = Array.from({ length: 5 });
  return (
    <div className={`${styles.reviews} ${className} flex-vt-ct`}>
      {stars.map((star, i) => (
        <div
          key={ratingAverage + i}
          className={`${styles.star} ${
            ratingAverage > i ? styles.active : ""
          } `}
        >
          <ImStarFull />
        </div>
      ))}
    </div>
  );
};

export default ReviewsOverall;
