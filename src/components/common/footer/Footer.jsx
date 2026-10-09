import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "/", active: true },
    { name: "Registration", href: "/registration" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
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
            <span>DOPAMINE</span>
            <span className="festival-footer-tagline">High On Life</span>
          </a>
        </div>

        <div className="festival-footer-navigation">
          <nav className="festival-footer-links" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={link.active ? "active" : ""}
              >
                {link.name}
              </a>
            ))}
          </nav>

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
        </div>
        <div className="festival-footer-bottom">
          <p>Dopamine © {new Date().getFullYear()}. All Rights Reserved.</p>

          <a
            href="https://believersdestination.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="festival-footer-credit"
          >
            | Designed & Managed By: Believers Destination Pvt Ltd
            <FaArrowUpRightFromSquare />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
