import { v4 as uuidv4 } from "uuid";

import styles from "./product-configuration-carousel.module.scss";
import { isPhoneDocument, isLaptopDocument } from "utils/recognizeDocument";
import { ICurrentProduct } from "../../product.interface";

interface ProductConfigurationCarouselProps extends ICurrentProduct {}

const ProductConfigurationCarousel = ({
  currentProduct,
}: ProductConfigurationCarouselProps) => {
  let content;
  // Phone document
  if (isPhoneDocument(currentProduct)) {
    const configuration = currentProduct?.configuration;
    content = (
      <>
        {/* <LazyLoadImage
          width={720}
          height={480}
          effect="blur"
          src={currentProduct?.imgs.imgConfiguration[0]}
          alt={currentProduct?.title + " configuration"}
        /> */}
        <img
          src={currentProduct?.imgs.imgConfiguration[0]}
          alt={currentProduct?.title + " configuration"}
        />
        <div className={styles["product-details__configuration-list"]}>
          <ul className={styles["product-details__monitor"]}>
            <h3 className={styles["product-details__title"]}>Màn Hình</h3>
            <li>
              <p>Công nghệ màn hình</p>
              <p>{configuration?.monitor.technology}</p>
            </li>
            <li>
              <p>Độ phân giải</p>
              <p>{configuration?.monitor.resolution}</p>
            </li>
            <li>
              <p>Màn hình rộng</p>
              <p>{configuration?.monitor.broadScreen}"</p>
            </li>
            <li>
              <p>Độ sáng tối đa</p>
              <p>{configuration?.monitor.maximumLight} nits</p>
            </li>
          </ul>
          <ul>
            <h3 className={styles["product-details__title"]}>Camera sau</h3>
            <li>
              <p>Độ phân giải</p>
              <p>
                {configuration?.rearCam.quality} camera{" "}
                {configuration?.rearCam.quality}MP
              </p>
            </li>
            <li>
              <p>Quay phim</p>
              <ul className={styles["product-details__features"]}>
                {configuration?.rearCam.film.map((f) => (
                  <li key={uuidv4()}>{f}</li>
                ))}
              </ul>
            </li>
            <li>
              <p>Đèn Flash</p>
              <p>Yes</p>
            </li>
            <li>
              <p>Tính năng</p>
              <ul className={styles["product-details__features"]}>
                {configuration?.rearCam.features.map((f) => (
                  <li key={uuidv4()}>{f}</li>
                ))}
              </ul>
            </li>
          </ul>
          <ul>
            <h3 className={styles["product-details__title"]}>Camera trước</h3>
            <li>
              <p>Độ phân giải</p>
              <p>{configuration?.frontCam.quality} MP</p>
            </li>
            <li>
              <p>Tính năng</p>
              <ul className={styles["product-details__features"]}>
                {configuration?.rearCam.features.map((f) => (
                  <li key={uuidv4()}>{f}</li>
                ))}
              </ul>
            </li>
          </ul>
          <ul>
            <h3 className={styles["product-details__title"]}>
              Hệ điều hành & CPU
            </h3>
            <li>
              <p>Hệ đều hành</p>
              <p>
                {configuration?.operatingSystem.type}{" "}
                {configuration?.operatingSystem.number}
              </p>
            </li>
            <li>
              <p>Chip xử lý (CPU)</p>
              <p>
                {configuration?.chip.type}{" "}
                {configuration?.operatingSystem.number}{" "}
                {configuration?.chip.technology}
              </p>
            </li>
          </ul>
          <ul>
            <h3 className={styles["product-details__title"]}>
              Bộ nhớ & Lưu trữ
            </h3>
            <li>
              <p>RAM</p>
              <p>{configuration?.ram}GB</p>
            </li>
            <li>
              <p>Bộ nhớ trong</p>
              <p>{configuration?.internalMemory}GB</p>
            </li>
            <li>
              <p>Bộ nhớ còn lại (khả dụng) khoảng</p>
              <p>{configuration?.residualMemory}GB</p>
            </li>
            <li>
              <p>Danh bạ</p>
              <p>Không giới hạn</p>
            </li>
          </ul>
          <ul>
            <h3 className={styles["product-details__title"]}>Pin & Sạc</h3>
            <li>
              <p>Dung lượng pin</p>
              <p>{configuration?.battery.volume} mAh</p>
            </li>
            <li>
              <p>Loại pin</p>
              <p>{configuration?.battery.type}</p>
            </li>
            <li>
              <p>Hỗ trợ sạc tối đa</p>
              <p>{configuration?.battery.W} W</p>
            </li>
            <li>
              <p>Danh bạ</p>
              <p>Không giới hạn</p>
            </li>
          </ul>
          <ul>
            <h3 className={styles["product-details__title"]}>
              Thông tin chung
            </h3>
            <li>
              <p>Thiết kế</p>
              <p>{configuration?.design}</p>
            </li>
            <li>
              <p>Chất liệu</p>
              <p>{configuration?.material}</p>
            </li>
            <li>
              <p>Kích thước,khối lượng</p>
              <p>
                Dài: {configuration?.size.length}mm,Rộng:{" "}
                {configuration?.size.width},Dày: {configuration?.volume.depth},
                Nặng: {configuration?.volume.weight}
              </p>
            </li>
            <li>
              <p>Thời điểm ra mắt</p>
              <p>{configuration?.launchTime}</p>
            </li>
          </ul>
        </div>
      </>
    );
  }
  if (isLaptopDocument(currentProduct)) {
    const configuration = currentProduct.configuration;
    content = (
      <div className={styles["product-details__configuration-list"]}>
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
      </div>
    );
  }
  // if (!isPhoneDocument(currentProduct)) {
  //   const configuration = currentProduct.configuration;

  //   content = (
  //     <>
  //       <LazyLoadImage
  //         width={720}
  //         height={480}
  //         effect="blur"
  //         src={currentProduct?.imgs.imgConfiguration[0]}
  //         alt={currentProduct?.title + " configuration"}
  //       />
  //       <div className={styles["product-details__configuration-list"]}>
  //         <ul className={styles["product-details__monitor"]}>
  //           <h3 className={styles["product-details__title"]}>Màn Hình</h3>
  //           <li>
  //             <p>RAM</p>
  //             <p>
  //              {configuration.ram} GB
  //             </p>
  //           </li>
  //           <li>
  //             <p>Ổ cứng</p>
  //             <p>{configuration.internalMemory} SSD</p>
  //           </li>
  //           <li>
  //             <p>Đặc biệt</p>
  //             <p>{configuration.special}"</p>
  //           </li>
  //           <li>
  //             <p>Hệ đều hành</p>
  //             <p>{configuration.operatingSystem.type} </p>
  //           </li>
  //         </ul>
  //         <ul>
  //           <h3 className={styles["product-details__title"]}>Camera sau</h3>
  //           <li>
  //             <p>Độ phân giải</p>
  //             <p>
  //               {configuration?.rearCam.quality} camera{" "}
  //               {configuration?.rearCam.quality}MP
  //             </p>
  //           </li>
  //           <li>
  //             <p>Quay phim</p>
  //             <ul className={styles["product-details__features"]}>
  //               {configuration?.rearCam.film.map((f) => (
  //                 <li key={uuidv4()}>{f}</li>
  //               ))}
  //             </ul>
  //           </li>
  //           <li>
  //             <p>Đèn Flash</p>
  //             <p>Yes</p>
  //           </li>
  //           <li>
  //             <p>Tính năng</p>
  //             <ul className={styles["product-details__features"]}>
  //               {configuration?.rearCam.features.map((f) => (
  //                 <li key={uuidv4()}>{f}</li>
  //               ))}
  //             </ul>
  //           </li>
  //         </ul>
  //         <ul>
  //           <h3 className={styles["product-details__title"]}>Camera trước</h3>
  //           <li>
  //             <p>Độ phân giải</p>
  //             <p>{configuration?.frontCam.quality} MP</p>
  //           </li>
  //           <li>
  //             <p>Tính năng</p>
  //             <ul className={styles["product-details__features"]}>
  //               {configuration?.rearCam.features.map((f) => (
  //                 <li key={uuidv4()}>{f}</li>
  //               ))}
  //             </ul>
  //           </li>
  //         </ul>
  //         <ul>
  //           <h3 className={styles["product-details__title"]}>
  //             Hệ điều hành & CPU
  //           </h3>
  //           <li>
  //             <p>Hệ đều hành</p>
  //             <p>
  //               {configuration?.operatingSystem.type}{" "}
  //               {configuration?.operatingSystem.number}
  //             </p>
  //           </li>
  //           <li>
  //             <p>Chip xử lý (CPU)</p>
  //             <p>
  //               {configuration?.chip.type}{" "}
  //               {configuration?.operatingSystem.number}{" "}
  //               {configuration?.chip.technology}
  //             </p>
  //           </li>
  //         </ul>
  //         <ul>
  //           <h3 className={styles["product-details__title"]}>
  //             Bộ nhớ & Lưu trữ
  //           </h3>
  //           <li>
  //             <p>RAM</p>
  //             <p>{configuration?.ram}GB</p>
  //           </li>
  //           <li>
  //             <p>Bộ nhớ trong</p>
  //             <p>{configuration?.internalMemory}GB</p>
  //           </li>
  //           <li>
  //             <p>Bộ nhớ còn lại (khả dụng) khoảng</p>
  //             <p>{configuration?.residualMemory}GB</p>
  //           </li>
  //           <li>
  //             <p>Danh bạ</p>
  //             <p>Không giới hạn</p>
  //           </li>
  //         </ul>
  //         <ul>
  //           <h3 className={styles["product-details__title"]}>Pin & Sạc</h3>
  //           <li>
  //             <p>Dung lượng pin</p>
  //             <p>{configuration?.battery.volume} mAh</p>
  //           </li>
  //           <li>
  //             <p>Loại pin</p>
  //             <p>{configuration?.battery.type}</p>
  //           </li>
  //           <li>
  //             <p>Hỗ trợ sạc tối đa</p>
  //             <p>{configuration?.battery.W} W</p>
  //           </li>
  //           <li>
  //             <p>Danh bạ</p>
  //             <p>Không giới hạn</p>
  //           </li>
  //         </ul>
  //         <ul>
  //           <h3 className={styles["product-details__title"]}>
  //             Thông tin chung
  //           </h3>
  //           <li>
  //             <p>Thiết kế</p>
  //             <p>{configuration?.design}</p>
  //           </li>
  //           <li>
  //             <p>Chất liệu</p>
  //             <p>{configuration?.material}</p>
  //           </li>
  //           <li>
  //             <p>Kích thước,khối lượng</p>
  //             <p>
  //               Dài: {configuration?.size.length}mm,Rộng:{" "}
  //               {configuration?.size.width},Dày: {configuration?.volume.depth},
  //               Nặng: {configuration?.volume.weight}
  //             </p>
  //           </li>
  //           <li>
  //             <p>Thời điểm ra mắt</p>
  //             <p>{configuration?.launchTime}</p>
  //           </li>
  //         </ul>
  //       </div>
  //     </>
  //   );
  // }

  return <>{content}</>;
};

export default ProductConfigurationCarousel;
