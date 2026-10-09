import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./UpcomingShows.css";

const DUMMY_IMAGE =
  "https://cdn.dribbble.com/userupload/48226535/file/9e312ca061748d2ceb0b9709c6dca265.jpeg";

const SHOWS = [
  {
    id: 1,
    name: "Anyma",
    date: "Nov 21, 2026",
    city: "Mumbai",
    venue: "Mahalaxmi Racecourse",
    link: "#",
    image: DUMMY_IMAGE,
    poster: {
      from: "#C9B6FF",
      to: "#4B2FA8",
      title: "Anyma",
      sub: "Aeden Mumbai",
    },
  },
  {
    id: 2,
    name: "Adam Port",
    date: "Dec 05, 2026",
    city: "Bengaluru",
    venue: "Embassy Grounds",
    link: "#",
    image: DUMMY_IMAGE,
    poster: {
      from: "#FFD3B0",
      to: "#E0562B",
      title: "Adam Port",
      sub: "Live in Bengaluru",
    },
  },
  {
    id: 3,
    name: "Francis Mercier",
    date: "Dec 12, 2026",
    city: "Goa",
    venue: "Vagator Beach",
    link: "#",
    image: DUMMY_IMAGE,
    poster: {
      from: "#B7F0E0",
      to: "#0E7C7B",
      title: "Francis Mercier",
      sub: "Sunset Session",
    },
  },
  {
    id: 4,
    name: "DJ Snake",
    date: "Dec 19, 2026",
    city: "Delhi NCR",
    venue: "Jawaharlal Nehru Stadium",
    link: "#",
    image: DUMMY_IMAGE,
    poster: {
      from: "#FFC2DA",
      to: "#B3135F",
      title: "DJ Snake",
      sub: "Delhi Night",
    },
  },
  {
    id: 5,
    name: "Alesso",
    date: "Dec 27, 2026",
    city: "Pune",
    venue: "Koregaon Park Arena",
    link: "#",
    image: DUMMY_IMAGE,
    poster: {
      from: "#BFD8FF",
      to: "#1B4DB3",
      title: "Alesso",
      sub: "Pune Live",
    },
  },
  {
    id: 6,
    name: "Sunburn Festival",
    date: "Dec 28, 2026",
    city: "Goa",
    venue: "Vagator",
    link: "#",
    image: DUMMY_IMAGE,
    poster: {
      from: "#FFF0A8",
      to: "#D98A00",
      title: "Sunburn",
      sub: "Festival 2026",
    },
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
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const activeIndexRef = useRef(-1);
  const zRef = useRef(1);
  const setters = useRef({});
  const lastX = useRef(0);
  const resetTimer = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      // Cursor-following setup for the preview card
      gsap.set(previewRef.current, {
        xPercent: -50,
        yPercent: -50,
        scale: 0.6,
        autoAlpha: 0,
      });

      setters.current = {
        x: gsap.quickTo(previewRef.current, "x", {
          duration: 0.6,
          ease: "power3.out",
        }),
        y: gsap.quickTo(previewRef.current, "y", {
          duration: 0.6,
          ease: "power3.out",
        }),
        rotate: gsap.quickTo(previewRef.current, "rotation", {
          duration: 0.5,
          ease: "power3.out",
        }),
      };

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
      clearTimeout(resetTimer.current);
      ctx.revert();
    };
  }, []);

  const showPreview = (index) => {
    const rows = listRef.current.querySelectorAll(".us-row");
    const posters = previewRef.current.querySelectorAll(".us-poster");
    const prev = activeIndexRef.current;

    // Dim others, light up current
    rows.forEach((row, i) => {
      const isActive = i === index;
      gsap.to(row.querySelector(".us-name"), {
        x: isActive ? 20 : 0,
        color: isActive ? "#B79CFF" : "#FFFFFF",
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(row.querySelectorAll(".us-meta, .us-arrow"), {
        opacity: isActive ? 1 : 0.3,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
      gsap.to(row.querySelector(".us-name"), {
        opacity: isActive ? 1 : 0.35,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(row.querySelector(".us-fill"), {
        scaleY: isActive ? 1 : 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(row.querySelector(".us-arrow-icon"), {
        rotate: isActive ? 45 : 0,
        duration: 0.5,
        ease: "back.out(2)",
        overwrite: true,
      });
    });

    // Reveal the matching poster on top of the stack
    if (prev !== index) {
      zRef.current += 1;
      gsap.set(posters[index], { zIndex: zRef.current });
      gsap.fromTo(
        posters[index],
        { clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 0.7,
          ease: "power4.out",
        },
      );
    }

    activeIndexRef.current = index;

    gsap.to(previewRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.55,
      ease: "back.out(1.6)",
      overwrite: "auto",
    });
  };

  const hidePreview = () => {
    activeIndexRef.current = -1;
    const rows = listRef.current.querySelectorAll(".us-row");

    rows.forEach((row) => {
      gsap.to(row.querySelector(".us-name"), {
        x: 0,
        opacity: 1,
        color: "#FFFFFF",
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(row.querySelectorAll(".us-meta, .us-arrow"), {
        opacity: 1,
        duration: 0.4,
        overwrite: true,
      });
      gsap.to(row.querySelector(".us-fill"), {
        scaleY: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(row.querySelector(".us-arrow-icon"), {
        rotate: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });
    });

    gsap.to(previewRef.current, {
      autoAlpha: 0,
      scale: 0.6,
      rotation: 0,
      duration: 0.4,
      ease: "power3.in",
      overwrite: "auto",
    });
  };

  const handleMove = (e) => {
    const { x, y, rotate } = setters.current;
    if (!x) return;

    x(e.clientX + 40);
    y(e.clientY);

    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    rotate(gsap.utils.clamp(-12, 12, dx * 0.6));

    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => rotate(0), 90);
  };

  const handleFocus = (index, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { x, y } = setters.current;
    if (x) {
      x(rect.left + rect.width * 0.55);
      y(rect.top + rect.height / 2);
    }
    showPreview(index);
  };

  return (
    <section className="us-section" ref={rootRef}>
      <div className="us-container">
        <header className="us-header">
          <h2 className="us-title">
            <span className="us-title-mask">
              <span className="us-title-inner">About Dopamine</span>
            </span>
          </h2>
        </header>

        <div className="us-divider" />

        <ul
          className="us-list"
          ref={listRef}
          onMouseMove={handleMove}
          onMouseEnter={(e) => {
            lastX.current = e.clientX;
          }}
          onMouseLeave={hidePreview}
        >
          {SHOWS.map((show, index) => (
            <li className="us-item" key={show.id}>
              <a
                className="us-row"
                href={show.link}
                onMouseEnter={() => showPreview(index)}
                onFocus={(e) => handleFocus(index, e)}
                onBlur={hidePreview}
              >
                <span className="us-fill" />
                <span className="us-row-mask">
                  <span className="us-row-inner">
                    <span className="us-name">{show.name}</span>
                    <span className="us-meta">
                      <span className="us-date">{show.date}</span>
                      <span className="us-city">{show.city}</span>
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
      </div>

      <div className="us-preview" ref={previewRef} aria-hidden="true">
        {SHOWS.map((show) => (
          <div className="us-poster" key={show.id}>
            {show.image ? (
              <img className="us-poster-img" src={show.image} alt="" />
            ) : (
              <div
                className="us-poster-art"
                style={{
                  background: `linear-gradient(160deg, ${show.poster.from} 0%, ${show.poster.to} 100%)`,
                }}
              >
                <span className="us-poster-orb" />
                <span className="us-poster-title">{show.poster.title}</span>
                <span className="us-poster-sub">{show.poster.sub}</span>
                <span className="us-poster-foot">
                  {show.date} - {show.venue}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
