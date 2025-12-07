import React from "react";
import OurMission from "../components/about/OurMission";
import MeetOurFounder from "../components/about/MeetOurFounder";
import ExpertTeam from "../components/about/ExpertTeam";
import OurTechnologyStack from "../components/about/TechStack";
import SectionHeader from "../components/common/SectionHeader";

const About = () => {
  return (
    <main className="bg-bg text-text p-5 md:p-7 lg:p-10 mt-20">
      {/* -------- Hero Section -------- */}
      <SectionHeader
        title="About Farhan Sadik"
        description="MD Farhan Sadik is a passionate web developer dedicated to
            transforming ideas into exceptional digital experiences that drive
            business growth and user engagement."
        size="lg"
      />

      {/* -------- Mission Section -------- */}
      <section aria-labelledby="mission-section">
        <OurMission />
      </section>

      {/* -------- Founder Section -------- */}
      <section aria-labelledby="founder-section">
        <MeetOurFounder />
      </section>

      {/* Expert Team Section (Hidden for now) */}
      {/* <section aria-labelledby="team-section">
        <ExpertTeam />
      </section> */}

      {/* -------- Tech Stack Section -------- */}
      <section aria-labelledby="techstack-section">
        <OurTechnologyStack />
      </section>
    </main>
  );
};

export default About;
