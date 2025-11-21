import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const navLinks = [
  { name: "SERVICES", href: "/services" },
  { name: "PROJECTS", href: "/projects" },
  { name: "PROCESS", href: "/process" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const user = useSelector((state) => state.auth?.user);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Decide Link based on user role
  const profileLink = user
    ? user.role === "admin"
      ? "/admin"
      : "/profile"
    : "/login";

  return (
    <header className="fixed top-0 w-full bg-bg text-text py-5 z-50">
      <div className="max-w-[1900px] mx-auto flex justify-between items-center px-5 sm:px-7 lg:px-10">

        {/* Logo */}
        <Link onClick={scrollToTop} to="/" aria-label="Farhan Sadik home">
          <h1 className="text-xl lg:text-3xl whitespace-nowrap uppercase font-bold tracking-widest">
            Farhan <span className="text-secondary">Dev</span>
            <span className="text-primary">.</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-5 lg:space-x-12">
          <ul className="flex space-x-6 lg:space-x-8 uppercase text-sm md:text-xs lg:text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `transition duration-300 hover:text-primary ${
                      isActive ? "text-primary font-semibold" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Dynamic Profile/Admin/Login Button */}
          <NavLink
            to={profileLink}
            onClick={scrollToTop}
            className="flex items-center px-6 py-3 bg-primary hover:bg-hoverPrimary text-white font-semibold rounded-full text-sm transition duration-300 shadow-xl"
          >
            {user ? (user.role === "admin" ? "ADMIN" : "PROFILE") : "LOGIN"}
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => {
            scrollToTop();
            setMenuOpen(true);
          }}
          className="lg:hidden uppercase text-sm font-semibold tracking-wider border-2 border-primary px-5 py-2 rounded-full hover:bg-hoverPrimary hover:text-white transition duration-300"
        >
          Menu
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 h-screen w-full sm:w-[60%] bg-bg text-text flex flex-col items-center justify-center gap-10 text-lg uppercase transform transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-8 text-xl font-bold hover:text-primary transition"
        >
          ✕
        </button>

        <ul className="flex flex-col items-center gap-6 font-medium tracking-wide">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                onClick={() => {
                  scrollToTop();
                  setMenuOpen(false);
                }}
                className={({ isActive }) =>
                  `transition duration-300 hover:text-primary ${
                    isActive ? "text-primary font-semibold" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Dynamic Mobile Button */}
        <NavLink
          to={profileLink}
          onClick={() => {
            scrollToTop();
            setMenuOpen(false);
          }}
          className="flex items-center px-8 py-3 bg-primary hover:bg-hoverPrimary text-white font-semibold rounded-full text-sm transition duration-300 shadow-xl"
        >
          {user ? (user.role === "admin" ? "ADMIN" : "PROFILE") : "LOGIN"}
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
