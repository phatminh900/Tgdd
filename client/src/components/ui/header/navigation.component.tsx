import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

import styles from "./navigation.module.scss";
import { ROUTES } from "app-constants/navigation.constant";
import HeaderCart from "./header-cart.component";
import SearchHeader from "./search-header/search-header.component";
import useNavigationHook from "./navigation.hook";
import { BtnClose } from "components";
const Navigation = () => {
  const {
    icons,
    links,
    navigate,
    isOpenNavigationLinks,
    toggleNavigationLink,
  } = useNavigationHook();
  return (
    <nav className={styles.nav}>
      <div className={`${styles["header-top"]}  flex-vt-ct`}>
        <Link to="/">
          <i className={styles.logo}></i>
        </Link>
        <SearchHeader className={styles["search-box"]} />
        <div className={`${styles["order-history"]} ${styles.action}`}>
          <Link to={ROUTES.ORDER_HISTORY}>
            <span>Lịch sử đơn hàng</span>
          </Link>
        </div>

        <HeaderCart />

        <div className={`${styles["article-box"]} flex`}>
          <div className={`${styles.article}`}>
            <Link to="#" className="flex-vt-ct">
              <p className={`${styles.technology} flex`}>
                <span>24h</span>
                <span>công nghệ</span>
              </p>
            </Link>
          </div>
          <div className={`${styles.article}`}>
            <Link to="#" className="flex-vt-ct">
              <span>Hỏi đáp</span>
            </Link>
          </div>
          <div className={`${styles.article}`}>
            <Link to="#" className="flex-vt-ct">
              <span>Game App</span>
            </Link>
          </div>
        </div>
        <button
          onClick={toggleNavigationLink}
          className={`${styles.menu} flex-vt-ct gap-4px`}
        >
          <AiOutlineMenu />
          Menu
        </button>
      </div>
      <div
        className={`${styles["links-box"]} ${
          isOpenNavigationLinks && styles.active
        }`}
      >
        <ul className={`${styles.links}  flex`}>
          <div className={styles["btn-close-box"]}>
            <BtnClose
              className={styles["btn-close"]}
              onClick={toggleNavigationLink}
            />
          </div>
          {links.map((link, index) => (
            <li key={uuidv4()} className={styles.link}>
              <NavLink
                onClick={toggleNavigationLink}
                className={styles.navlinks}
                style={(isActive) => {
                  return isActive.isActive
                    ? { color: "var(--color-active-link)" }
                    : {};
                }}
                to={navigate[index]}
              >
                {icons[index]}
                <span>{link}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* small links */}
      <ul className={`${styles["small-links"]} gap-12px`}>
        {/* only get first 2 elements */}
        {links.slice(0, 2).map((link, index) => (
          <li key={uuidv4()} className={styles.link}>
            <NavLink
              className={styles.navlinks}
              style={(isActive) => {
                return isActive.isActive
                  ? { color: "var(--color-white) !important" }
                  : {};
              }}
              to={navigate[index]}
            >
              {icons[index]}
              <span>{link}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
