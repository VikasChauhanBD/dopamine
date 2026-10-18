import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import logo from "../../../assets/images/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar-container">
      <div className="navbar-section">
        <NavLink
          className="navbar-brand"
          to="/"
          aria-label="Dopamine home"
          onClick={closeMenu}
        >
          <img src={logo} alt="Dopamine logo" />
        </NavLink>

        <button
          className="navbar-toggle"
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav
          id="primary-navigation"
          className={`navbar-content ${menuOpen ? "navbar-content-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              className="navbar-link"
              to={to}
              end={to === "/"}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}

          <NavLink
            className="navbar-contact-mobile"
            to="/registration"
            onClick={closeMenu}
          >
            Register Now <FiArrowUpRight />
          </NavLink>
        </nav>

        <NavLink className="navbar-contact" to="/registration">
          Register Now <FiArrowUpRight />
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
