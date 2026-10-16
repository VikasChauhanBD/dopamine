import React from "react";
import VideoHero from "../components/home/videoHero/VideoHero";
import Marquee from "../components/home/marquee/Marquee";
import Parallax from "../components/home/Parallax";

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
