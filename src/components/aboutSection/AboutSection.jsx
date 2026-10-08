import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutSection.css";

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".about-section-heading", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".about-section-para",
          {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".about-section-logos img",
          {
            y: 50,
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="about-section-main">
      <div className="about-section-bg"></div>

      <div className="about-section-content">
        <h2 className="about-section-heading">About Dopamine</h2>

        <p className="about-section-para">
          A celebration of dedication, perseverance, and success.
          <br />
          Join us as we honour the remarkable achievements of NEET PG, INI-CET &
          FMGE aspirants who turned their dreams into reality through relentless
          effort and determination. This is more than a felicitation - it is a
          celebration of the journey, the hard work, and the milestones that
          made their success possible.
        </p>

        <div className="about-section-logos">
          <div className="about-logo image-filter">
            <img
              src="https://vidyajeevan.com/wp-content/uploads/2025/04/Apurv-3.webp"
              alt="Vidyajeevan Logo"
            />
          </div>

          <div className="about-logo image-filter">
            <img
              src="https://econceptual.com/wp-content/uploads/2025/12/eC-logo.png"
              alt="eConceptual Logo"
            />
          </div>

          <div className="about-logo about-logo-wide image-filter">
            <img
              src="https://cdn.dribbble.com/userupload/47577791/file/25dd269a09491e2a44c8437764fb5473.png"
              alt="coreBTR Logo"
            />
          </div>

          <div className="about-logo about-logo-large">
            <img
              src="https://cdn.dribbble.com/userupload/49243456/file/6a33c9e10c12af9bd7e77302ab6f4c10.png"
              alt="Partner Logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
