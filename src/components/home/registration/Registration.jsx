import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import "./Registration.css";

function Registration() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".ticket-wrapper", {
        y: 100,
        opacity: 0,
        rotation: 3,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".ticket-contact > div", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.5,
        ease: "power3.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section className="registration-section" ref={sectionRef}>
      <div className="registration-header">
        <span>THE CELEBRATION AWAITS</span>

        <h2>
          Your Ticket to
          <strong> Dopamine.</strong>
        </h2>

        <p>
          Join us for an unforgettable celebration of dedication, perseverance
          and achievement.
        </p>
      </div>

      <div className="ticket-wrapper">
        <div className="ticket-main">
          <div className="ticket-top">
            <div>
              <span className="ticket-label">FELICITATION CEREMONY</span>
              <h3>DOPAMINE</h3>
              <p>High On Life</p>
            </div>

            <div className="ticket-number">
              <span>ENTRY PASS</span>
              <strong>2026</strong>
            </div>
          </div>

          <div className="ticket-details">
            <div className="ticket-detail">
              <div className="ticket-icon">
                <FaCalendarAlt />
              </div>

              <div>
                <span>DATE</span>
                <strong>14 November 2026</strong>
              </div>
            </div>

            <div className="ticket-detail">
              <div className="ticket-icon">
                <FaClock />
              </div>

              <div>
                <span>TIME</span>
                <strong>2 PM Onwards</strong>
              </div>
            </div>

            <div className="ticket-detail ticket-venue">
              <div className="ticket-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <span>VENUE</span>
                <strong>Vidya Jeevan, Greater Noida</strong>
              </div>
            </div>
          </div>

          <div className="ticket-bottom">
            <div className="ticket-contact">
              <div>
                <FaPhoneAlt />
                <span>+91 98765 43210</span>
              </div>

              <div>
                <FaWhatsapp />
                <span>+91 98765 43210</span>
              </div>

              <div>
                <FaEnvelope />
                <span>hello@dopamineevent.com</span>
              </div>
            </div>

            <a href="#registration" className="ticket-button">
              <span>Register Now</span>
              <FaArrowRight />
            </a>
          </div>
        </div>

        <div className="ticket-divider">
          <span></span>
        </div>

        <div className="ticket-stub">
          <span className="stub-label">DOPAMINE</span>

          <div className="stub-content">
            <span>14 NOV</span>
            <strong>2026</strong>
          </div>

          <div className="barcode">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>

          <span className="stub-bottom">VIP ENTRY</span>
        </div>
      </div>
    </section>
  );
}

export default Registration;
