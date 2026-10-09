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
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".about-section-content", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }).from(
        ".about-section-image",
        {
          x: 60,
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
      <div className="about-section-layout">
        <div className="about-section-content">
          <h2 className="about-section-heading">Mentor Section</h2>

          <p className="about-section-para">
            A celebration of dedication, perseverance, and success. Join us as
            we honour the remarkable achievements of NEET PG, INI-CET & FMGE
            aspirants who turned their dreams into reality through relentless
            effort and determination. This is more than a felicitation - it is a
            celebration of the journey, the hard work, and the milestones that
            made their success possible.
          </p>
        </div>

        <div className="about-section-image">
          <img
            src="https://cdn.dribbble.com/userupload/49269267/file/0803a3aeaeb80f99df6eb39e29ee64f5.png"
            alt="Dopamine felicitation celebration"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
