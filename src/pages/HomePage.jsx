import React from "react";
import VideoHero from "../components/home/videoHero/VideoHero";
import CountdownTimer from "../components/home/countdownTimer/CountdownTimer";
import Marquee from "../components/home/marquee/Marquee";
import SpiralGallery from "../components/home/spiralGallery/SpiralGallery";
import Parallax from "../components/home/Parallax";

function HomePage() {
  return (
    <div>
      <VideoHero />
      <CountdownTimer />
      <Marquee />
      <SpiralGallery />
      <Parallax />
    </div>
  );
}

export default HomePage;
