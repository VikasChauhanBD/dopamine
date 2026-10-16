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
    image: "https://vidyajeevan.com/wp-content/uploads/2025/12/DSC01767.jpg",
    poster: {
      from: "#C9B6FF",
      to: "#4B2FA8",
      title: "The Rankers' Spotlight",
      sub: "Attractions",
    },
  },
  {
    id: 2,
    num: "2",
    name: "THE FOOD LINEUP",
    description:
      "From Purani Dilli chaat to global flavours, fast-food favourites, and lunch and dinner buffets. Come hungry.",
    link: "#",
    image: "https://vidyajeevan.com/wp-content/uploads/2025/12/DSC07136.jpg",
    poster: {
      from: "#FFD3B0",
      to: "#E0562B",
      title: "The Food Lineup",
      sub: "Attractions",
    },
  },
  {
    id: 3,
    num: "3",
    name: "PLAY MODE: ON",
    description:
      "Games, activities, and a chance to give your brain a break from being a medical student.",
    link: "#",
    image: "https://vidyajeevan.com/wp-content/uploads/2025/12/DSC07080.jpg",
    poster: {
      from: "#B7F0E0",
      to: "#0E7C7B",
      title: "Play Mode: On",
      sub: "Attractions",
    },
  },
  {
    id: 4,
    num: "4",
    name: "THE DANCE FLOOR CALLS",
    description:
      "The DJ's on, your favourite tracks are playing, and the rest is up to you.",
    link: "#",
    image: "https://vidyajeevan.com/wp-content/uploads/2025/12/DSC07097.jpg",
    poster: {
      from: "#FFC2DA",
      to: "#B3135F",
      title: "The Dance Floor Calls",
      sub: "Attractions",
    },
  },
  {
    id: 5,
    num: "4",
    name: "THE FLOOR IS YOURS",
    description:
      "Dr. Zainab, Dr. Ravi, Dr. GRG and Dr. Apurv come together on one stage, with students invited to sing, dance, perform, or surprise us with something entirely their own.",
    link: "#",
    image:
      "https://cdn.dribbble.com/userupload/46355808/file/f2274fc9ca13235e117b03ebf82f2320.jpg",
    poster: {
      from: "#BFD8FF",
      to: "#1B4DB3",
      title: "The Floor Is Yours",
      sub: "Attractions",
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

    // keep the (now larger) preview fully inside the viewport
    const halfW = previewRef.current.offsetWidth / 2;
    const halfH = previewRef.current.offsetHeight / 2;
    x(
      gsap.utils.clamp(
        halfW + 16,
        window.innerWidth - halfW - 16,
        e.clientX + 40,
      ),
    );
    y(gsap.utils.clamp(halfH + 16, window.innerHeight - halfH - 16, e.clientY));

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
              <span className="us-title-inner">Attractions</span>
            </span>
          </h2>
          <p className="us-intro us-label">
            One big get-together. A whole lot happening. And absolutely no
            reason to spend the day wondering what to do next.
          </p>
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
                <span className="us-poster-foot">{show.name}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
