import React from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import styles from "./product-configuration.module.scss";
import { isPhoneDocument } from "utils/recognizeDocument";
import { ICurrentProduct } from "./product.interface";
export interface ProductConfigurationProps extends ICurrentProduct {
  onToggleModal?: () => void;
  onOpenProductCarousel?: (e: React.MouseEvent) => void;
  tab: string;
}

const ProductConfiguration = ({
  currentProduct,
  tab,
  onOpenProductCarousel,
}: ProductConfigurationProps) => {
  const configuration = currentProduct?.configuration;
  let content = <></>;
  if (isPhoneDocument(currentProduct)) {
    const configuration = currentProduct?.configuration;

    content = (
      <div className={styles.configurations}>
        <h3 className={styles.configurations__header}>
          Cấu hình điện thoại {currentProduct?.title}
        </h3>
        <ul className={styles.configurations__list}>
          <li>
            <p>Màn hình</p>
            <p>
              {configuration.monitor.technology} ,
              {configuration.monitor.broadScreen}"
            </p>
          </li>
          <li>
            <p>Hệ điều hành</p>
            <p>
              {configuration.operatingSystem.type}{" "}
              {configuration.operatingSystem.number}
            </p>
          </li>
          <li>
            <p>Camera sau</p>
            <p>
              {configuration.rearCam.quantity}camera{" "}
              {configuration.rearCam.quality}
              MP
            </p>
          </li>
          <li>
            <p>Camera trước</p>
            <p>{configuration.frontCam.quality} MP</p>
          </li>
          <li>
            <p>Chip</p>
            <p>
              {configuration.chip.type} {configuration.chip.technology}{" "}
              {configuration.chip.number}
            </p>
          </li>
          <li>
            <p>Ram</p>
            <p>{configuration.ram} GB</p>
          </li>
          <li>
            <p>Bộ nhớ trong</p>
            <p>{configuration.internalMemory}GB</p>
          </li>
          <li>
            <p>Sim</p>
            <p>
              {configuration.sim.quantity} {configuration.sim.type}SIM
            </p>
          </li>
          <li>
            <p>Pin,Sạc</p>
            <p>
              {configuration.battery.volume} mAh, {configuration.battery.charge}
              W
            </p>
          </li>
        </ul>
        <button
          onClick={onOpenProductCarousel?.bind(tab)}
          className={`${styles.configurations__btn}  btn--border-blue `}
        >
          Xem thêm cấu hình chi tiết <AiOutlineCaretRight />
        </button>
      </div>
    );
  }
  if (!isPhoneDocument(currentProduct)) {
    const configuration = currentProduct.configuration;
    content = (
      <div className={styles.configurations}>
        <h3 className={styles.configurations__header}>
          Cấu hình Laptop {currentProduct?.title}
        </h3>
        <ul className={styles.configurations__list}>
          <li>
            <p>CPU</p>
            <p>
              {configuration.cpu.type} {configuration.cpu.version}
            </p>
          </li>
          <li>
            <p>Ổ cứng</p>
            <p>{configuration.internalMemory} SSD</p>
          </li>
          <li>
            <p>Màn hình</p>
            <p>
              {configuration.screen.inch}, {configuration.screen.technology}
            </p>
          </li>
          <li>
            <p>Card màn hình</p>
            <p>{configuration.cardScreen.type} </p>
          </li>
          <li>
            <p>Đặc biệt</p>
            <p>{configuration.special}</p>
          </li>
          <li>
            <p>Thiết kế</p>
            {/* @ts-ignore */}
            <p>{configuration.design}</p>
          </li>

          <li>
            <p>Thời điểm ra mắt</p>
            <p>{configuration.launchTime}</p>
          </li>
        </ul>
        <button
          onClick={onOpenProductCarousel?.bind(tab)}
          className={`${styles.configurations__btn}  btn--border-blue `}
        >
          Xem thêm cấu hình chi tiết <AiOutlineCaretRight />
        </button>
      </div>
    );
  }
  return configuration ? content : null;
};

export default ProductConfiguration;
