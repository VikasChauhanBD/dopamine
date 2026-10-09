import React from "react";
import VideoHero from "../components/home/videoHero/VideoHero";
import Marquee from "../components/home/marquee/Marquee";
import Parallax from "../components/home/Parallax";
import AboutSection from "../components/home/aboutSection/AboutSection";
import SpiralGallery from "../components/home/spiralGallery/SpiralGallery";
import Registration from "../components/home/registration/Registration";
import SillyString from "../components/home/sillyString/SillyString";

function HomePage() {
  return (
    <div>
      <VideoHero />
      <Marquee />
      <Parallax />
    </div>
  );
}

export default HomePage;
