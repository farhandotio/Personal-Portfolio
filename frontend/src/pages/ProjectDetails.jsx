// src/pages/ProjectDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import Skeleton from '../components/common/Skeleton';
import PrimaryButton from '../components/common/PrimaryButton';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchProject = async () => {
      try {
        const res = await axios.get(`https://farhan-agency-eg4k.onrender.com/api/projects/${id}`);
        if (!cancelled) setProject(res.data.project);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProject();
    return () => (cancelled = true);
  }, [id]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto p-6 md:p-10">
        <Skeleton width="100%" height="420px" rounded />
        <Skeleton width="60%" height="36px" className="mt-6" />
        <Skeleton width="80%" height="20px" className="mt-4" />
      </section>
    );
  }

  if (!project) return null;

  return (
    <section className="relative bg-bg text-text pt-32 pb-24 overflow-hidden">
      {/* Ambient light */}
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-primary/15 blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-10 w-full">
        <Helmet>
          <title>{project.title} — MD Farhan Sadik</title>
          <meta name="description" content={project.description} />
        </Helmet>

        {/* Breadcrumb */}
        <div className="text-sm text-mutedText mb-8">
          <Link to="/projects" className="hover:text-primary">
            Projects
          </Link>{' '}
          / <span className="text-white">{project.title}</span>
        </div>

        {/* MAIN GRID */}
        <div className="flex gap-14 w-full">
          {/* LEFT */}
          <div className="w-5/12">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-5">
              <div className="aspect-video bg-black/20">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <aside className="space-y-6 lg:sticky lg:top-32 h-fit">
              <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-5 space-y-3 text-sm text-mutedText">
                <p>
                  <span className="text-white font-medium">Created:</span>{' '}
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>

                <p>
                  <span className="text-white font-medium">Last Updated:</span>{' '}
                  {new Date(project.updatedAt).toLocaleDateString()}
                </p>

                <p>
                  <span className="text-white font-medium">Type:</span> Interactive Web Experience
                </p>
              </div>
            </aside>
          </div>

          {/* RIGHT */}
          <div className="w-7/12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{project.title}</h1>

            <p className="text-lg text-mutedText leading-relaxed">{project.description}</p>

            {/* KEY INSIGHTS */}
            {project.keyInsights?.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Key Technologies & Highlights</h3>

                <div className="flex flex-wrap gap-3">
                  {project.keyInsights.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full text-sm
                      bg-white/5 border border-white/10
                      backdrop-blur-md
                      hover:border-primary/40 hover:scale-105
                      transition"
                    >
                      {item.insight}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="w-fit">
              {project.liveUrl && (
                <PrimaryButton
                  text="🚀 View Live Website"
                  href={project.liveUrl}
                  target="_blank"
                  className="w-fit mt-10 rounded-full justify-center"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
