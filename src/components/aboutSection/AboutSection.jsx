import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./AboutSection.css";

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
      }).from(
        ".about-section-para",
        {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="about-section-main">
      <div className="about-section-bg"></div>

      <div className="about-section-content">
        <h2 className="about-section-heading">Felicitation Ceremony</h2>

        <p className="about-section-para">
          A celebration of dedication, perseverance, and success.
          <br />
          Join us as we honour the remarkable achievements of NEET PG, INI-CET &
          FMGE aspirants who turned their dreams into reality through relentless
          effort and determination. This is more than a felicitation - it is a
          celebration of the journey, the hard work, and the milestones that
          made their success possible.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
