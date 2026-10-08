import React from "react";
import VideoHero from "../components/videoHero/VideoHero";
import AboutSection from "../components/aboutSection/AboutSection";
import FlowingMenu from "../components/flowingMenu/FlowingMenu";
import ScrollReveal from "../components/scrollReveal/ScrollReveal";
import SpiralGallery from "../components/spiralGallery/SpiralGallery";
import SillyString from "../components/sillyString/SillyString";

function HomePage() {
  return (
    <div>
      <VideoHero />
      <AboutSection />
      {/* <FlowingMenu /> */}
      {/* <ScrollReveal /> */}
      <SpiralGallery />
      <SillyString />
    </div>
  );
}

export default HomePage;
