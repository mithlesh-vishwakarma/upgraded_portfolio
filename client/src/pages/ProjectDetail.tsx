import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import {
  ArrowLeft,
  ExternalLink,
  Terminal,
  Trophy,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Github
} from "lucide-react";
import { motion } from "framer-motion";
import { toTitleCase } from "../lib/utils";

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
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProjectDetails = async () => {
    setLoading(true);
    try {
      const [projRes, relatedRes] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/projects/${id}/related`)
      ]);
      setProject(projRes.data);
      setRelatedProjects(relatedRes.data);
    } catch (error) {
      console.error("Failed to fetch project details", error);
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-900 text-white font-roboto">
        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Fetching Technical Specifications...</p>
      </div>
    );
  }

  if (!project) return null;

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen text-white font-roboto pb-20">
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 bg-white/5 hover:bg-yellow-400/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 hover:border-yellow-400/50 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Gallery</span>
          </button>

          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-6 py-2.5 rounded-xl font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-300"
            >
              <span className="hidden sm:inline">Launch Live Project</span>
              <span className="sm:hidden">Live</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl mb-12 aspect-[16/9] md:aspect-[21/9]"
        >
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={toTitleCase(project.name)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-400 text-lg font-bold">
              No Image Preview
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
          
          <div className="absolute bottom-10 left-10 right-10">
            <h1 className="text-4xl md:text-7xl font-black text-white mb-2 tracking-tight">
              {toTitleCase(project.name)}
            </h1>
            <div className="flex flex-wrap items-center gap-2.5 mt-3 font-semibold">
              <span className={`px-3 py-1 rounded text-[10px] uppercase font-black tracking-widest ${project.project_type === 'Freelanced' ? 'bg-purple-500/35 text-purple-300 border border-purple-500/40' : 'bg-blue-500/35 text-blue-300 border border-blue-500/40'}`}>
                {project.project_type || 'Personal'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
            
            {/* Project Timeline Section */}
            {project.start_date && (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl p-6 rounded-[32px] border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-450/20 text-yellow-400 flex items-center justify-center font-black">
                    📅
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Project Timeline</h4>
                    <p className="text-xs text-gray-400 font-semibold mt-0.5">Development lifecycle duration</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-grow max-w-md sm:justify-end">
                  <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-center flex-shrink-0">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block">Started</span>
                    <span className="text-sm font-bold text-yellow-400">{project.start_date}</span>
                  </div>
                  
                  <div className="flex-grow h-0.5 bg-gradient-to-r from-yellow-400 to-emerald-450 opacity-30 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-yellow-400"></div>
                  </div>

                  <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-center flex-shrink-0">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block">Delivered</span>
                    <span className="text-sm font-bold text-emerald-400">
                      {(!project.end_date || project.end_date === 'Present' || project.end_date === 'Ongoing' || project.end_date === 'Under Development') ? 'Under Development' : project.end_date}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Overview / Description */}
            <motion.div 
               variants={cardVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 shadow-xl"
            >
              <h3 className="text-2xl font-black mb-6 flex items-center gap-4 text-yellow-400">
                <Terminal className="w-8 h-8" />
                Project Overview
              </h3>
              <p className="text-gray-300 leading-relaxed font-medium whitespace-pre-wrap">
                {project.short_description}
              </p>
            </motion.div>

            {/* Challenges Solved */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 relative overflow-hidden group shadow-xl"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Trophy className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-green-500 text-white flex items-center justify-center font-black shadow-lg shadow-green-500/20">✓</span>
                Challenges Solved
              </h3>
              <p className="text-gray-300 leading-relaxed font-medium whitespace-pre-wrap">
                {project.challenges_solved}
              </p>
            </motion.div>

          </div>

          {/* Right Column: Features & Assets */}
          <div className="space-y-10">
            {/* Key Features */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 shadow-xl"
            >
              <h3 className="text-2xl font-black mb-8 flex items-center gap-4 text-emerald-450">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                Key Features
              </h3>
              <ul className="space-y-5 relative">
                {(project.features || []).map((feature, idx) => (
                  <li key={idx} className="flex gap-4 items-start group">
                    <span className="mt-1 flex-shrink-0 text-emerald-400 group-hover:scale-110 transition-transform">✓</span>
                    <span className="text-base font-bold text-gray-200 group-hover:text-yellow-400 transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
                {(!project.features || project.features.length === 0) && (
                  <span className="text-gray-550 text-sm italic">No features specified.</span>
                )}
              </ul>
            </motion.div>

            {/* Project Assets Box */}
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10 space-y-6">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center italic">Project Assets</p>
                <div className="flex flex-col gap-4">
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-white/5 rounded-3xl hover:bg-yellow-400 hover:text-slate-900 transition-all border border-white/5 group">
                      <span className="font-black text-xs uppercase tracking-widest">Live Demo</span>
                      <ExternalLink className="w-5 h-5 text-yellow-400 group-hover:text-slate-900" />
                    </a>
                  )}
                  {project.github_url && (
                    project.project_type === 'Freelanced' ? (
                      <div 
                        className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/5 opacity-40 cursor-not-allowed select-none" 
                        title="Source Code Private (Freelanced Project)"
                      >
                        <span className="font-black text-xs uppercase tracking-widest text-gray-500">GitHub (Private Code)</span>
                        <Github className="w-5 h-5 text-gray-600" />
                      </div>
                    ) : (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-white/5 rounded-3xl hover:bg-blue-500 transition-all border border-white/5 group">
                        <span className="font-black text-xs uppercase tracking-widest">GitHub Code</span>
                        <Github className="w-5 h-5 text-blue-400 group-hover:text-white" />
                      </a>
                    )
                  )}
                </div>
            </div>

            {/* Tech Stack Architecture */}
            <motion.div 
               variants={cardVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 shadow-xl"
            >
              <h3 className="text-2xl font-black mb-8 flex items-center gap-4 text-blue-400">
                <Terminal className="w-8 h-8" />
                Technologies Applied
              </h3>
              <div className="flex flex-wrap gap-3">
                {(project.tech_stack || []).map((tech, idx) => {
                  const styles = getTechColor(tech);
                  return (
                    <span 
                      key={idx} 
                      style={styles}
                      className="px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-default hover:scale-105"
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Similar Projects Section */}
        {relatedProjects.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black text-white">
                Discover More
              </h2>
              <Link to="/projects" className="text-yellow-400 hover:text-yellow-300 font-black text-xs uppercase tracking-widest flex items-center gap-2 group">
                All Gallery <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((p) => (
                <Link 
                  key={p.id} 
                  to={`/projects/${p.id}`}
                  className="group bg-white/5 backdrop-blur-xl rounded-[32px] overflow-hidden border border-white/10 hover:border-yellow-400/30 transition-all duration-500 transform hover:-translate-y-3"
                >
                  <div className="relative h-48 overflow-hidden">
                    {p.image_url ? (
                      <img src={p.image_url} alt={toTitleCase(p.name)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold">No Image Preview</div>
                    )}
                    <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/20 transition-colors"></div>
                  </div>
                  <div className="p-8">
                    <h4 className="font-black text-lg group-hover:text-yellow-400 transition-colors truncate mb-2">{toTitleCase(p.name)}</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-3 h-12 italic">"{p.short_description}"</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
