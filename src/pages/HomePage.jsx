import React from "react";
import FlowingMenu from "../components/flowingMenu/FlowingMenu";
import ScrollReveal from "../components/scrollReveal/ScrollReveal";
import SpiralGallery from "../components/spiralGallery/SpiralGallery";
import SillyString from "../components/sillyString/SillyString";

function HomePage() {
  return (
    <div>
      <FlowingMenu />
      <ScrollReveal />
      <SpiralGallery />
      <SillyString />
    </div>
  );
}

export default HomePage;
