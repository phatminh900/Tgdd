import React from "react";
import { loader as homeLoader } from "./home.container";
const Home = React.lazy(() => import("./home.container"));
export { Home, homeLoader };
