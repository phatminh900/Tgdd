import axios from "axios";
import Price from "components/price/price.component";
import React, { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import styles from "./search-header.module.scss";

interface SearchItem {
  title: string;
  id: string;
  category: string;
  price: number;
  imgCover: string;
  slug: string;
}

const SearchHeader = ({ className }: { className: string }) => {
  const searchTerm = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<SearchItem[]>([]);
  const search = async (e: React.FormEvent) => {
    e.preventDefault();
    const search = searchTerm.current!.value;
    if (!search.match(/^[A-Za-z]/i)) return;
    const { data } = await axios(
      `/api/v1/products/search?search=${searchTerm.current!.value}`
    );
    const products: SearchItem[] = data.products;
    if (!products.length) return setResults([]);
    setResults(products);
  };
  return (
    <div className={`${styles["search-box"]} ${className}`}>
      <form className={`${styles.search} flex-vt-ct`} onSubmit={search}>
        <input
          type="text"
          ref={searchTerm}
          placeholder="What are you looking for?"
          onChange={search}
        />
        <BiSearch />
      </form>
      {results.length > 1 && (
        <ul className={styles["search-list"]}>
          {results.map((result) => (
            <li key={result.id}>
              <button
                key={result.id}
                onClick={() => {
                  window.location.href = `/${result.category}/${result.slug}`;
                }}
              >
                <img src={result.imgCover} alt="Product " />
                <div className={styles.details}>
                  <p>{result.title}</p>
                  <Price price={result.price} />
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchHeader;
