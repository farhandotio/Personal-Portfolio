import React from "react";
import { Route, Routes } from "react-router-dom";
import Portfolio from "../pages/Portfolio";
import About from "../pages/About";
import Services from "../pages/Services";
import ServiceDetailsPage from "../pages/ServiceDetailsPage";
import Projects from "../pages/Projects";
import Process from "../pages/Process";
import Contact from "../pages/Contact";
import Profile from "../pages/client/Profile";
import Admin from "../pages/admin/Admin";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/profile" element={<Profile />} />

      {/* auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services/:slug" element={<ServiceDetailsPage />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<Projects />} />
      <Route path="/process" element={<Process />} />
    </Routes>
  );
};

export default MainRoutes;
