import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Skeleton from '../common/Skeleton';
import SectionHeader from '../common/SectionHeader';
import ProjectCard from '../common/ProjectCard';

const MAX_PROJECTS = 3;

/* ======================
   Project Section
====================== */
const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('https://farhan-agency-eg4k.onrender.com/api/projects');

        const list = res.data?.projects || [];
        setProjects(list.slice(0, MAX_PROJECTS));
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
    <section id="projects" className="relative py-10 scroll-mt-20">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute top-1/3 right-1/4 w-[420px] h-[420px] 
          bg-primary rounded-full blur-3xl"
        />
      </div>

      <div className="relative mx-auto container px-5 sm:px-7 lg:px-10">
        <SectionHeader
          title="Some of My Selected Projects & Case Studies"
          description="A focused selection of projects where thoughtful design, clean architecture, 
          and performance were treated as non-negotiable."
          size="xl"
          className="text-center"
        />

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: MAX_PROJECTS }).map((_, i) => (
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

export default ProjectSection;
