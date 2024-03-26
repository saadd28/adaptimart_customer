import { NavLink } from "react-router-dom";
import {
  AdaptiMartLogo,
  NavbarCartLogo,
  NavbarProfileLogo,
} from "../../Assets";
import "./Navbar.css";

import React, { useState } from "react";
import CartPopUp from "../CartPopUp/CartPopUp";
import { Fade } from "react-reveal";

export default function Navbar() {
  // let [ActiveLink, setActiveLink] = useState(1);
  const [cartpopup, setcartpopup] = useState(false);

  return (
    <>
      <CartPopUp cartpopup={cartpopup} setcartpopup={setcartpopup} />
      <Fade top>
        <div className="navbar_main_container">
          <div className="navbar_left_container">
            <img src={AdaptiMartLogo} alt="" className="navbar_logo_img" />

            <div className="navbar_links_container">
              <NavLink
                to="/"
                className={"navbar_link"}
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#18abb1" : "#02021D",
                  };
                }}
              >
                Home
              </NavLink>
              <NavLink
                to="/categories"
                className={"navbar_link"}
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#18abb1" : "#02021D",
                  };
                }}
              >
                Categories
              </NavLink>
              <NavLink
                to="/products"
                className={"navbar_link"}
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#18abb1" : "#02021D",
                  };
                }}
              >
                Products
              </NavLink>
              <NavLink
                to="/about-us"
                className={"navbar_link"}
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#18abb1" : "#02021D",
                  };
                }}
              >
                About Us
              </NavLink>
            </div>
          </div>
          <div className="navbar_right_container">
            <img
              src={NavbarProfileLogo}
              alt="Profile Icon"
              className="navbar_icon_img"
            />
            <img
              src={NavbarCartLogo}
              alt="Cart Icon"
              className="navbar_icon_img"
              onClick={() => {
                setcartpopup(true);
              }}
            />
          </div>
        </div>
      </Fade>
    </>
  );
}
