import { Link } from "react-router-dom";

import styles from "./product-item.module.scss";

interface ProductItemProps {
  slug: string;
  imgCover: string;
  title: string;
  category: string;
  children: JSX.Element;
}

const ProductItem = ({
  category,
  slug,
  imgCover,
  title,
  children,
}: ProductItemProps) => {
  return (
    <li className={styles.item}>
      <figure className={`${styles.product} flex gap-8px`}>
        <Link className={styles.link} to={`/${category}/${slug}`}>
          <img className={styles.img} src={`${imgCover}`} alt="Iphone " />
          <figcaption className={styles.title}>{title}</figcaption>
        </Link>
        {children}
      </figure>
    </li>
  );
};

export default ProductItem;
