// Projects.jsx
import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import ProjectCard from "../components/projects/ProjectCard";
import axios from "axios";
import Loading from "../components/common/Loading";
import { useParams, useLocation } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // <-- added loading state
  const [error, setError] = useState(null);
  const [highlightId, setHighlightId] = useState(null);

  const { id: routeId } = useParams(); // will pick up :id when route is /products/:id or /projects/:id if used
  const location = useLocation();

  // refs map: key -> DOM node
  const refsMap = useRef({});

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
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, []);

  // When projects load or routeId changes, try to scroll to matching project
  useEffect(() => {
    if (loading) return; // wait until projects finished loading
    if (!routeId) return; // nothing to scroll to

    // find matching project key using possible fields
    const match = projects.find((p) => {
      const candidates = [
        p._id,
        p.id,
        p.slug,
        (p.title && encodeURIComponent(p.title)) || null,
      ].filter(Boolean);
      return candidates.includes(routeId);
    });

    // if found, find the ref key we generated (we'll use the same matching logic to create the key)
    if (match) {
      const key = makeKeyForProject(match);
      const node = refsMap.current[key];
      if (node && typeof node.scrollIntoView === "function") {
        // small timeout to ensure layout stable
        setTimeout(() => {
          node.scrollIntoView({ behavior: "smooth", block: "center" });

          // add highlight for visual feedback
          setHighlightId(key);
          // remove highlight after 2s
          setTimeout(() => setHighlightId(null), 2000);
        }, 100);
      }
    } else {
      // No exact match found — try to decode routeId and look for title match
      const decoded = decodeURIComponent(routeId);
      const byTitle = projects.find((p) => p.title === decoded);
      if (byTitle) {
        const key = makeKeyForProject(byTitle);
        const node = refsMap.current[key];
        if (node) {
          setTimeout(() => {
            node.scrollIntoView({ behavior: "smooth", block: "center" });
            setHighlightId(key);
            setTimeout(() => setHighlightId(null), 2000);
          }, 100);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeId, loading, location.pathname, projects]);

  // helper to generate consistent key for refs
  const makeKeyForProject = (p) => {
    return p._id || p.id || p.slug || encodeURIComponent(p.title || "");
  };

  // JSON-LD for SEO (ItemList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by MD Farhan Sadik",
    description:
      "Explore web development projects by MD Farhan Sadik, including modern e-commerce, dashboards, and web apps built with React, Redux and modern web technologies.",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description || p.shortDescription || "",
        url:
          p.liveUrl ||
          (p.slug
            ? `https://codexfoli0.netlify.app/projects/${p.slug}`
            : ""),
        image: p.image || p.previewImage || "",
      },
    })),
  };

  return (
    <section id="projects" className="bg-bg text-text p-5 md:p-7 lg:p-10 mt-20">
      {/* SEO / Social Metadata */}
      <Helmet>
        <title>Projects — MD Farhan Sadik</title>
        <meta
          name="description"
          content="Projects by MD Farhan Sadik — a selection of web applications and UI projects built with React, Redux, Node.js and modern web technologies."
        />
        <meta
          name="keywords"
          content="MD Farhan Sadik, projects, React projects, portfolio, web apps, frontend, backend, fullstack"
        />
        <meta name="author" content="MD Farhan Sadik" />

        {/* canonical */}
        <link rel="canonical" href="https://codexfoli0.netlify.app/projects" />

        {/* Open Graph */}
        <meta property="og:title" content="Projects — MD Farhan Sadik" />
        <meta
          property="og:description"
          content="A showcase of web applications and UI projects built by MD Farhan Sadik using modern frontend and backend technologies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codexfoli0.netlify.app/projects" />
        <meta property="og:image" content="https://codexfoli0.netlify.app/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects — MD Farhan Sadik" />
        <meta
          name="twitter:description"
          content="A showcase of web applications and UI projects built by MD Farhan Sadik using modern frontend and backend technologies."
        />
        <meta name="twitter:image" content="https://codexfoli0.netlify.app/og-image.png" />
      </Helmet>

      <header className="mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Projects I’ve Built</h2>
        <p className="text-mutedText max-w-4xl text-lg">
          A curated selection of modern, high-performing web applications and UI projects — built with React, Redux, Node.js, and other modern technologies. Each project focuses on performance, accessibility, and real-world user needs.
        </p>
      </header>

      {/* 🔄 Loading State */}
      {loading && (
        <div className="min-h-[300px] flex items-center justify-center">
          <Loading text="Projects are loading..." />
        </div>
      )}

      {/* ❌ Error Message */}
      {!loading && error && <p className="text-red-500 text-center text-lg">{error}</p>}

      {/* ✅ Projects List */}
      {!loading && !error && (
        <>
          {projects.length > 0 ? (
            projects.map((project) => {
              const key = makeKeyForProject(project);
              // ensure a stable ref object exists
              if (!refsMap.current[key]) refsMap.current[key] = null;

              return (
                <div
                  key={key}
                  ref={(el) => (refsMap.current[key] = el)}
                  // add a temporary highlight ring when this is the target
                  className={`transition-shadow duration-300 ${
                    highlightId === key ? "ring-4 ring-primary/40 rounded-xl" : ""
                  } mb-6`}
                >
                  {/* Wrap ProjectCard so no need to modify child component */}
                  <ProjectCard project={project} />
                </div>
              );
            })
          ) : (
            <p className="text-mutedText">No projects available at the moment.</p>
          )}
        </>
      )}

      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
};

export default Projects;
