import React from "react";
import styles from "./Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "../firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  }

  return (
    <div className={styles.header}>
      <Link to="/">
        <img
          className={styles.headerLogo}
          src="https://i.pinimg.com/originals/47/b7/bd/47b7bdac4285ee24654ca7d68cf06351.png"
          alt=""
        />
      </Link>
      <div className={styles.headerSearch}>
        <input className={styles.headerSearchBar} type="text"></input>
        <SearchIcon className={styles.headerSearchIcon} />
      </div>
      <div className={styles.headerNav}>
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className={styles.headerOption}>
            <span className={styles.headerOptionLineOne}>Hello {!user? 'guest' : user.email} </span>
            <span className={styles.headerOptionLineTwo}>{user ? 'Sign Out' : 'Sign In'} </span>
          </div>
        </Link>
        <Link to='/orders' >
        <div className={styles.headerOption}>
          <span className={styles.headerOptionLineOne}> Returns</span>
          <span className={styles.headerOptionLineTwo}>& orders </span>
        </div>
        </Link>
        <div className={styles.headerOption}>
          <span className={styles.headerOptionLineOne}>Your</span>
          <span className={styles.headerOptionLineTwo}>Prime </span>
        </div>
        <Link to="/checkout">
          <div className={styles.headerOptionBasket}>
            <div className={styles.headerOptionLineOneBasket}>
              <ShoppingBasketIcon />
            </div>
            <span className={styles.header__OptionLineTwo}>
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
