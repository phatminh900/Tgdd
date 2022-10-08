import React from "react";
import Slider from "components/slider/slider.component";
import { GiAlliedStar, GiNotebook } from "react-icons/gi";
import { FiBox } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import styles from "./product-overview.module.scss";
import { ProductConfigurationProps } from "./product-configuration.component";
import { useLocation } from "react-router-dom";
import { type ILinks } from "./product.container";
import { IProductHighlightsImgState } from "./product.interface";
interface ProductOverviewProps
  extends Omit<ProductConfigurationProps, "onToggleModal">,
    IProductHighlightsImgState {
  slideImgs: string[];
  isOpenModal: boolean;
  linksColor: { id: string; hash: string; title: string }[];
  links: ILinks[];
  onOpenProductCarousel: (e: React.MouseEvent) => void;
}
const ProductOverview = ({
  isOpenModal,
  currentProduct,
  tab,
  linksColor,
  links,
  onOpenProductCarousel,
  onSetCurrentHighlightsImgNumber,
  slideImgs,
  currentHighlightsImgNumber,
}: ProductOverviewProps) => {
  const productCarouselListTab = [
    {
      id: uuidv4(),
      icon: <GiAlliedStar />,
      title: "Điểm nổi bật",
    },
    // colors
    ...linksColor.map((linkColor, i) => ({
      id: uuidv4(),
      icon: (
        <img src={currentProduct?.imgColorsCover[i]} alt="Product color " />
      ),
      title: linkColor.title,
    })),
    {
      id: uuidv4(),
      icon: <FiBox />,
      title: "Thông số kĩ thuật",
    },
    {
      id: uuidv4(),
      icon: <GiNotebook />,
      title: "Thông tin sản phẩm",
    },
  ];
  const { hash } = useLocation();
  return (
    <div className={styles["product-overview"]}>
      <Slider
        onSetCurrentSlideNumber={onSetCurrentHighlightsImgNumber}
        currentSlideNumber={currentHighlightsImgNumber}
        isOpenModal={isOpenModal}
        onToggleModal={(ev) =>
          onOpenProductCarousel.call(tab, ev as React.MouseEvent)
        }
        usingDots={false}
        className={styles["product-overview__slider"]}
        slides={slideImgs}
        maxSlideLength={slideImgs.length}
      />

      <ul
        className={`${styles["product-overview__carousel-list"]} flex gap-12px`}
      >
        {productCarouselListTab.map((el, i) => (
          <li key={el.id}>
            <button onClick={onOpenProductCarousel.bind(links[i].hash)}>
              <p
                className={`${styles["product-overview__tab-img"]} ${
                  links[i].hash === hash.replace("#", "") ||
                  (hash === "" && i === 0)
                    ? styles.active
                    : ""
                } flex-both-ct `}
              >
                {el.icon}
              </p>
              <p className={styles["product-overview__tab-title"]}>
                {el.title}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(ProductOverview);
