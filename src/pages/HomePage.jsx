import React from "react";
import VideoHero from "../components/home/videoHero/VideoHero";
import CountdownTimer from "../components/home/countdownTimer/CountdownTimer";
import Marquee from "../components/home/marquee/Marquee";
import SpiralGallery from "../components/home/spiralGallery/SpiralGallery";
import MentorSection from "../components/home/mentorSection/MentorSection";
import UpcomingShows from "../components/home/upcomingShows/UpcomingShows";
import Parallax from "../components/home/Parallax";
import Registration from "../components/home/registration/Registration";
import SillyString from "../components/home/sillyString/SillyString";

function HomePage() {
  return (
    <div>
      <VideoHero />
      <CountdownTimer />
      <Marquee />
      <SpiralGallery />
      <MentorSection />
      <UpcomingShows />
      {/* <Parallax /> */}
      {/* <Registration /> */}
      <SillyString />
    </div>
  );
}

export default HomePage;
