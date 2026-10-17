import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/registration", label: "Registration" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" },
];

function Navbar() {
  return (
    <header className="navbar-container">
      <div className="navbar-section">
        <NavLink className="navbar-brand" to="/" aria-label="Dopamine home">
          <img src={logo} alt="Dopamine logo" />
        </NavLink>

        <nav
          id="primary-navigation"
          className="navbar-content"
          aria-label="Main navigation"
        >
          {links.map(({ to, label }) => (
            <NavLink key={to} className="navbar-link" to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
