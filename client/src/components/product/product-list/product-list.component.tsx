import { ReactNode } from "react";
import styles from "./product-list.module.scss";
interface ProductListProps {
  children: ReactNode | JSX.Element;
  className?: string;
}
const ProductList = ({ children, className }: ProductListProps) => {
  return <ul className={`${styles.list} ${className}`}>{children}</ul>;
};

export default ProductList;
