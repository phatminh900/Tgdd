import styles from "./phones-header.module.scss";
import slider1 from "./phone-slides/slider1.png";

import slider3 from "./phone-slides/slider3.png";
import slider6 from "./phone-slides/slider6.png";

import Slider from "components/slider/slider.component";

const PhoneHeader = () => {
  const links = [
    {
      id: 1,
      path: "POCO-C40-64GB",
      slide: slider6,
    },

    {
      id: 2,
      path: "iphone-13-series",
      slide: slider3,
    },
    {
      id: 3,
      path: "/realme",
      slide: slider1,
    },
  ];
  return (
    <div className={styles.header}>
      <Slider
        links={links}
        isLink={true}
        usingDots={true}
        className={styles.slider}
        maxSlideLength={links.length}
      />
    </div>
  );
};

export default PhoneHeader;
