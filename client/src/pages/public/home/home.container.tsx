import { useLoaderData } from "react-router-dom";
import { getProductsReactRouter } from "service/product.service";
import { IProductDocument } from "interfaces/allProductsType.interface";
import HomeRecommendList from "./home-recommend-list";
import useHomeHook from "./home.hook";

const HomeContainer = () => {
  const products = useLoaderData() as IProductDocument[];
  useHomeHook();
  return (
    <div>
      <h3>Gợi ý cho bạn</h3>
      {<HomeRecommendList products={products} />}
    </div>
  );
};

export default HomeContainer;
export const loader = () => {
  return getProductsReactRouter("products");
};
