import React from "react";
import "./WhoAreWe.css";

const WhoAreWe = () => {
  return (
    <section className="who-section">
      <div className="who-inner">
        {/* Left: rotating circle badge */}
        <div className="who-badge">
          <svg
            className="who-badge-ring"
            viewBox="0 0 330 330"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <path
                id="who-circle-path"
                d="M 165,165 m -134,0 a 134,134 0 1,1 268,0 a 134,134 0 1,1 -268,0"
              />
            </defs>

            {/* Outer thin circle */}
            <circle
              cx="165"
              cy="165"
              r="164"
              fill="none"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1"
            />

            {/* Inner thin circle */}
            <circle
              cx="165"
              cy="165"
              r="112"
              fill="none"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1"
            />

            {/* Circular text */}
            <text className="who-badge-text">
              <textPath
                href="#who-circle-path"
                startOffset="0"
                textLength="835"
                lengthAdjust="spacing"
              >
                ASIA'S LARGEST MUSIC FESTIVAL IS BACK TO GOA. BUY TICKETS NOW!
              </textPath>
            </text>
          </svg>

          {/* Center arrow (stays still) */}
          <svg
            className="who-badge-arrow"
            viewBox="0 0 60 60"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 6 H36 L28 14 L52 38 L38 52 L14 28 L6 36 Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Right: content */}
        <div className="who-content">
          <h2 className="who-title">HOME TO ASIA'S LARGEST MUSIC FESTIVAL</h2>

          <p className="who-text">
            With a legacy that dates back from 2007, Sunburn has hosted some of
            the biggest shows across India and has been a parent entertainment
            property to have curated some of the celebrated names from the
            World. With our vision and mission as a Music Festival – we have had
            the privilege of contributing a large piece in building up the
            nightlife and concert industry in India.
          </p>

          <button type="button" className="who-button">
            Follow Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
