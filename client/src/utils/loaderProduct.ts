import React from "react";
import { LoaderFunctionArgs } from "react-router-dom";
import { getProductsReactRouter } from "service/product.service";
import { Resources } from "service/product.service";
export const loaderProduct = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pathname = url.pathname.slice(1);
  const query = url.search.slice(1);

  // return searchProducts(searchTerm);
  return getProductsReactRouter(pathname as Resources, query);
};

export default loaderProduct;
