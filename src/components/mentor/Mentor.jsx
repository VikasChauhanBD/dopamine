import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Mentor.css";

gsap.registerPlugin(ScrollTrigger);

function Mentor() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const mentors = [
    {
      name: "Dr. Zainab Vora",
      image:
        "https://cdn.dribbble.com/userupload/49257897/file/c024d98dee96a225a17137a559671902.jpeg",
      description:
        "Mentor who guides students with clear concepts, smart strategy, and constant support to help them stay focused and succeed.",
    },
    {
      name: "Dr. Ravi Sharma",
      image:
        "https://cdn.dribbble.com/userupload/49257894/file/42c17dad43b16db8a8699feb77af5c10.jpeg",
      description:
        "Bringing calm, discipline, and mental strength to keep you grounded under pressure.",
    },
    {
      name: "Dr. Gobind Rai Garg",
      image:
        "https://cdn.dribbble.com/userupload/49257896/file/4fa0a75b33442d1ffae2ef626612c231.jpeg",
      description:
        "Fondly known as Dr. GRG or GOGA Sir, is a renowned medical educator & author. With nearly two decades of teaching experience, he has mentored countless aspirants preparing for NEET PG, INI-CET, and FMGE.",
    },
    {
      name: "Mr. Ritesh Kapoor",
      image:
        "https://cdn.dribbble.com/userupload/49257895/file/552c920e376be5a9a98bca4e1b403f2d.jpeg",
      description: "",
    },
    {
      name: "Dr. Apurv Mehra",
      image:
        "https://cdn.dribbble.com/userupload/49258317/file/08bfa49831f127304deb84f28026585f.jpeg",
      description:
        "Guiding you with resilience, focus, and real-world perspective. Because preparation isn't just academic - it's mental.",
    },
  ];

  useLayoutEffect(() => {
    if (window.innerWidth < 769) return;

    const cards = cardsRef.current;

    if (cards.length !== 5 || cards.some((card) => !card)) return;

    const ctx = gsap.context(() => {
      const centerCard = cards[2];

      const offsets = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        const centerRect = centerCard.getBoundingClientRect();

        return centerRect.left - rect.left;
      });

      const rotations = [-12, -6, 0, 6, 12];
      const scales = [0.88, 0.92, 0.96, 0.92, 0.88];

      cards.forEach((card, index) => {
        gsap.set(card, {
          x: offsets[index],
          rotation: rotations[index],
          scale: scales[index],
          zIndex: index + 1,
          transformOrigin: "50% 100%",
        });
      });

      const tl = gsap.timeline();

      cards.forEach((card) => {
        tl.to(
          card,
          {
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          0,
        );
      });

      cards.forEach((card, index) => {
        tl.to(
          card,
          {
            x: offsets[index],
            rotation: rotations[index],
            scale: scales[index],
            duration: 1,
            ease: "power2.in",
          },
          1,
        );
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 20%",
        scrub: 1.5,
        animation: tl,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="mentor-container" ref={containerRef}>
      <div className="mentor-head">
        <h2 className="mentor-heading">Meet Your Mentors</h2>

        <h3 className="mentor-label">The Minds Behind Your Growth</h3>

        {/* <p className="mentor-para">
          Get to know the passionate experts who will guide you every step of
          the way. Our mentors are industry leaders, educators, and innovators
          dedicated to helping you succeed.
        </p> */}
      </div>

      <div className="mentor-cards">
        {mentors.map((mentor, index) => (
          <div
            className={`mentor-card card${index + 1}`}
            key={mentor.name}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
          >
            <img src={mentor.image} alt={mentor.name} />

            <div className="mentor-content">
              <h3>{mentor.name}</h3>

              <p>{mentor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Mentor;
