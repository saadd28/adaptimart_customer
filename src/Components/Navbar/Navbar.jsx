import { NavLink } from "react-router-dom";
import {
  AdaptiMartLogo,
  NavbarCartLogo,
  NavbarProfileLogo,
} from "../../Assets";
import "./Navbar.css";

import React from "react";
import NavbarProfileIconSVG from "../SVGs/NavbarProfileIconSVG";

export default function Navbar() {
  // let [ActiveLink, setActiveLink] = useState(1);

  return (
    <>
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
              to="/admin_dashboard"
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
              to="/admin_dashboard"
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
              to="/admin_dashboard"
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
          />
        </div>
      </div>
    </>
  );
}
