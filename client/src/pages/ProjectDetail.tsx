import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  MapPin,
  Briefcase,
  Terminal,
  Trophy,
  History,
  CheckCircle2,
  ChevronRight,
  User,
  Star,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl?: string;
  image: string;
  category: string;
  date: string;
  assignedDate: string;
  location: string;
  client?: string;
  projectType: string;
  status: string;
  problem: string;
  solution: string;
  techStackDescription: string;
  result: string;
  journey: { date: string; event: string }[];
  problems: string[];
  solutions: string[];
  techStackDetailed: string[];
  results: string[];
  resources: { name: string; url: string; icon: string }[];
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
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

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-6 py-2.5 rounded-xl font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all duration-300"
          >
            <span className="hidden sm:inline">Launch Live Project</span>
            <span className="sm:hidden">Live</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-2xl mb-12 aspect-[16/9] md:aspect-[21/9]"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
          
          <div className="absolute bottom-10 left-10 right-10">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {project.category}
              </span>
              <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                {project.projectType}
              </span>
              <span className="bg-green-500/20 backdrop-blur-md text-green-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                {project.status || "Production"}
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-2 tracking-tight">
              {project.title}
            </h1>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: "Assigned", value: project.assignedDate, icon: Calendar, color: "text-blue-400" },
                 { label: "Delivery", value: project.date, icon: Trophy, color: "text-yellow-400" },
                 { label: "Location", value: project.location, icon: MapPin, color: "text-red-400" },
                 { label: "Client", value: project.client || "Personal", icon: project.projectType === "Freelanced" ? Briefcase : User, color: "text-purple-400" },
               ].map((item, idx) => (
                 <div key={idx} className="bg-white/5 backdrop-blur-md p-6 rounded-[32px] border border-white/5 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-300">
                    <item.icon className={`w-8 h-8 mb-3 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-[10px] uppercase text-gray-500 tracking-widest font-black mb-1">{item.label}</span>
                    <span className="text-sm font-bold text-gray-200">{item.value}</span>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 relative overflow-hidden group shadow-xl"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Terminal className="w-24 h-24" />
                </div>
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center font-black shadow-lg shadow-red-500/20">01</span>
                  The Problem
                </h3>
                <p className="text-gray-400 leading-relaxed font-medium">
                  {project.problem}
                </p>
              </motion.div>

              <motion.div 
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 relative overflow-hidden group shadow-xl"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <CheckCircle2 className="w-24 h-24" />
                </div>
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-green-500 text-white flex items-center justify-center font-black shadow-lg shadow-green-500/20">02</span>
                  The Solution
                </h3>
                <p className="text-gray-400 leading-relaxed font-medium">
                  {project.solution}
                </p>
              </motion.div>
            </div>

            <motion.div 
               variants={cardVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 shadow-xl"
            >
              <h3 className="text-2xl font-black mb-8 flex items-center gap-4 text-yellow-400">
                <Terminal className="w-8 h-8" />
                Tech Stack Architecture
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-white/5 text-gray-300 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all hover:bg-yellow-400 hover:text-slate-900 cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div 
               variants={cardVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="bg-gradient-to-br from-yellow-400 to-orange-600 p-10 rounded-[40px] shadow-2xl shadow-yellow-500/10"
            >
              <h3 className="text-2xl font-black mb-4 flex items-center gap-4 text-slate-900">
                <Star className="w-8 h-8" />
                Project Impact
              </h3>
              <p className="text-slate-900 text-xl font-bold leading-relaxed">
                {project.result}
              </p>
            </motion.div>
          </div>

          <div className="space-y-10">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-white/5 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 shadow-xl"
            >
              <h3 className="text-2xl font-black mb-10 flex items-center gap-4">
                <History className="w-8 h-8 text-blue-400" />
                Evolution
              </h3>
              <div className="space-y-10 relative">
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10 group-hover:bg-yellow-400/50 transition-colors"></div>
                
                {project.journey?.map((step: any, idx: number) => (
                  <div key={idx} className="flex gap-6 relative group">
                    <div className="mt-1.5 z-10">
                      <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-yellow-400 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-blue-400 group-hover:bg-yellow-400"></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none mb-2">
                        {step.date}
                      </p>
                      <p className="text-base font-bold text-gray-200 group-hover:text-yellow-400 transition-colors">
                        {step.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10 space-y-6">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center italic">Project Assets</p>
                <div className="flex flex-col gap-4">
                  <a href={project.liveUrl} target="_blank" className="flex items-center justify-between p-5 bg-white/5 rounded-3xl hover:bg-yellow-400 hover:text-slate-900 transition-all border border-white/5 group">
                    <span className="font-black text-xs uppercase tracking-widest">Live Prototype</span>
                    <ExternalLink className="w-5 h-5 text-yellow-400 group-hover:text-slate-900" />
                  </a>
                  {project.githubUrl && project.githubUrl !== "#" && (
                    <a href={project.githubUrl} target="_blank" className="flex items-center justify-between p-5 bg-white/5 rounded-3xl hover:bg-blue-500 transition-all border border-white/5 group">
                      <span className="font-black text-xs uppercase tracking-widest">Source Blueprint</span>
                      <Terminal className="w-5 h-5 text-blue-400 group-hover:text-white" />
                    </a>
                  )}
                </div>
            </div>
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
                All Visions <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/20 transition-colors"></div>
                    <div className="absolute top-5 left-5">
                      <span className="bg-yellow-400 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="font-black text-lg group-hover:text-yellow-400 transition-colors truncate mb-2">{p.title}</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-3 h-12 italic">"{p.description}"</p>
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
