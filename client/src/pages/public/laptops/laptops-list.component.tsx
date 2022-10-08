import styles from "./laptop-list.module.scss";
import LaptopItem from "./laptop-item.component";
import { ILaptopDocument } from "interfaces/allProductsType.interface";
import ProductList from "components/product/product-list/product-list.component";

interface LaptopListProps {
  laptops: ILaptopDocument[];
}
const LaptopList = ({ laptops }: LaptopListProps) => {
  return (
    <ProductList className={styles.list}>
      {laptops.map((laptop) => (
        <LaptopItem key={laptop._id} laptop={laptop} />
      ))}
    </ProductList>
  );
};

export default LaptopList;
