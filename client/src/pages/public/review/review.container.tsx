import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import styles from "./review.module.scss";
import { v4 as uuidv4 } from "uuid";
import { Ratings, ReviewOverall, UserReview } from "components";
import { NotFound } from "../NotFound";
import Price from "components/price/price.component";
import useReviewHook from "./review.hook";
import { getReviewReactRouter } from "service/review.service";
import { IProductReview } from "./review.interface";
// let initial = true;
const Review = () => {
  const reviews = useLoaderData() as IProductReview;
  const {
    navigate,
    currentReviews,
    ratingNumbers,
    pathname,
    paginationNumbers,
    slug,
    getReviewsBasedOnRating,
    changePage,
    ratingChosen,
    page,
  } = useReviewHook(reviews);
  if (!reviews) return <NotFound />;

  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__header}>
        <ul className={`${styles.links} flex-vt-ct`}>
          <Link to={`/${reviews.category.toLowerCase()}`}>
            {reviews.category}
          </Link>
          {/* @ts-ignore */}
          <Link to={`/${reviews.category?.toLowerCase()}/${slug}`}>
            {reviews.title}
          </Link>
          <Link
            style={{ color: "var(--color-grey)", cursor: "initial" }}
            to="#"
          >
            Tất cả đánh giá
          </Link>
        </ul>
      </div>
      <div className={styles.reviews__body}>
        <h3>
          {reviews.ratingQuantity} đánh giá {reviews.title}
        </h3>
        <div className={styles.reviews__overview}>
          <figure className={`${styles.reviews__product} `}>
            <div
              className={`${styles["reviews__product-details-box"]} flex-vt-ct`}
            >
              <img src={reviews.imgCover} alt="product" />
              <div className={styles.reviews__details}>
                <p>{reviews.title}</p>
                <Price price={reviews.price} />
              </div>
            </div>
          </figure>

          <div className={`${styles.reviews__ratings} flex-vt-ct`}>
            <div
              className={`${styles["reviews__ratings-overall"]} flex-both-ct`}
            >
              <p className={styles.reviews__average}>{reviews.ratingAverage}</p>
              <ReviewOverall
                ratingAverage={reviews.ratingAverage}
                ratingQuantity={reviews.ratingQuantity}
              />
            </div>
            <Ratings
              className={styles["reviews__ratings-stars"]}
              reviews={reviews.reviews}
              ratingQuantity={reviews.ratingQuantity}
            />
          </div>
          <div></div>
        </div>
        <div className={styles.reviews__reviews}>
          <div className={`${styles.reviews__filter} flex-vt-ct`}>
            <p className="text-bold">Lọc theo: </p>
            <ul className={`${styles["reviews__filter--list"]} flex-vt-ct`}>
              <li
                className={`${styles["reviews__filter--item"]} ${
                  !ratingChosen && styles.active
                }`}
              >
                <button
                  // data-rating-number={ratingNumber}
                  onClick={() => navigate(pathname)}
                  className={styles["reviews__filter--btn"]}
                >
                  Tất cả
                </button>
              </li>
              {ratingNumbers.map((ratingNumber) => (
                <li
                  key={ratingNumber}
                  className={`${styles["reviews__filter--item"]}  ${
                    // rating query exist and equals rating number
                    ratingChosen && +ratingChosen === ratingNumber
                      ? styles.active
                      : ""
                  }`}
                >
                  <button
                    data-rating-number={ratingNumber}
                    onClick={getReviewsBasedOnRating}
                    className={styles["reviews__filter--btn"]}
                  >
                    {ratingNumber} sao
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <ul className={styles["reviews__reviews-list"]}>
            {currentReviews.map((review) => (
              <UserReview key={review._id} review={review} />
            ))}
          </ul>
          <ul className={`${styles["reviews__pagination-list"]} flex-vt-ct`}>
            {paginationNumbers >= 2
              ? Array.from({ length: paginationNumbers }, (_, i) => {
                  //   if(i+1===5) return <li> <button
                  //   className={`${styles["reviews__pagination-btn"]} }`}
                  // >
                  //   5
                  // </button></li>

                  return (
                    <li
                      key={uuidv4()}
                      className={styles["reviews__pagination-item"]}
                    >
                      <button
                        onClick={changePage}
                        data-page={i + 1}
                        className={`${styles["reviews__pagination-btn"]} ${
                          !page && i + 1 === 1 && styles.active
                        } ${page && +page === i + 1 ? styles.active : ""}`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Review;

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const productReviews = url.pathname.split("/")[1];
  try {
    const { data: reviews } = (await getReviewReactRouter(
      productReviews as "laptops" | "phones",
      params.slug!
    )) as { data: IProductReview };
    return reviews;
  } catch (error) {
    return error;
  }
};
