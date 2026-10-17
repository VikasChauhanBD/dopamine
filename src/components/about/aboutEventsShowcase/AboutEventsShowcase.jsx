import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutEventsShowcase.css";
import { FiAward, FiCoffee, FiZap, FiMusic, FiMic, FiStar } from "react-icons/fi";

const eventIcons = [FiAward, FiCoffee, FiZap, FiMusic, FiMic];

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
  },
  {
    id: "food-lineup",
    num: "2",
    title: "THE FOOD LINEUP",
    subtitle: "Good Food. Great Mood.",
    tagline: "",
    description:
      "From purani dilli street-food favourites to global flavours and fast-food classics, there's a lot to dig into. And yes, full-on buffet scenes for lunch and dinner are sorted too.",
  },
  {
    id: "play-mode",
    num: "3",
    title: "PLAY MODE : ON",
    subtitle: "Games & Activities",
    tagline: "Because being a doctor isn't your only personality trait.",
    description:
      "Fun games, unexpected challenges, and plenty of reasons to step away from the usual routine and just enjoy yourself.",
  },
  {
    id: "dance-floor",
    num: "4",
    title: "THE DANCE FLOOR CALLS",
    subtitle: "DJ & Dance Floor",
    tagline: "You know that one song. This is your moment.",
    description:
      "Your favourite tracks, your hidden dance moves, and that one song that turns everyone into a performer. The floor is yours.",
  },
  {
    id: "floor-is-yours",
    num: "5",
    title: "THE FLOOR IS YOURS",
    subtitle: "Four Legends. One Panel.",
    tagline: "",
    description:
      "If you've been waiting for a moment to take the stage, here's your cue. Dr. Zainab, Dr. Ravi, Dr. GRG & Dr. Apurv, all coming together on one stage at DOPAMINE. And when the stage opens up to students, it could be anything: a song, a dance, stand-up, a hidden talent, or something nobody saw coming. Got something in mind? We'd love to see it.",
  },
];

const AboutEventsShowcase = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;


    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

      root.querySelectorAll(".about-ev-row, .about-ev-surprise").forEach((card, index) => {
        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            once: true,
          },
          delay: (index % 3) * 0.1,
        });

        reveal.from(card, {
          y: 65,
          rotation: index % 2 === 0 ? -3 : 3,
          scale: 0.94,
          opacity: 0,
          duration: 0.9,
          ease: "back.out(1.2)",
          clearProps: "transform,opacity",
        }).from(card.querySelectorAll(".about-ev-date, .about-ev-subtitle, .about-ev-title, .about-ev-tagline, .about-ev-desc, .about-ev-surprise-icon, .about-ev-surprise-title, .about-ev-surprise-text"), {
          y: 18,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }, "-=0.55");
      });
    }, root);

    return () => {
      ctx.revert();
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
          {EVENTS.map((event, index) => {
            const Icon = eventIcons[index];
            return (
            <article className="about-ev-row" key={event.id}>
              <div className="about-ev-date" aria-label={`Number ${event.num}`}>
                <span className="about-ev-date-num">0{event.num}</span>
                <Icon className="about-ev-icon" aria-hidden="true" />
              </div>

              <div className="about-ev-body">
                <span className="about-ev-subtitle">{event.subtitle}</span>

                <h3 className="about-ev-title">{event.title}</h3>

                {event.tagline && (
                  <p className="about-ev-tagline">{event.tagline}</p>
                )}

                <p className="about-ev-desc">{event.description}</p>
              </div>


            </article>
          );
          })}

        <article className="about-ev-surprise">
          <FiStar className="about-ev-surprise-icon" aria-hidden="true" />
          <h3 className="about-ev-surprise-title">
            AND THEN, THE SURPRISES...
          </h3>
          <p className="about-ev-surprise-text">
            Let's just say we're keeping a few things under wraps. You'll have
            to be there to find out.
          </p>
        </article>
        </div>
      </div>
    </section>
  );
};

export default AboutEventsShowcase;
