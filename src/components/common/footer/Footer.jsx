import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import "./Footer.css";
import logo from "../../../assets/images/logo.png";

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    // { name: "Registration", href: "/registration" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/",
      icon: <FaFacebookF />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      icon: <FaInstagram />,
    },
    {
      name: "X",
      href: "https://x.com/",
      icon: <FaXTwitter />,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/",
      icon: <FaYoutube />,
    },
  ];

  return (
    <footer className="festival-footer">
      <div className="festival-footer-container">
        <div className="festival-footer-brand">
          <a href="/" className="festival-footer-logo">
            <img src={logo} alt="Dopamine Logo" />
          </a>
        </div>

        <div className="festival-footer-navigation">
          <nav className="festival-footer-links" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social links
          <div className="festival-footer-socials">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="festival-social-link"
              >
                {social.icon}
              </a>
            ))}
          </div>
          */}
        </div>

        <div className="festival-footer-bottom">
          <p>Dopamine © {new Date().getFullYear()}. All Rights Reserved.</p>

          <a
            href="https://believersdestination.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="festival-footer-credit"
          >
            | Designed &amp; Managed By: Believers Destination Pvt Ltd
            <FaArrowUpRightFromSquare />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
