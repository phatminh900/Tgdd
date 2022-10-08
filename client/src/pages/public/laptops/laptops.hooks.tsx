import slide1 from "../../../assets/imgs/laptops-slides/slider-1.png";

import slide2 from "../../../assets/imgs/laptops-slides/slider-2.png";
import slide3 from "../../../assets/imgs/laptops-slides/slider-3.png";
import slide4 from "../../../assets/imgs/laptops-slides/slider-4.png";
import MacBookLogo from "../../../assets/imgs/firms/logo-macbook-149x40.png";
import AcerLogo from "../../../assets/imgs/firms/logo-acer-149x40.png";
import LenovoLogo from "../../../assets/imgs/firms/logo-lenovo-149x40.png";
import { useLocation } from "react-router-dom";
//laptop firm
const useLaptopsHook = () => {
  const headerLinks = [
    {
      id: 1,
      path: "#",
      slide: slide1,
    },

    {
      id: 2,
      path: "#",
      slide: slide2,
    },
    {
      id: 3,
      path: "#",
      slide: slide3,
    },
    {
      id: 4,
      path: "#",
      slide: slide4,
    },
  ];
  const firms = [
    {
      id: 1,
      "data-firm": "MacBook",

      content: <img src={MacBookLogo} alt="MacbookLOGO" />,
    },
    {
      id: 2,
      "data-firm": "Acer",
      content: <img src={AcerLogo} alt="AcerLogo" />,
    },
    {
      id: 3,
      "data-firm": "Lenovo",
      content: <img src={LenovoLogo} alt="LenovoLogo" />,
    },
  ];
  const priceFilter = [
    {
      id: 1,
      "data-lt": 30000000,
      content: <p>Dưới 30 triệu</p>,
    },

    {
      id: 3,
      "data-gt": 30000000,
      content: <p>Trên 30 triệu</p>,
    },
  ];

  const filterList = [
    { id: 1, title: "Hãng", content: firms },
    { id: 2, title: "Giá", content: priceFilter },
  ];
  const { pathname } = useLocation();
  const resource = pathname.slice(1).toLowerCase();
  return { headerLinks, filterList, resource };
};

export default useLaptopsHook;
