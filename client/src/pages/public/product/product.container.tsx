import styles from "./product.module.scss";

import { AiOutlineCaretRight } from "react-icons/ai";

import { ButtonStorage, Modal, ReviewOverall } from "components";
import ProductConfiguration from "./product-configuration.component";
import ProductPromotions from "./product-promotions.component";
import ProductCarousel from "./product-carousel/product-carousel.component";
import { NotFound } from "../NotFound";
import ProductOverview from "./product-overview.component";
import ProductGeneralInformation from "./product-general-information";
// import productProductReview from "./product-review/product-review.container";
import ProductCheckout from "./product-checkout/product-checkout.component";
import useProductHook from "./product.hook";
import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import DocumentTitle from "react-document-title";
import BtnBuy from "components/btn/btn-buy/btn-buy.component";
import Price from "components/price/price.component";
import ProductAddedToCart from "./product-checkout/product-added-to-cart/product-added-to-cart.component";
import ProductReview from "./product-review/product-review.component";
import {
  ILaptopDocument,
  IPhoneDocument,
} from "interfaces/allProductsType.interface";
import { isPhoneDocument } from "utils/recognizeDocument";
import { getProductReactRouter, Resources } from "service/product.service";

export interface ILinks {
  id: string;
  title: string;
  hash: string;
}
const Product = () => {
  const currentProduct = useLoaderData() as IPhoneDocument | ILaptopDocument;

  const {
    productModalState,
    currentColor,
    isProductAdded,
    slidesImgs,
    onToggleModal,
    currentHighlightsImgNumber,
    onSetCurrentHighlightsImgNumber,
    onOpenCheckoutModal,
    addToCart,
    linksColor,
    changeCurrentStorage,
    changeCurrentColor,
    setIsProductAdded,
    width,
    onOpenProductCarousel,
    links,
  } = useProductHook(currentProduct);

  // configuration-modal

  if (!currentProduct) return <NotFound />;
  // @ts-ignore
  return (
    <DocumentTitle title={currentProduct.title}>
      <section className={styles.product}>
        <Modal isOpen={productModalState.isOpenModal} className={styles.modal}>
          {!productModalState.isOpenCheckoutModal ? (
            <ProductCarousel
              onSetCurrentHighlightsImgNumber={onSetCurrentHighlightsImgNumber}
              currentHighlightsImgNumber={currentHighlightsImgNumber}
              linksColor={linksColor}
              slidesImgs={slidesImgs}
              links={links}
              isOpenModal={productModalState.isOpenModal}
              onToggleModal={onToggleModal}
              currentProduct={currentProduct}
            />
          ) : (
            <>
              <ProductCheckout
                addToCart={addToCart}
                isOpenModal={productModalState.isOpenModal}
                currentColor={currentColor}
                onChangeCurrentColor={changeCurrentColor}
                currentProduct={currentProduct}
                onToggleModal={onToggleModal}
              />
            </>
          )}
        </Modal>
        <div className={styles.header}>
          <ul className={`${styles.links} links-hierarchy`}>
            <Link to={`/${currentProduct.category.toLowerCase()}`}>
              {currentProduct.category}
            </Link>
            {/* @ts-ignore */}
            <Link
              to={`/${currentProduct.category.toLowerCase()}?firm=${
                currentProduct.firm
              }`}
            >
              {currentProduct.firm}
            </Link>
          </ul>
          {width >= 1200 && (
            <div className={`${styles.info}  flex-vt-ct`}>
              <h3 className={styles.title}>
                Điện thoại {currentProduct.title}{" "}
              </h3>
              <a href="#reviews" className="flex-vt-ct">
                <ReviewOverall
                  ratingAverage={currentProduct.ratingAverage}
                  ratingQuantity={currentProduct.ratingQuantity}
                  className={styles.reviews}
                />
                <span className={styles["reviews__text"]}>
                  {currentProduct.ratingQuantity} Đánh giá
                </span>
              </a>
            </div>
          )}
        </div>
        <div className={`${styles.main} flex`}>
          {width <= 1200 ? (
            <>
              <ProductOverview
                onSetCurrentHighlightsImgNumber={
                  onSetCurrentHighlightsImgNumber
                }
                currentHighlightsImgNumber={currentHighlightsImgNumber}
                linksColor={linksColor}
                links={links}
                slideImgs={slidesImgs}
                currentProduct={currentProduct}
                onOpenProductCarousel={onOpenProductCarousel}
                tab={links[0].hash}
                isOpenModal={productModalState.isOpenModal}
              />

              <div className={`${styles.info}  flex-vt-ct`}>
                <h3 className={styles.title}>
                  Điện thoại {currentProduct.title}{" "}
                </h3>
                <a href="#reviews" className="flex-vt-ct">
                  <ReviewOverall
                    ratingAverage={currentProduct.ratingAverage}
                    ratingQuantity={currentProduct.ratingQuantity}
                    className={styles.reviews}
                  />
                  <span className={styles["reviews__text"]}>
                    {currentProduct.ratingQuantity} Đánh giá
                  </span>
                </a>
              </div>
              <div className={`${styles.storage} flex`}>
                {currentProduct.storage.map((st: number, i: number) => (
                  <ButtonStorage
                    key={st}
                    className={styles["btn-storage"]}
                    currentProduct={currentProduct}
                    changeCurrentStorage={changeCurrentStorage}
                    value={st}
                    url={currentProduct.otherVersions[i]}
                  />
                ))}
              </div>
              <div className={`${styles.colors}  flex`}>
                {currentProduct.colors.map((color: string) => (
                  <button
                    onClick={changeCurrentColor}
                    data-color={color}
                    className={`${styles["btn-color"]} ${
                      currentColor === color ? "active" : ""
                    } btn`}
                    key={color}
                  >
                    {color}
                  </button>
                ))}
              </div>
              <div>
                <div className={`${styles.price} flex-vt-ct`}>
                  Giá: <Price price={currentProduct.price} />
                </div>
              </div>
              <BtnBuy
                onClick={() => {
                  onOpenCheckoutModal();
                  setIsProductAdded(false);
                  onToggleModal();
                }}
                text="Mua ngay"
              />
              <ProductAddedToCart
                setIsProductAdded={setIsProductAdded}
                imgCover={currentProduct.imgCover}
                isProductAdded={isProductAdded}
                title={currentProduct.title}
              />
              <ProductPromotions currentProduct={currentProduct} />
              <ProductConfiguration
                // the second last
                tab={links[links.length - 2].hash}
                onToggleModal={onToggleModal}
                currentProduct={currentProduct}
                onOpenProductCarousel={onOpenProductCarousel}
              />
              <div className={styles["Product-configuration-img-box"]}>
                {isPhoneDocument(currentProduct) ? (
                  <img
                    src={currentProduct.imgs.imgConfiguration[0]}
                    alt={`${currentProduct.title} configuration`}
                  />
                ) : null}
              </div>
              <ProductGeneralInformation
                className={styles["product-general-information-box"]}
                currentProduct={currentProduct}
                imgSrc={currentProduct.imgs.imgGeneralInformation[0]}
              />
              <ProductReview currentProduct={currentProduct} />
            </>
          ) : (
            <>
              <div className={styles.left}>
                {/* <div onClick={onOpenProductCarousel.bind(listHash[0])}> */}
                <ProductOverview
                  onSetCurrentHighlightsImgNumber={
                    onSetCurrentHighlightsImgNumber
                  }
                  currentHighlightsImgNumber={currentHighlightsImgNumber}
                  linksColor={linksColor}
                  links={links}
                  slideImgs={slidesImgs}
                  currentProduct={currentProduct}
                  onOpenProductCarousel={onOpenProductCarousel}
                  tab={links[0].hash}
                  isOpenModal={productModalState.isOpenModal}
                />
                {/* </div> */}
                <div className={styles["Product-configuration-img-box"]}>
                  {isPhoneDocument(currentProduct) ? (
                    <img
                      src={currentProduct.imgs.imgConfiguration[0]}
                      alt={`${currentProduct.title} configuration`}
                    />
                  ) : null}
                </div>

                <div className={styles["product-general-information-box"]}>
                  <ProductGeneralInformation
                    className={styles["product-general-information-box"]}
                    currentProduct={currentProduct}
                    imgSrc={currentProduct.imgs.imgGeneralInformation[0]}
                  />
                  <button
                    onClick={onOpenProductCarousel.bind(
                      links[links.length - 1].hash
                    )}
                    className={`${styles["product-general-information-box__btn"]} btn--border-blue`}
                  >
                    Xem thêm <AiOutlineCaretRight />
                  </button>
                </div>
                <ProductReview currentProduct={currentProduct} />
              </div>
              <div className={styles.right}>
                <div className={`${styles.storage} flex`}>
                  {currentProduct.storage.map((st: number, i: number) => (
                    <ButtonStorage
                      key={st}
                      className={styles["btn-storage"]}
                      currentProduct={currentProduct}
                      changeCurrentStorage={changeCurrentStorage}
                      value={st}
                      url={currentProduct.otherVersions[i]}
                    />
                  ))}
                  {/* <ButtonStorage currentProduct={Product} /> */}
                </div>
                <div className={`${styles.colors}  flex`}>
                  {currentProduct.colors.map((color: string) => (
                    <button
                      onClick={changeCurrentColor}
                      data-color={color}
                      className={`${styles["btn-color"]} ${
                        currentColor === color ? "active" : ""
                      } btn`}
                      key={color}
                    >
                      {color}
                    </button>
                  ))}
                </div>

                <div>
                  <div className={`${styles.price} flex-vt-ct`}>
                    Giá: <Price price={currentProduct.price} />
                  </div>
                </div>
                <ProductPromotions currentProduct={currentProduct} />
                <BtnBuy
                  onClick={() => {
                    onOpenCheckoutModal();
                    setIsProductAdded(false);
                    onToggleModal();
                  }}
                  text="Mua ngay"
                />
                <ProductAddedToCart
                  setIsProductAdded={setIsProductAdded}
                  imgCover={currentProduct.imgCover}
                  isProductAdded={isProductAdded}
                  title={currentProduct.title}
                />
                <ProductConfiguration
                  // the second last
                  tab={links[links.length - 2].hash}
                  onToggleModal={onToggleModal}
                  currentProduct={currentProduct}
                  onOpenProductCarousel={onOpenProductCarousel}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </DocumentTitle>
  );
};

export default Product;

export const loader = ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const resourceReg = url.pathname?.match(/(\/.+\/)/i);
  const resource = resourceReg ? resourceReg[0].slice(1, -1) : "";

  return getProductReactRouter(resource as Resources, params.slug!);
};
