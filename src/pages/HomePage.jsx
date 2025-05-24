import React from "react";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Collaboration from "../components/Collaboration";
import Services from "../components/Services";
// import Pricing from "../components/Pricing";
// import Roadmap from "../components/Roadmap";

const HomePage = () => {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem]">
      <Hero />
      <Benefits />
      <Collaboration />
      <Services />
      {/* <Pricing /> */}
      {/* <Roadmap /> */}
    </div>
  );
};

export default HomePage;