import React from "react";
import { IoArrowDown } from "react-icons/io5";

const ProjectSlideCard = ({ project }) => {
  const headingId = `project-heading-${project.title}`;

  // Limit description to 150 characters
  const shortDescription =
    project.description.length > 150
      ? project.description.slice(0, 150) + "..."
      : project.description;

  return (
    <div
      key={project._id}
      aria-labelledby={headingId}
      className="bg-cardBg p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out border border-border hover:bg-hoverCardBg"
    >
      {/* Project Image */}
      <div className="flex items-center justify-center mb-6 rounded-lg bg-indigo-50 text-3xl overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          width="64"
          height="64"
          itemProp="image"
          className="rounded-sm h-full w-full object-cover"
        />
      </div>

      {/* Project Title */}
      <h3
        id={headingId}
        className="text-2xl font-semibold text-text mb-3"
        itemProp="name"
      >
        {project.title}
      </h3>

      {/* Project Description (trimmed if long) */}
      <p className="text-mutedText leading-relaxed" itemProp="description">
        {shortDescription}
      </p>
    </div>
  );
};

export default ProjectSlideCard;
// {projects.map((project) => (
//           <ProjectSlideCard key={project._id} project={project} />
//         ))}