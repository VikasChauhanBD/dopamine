import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./UpcomingShows.css";

const CTA_LINK = "#"; // <- put the "Get To Know Dopamine" page link here

const SHOWS = [
  {
    id: 1,
    num: "1",
    name: "THE RANKERS' SPOTLIGHT",
    description:
      "A celebration of milestones, hard work, and the people behind the ranks.",
    link: "#",
  },
  {
    id: 2,
    num: "2",
    name: "THE FOOD LINEUP",
    description:
      "From Purani Dilli chaat to global flavours, fast-food favourites, and lunch and dinner buffets. Come hungry.",
    link: "#",
  },
  {
    id: 3,
    num: "3",
    name: "PLAY MODE: ON",
    description:
      "Games, activities, and a chance to give your brain a break from being a medical student.",
    link: "#",
  },
  {
    id: 4,
    num: "4",
    name: "THE DANCE FLOOR CALLS",
    description:
      "The DJ's on, your favourite tracks are playing, and the rest is up to you.",
    link: "#",
  },
  {
    id: 5,
    num: "4",
    name: "THE FLOOR IS YOURS",
    description:
      "Dr. Zainab, Dr. Ravi, Dr. GRG and Dr. Apurv come together on one stage, with students invited to sing, dance, perform, or surprise us with something entirely their own.",
    link: "#",
  },
];
function ArrowIcon() {
  return (
    <svg
      className="us-arrow-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function UpcomingShows() {
  const rootRef = useRef(null);
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      // One orchestrated entrance
      if (!reduceMotion) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".us-title-inner", { yPercent: 110, duration: 1.1 })
          .from(".us-label", { autoAlpha: 0, y: 12, duration: 0.7 }, "-=0.8")
          .from(
            ".us-divider",
            { scaleX: 0, transformOrigin: "left center", duration: 1.1 },
            "-=0.9",
          )
          .from(
            ".us-row-inner",
            { yPercent: 105, duration: 0.9, stagger: 0.08 },
            "-=0.7",
          )
          .from(
            ".us-row-line",
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.9,
              stagger: 0.08,
            },
            "<",
          );
      }
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="us-section" ref={rootRef}>
      <div className="us-container">
        <header className="us-header">
          <h2 className="us-title">
            <span className="us-title-mask">
              <span className="us-title-inner">Attractions</span>
            </span>
          </h2>
          <p className="us-intro us-label">
            One big get-together. A whole lot happening. And absolutely no
            reason to spend the day wondering what to do next.
          </p>
        </header>

        <div className="us-divider" />

        <ul className="us-list">
          {SHOWS.map((show) => (
            <li className="us-item" key={show.id}>
              <a
                className="us-row"
                href={show.link}
              >
                <span className="us-fill" />
                <span className="us-row-mask">
                  <span className="us-row-inner">
                    <span className="us-name">
                      <span className="us-num">{show.num}.</span>
                      {show.name}
                    </span>
                    <span className="us-meta">
                      <span className="us-desc">{show.description}</span>
                    </span>
                    <span className="us-arrow">
                      <ArrowIcon />
                    </span>
                  </span>
                </span>
                <span className="us-row-line" />
              </a>
            </li>
          ))}
        </ul>

        <div className="us-cta">
          <a className="us-cta-link" href={CTA_LINK}>
            Get To Know Dopamine →
          </a>
        </div>
      </div>

    </section>
  );
}
