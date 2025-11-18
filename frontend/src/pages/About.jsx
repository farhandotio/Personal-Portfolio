import React from "react";
import AboutHero from "../components/about/AboutHero";
import OurMission from "../components/about/OurMission";
import MeetOurFounder from "../components/about/MeetOurFounder";
import ExpertTeam from "../components/about/ExpertTeam";
import OurTechnologyStack from "../components/about/TechStack";

const About = () => {
  return (
    <div className="bg-bg text-text p-5 md:p-7 lg:p-10 mt-20">
      <AboutHero />
      <OurMission />
      <MeetOurFounder />
      {/* <ExpertTeam /> */}
      <OurTechnologyStack />
    </div>
  );
};

export default About;
