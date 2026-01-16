import React from 'react'
import Problems from '../components/portfolio/Problems';
import Solutions from '../components/portfolio/Solutions';
import { Helmet } from 'react-helmet';

const WhyMe = () => {
  return (
    <div className="overflow-x-hidden pt-20">
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
      <Problems />
      <Solutions />
    </div>
  );
}

export default WhyMe