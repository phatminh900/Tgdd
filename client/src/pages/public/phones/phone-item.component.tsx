import React from "react";
import styles from "./phone-item.module.scss";

import { ButtonStorage, ProductItem, ReviewOverall } from "components";
import Price from "components/price/price.component";
import useProductItemHook from "hooks/useProductItem.hook";
import { IPhoneDocument } from "interfaces/allProductsType.interface";

interface PhoneItemProps {
  phone: IPhoneDocument;
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const { currentProduct, changeCurrentStorage } = useProductItemHook(
    phone,
    "phone"
  );
  const currentPhone = currentProduct as IPhoneDocument;
  return (
    <ProductItem
      category={currentProduct.category}
      slug={currentProduct.slug}
      title={currentProduct.title}
      imgCover={currentProduct.imgCover}
    >
      <div className={styles.phone}>
        <div className={`${styles["monitor"]} flex`}>
          <div className={styles.inch}>
            {currentPhone.configuration.monitor.broadScreen}"
          </div>
          <div className="styles technology">
            {currentPhone.configuration.monitor.technology}
          </div>
        </div>

        <div className={`${styles.storage} flex`}>
          {currentPhone.storage.map((st, i) => (
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
        <Price price={currentPhone.price} />
        <div className="flex-vt-ct">
          <ReviewOverall
            ratingAverage={currentPhone.ratingAverage}
            ratingQuantity={currentPhone.ratingQuantity}
            className={styles.reviews}
          />
          <span className={styles["quantity"]}>
            {currentPhone.ratingQuantity}
          </span>
        </div>

        <ul className={styles["configuration-list"]}>
          <li>
            Chip {currentPhone.configuration.chip.type}
            {currentPhone.configuration.chip.number}
            {currentPhone.configuration.chip.technology}
          </li>
          <li>
            Ram {currentPhone.configuration.ram}GB, ROM{" "}
            {currentPhone.configuration.internalMemory}
            GB,
          </li>
          <li>
            Camera sau: {currentPhone.configuration.rearCam.quantity} camera{" "}
            {currentPhone.configuration.rearCam.quality}MP
          </li>
          <li>Camera trước: {currentPhone.configuration.frontCam.quality}MP</li>
          <li>
            Pin {currentPhone.configuration.battery.capacity} mAh,Sạc{" "}
            {currentPhone.configuration.battery.charge}W
          </li>
        </ul>
      </div>
    </ProductItem>
  );
};

export default PhoneItem;
