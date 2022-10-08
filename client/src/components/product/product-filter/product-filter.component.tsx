import styles from "./product-filter.module.scss";
import { AiFillCaretDown } from "react-icons/ai";
import { type FilterList } from "./product-filter.type";
import { Resources } from "service/product.service";
import useProductFilterHook from "./product-filter.hook";
interface ProductFilterProps {
  //
  filterList: FilterList[];
  resource: Resources;
}
const ProductsFilter = ({ filterList, resource }: ProductFilterProps) => {
  const {
    isOpenFilterBox,
    setIsOpenFilterBox,
    currentFilterBox,
    setCurrentFilterBox,
    addToFilterQuery,
    unQueryFilter,
    queryFilter,
  } = useProductFilterHook(resource);
  return (
    <div className={styles["product-filter"]}>
      <ul className={`${styles["product-filter__list"]} flex-vt-ct gap-12px`}>
        {filterList.map((filter) => (
          <li
            className={`${styles["product-filter__item"]} ${
              isOpenFilterBox && currentFilterBox === filter.title
                ? styles.active
                : ""
            } `}
            key={filter.id}
          >
            <button
              onClick={() => {
                setIsOpenFilterBox((prev) => !prev);
                setCurrentFilterBox(filter.title);
              }}
              className={`${styles["product-filter__btn"]} product-filter__btn-box flex-vt-ct`}
            >
              {filter.title} <AiFillCaretDown />
            </button>
            <ul className={styles["product-filter__list-child"]}>
              <div
                className={`${styles["product-filter__options"]}  flex-vt-ct gap-12px`}
              >
                {filter.content &&
                  filter.content.map((child) => {
                    const { content, id, ...dataset } = child;

                    return (
                      <button
                        {...dataset}
                        key={id}
                        onClick={addToFilterQuery}
                        className={`${styles["product-filter__btn"]}`}
                      >
                        {child.content}
                      </button>
                    );
                  })}
              </div>
              <div
                className={`${styles["product-filter__actions"]} flex-both-ct gap-12px`}
              >
                <button onClick={unQueryFilter}>Bỏ chọn</button>
                <button onClick={queryFilter}>Xem kết quả</button>
              </div>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsFilter;
