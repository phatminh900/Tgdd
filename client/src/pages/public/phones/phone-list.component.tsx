import styles from "./phone-list.module.scss";
import PhoneItem from "./phone-item.component";
import { IPhoneDocument } from "interfaces/allProductsType.interface";
import ProductList from "components/product/product-list/product-list.component";

interface PhonesProps {
  phones: IPhoneDocument[];
}
const Phones = ({ phones }: PhonesProps) => {
  return (
    <ProductList className={styles.list}>
      {phones.map((phone) => (
        <PhoneItem key={phone._id} phone={phone} />
      ))}
    </ProductList>
  );
};

export default Phones;
