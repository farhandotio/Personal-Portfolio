import React from "react";
import ProjectCard from "../common/ProjectCard";
import { Link } from "react-router-dom";
import { IoArrowDown } from "react-icons/io5";

const projects = [
  {
    id: 1,
    title: "DigitalHat – Modern E-commerce Platform",
    description: `DigitalHat is a modern, high-performance e-commerce platform designed for seamless product discovery and shopping experiences. Built with React and Redux, it offers real-time search, advanced category filtering, and smooth UI animations that ensure users stay engaged. The platform is fully responsive and optimized for SEO, focusing on speed, accessibility, and a visually consistent design across all devices.`,
    image:
      "https://ik.imagekit.io/farhansadik/Agency%20Assets/Projects/digitalhat.png?updatedAt=1761828932572",
    liveUrl: "https://digitalhat.vercel.app/",
    keyInsights: [
      {
        id: 1,
        insight:
          "Implemented live search and category filters powered by Redux for fast and responsive product browsing.",
      },
      {
        id: 2,
        insight:
          "Crafted a modern and minimal interface focusing on usability, SEO optimization, and mobile responsiveness.",
      },
      {
        id: 3,
        insight:
          "Optimized image loading, metadata, and structured data to improve search visibility and site performance.",
      },
    ],
  },
  {
    id: 1,
    title: "Havmor – Modern Ice-cream Platform",
    description: `Havmor is a visually delightful and performance-driven ice-cream e-commerce platform built to deliver a refreshing digital shopping experience. Developed with React and Redux, it features a dynamic product showcase, real-time search, and category-based filtering for smooth and intuitive navigation. The UI captures the vibrant essence of the Havmor brand through playful animations and creamy pastel tones, ensuring an engaging and appetizing user experience. Designed with SEO and speed optimization in mind, Havmor provides consistent performance across all devices — from mobile to desktop.`,
    image:
      "https://ik.imagekit.io/farhansadik/Agency%20Assets/Projects/havmor.png?updatedAt=1761828932396",
    liveUrl: "https://havmor.vercel.app/",
    keyInsights: [
      {
        id: 1,
        insight:
          "Developed with React and Redux for smooth state management, enabling real-time search and dynamic category filtering.",
      },
      {
        id: 2,
        insight:
          "Created an interactive, brand-consistent UI with creamy pastel tones, elegant typography, and fluid animations to enhance visual appeal.",
      },
      {
        id: 3,
        insight:
          "Focused on SEO best practices, optimized image delivery, and responsive layouts to ensure fast loading and accessibility across all devices.",
      },
    ],
  },
];

const ProjectSection = () => {
  if (!projects || projects.length === 0) return null;

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
      className="bg-bg text-text p-5 md:p-7 lg:px-10 lg:pb-30 scroll-mt-20"
    >
      <header className="mb-16 md:mb-24">
        <div className="flex justify-between w-full gap-2">
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl font-extrabold w-full"
          >
            Our featured Projects
          </h2>
          <Link
            to={"/projects"}
            className="flex whitespace-nowrap h-fit max-md:hidden w-fit mx-auto gap-2 bg-primary hover:bg-hoverPrimary text-text font-semibold px-6 py-3 rounded-full transition-all"
            aria-label="Contact Farhan Agency"
          >
            <span> All Projects </span>{" "}
            <IoArrowDown className="text-xl md:text-2xl -rotate-135" />
          </Link>
        </div>
        <p className="mt-2 text-mutedText max-w-4xl text-lg">
          A showcase of modern, high-performing web applications built with
          React, Redux, and cutting-edge frontend technologies — designed for
          performance, accessibility, and scalability.
        </p>
      </header>

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
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
