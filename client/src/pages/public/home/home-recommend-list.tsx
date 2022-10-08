import HomeRecommendItem from "./home-recommend-item";
import { IProductDocument } from "interfaces/allProductsType.interface";
import ProductList from "components/product/product-list/product-list.component";

interface HomeRecommendListProps {
  products: IProductDocument[];
}

const HomeRecommendList = ({ products }: HomeRecommendListProps) => {
  return (
    <ProductList>
      {products.map((product) => (
        <HomeRecommendItem key={product._id} {...product} />
      ))}
    </ProductList>
  );
};

export default HomeRecommendList;
