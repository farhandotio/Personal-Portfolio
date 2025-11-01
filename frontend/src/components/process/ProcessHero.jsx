// components/ProcessHero.jsx

import React from "react";
// React Icons থেকে প্রয়োজনীয় আইকন ইমপোর্ট করা হলো
import { FiClock, FiUsers, FiCheckCircle } from "react-icons/fi";

const ProcessHero = () => {
  return (
    // সেকশন কন্টেইনার
    <section className="bg-bg text-text pb-30">
      <header className="mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-8">
          Our <span className="text-primary">Work Process</span>
        </h2>
        <p className="text-xl max-w-4xl text-mutedText" itemProp="description">
          A transparent, collaborative journey from concept to delivery. Every
          step designed for quality, clarity, and client satisfaction.
        </p>
      </header>

      <div className="">
        <div className="flex items-center space-x-6 md:space-x-10 flex-wrap">
          {/* 1. 4-8 Week Timeline */}
          <div className="flex items-center text-mutedText text-base md:text-lg font-medium py-2">
            <FiClock className="size-5 md:size-6 text-primary mr-2" />
            <span>4-8 Week Timeline</span>
          </div>

          {/* 2. Collaborative Approach */}
          <div className="flex items-center text-mutedText text-base md:text-lg font-medium py-2">
            <FiUsers className="size-5 md:size-6 text-primary mr-2" />
            <span>Collaborative Approach</span>
          </div>

          {/* 3. Quality Guaranteed */}
          <div className="flex items-center text-mutedText text-base md:text-lg font-medium py-2">
            <FiCheckCircle className="size-5 md:size-6 text-primary mr-2" />
            <span>Quality Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessHero;
