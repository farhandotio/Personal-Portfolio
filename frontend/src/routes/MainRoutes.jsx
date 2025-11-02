import React from "react";
import { Route, Routes } from "react-router-dom";
import Agency from "../pages/Agency";
import About from "../pages/About";
import Services from "../pages/Services";
import ServiceDetailsPage from "../pages/ServiceDetailsPage";
import Projects from "../pages/Projects";
import Process from "../pages/Process";
import Contact from "../pages/Contact";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/dashboard/client/Profile";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Agency />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services/:slug" element={<ServiceDetailsPage />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/process" element={<Process />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Client */}
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default MainRoutes;
