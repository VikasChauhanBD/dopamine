import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./CountdownTimer.css";
// import GRG from "../../../assets/grg.png";
import CB from "../../../assets/images/corebtr-w.png";
import VJ from "../../../assets/images/vj-w.png";
import EC from "../../../assets/images/ec-w.png";
import GRG from "../../../assets/images/grg-w.png";

const TARGET_DATE = "2026-11-14T00:00:00";

const logos = [
  {
    src: VJ,
    alt: "Vidya Jeevan Logo",
  },
  {
    src: EC,
    alt: "eConceptual Logo",
  },
  {
    src: CB,
    alt: "CoreBTR Logo",
  },
  { src: GRG, alt: "GRG Logo" },
];

function getTimeRemaining(targetDate) {
  const difference = Math.max(0, new Date(targetDate).getTime() - Date.now());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    completed: difference === 0,
  };
}

function CountdownTimer({
  title = "14 November 2026",
  subTitle = "GET HIGH ON LIFE IN",
  targetDate = TARGET_DATE,
  buttonText = "Register now",
  buttonLink = "/",
}) {
  const [time, setTime] = useState(() => getTimeRemaining(targetDate));

  // Marquee
  const contentRef = useRef(null);
  const groupRef = useRef(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const updateTimer = () => setTime(getTimeRemaining(targetDate));
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    if (!contentRef.current) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) return;

    const tween = gsap.to(contentRef.current, {
      xPercent: -50,
      duration: 30,
      repeat: -1,
      ease: "none",
      force3D: true,
    });

    return () => tween.kill();
  }, []);

  return (
    <section className="countdown-section">
      <div className="countdown-container">
        <div className="countdown-content">
          <div className="countdown-heading">
            <h2 className="countdown-title">{title}</h2>
            <h3 className="countdown-sub-title">{subTitle}</h3>
          </div>

          {time.completed ? (
            <p className="countdown-completed">The countdown has ended!</p>
          ) : (
            <div
              className="countdown-timer"
              role="timer"
              aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds remaining`}
            >
              {[
                ["days", "Days"],
                ["hours", "Hours"],
                ["minutes", "Minutes"],
                ["seconds", "Seconds"],
              ].map(([key, label], i) => (
                <React.Fragment key={key}>
                  {i > 0 && <span className="countdown-separator">:</span>}
                  <div className="countdown-unit">
                    <span className="countdown-number">
                      {String(time[key]).padStart(2, "0")}
                    </span>
                    <span className="countdown-label">{label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}

          <a className="countdown-button" href={buttonLink}>
            {buttonText}
          </a>
        </div>
      </div>

      {/* Marquee — transparent, uses .countdown-section background */}

      <div className="cd-marquee-container">
        <div className="cd-marquee-track">
          <div className="cd-marquee-content" ref={contentRef}>
            {[0, 1].map((groupIndex) => (
              <div
                className="cd-marquee-group"
                key={groupIndex}
                aria-hidden={groupIndex === 1}
              >
                {logos.map((logo, index) => (
                  <div
                    className="cd-marquee-line"
                    key={`${groupIndex}-${index}`}
                  >
                    <img
                      src={logo.src}
                      alt={groupIndex === 0 ? logo.alt : ""}
                      loading="eager"
                      decoding="async"
                      draggable="false"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CountdownTimer;
