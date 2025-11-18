import React from "react";
import { IoArrowForward } from "react-icons/io5";

const ProjectCard = ({ project }) => {
  const headingId = `project-heading-${project.title.replace(/\s+/g, "-")}`;

  return (
    <section
      aria-labelledby={headingId}
      className="mb-32 pb-20 last:border-none last:pb-0"
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <h2
          id={headingId}
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-text"
        >
          {project.title}
        </h2>

        {/* Live Button */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} live site`}
          className="group mt-5 md:mt-0 flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-hoverPrimary shadow-md"
        >
          View Live
          <IoArrowForward className="text-lg transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* Main Layout: Image Left + Content Right */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
        {/* LEFT — Image */}
        <div className="w-full md:w-[35%] rounded-xl overflow-hidden bg-cardBg">
          <img
            src={project.image}
            alt={`${project.title} showcase`}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* RIGHT — Description + Insights */}
        <div className="w-full md:w-[65%]">
          {/* Description */}
          <p className="text-lg md:text-xl leading-relaxed text-mutedText max-w-3xl mb-14">
            {project.description}
          </p>
        </div>
      </div>

      {/* Key Insights */}
      <h3 className="text-2xl font-bold text-text my-8">
        Key insights into design solution:
      </h3>

      <div className="space-y-8">
        {project.keyInsights?.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-5 p-5 bg-cardBg rounded-xl border border-border hover:border-primary/40 transition-all"
          >
            <span className="shrink-0 w-10 h-10 flex items-center justify-center font-bold rounded-full bg-primary text-white">
              {idx + 1}
            </span>

            <p className="text-base md:text-lg text-mutedText leading-relaxed max-w-2xl">
              {item.insight}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectCard;
