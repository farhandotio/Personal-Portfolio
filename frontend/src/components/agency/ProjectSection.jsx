import React, { useEffect, useState } from "react";
import ProjectCard from "../common/ProjectCard";
import { Link } from "react-router-dom";
import { IoArrowDown } from "react-icons/io5";
import axios from "axios";

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProject() {
      const data = await axios.get("http://localhost:3000/api/projects");

      setProjects(data.data.projects);
    }

    fetchProject();
  }, []);

  // ✅ JSON-LD for SEO (Structured Data)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Web Development Projects",
    description:
      "Explore web development projects by MD Farhan Sadik, including DigitalHat — a modern e-commerce platform built with React and Redux for smooth user experiences.",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        url: p.liveUrl,
        image: p.image,
      },
    })),
  };

  return (
    <section
      id="projects"
      className="bg-bg text-text p-5 md:p-7 lg:p-10 scroll-mt-20"
    >
      <header className="mb-16 md:mb-24">
        <div className="flex justify-between w-full gap-2">
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl font-extrabold w-full mb-8"
          >
            Our featured Projects
          </h2>
          <Link
            to={"/projects"}
            className="flex whitespace-nowrap h-fit max-md:hidden w-fit mx-auto gap-2 bg-cardBg hover:bg-primary text-text font-semibold px-6 py-3 rounded-full transition-all"
            aria-label="Contact Farhan Agency"
          >
            <span> All Projects </span>{" "}
            <IoArrowDown className="text-xl md:text-2xl -rotate-135" />
          </Link>
        </div>
        <p className="text-mutedText max-w-4xl text-lg">
          A showcase of modern, high-performing web applications built with
          React, Redux, and cutting-edge frontend technologies — designed for
          performance, accessibility, and scalability.
        </p>
      </header>

      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}

      {/* ✅ SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
};

export default ProjectSection;
