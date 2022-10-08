import React, { useState } from "react";
import { BiMobileAlt, BiLaptop, BiHeadphone, BiDesktop } from "react-icons/bi";
import { FaTabletAlt } from "react-icons/fa";
import { IoWatch } from "react-icons/io5";
import { BsWatch } from "react-icons/bs";
const useNavigationHook = () => {
  const icons = [
    <BiMobileAlt />,
    <BiLaptop />,
    <FaTabletAlt />,
    <BiHeadphone />,
    <IoWatch />,
    <BsWatch />,
    <BiDesktop />,
    undefined,
    undefined,
    undefined,
  ];
  const links = [
    "Điện thoại",
    "Laptop",
    "Tablet",
    "Phụ kiện",
    "SmartWatch",
    "Đồng hồ",
    "Pc",
    "Máy cũ giá rẻ",
    "Sim, thẻ cào",
    "Dịch vụ tiện ích",
  ];
  const navigate = [
    "/phones",
    "/laptops",
    "/1",
    "/1",
    "/1",
    "/1",
    "/1",
    "/1",
    "/1",
    "/1",
  ];
  const [isOpenNavigationLinks, setIsOpenNavigationLinks] = useState(false);
  const toggleNavigationLink = () => {
    setIsOpenNavigationLinks((prev) => !prev);
  };
  return {
    icons,
    links,
    navigate,
    isOpenNavigationLinks,
    toggleNavigationLink,
  };
};

export default useNavigationHook;
