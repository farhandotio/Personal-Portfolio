import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const id = project._id || project.id || encodeURIComponent(project.title);

  return (
    <Link
      to={`/projects/${id}`}
      aria-label={`View case study for ${project.title}`}
      className="group relative block rounded-2xl overflow-hidden 
      border border-border bg-cardBg transition-all duration-500 
      hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 
          group-hover:scale-105"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-linear-to-t 
        from-black/60 via-black/20 to-transparent 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text mb-2">{project.title}</h3>

        <p className="text-sm text-mutedText leading-relaxed line-clamp-2">
          {project.shortDescription ??
            'A modern web experience focused on performance, clarity, and scalability.'}
        </p>

        {/* CTA */}
        <span
          className="inline-block mt-4 text-sm font-medium text-primary 
          opacity-0 translate-y-1 group-hover:opacity-100 
          group-hover:translate-y-0 transition-all duration-300"
        >
          View case study →
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard