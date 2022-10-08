import React from "react";
import { loader as productItemLoader } from "./product.container";
const Product = React.lazy(() => import("./product.container"));

export { Product, productItemLoader };
