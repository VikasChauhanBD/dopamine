import React, { useRef } from "react";
import "./Navbar.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiMenu3Fill, RiCloseLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

function Navbar() {
  const tl = useRef();

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });

    gsap.from(".navbar-section", {
      y: -50,
      duration: 1,
      delay: 0.5,
      opacity: 0,
    });

    tl.current.to(".navbar-content", {
      x: 0,
      duration: 0.25,
    });

    tl.current.from(".navbar-content .navbar-link", {
      x: 150,
      duration: 0.25,
      stagger: 0.25,
      opacity: 0,
    });

    tl.current.from(".navbar-content .navbar-close", {
      x: "100%",
      duration: 0.25,
      opacity: 0,
    });
  });

  // Close Navbar Function
  const closeNavbar = () => {
    tl.current.reverse();
  };

  return (
    <header className="navbar-container">
      <div className="navbar-section">
        <NavLink to="/">
          {/* <img src={Logo} alt="logo" /> */}
          <h2>DOPAMINE</h2>
        </NavLink>

        <p onClick={() => tl.current.play()}>
          <RiMenu3Fill />
        </p>
      </div>

      <nav className="navbar-content">
        <NavLink className="navbar-link" to="/" onClick={closeNavbar}>
          Home
        </NavLink>

        <NavLink className="navbar-link" to="/about" onClick={closeNavbar}>
          About
        </NavLink>

        <NavLink className="navbar-link" to="/projects" onClick={closeNavbar}>
          Projects
        </NavLink>

        <NavLink className="navbar-link" to="/contact" onClick={closeNavbar}>
          Contact
        </NavLink>

        <RiCloseLine className="navbar-close" onClick={closeNavbar} />
      </nav>
    </header>
  );
}

export default Navbar;
