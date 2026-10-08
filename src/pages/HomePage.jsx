import React from "react";
import VideoHero from "../components/videoHero/VideoHero";
import Marquee from "../components/marquee/Marquee";
import AboutSection from "../components/aboutSection/AboutSection";
import Mentor from "../components/mentor/Mentor";
import SpiralGallery from "../components/spiralGallery/SpiralGallery";
import Registration from "../components/registration/Registration";
import SillyString from "../components/sillyString/SillyString";

function HomePage() {
  return (
    <div>
      <VideoHero />
      <Marquee />
      <AboutSection />
      <Mentor />
      <SpiralGallery />
      <Registration />
      <SillyString />
    </div>
  );
}

export default HomePage;
