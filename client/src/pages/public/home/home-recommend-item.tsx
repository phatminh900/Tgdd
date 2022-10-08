import Price from "components/price/price.component";
import React from "react";
import styles from "./home-recommend-item.module.scss";
import { AiFillStar } from "react-icons/ai";
import { ProductItem } from "components";

interface HomeRecommendItemProps {
  title: string;
  price: number;
  ratingAverage: number;
  ratingQuantity: number;
  imgCover: string;
  category: string;
  slug: string;
  recommend: boolean;
  _id: string;
}
const HomeRecommendItem = ({
  title,
  price,
  ratingAverage,
  ratingQuantity,
  imgCover,
  category,
  slug,
}: HomeRecommendItemProps) => {
  return (
    <ProductItem
      category={category}
      slug={slug}
      imgCover={imgCover}
      title={title}
    >
      <>
        <Price price={price} />
        <div className={`${styles["rating-overview"]} gap-6px flex-vt-ct`}>
          <p className="flex-vt-ct">
            {ratingAverage} <AiFillStar />
          </p>
          <p>({ratingQuantity})</p>
        </div>
      </>
    </ProductItem>
  );
};

export default HomeRecommendItem;
