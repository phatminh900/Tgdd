import styles from "./products-header.module.scss";

import Slider from "components/slider/slider.component";
interface ProductHeaderProps {
  links: {
    id: number;
    path: string;
    slide: string | string[];
  }[];
}
const ProductHeader = ({ links }: ProductHeaderProps) => {
  return (
    <div className={styles.header}>
      <Slider
        links={links}
        isLink={true}
        usingDots={true}
        autoScroll={true}
        className={styles.slider}
        maxSlideLength={links.length}
      />
    </div>
  );
};

export default ProductHeader;
