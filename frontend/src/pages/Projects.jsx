import React, { useEffect, useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import axios from "axios";
import Loading from "../components/common/Loading";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // <-- added loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://farhan-agency.onrender.com/api/projects"
        );

        setProjects(res.data.projects || []);
      } catch (err) {
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, []);

  // JSON-LD for SEO
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
    <section id="projects" className="bg-bg text-text p-5 md:p-7 lg:p-10 mt-20">
      <header className="mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
          Our All Projects
        </h2>
        <p className="text-mutedText max-w-4xl text-lg">
          A showcase of modern, high-performing web applications built with
          React, Redux, and cutting-edge frontend technologies — designed for
          performance, accessibility, and scalability.
        </p>
      </header>

      {/* 🔄 Loading State */}
      {loading && (
        <div className="min-h-[300px] flex items-center justify-center">
          <Loading text="Projects are loading..." />
        </div>
      )}

      {/* ❌ Error Message */}
      {!loading && error && (
        <p className="text-red-500 text-center text-lg">{error}</p>
      )}

      {/* ✅ Projects List */}
      {!loading && !error && (
        <>
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
};

export default Projects;
