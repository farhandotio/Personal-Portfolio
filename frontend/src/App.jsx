// App.jsx
import React, { useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import Lenis from "@studio-freight/lenis";
import { useDispatch } from "react-redux";
import { fetchProfile } from "./app/features/auth/authSlice"; // <-- import thunk

import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import InitialLoader from "./components/common/InitialLoader";
import { useLocation } from "react-router-dom";

let lenisInstance = null;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, {
        offset: 0,
        immediate: false,
      });
    }
  }, [pathname]);

  return null;
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const hasFetchedProfile = useRef(false); // prevent double fetch in Strict Mode

  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!hasFetchedProfile.current) {
      dispatch(fetchProfile());
      hasFetchedProfile.current = true;
    }
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>MD Farhan Sadik — Web Developer</title>
      </Helmet>

      <div className="relative bg-bg text-text min-h-screen">
        <InitialLoader minDuration={900} />
        <Navbar />

        <ScrollToTop />

        <main id="main-content" className="max-w-[1900px] mx-auto">
          <MainRoutes />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AppWrapper;
