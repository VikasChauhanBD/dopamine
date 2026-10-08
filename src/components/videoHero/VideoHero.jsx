import React, { useState } from "react";
import "./VideoHero.css";

function VideoHero() {
  const [isLoading, setIsLoading] = useState(true);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  return (
    <section className="video-hero-section">
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
          NEET PG . INI-CET . FMGE June 2026 Achievers
        </p>
      </div>
    </section>
  );
}

export default VideoHero;
