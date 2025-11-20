import React from "react";
import AboutHero from "../components/about/AboutHero";
import OurMission from "../components/about/OurMission";
import MeetOurFounder from "../components/about/MeetOurFounder";
import ExpertTeam from "../components/about/ExpertTeam";
import OurTechnologyStack from "../components/about/TechStack";

const About = () => {
  return (
    <main className="bg-bg text-text p-5 md:p-7 lg:p-10 mt-20">
      {/* -------- Page Header (SEO + Accessibility) -------- */}
      <header>
        <h1 className="sr-only">About Us - Learn More About Our Vision & Team</h1>
      </header>

      {/* -------- Hero Section -------- */}
      <section aria-labelledby="about-hero">
        <AboutHero />
      </section>

      {/* -------- Mission Section -------- */}
      <section aria-labelledby="mission-section">
        <OurMission />
      </section>

      {/* -------- Founder Section -------- */}
      <section aria-labelledby="founder-section">
        <MeetOurFounder />
      </section>

      {/* -------- Expert Team Section (Hidden for now) -------- */}
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
