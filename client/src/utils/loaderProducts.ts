import { LoaderFunctionArgs } from "react-router-dom";
import { getProductsReactRouter } from "service/product.service";
import { Resources } from "service/product.service";
const loaderProducts = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pathname = url.pathname.slice(1);
  const query = url.search.slice(1);
  // return searchProducts(searchTerm);
  return await getProductsReactRouter(pathname as Resources, query);
};
export default loaderProducts;
