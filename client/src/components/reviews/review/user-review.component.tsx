import React from "react";
import { v4 as uuidv4 } from "uuid";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IReviewDocument } from "pages/public/review/review.interface";
import styles from "./user-review.module.scss";
const UserReview = ({ review }: { review: IReviewDocument }) => {
  return (
    <div key={review._id} className={`${styles["user-review"]} flex gap-6px`}>
      <p className={styles["user-review__name"]}>
        {review?.user?.name || "phat"}
      </p>
      <figure className={styles["user-review__rating"]}>
        <ul className={`${styles["user-review__rating"]} flex-vt-ct`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={uuidv4()}>
              {i + 1 <= review.rating ? <AiFillStar /> : <AiOutlineStar />}
            </li>
          ))}
        </ul>
        {review.photo && (
          <img
            className={styles["user-review__img"]}
            src={review.photo}
            alt="user review "
          />
        )}
        <p className={styles["user-review__text"]}>{review.review}</p>
      </figure>
    </div>
  );
};

export default UserReview;
