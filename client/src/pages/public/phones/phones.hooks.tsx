import RealmeLogo from "../../../assets/imgs/firms/Realme42-b_37.png";
import IphoneLogo from "../../../assets/imgs/firms/logo-iphone-220x48.png";
import SamsungLogo from "../../../assets/imgs/firms/samsungnew-220x48-1.png";
import slider1 from "../../../assets/imgs/phone-slides/slider1.png";
import slider3 from "../../../assets/imgs/phone-slides/slider3.png";
import slider6 from "../../../assets/imgs/phone-slides/slider6.png";
import slider1L from "../../../assets/imgs/phone-slides/slider1-l.png";
import slider3L from "../../../assets/imgs/phone-slides/slider3-l.png";
import slider6L from "../../../assets/imgs/phone-slides/slider6-l.png";
import { useLocation } from "react-router-dom";
// type Icon='👋'|'🔥'
// type Text='wave'|'fire'
// type Combined=`${Icon}-${Text}`
// const test:Combined='👋-fire'
const usePhonesHook = () => {
  const headerLinks = [
    {
      id: 1,
      path: "POCO-C40-64GB",
      slide: [slider6, slider6L],
    },

    {
      id: 2,
      // path: "iphone-13-series",
      path: "#",
      slide: [slider3, slider3L],
    },
    {
      id: 3,
      // path: "/realme",
      path: "#",
      slide: [slider1, slider1L],
    },
  ];
  const firms = [
    {
      id: 1,
      "data-firm": "Apple",

      content: <img src={IphoneLogo} alt="IphoneLOGo" />,
    },
    {
      id: 2,
      "data-firm": "Samsung",
      content: <img src={SamsungLogo} alt="SamsungLogo" />,
    },
    {
      id: 3,
      "data-firm": "Realme",
      content: <img src={RealmeLogo} alt="RealmeLogo" />,
    },
  ];
  const priceFilter = [
    {
      id: 1,
      "data-lt": 5000000,
      content: <p>Dưới 5 triệu</p>,
    },
    {
      id: 2,
      "data-lt": 20000000,
      "data-gt": 13000000,
      content: <p>Từ 13 đến 20 triệu</p>,
    },
    {
      id: 3,
      "data-gt": 20000000,
      content: <p>Trên 20 triệu</p>,
    },
  ];
  const productType = [
    {
      id: 1,
      "data-operating-system": "Android",
      content: <p>Android</p>,
    },
    {
      id: 2,
      "data-operating-system": "IOS",
      content: <p>Iphone (IOS)</p>,
    },
  ];
  const filterList = [
    { id: 1, title: "Hãng", content: firms },
    { id: 2, title: "Giá", content: priceFilter },
    { id: 3, title: "Loại điện thoại", content: productType },
  ];
  const { pathname } = useLocation();
  const resource = pathname.slice(1).toLowerCase();
  return {
    headerLinks,
    filterList,
    resource,
  };
};

export default usePhonesHook;
