import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./EventsShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const EVENTS = [
  {
    id: "anyma",
    day: "SUN",
    date: "20",
    start: "2026-12-20",
    time: "December 20, 2026 · 4:00 PM – 10:00 PM",
    title: "Sunburn Arena ft. The Chainsmokers",
    location: "Bangalore, India",
    description:
      "Don't worry Bengaluru – we got you covered. The Chainsmokers are coming this 20th Dec, 2026.",
    image:
      "https://sunburn.in/wp-content/uploads/2026/09/ANYMA-website-02-1-2048x1152.jpg",
  },
  {
    id: "adam-port",
    day: "THU",
    date: "24",
    start: "2026-12-24",
    time: "December 24–26, 2026 · 4:00 PM – 10:00 PM",
    title: "Francis Mercier – India Tour",
    location: "Mumbai · Hyderabad, India",
    description:
      "Get ready to lose yourself in an electrifying journey of deep melodies, powerful beats, and euphoric energy as Francis Mercier takes over the decks in India this December.",
    image:
      "https://sunburn.in/wp-content/uploads/2026/08/1920x1080-Adam-Port-Tour-Mutlicity-1.jpg",
  },
];

const MARQUEE_WORDS = [
  "LIVE",
  "SUNBURN",
  "ARENA",
  "DEC 2026",
  "INDIA TOUR",
  "FEEL THE BEAT",
];

const daysUntil = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(`${date}T00:00:00`);
  return Math.max(0, Math.ceil((eventDate - today) / 86400000));
};

const CalendarIcon = () => (
  <svg className="ev-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="3"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M3 10h18M8 3v4M16 3v4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const PinIcon = () => (
  <svg className="ev-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="ev-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function EventsShowcase() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const listenerCleanups = [];

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".ev-eyebrow", { y: 18, opacity: 0, duration: 0.6 })
        .from(
          ".ev-heading-line > span",
          { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.12 },
          "-=0.25",
        )
        .from(
          ".ev-header-rule",
          { scaleX: 0, transformOrigin: "left center", duration: 0.8 },
          "-=0.35",
        );

      const marqueeTrack = root.querySelector(".ev-marquee-track");
      if (marqueeTrack) {
        gsap.to(marqueeTrack, {
          xPercent: -50,
          duration: 28,
          ease: "none",
          repeat: -1,
        });
      }

      root.querySelectorAll(".ev-row").forEach((row) => {
        gsap.from(row.querySelectorAll(".ev-date, .ev-body"), {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            once: true,
          },
        });

        gsap.from(row.querySelector(".ev-media"), {
          x: 35,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            once: true,
          },
        });

        const media = row.querySelector(".ev-media");
        const onMove = (event) => {
          const bounds = media.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;

          gsap.to(media, {
            rotateY: x * 4,
            rotateX: -y * 4,
            duration: 0.35,
            ease: "power2.out",
            transformPerspective: 900,
          });
        };
        const onLeave = () => {
          gsap.to(media, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        media.addEventListener("mousemove", onMove);
        media.addEventListener("mouseleave", onLeave);

        listenerCleanups.push(() => {
          media.removeEventListener("mousemove", onMove);
          media.removeEventListener("mouseleave", onLeave);
        });
      });
    }, root);

    return () => {
      ctx.revert();
      listenerCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  const marqueeItems = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <section className="ev" ref={rootRef}>
      <div className="ev-container">
        <header className="ev-header">
          <p className="ev-eyebrow">
            <span className="ev-eyebrow-dot" />
            Upcoming Experiences
          </p>
          <h2 className="ev-heading">
            <span className="ev-heading-line">
              <span>Live events,</span>
            </span>
            <span className="ev-heading-line">
              <span className="ev-heading-accent">unforgettable</span> nights
            </span>
          </h2>
          <div className="ev-header-rule" />
        </header>
      </div>

      <div className="ev-marquee" aria-hidden="true">
        <div className="ev-marquee-track">
          {marqueeItems.map((word, index) => (
            <span className="ev-marquee-item" key={`${word}-${index}`}>
              {word}
              <i className="ev-marquee-star">✦</i>
            </span>
          ))}
        </div>
      </div>

      <div className="ev-container">
        <div className="ev-list">
          {EVENTS.map((event) => (
            <article className="ev-row" key={event.id}>
              <div
                className="ev-date"
                aria-label={`${event.day} ${event.date}`}
              >
                <span className="ev-date-day">{event.day}</span>
                <span className="ev-date-num">{event.date}</span>
              </div>

              <div className="ev-body">
                <div className="ev-meta">
                  <CalendarIcon />
                  <span>{event.time}</span>
                </div>

                <h3 className="ev-title">{event.title}</h3>

                <p className="ev-location">
                  <PinIcon />
                  <span>{event.location}</span>
                </p>

                <p className="ev-desc">{event.description}</p>

                <div className="ev-actions">
                  <a
                    href="https://sunburn.in/events/"
                    className="ev-btn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="ev-btn-bg" />
                    <span className="ev-btn-label">Get Tickets</span>
                    <ArrowIcon />
                  </a>
                  <span className="ev-countdown">
                    <b>{daysUntil(event.start)}</b> days to go
                  </span>
                </div>
              </div>

              <div className="ev-media">
                <img
                  className="ev-media-image"
                  src={event.image}
                  alt={`${event.title} event visual`}
                  loading="lazy"
                />
                <span className="ev-chip">
                  <b>{event.date}</b>
                  <small>DEC</small>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* <div className="ev-more">
          <a
            href="https://sunburn.in/events/"
            target="_blank"
            rel="noreferrer"
            className="ev-more-link"
          >
            Explore all events
            <ArrowIcon />
          </a>
        </div> */}
      </div>
    </section>
  );
}
