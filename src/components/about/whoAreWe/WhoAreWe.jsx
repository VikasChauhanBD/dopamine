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
                EXPLORE THE EXPERIENCE | EXPLORE THE EXPERIENCE |
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
          <h2 className="who-title">THE RANKERS' SPOTLIGHT</h2>
          <h3 className="who-sub-title">YOUR MILESTONE. YOUR MOMENT. </h3>

          <div className="who-text">
            <p>
              Every result has a story behind it. At DOPAMINE, we're bringing
              our achievers together to celebrate the hard work, determination,
              and milestones that made this year special.
            </p>

            <p className="who-highlight">
              NEET-PG 2026 · INI-CET MAY & NOVEMBER 2026 · FMGE JUNE & OCTOBER
              2026
            </p>

            <p>
              At DOPAMINE, we're celebrating students who've achieved these
              milestones in the 2026 PG Medical Examinations.
            </p>

            <ul>
              <li>NEET-PG 2026: All India Rank up to 10,000</li>
              <li>INI-CET May 2026: All India Rank up to 1,000</li>
              <li>INI-CET November 2026: All India Rank up to 1,000</li>
              <li>FMGE June 2026: All candidates who qualified</li>
            </ul>

            <p>
              For November INI-CET 2026 and October FMGE 2026, registrations
              will open once the respective results are announced.
            </p>

            <p>
              <em>Policies and rules will be announced here.</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
