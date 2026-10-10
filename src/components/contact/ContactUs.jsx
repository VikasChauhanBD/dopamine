import React, { useEffect } from "react";
import "./ContactUs.css";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

function ContactUs() {
  return (
    <div className="help-center">
      <div className="help-card">
        <h1>Contact US</h1>

        <div className="contact-row">
          <a className="contact-card call-card" href="tel:+919876543210">
            <div className="contact-icon">
              <BsTelephoneFill />
            </div>

            <span className="contact-label">VOICE CALL</span>

            <h3>+91-9876543210</h3>
          </a>

          <a
            className="contact-card whatsapp-card"
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="contact-icon">
              <FaWhatsapp />
            </div>

            <span className="contact-label">WHATSAPP SUPPORT</span>

            <h3>+91-9876543210</h3>
          </a>

          <a
            className="contact-card email-card"
            href="mailto:example@gmail.com"
          >
            <div className="contact-icon">
              <MdEmail />
            </div>

            <span className="contact-label">EMAIL SUPPORT</span>

            <h3>example@gmail.com</h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
