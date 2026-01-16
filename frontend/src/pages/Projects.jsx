import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SectionHeader from '../components/common/SectionHeader';
import Skeleton from '../components/common/Skeleton';
import ProjectCard from '../components/common/ProjectCard';

/* ======================
   Project Section
====================== */
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('https://farhan-agency-eg4k.onrender.com/api/projects');

        const list = res.data?.projects || [];
        setProjects(list);
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="relative py-30 scroll-mt-20">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute top-1/3 right-1/4 w-[420px] h-[420px] 
          bg-primary rounded-full blur-3xl"
        />
      </div>

      <div className="relative mx-auto container px-5 sm:px-7 lg:px-10">
        <SectionHeader
          title="Projects & Case Studies"
          description="A curated selection of projects where performance, UX, and clean architecture
          were treated as first-class citizens."
          size="xl"
          className="text-center"
        />

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton width="100%" height="208px" rounded />
                <Skeleton width="70%" height="18px" className="mt-4" />
                <Skeleton width="90%" height="14px" className="mt-2" />
              </div>
            ))}

          {!loading && projects.length === 0 && (
            <p className="col-span-full text-center text-mutedText">
              Projects will be added here soon.
            </p>
          )}

          {!loading &&
            projects.map((project) => (
              <ProjectCard key={project._id || project.title} project={project} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
