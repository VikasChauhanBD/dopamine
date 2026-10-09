import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import AboutSection from "./aboutSection/AboutSection";
import FlowingMenu from "./flowingMenu/FlowingMenu";
import UpcomingShows from "./upcomingShows/UpcomingShows";
import SpiralGallery from "./spiralGallery/SpiralGallery";
import Registration from "./registration/Registration";
import SillyString from "./sillyString/SillyString";
import "./Parallax.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Parallax() {
  const homeRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(".home-page__background", {
        y: () => -window.innerHeight * 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: homeRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: homeRef },
  );

  return (
    <main ref={homeRef} className="home-page">
      <div className="home-page__background" aria-hidden="true" />
      <div className="home-page__content">
        <AboutSection />
        <FlowingMenu />
        <UpcomingShows />
        <SpiralGallery />
        <Registration />
        <SillyString />
      </div>
    </main>
  );
}

export default Parallax;
