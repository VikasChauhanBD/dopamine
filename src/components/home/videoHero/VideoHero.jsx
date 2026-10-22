import React, { useState, useRef } from "react";
import "./VideoHero.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function VideoHero() {
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef(null);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        delay: 0.3,
      });

      tl.from(".hero-presenter", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          ".hero-title",
          {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.3",
        )
        .from(
          ".hero-sub-title",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".hero-date",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".hero-para",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".hero-tag",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        );
    },
    {
      scope: heroRef,
    },
  );

  return (
    <section ref={heroRef} className="video-hero-section">
      <div className="video-background">
        {isLoading && (
          <div className="video-loading">
            <div className="spinner"></div>
            <p className="loading-text">Loading...</p>
          </div>
        )}

        <video
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          preload="auto"
        >
          <source
            src="https://cdn.dribbble.com/userupload/49393852/file/large-efb28af6957697411b6cc7054f3a675e.mp4"
            type="video/mp4"
          />
        </video>

        <div className="video-overlay"></div>
      </div>

      <div className="hero-content">
        <p className="hero-presenter">VIDYA JEEVAN PRESENTS</p>

        <h1 className="hero-title">DOPAMINE</h1>

        <h2 className="hero-sub-title">Get High On Life.</h2>

        <p className="hero-date">14 NOVEMBER 2026</p>

        <p className="hero-tag">Your people. Your music. Your moment.</p>

        <p className="hero-para">
          An evening of live music, DJ, games, food, entertainment
          <br className="desktop-break" /> and a felicitation ceremony for the
          stars of the day.
        </p>

        <a href="#event-details" className="hero-cta">
          LET'S GET INTO IT <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

export default VideoHero;
