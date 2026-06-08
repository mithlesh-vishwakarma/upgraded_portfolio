import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Github, Loader2 } from 'lucide-react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import { toTitleCase } from '../lib/utils';

interface Project {
  id: string;
  name: string;
  image_url: string;
  short_description: string;
  tech_stack: string[];
  features: string[];
  challenges_solved: string;
  live_url: string;
  github_url?: string;
  project_type?: string;
  start_date?: string;
  end_date?: string;
}

const ProjectPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects", error);
    } finally {
      setLoading(false);
    }
  };

  const getTechColor = (tech: string) => {
    let hash = 0;
    for (let i = 0; i < tech.length; i++) {
      hash = tech.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return {
      backgroundColor: `hsla(${hue}, 70%, 15%, 0.45)`,
      color: `hsl(${hue}, 85%, 80%)`,
      borderColor: `hsla(${hue}, 75%, 45%, 0.4)`,
      borderWidth: '1px',
      borderStyle: 'solid'
    } as React.CSSProperties;
  };

  const ProjectCard: React.FC<{ project: Project; index: number }> = ({
    project,
    index,
  }) => (
    <Link
      to={`/projects/${project.id}`}
      className="group bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-400/30 hover:shadow-2xl hover:transform hover:scale-105 transition-all duration-300 flex flex-col h-full"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={toTitleCase(project.name)}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold">
            No Image Preview
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none"></div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2 h-14 mb-1 flex items-center">
          {toTitleCase(project.name)}
        </h3>

        {/* Project Type */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold">
          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${project.project_type === 'Freelanced' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
            {project.project_type || 'Personal'}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3 h-[4.5rem] overflow-hidden">
          {project.short_description}
        </p>

        <div className="mt-auto space-y-5">
          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-2">
            {(project.tech_stack || []).slice(0, 4).map((tech, idx) => {
              const styles = getTechColor(tech);
              return (
                <span
                  key={`${tech}-${idx}`}
                  style={styles}
                  className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all duration-200 hover:scale-105"
                >
                  {tech}
                </span>
              );
            })}
            {(project.tech_stack || []).length > 4 && (
              <span className="text-[9px] text-gray-500 font-black uppercase tracking-wider self-center px-1">
                +{project.tech_stack.length - 4} more
              </span>
            )}
          </div>

          {/* Action Footer Divider and Buttons */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-4 py-2 rounded-lg font-bold transition-all duration-200 flex items-center gap-2 text-xs hover:scale-105 hover:shadow-lg"
            >
              <ExternalLink className="w-4 h-4" />
              View Details
            </span>
            <div className="flex gap-3 items-center">
              {project.live_url && (
                <a 
                  href={project.live_url} 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()} 
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                  title="Live Demo"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
              {project.github_url && (
                project.project_type === 'Freelanced' ? (
                  <span 
                    className="text-gray-600 cursor-not-allowed opacity-40"
                    title="Source Code Private (Freelanced Project)"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5" />
                  </span>
                ) : (
                  <a 
                    href={project.github_url} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()} 
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                    title="GitHub Repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen text-white font-roboto">
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
            Project Gallery
          </h1>
          <p className="text-gray-300 text-sm lg:text-lg leading-relaxed mb-6 md:mb-8 max-w-full">
            A comprehensive showcase of my web development journey, featuring full-stack applications and 
            technical prototypes. Each project highlights my dedication to crafting responsive, 
            user-centric, and visually engaging web solutions.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl min-h-[500px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Architecting Portfolios...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-40 gap-2">
              <Code className="w-12 h-12 text-slate-500" />
              <p className="text-gray-400 font-semibold text-sm">No projects listed at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
