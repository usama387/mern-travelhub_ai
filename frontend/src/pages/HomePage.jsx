import Hero from "@/_components/Hero";
import PopularPackages from "@/_components/Packages";
import Testimonials from "@/_components/Testimonials";
import WhyChooseUs from "@/_components/whyChooseUs";
import WinterSpecial from "@/_components/WinterSpecial";
import { Separator } from "@/components/ui/separator";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Separator />
      <WhyChooseUs />
      <PopularPackages />
      <WinterSpecial />
      <Testimonials />
    </div>
  );
};

export default HomePage;
