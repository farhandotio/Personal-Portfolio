import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '../components/portfolio/HeroSection';
import HowToWork from '../components/portfolio/HowToWork';
import ProjectSection from '../components/portfolio/ProjectSection';
import Testimonials from '../components/portfolio/Testimonials';
import Problems from '../components/portfolio/Problems';
import Solutions from '../components/portfolio/Solutions';
import WhoAmI from '../components/portfolio/WhoAmI';
import CallToAction from '../components/portfolio/CallToAction';

const Portfolio = () => {
  return (
    <div className="overflow-x-hidden">
      {/* SEO Metadata */}
      <Helmet>
        <title>MD Farhan Sadik — Fullstack Developer Portfolio</title>
        <meta
          name="description"
          content="Explore the personal portfolio of MD Farhan Sadik, a Fullstack Developer specializing in modern, responsive, and scalable web applications."
        />
        <meta
          name="keywords"
          content="MD Farhan Sadik, fullstack developer, frontend developer, backend developer, personal portfolio, web development, React portfolio"
        />
        <meta name="author" content="MD Farhan Sadik" />
      </Helmet>

      {/* Portfolio Sections */}
      <HeroSection />
      <Problems />
      <Solutions />
      <HowToWork />
      <ProjectSection />
      <WhoAmI />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Portfolio;
