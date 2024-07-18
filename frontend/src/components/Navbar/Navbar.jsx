import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import {Link} from 'react-router-dom'

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-manu">
        <Link to="/" onClick= {() => setMenu("home")}
          className={menu === "home" ? "active" : ""}>
          home
        </Link>
        <a
          onClick={() => setMenu("menu")} href='#explore-menu'
          className={menu === "menu" ? "active" : ""}>
          menu
        </a>
        <a
          onClick={() => setMenu("mobile-app")} href='#app-download'
          className={menu === "mobile-app" ? "active" : ""}>
          mobile-app
        </a>
        <a
          onClick={() => setMenu("contact-us")} href='#footer'
          className={menu === "contact-us" ? "active" : ""} >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button> sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
