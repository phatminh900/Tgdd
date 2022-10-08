import React from "react";
import styles from "./laptop-item.module.scss";
import { ButtonStorage, ProductItem, ReviewOverall } from "components";
import Price from "components/price/price.component";
import { ILaptopDocument } from "interfaces/allProductsType.interface";
import useProductItemHook from "hooks/useProductItem.hook";

interface LaptopItemProps {
  laptop: ILaptopDocument;
}

const LaptopItem = ({ laptop }: LaptopItemProps) => {
  // const [currentProductUrl, setcurrentProductUrl] = useState(currentProduct.slug);
  const { currentProduct, changeCurrentStorage } = useProductItemHook(
    laptop,
    "laptop"
  );
  const currentLaptop = currentProduct as ILaptopDocument;
  return (
    <ProductItem
      category={laptop.category}
      slug={laptop.slug}
      title={laptop.title}
      imgCover={laptop.imgCover}
    >
      <div className={`${styles.laptop} flex gap-8px`}>
        <div className={`${styles.storage} gap-4px flex`}>
          {currentLaptop.storage.map((st, i) => (
            <ButtonStorage
              key={st}
              currentProduct={currentProduct}
              changeCurrentStorage={changeCurrentStorage}
              url={currentProduct.otherVersions[i]}
              value={st}
              className={`${
                currentProduct.configuration.internalMemory === +st
                  ? styles.active
                  : ""
              }`}
            />
          ))}
        </div>
        <Price price={currentProduct.price} />
        <div className="flex-vt-ct">
          <ReviewOverall
            ratingAverage={currentProduct.ratingAverage}
            ratingQuantity={currentProduct.ratingQuantity}
            className={styles.reviews}
          />
          <span className={styles.quantity}>
            {currentProduct.ratingQuantity}
          </span>
        </div>

        <ul className={styles["configuration-list"]}>
          <li>
            Màn hình {currentLaptop.configuration.screen.inch}"",
            {currentLaptop.configuration.screen.technology}
          </li>
          <li>
            CPU {currentLaptop.configuration.cpu.type}{" "}
            {currentLaptop.configuration.cpu.version}
          </li>
          <li>CPU {currentLaptop.configuration.cardScreen.type}</li>
          <li>
            Pin {currentLaptop.configuration.battery.capacity} mAh,Sạc
            {currentLaptop.configuration.battery.charge}W
          </li>
        </ul>
      </div>
    </ProductItem>
  );
};

export default LaptopItem;
