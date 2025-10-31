import React from "react";
import { Route, Routes } from "react-router-dom";
import Agency from "../pages/Agency";
import About from "../pages/About";
import Services from "../pages/Services";
import ServiceDetailsPage from "../pages/ServiceDetailsPage";
import Projects from "../pages/Projects";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Agency />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetailsPage />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  );
};

export default MainRoutes;
