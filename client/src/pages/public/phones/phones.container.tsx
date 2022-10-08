import styles from "./phones.module.scss";
import PhoneList from "./phone-list.component";
import usePhonesHook from "./phones.hooks";
import DocumentTitle from "react-document-title";
import { ProductHeader } from "components";
import ProductsFilter from "components/product/product-filter/product-filter.component";
import { Resources } from "service/product.service";
import { IPhoneDocument } from "interfaces/allProductsType.interface";
import { useLoaderData } from "react-router-dom";
const Phones = () => {
  const phones = useLoaderData() as IPhoneDocument[];
  const { headerLinks, filterList, resource } = usePhonesHook();
  return (
    <DocumentTitle title="Phones-TGDD">
      <section className={styles.phones}>
        <ProductHeader links={headerLinks} />
        <ProductsFilter
          resource={resource as Resources}
          filterList={filterList}
        />

        <PhoneList phones={phones} />
      </section>
    </DocumentTitle>
  );
};

export default Phones;
