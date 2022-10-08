import React from "react";
import { loader as reviewLoader } from "./review.container";
const Review = React.lazy(() => import("./review.container"));

export { Review, reviewLoader };
