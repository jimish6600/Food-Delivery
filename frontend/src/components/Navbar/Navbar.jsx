import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import {Link} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'


const Navbar = ( { setShowLogin } ) => {
  const [menu, setMenu] = useState("home");
  const {getTotalCartAmount} = useContext(StoreContext);
  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
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
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <button onClick={()=>setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
