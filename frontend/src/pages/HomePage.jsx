import Hero from "@/_components/Hero";
import PopularPackages from "@/_components/Packages";
import Testimonials from "@/_components/Testimonials";
import WinterSpecial from "@/_components/WinterSpecial";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <PopularPackages />
      <WinterSpecial />
      <Testimonials />
    </div>
  );
};

export default HomePage;
