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

      tl.from(".hero-title", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })
        .from(
          ".hero-sub-title",
          {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          ".hero-para",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
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
            src="https://cdn.dribbble.com/userupload/49255045/file/b53fa6e9499e5f19af4a9d2be1315613.mp4"
            type="video/mp4"
          />
        </video>

        <div className="video-overlay"></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">DOPAMINE</h1>

        <h2 className="hero-sub-title">High On Life</h2>

        <p className="hero-para">
          A Felicitation Ceremony for
          <br />
          NEET PG . INI-CET . FMGE 2026 Achievers
        </p>

        <p className="hero-tag">
          “Kahani tumhari thi… or tumne kiya kamaal likhi.”
        </p>
      </div>
    </section>
  );
}

export default VideoHero;
