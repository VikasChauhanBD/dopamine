import React, { useEffect, useRef } from "react";
import "./Marquee.css";
import gsap from "gsap";

function Marquee() {
  const topMarqueeRef = useRef(null);
  const bottomMarqueeRef = useRef(null);

  useEffect(() => {
    const topTween = gsap.to(topMarqueeRef.current, {
      xPercent: -50,
      duration: 18,
      repeat: -1,
      ease: "none",
    });

    const bottomTween = gsap.fromTo(
      bottomMarqueeRef.current,
      {
        xPercent: -50,
      },
      {
        xPercent: 0,
        duration: 18,
        repeat: -1,
        ease: "none",
      },
    );

    const handleWheel = (e) => {
      const direction = e.deltaY > 0 ? 1 : -1;

      topTween.timeScale(direction);
      bottomTween.timeScale(direction);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      topTween.kill();
      bottomTween.kill();
    };
  }, []);

  const EventContent = () => (
    <div className="marquee-line">
      <h2>DATE - 14 NOVEMBER 2026</h2>
      <span>✦</span>

      <h2>TIME - 2 PM ONWARDS</h2>
      <span>✦</span>

      <h2>VENUE - VIDYA JEEVAN, GREATER NOIDA</h2>
      <span>✦</span>
    </div>
  );

  return (
    <section className="marquee-container">
      <div className="marquee-cross">
        <div className="marquee-band marquee-band-one">
          <div className="marquee-track" ref={topMarqueeRef}>
            <EventContent />
            <EventContent />
          </div>
        </div>

        <div className="marquee-band marquee-band-two">
          <div className="marquee-track" ref={bottomMarqueeRef}>
            <EventContent />
            <EventContent />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Marquee;
