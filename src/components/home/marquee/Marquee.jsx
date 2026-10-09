import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Marquee.css";

const logos = [
  {
    src: "https://vidyajeevan.com/wp-content/uploads/2025/04/Apurv-3.webp",
    alt: "Vidya Jeevan Logo",
  },
  {
    src: "https://econceptual.com/wp-content/uploads/2025/12/eC-logo.png",
    alt: "eConceptual Logo",
  },
  {
    src: "https://cdn.dribbble.com/userupload/47577791/file/25dd269a09491e2a44c8437764fb5473.png",
    alt: "CoreBTR Logo",
  },
  {
    src: "https://cdn.dribbble.com/userupload/49243456/file/6a33c9e10c12af9bd7e77302ab6f4c10.png",
    alt: "Partner Logo",
  },
];

function Marquee() {
  const groupRef = useRef(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const calculateCopies = () => {
      if (!groupRef.current) return;

      const groupWidth = groupRef.current.offsetWidth;
      if (!groupWidth) return;

      const requiredCopies = Math.ceil(window.innerWidth / groupWidth) + 2;

      setCopies((current) =>
        current === requiredCopies ? current : requiredCopies,
      );
    };

    calculateCopies();
    window.addEventListener("resize", calculateCopies);

    return () => {
      window.removeEventListener("resize", calculateCopies);
    };
  }, []);

  useEffect(() => {
    if (!groupRef.current) return;

    const groupWidth = groupRef.current.offsetWidth;
    if (!groupWidth) return;

    const tween = gsap.to(".marquee-content", {
      x: -groupWidth,
      duration: 15,
      repeat: -1,
      ease: "none",
    });

    return () => tween.kill();
  }, [copies]);

  return (
    <section className="marquee-container">
      <div className="marquee-track">
        <div className="marquee-content">
          {Array.from({ length: copies }, (_, groupIndex) => (
            <div
              className="marquee-group"
              key={groupIndex}
              ref={groupIndex === 0 ? groupRef : null}
              aria-hidden={groupIndex !== 0}
            >
              {logos.map((logo, index) => (
                <div className="marquee-line" key={`${groupIndex}-${index}`}>
                  <img src={logo.src} alt={groupIndex === 0 ? logo.alt : ""} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Marquee;
