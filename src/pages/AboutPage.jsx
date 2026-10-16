import React from "react";
import WhoAreWe from "../components/about/whoAreWe/WhoAreWe";
import AboutEventsShowcase from "../components/about/aboutEventsShowcase/AboutEventsShowcase";

import CommunitySection from "../components/about/communitySection/CommunitySection";
import ClosingBanner from "../components/about/closingBanner/ClosingBanner";

function AboutPage() {
  return (
    <div>
      <WhoAreWe />
      <AboutEventsShowcase />
      <CommunitySection />
      <ClosingBanner />
    </div>
  );
}

export default AboutPage;
