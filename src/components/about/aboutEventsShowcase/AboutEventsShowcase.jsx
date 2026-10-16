import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutEventsShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const EVENTS = [
  {
    id: "rankers-spotlight",
    num: "1",
    title: "THE RANKERS' SPOTLIGHT",
    subtitle: "Felicitation Ceremony",
    tagline: "",
    description:
      "A moment in the spotlight for the doctors who've earned it. We're celebrating achievers from June and October FMGE 2026, NEET-PG 2026, and the May and November INI-CET 2026 sessions.",
    image: "https://vidyajeevan.com/wp-content/uploads/2025/12/DSC01767.jpg",
  },
  {
    id: "food-lineup",
    num: "2",
    title: "THE FOOD LINEUP",
    subtitle: "Good Food. Great Mood.",
    tagline: "",
    description:
      "From purani dilli street-food favourites to global flavours and fast-food classics, there's a lot to dig into. And yes, full-on buffet scenes for lunch and dinner are sorted too.",
    image: "https://vidyajeevan.com/wp-content/uploads/2025/12/DSC07136.jpg",
  },
  {
    id: "play-mode",
    num: "3",
    title: "PLAY MODE : ON",
    subtitle: "Games & Activities",
    tagline: "Because being a doctor isn't your only personality trait.",
    description:
      "Fun games, unexpected challenges, and plenty of reasons to step away from the usual routine and just enjoy yourself.",
    image: "https://vidyajeevan.com/wp-content/uploads/2025/12/DSC07080.jpg",
  },
  {
    id: "dance-floor",
    num: "4",
    title: "THE DANCE FLOOR CALLS",
    subtitle: "DJ & Dance Floor",
    tagline: "You know that one song. This is your moment.",
    description:
      "Your favourite tracks, your hidden dance moves, and that one song that turns everyone into a performer. The floor is yours.",
    image: "https://vidyajeevan.com/wp-content/uploads/2025/12/DSC07097.jpg",
  },
  {
    id: "floor-is-yours",
    num: "5",
    title: "THE FLOOR IS YOURS",
    subtitle: "Four Legends. One Panel.",
    tagline: "",
    description:
      "If you've been waiting for a moment to take the stage, here's your cue. Dr. Zainab, Dr. Ravi, Dr. GRG & Dr. Apurv, all coming together on one stage at DOPAMINE. And when the stage opens up to students, it could be anything: a song, a dance, stand-up, a hidden talent, or something nobody saw coming. Got something in mind? We'd love to see it.",
    image:
      "https://cdn.dribbble.com/userupload/46355808/file/f2274fc9ca13235e117b03ebf82f2320.jpg",
  },
];

const AboutEventsShowcase = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const listenerCleanups = [];

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".about-ev-heading-line > span", {
          yPercent: 110,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
        })
        .from(
          ".about-ev-header-rule",
          { scaleX: 0, transformOrigin: "left center", duration: 0.8 },
          "-=0.35",
        );

      root.querySelectorAll(".about-ev-row").forEach((row) => {
        gsap.from(row.querySelectorAll(".about-ev-date, .about-ev-body"), {
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

        gsap.from(row.querySelector(".about-ev-media"), {
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

        const media = row.querySelector(".about-ev-media");
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

      gsap.from(".about-ev-surprise > *", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-ev-surprise",
          start: "top 85%",
          once: true,
        },
      });
    }, root);

    return () => {
      ctx.revert();
      listenerCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <section className="about-ev" ref={rootRef}>
      <div className="about-ev-container">
        <header className="about-ev-header">
          <h2 className="about-ev-heading">
            <span className="about-ev-heading-line">
              <span>THERE'S A LOT IN STORE</span>
            </span>
            <span className="about-ev-heading-line">
              <span className="about-ev-heading-accent">
                AND THIS IS JUST THE
              </span>{" "}
              BEGINNING.
            </span>
          </h2>
          <div className="about-ev-header-rule" />
        </header>
      </div>

      <div className="about-ev-container">
        <div className="about-ev-list">
          {EVENTS.map((event) => (
            <article className="about-ev-row" key={event.id}>
              <div className="about-ev-date" aria-label={`Number ${event.num}`}>
                <span className="about-ev-date-num">{event.num}</span>
              </div>

              <div className="about-ev-body">
                <span className="about-ev-subtitle">{event.subtitle}</span>

                <h3 className="about-ev-title">{event.title}</h3>

                {event.tagline && (
                  <p className="about-ev-tagline">{event.tagline}</p>
                )}

                <p className="about-ev-desc">{event.description}</p>
              </div>

              <div className="about-ev-media">
                <img
                  className="about-ev-media-image"
                  src={event.image}
                  alt={`${event.title} visual`}
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>

        <div className="about-ev-surprise">
          <h3 className="about-ev-surprise-title">
            AND THEN, THE SURPRISES...
          </h3>
          <p className="about-ev-surprise-text">
            Let's just say we're keeping a few things under wraps. You'll have
            to be there to find out.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutEventsShowcase;
