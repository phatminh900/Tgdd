import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IReviewDocument, IProductReview } from "./review.interface";
const useReviewHook = (reviews: IProductReview) => {
  const [currentReviews, setCurrentReviews] = useState<IReviewDocument[]>([]);

  const { slug } = useParams();
  const { search, pathname } = useLocation();
  // get review for different Product based on url

  const query = new URLSearchParams(search);
  const page = query.get("p");
  const navigate = useNavigate();
  const ratingChosen = query.get("r");
  // original reviews
  const paginationNumbers = reviews.reviews.length / 5 || 1;

  const ratingNumbers = [5, 4, 3, 2, 1];

  const getReviewsBasedOnRating = (e: React.MouseEvent) => {
    navigate(
      `?${page ? `p=${page}` : ""}&r=${+(e.target as HTMLButtonElement).dataset
        .ratingNumber!}`
    );
  };
  const changePage = (e: React.MouseEvent) => {
    navigate(
      `?p=${(e.target as HTMLButtonElement).dataset.page}${
        ratingChosen ? `&r=${ratingChosen}` : ""
      }`
    );
  };

  // changing page could do request on server but i do it on client
  useEffect(() => {
    const limit = 5;
    const skip = page ? (+page - 1) * limit : 0;
    if (page) setCurrentReviews(reviews.reviews.slice(skip, skip + limit));
  }, [page, reviews]);

  useEffect(() => {
    if (!ratingChosen) setCurrentReviews(reviews.reviews);
    if (ratingChosen)
      setCurrentReviews(
        reviews.reviews.filter((review) => review.rating === +ratingChosen)
      );
  }, [ratingChosen, reviews]);
  return {
    reviews,
    currentReviews,
    ratingNumbers,
    getReviewsBasedOnRating,
    changePage,
    paginationNumbers,

    navigate,
    slug,
    pathname,
    ratingChosen,
    page,
  };
};

export default useReviewHook;
