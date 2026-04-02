import React, { useState, useEffect } from 'react';
// import BackgroundPattern from '../components/BackgroundPattern';
import { ExternalLink, Code, User, Briefcase, Github, Star, Loader2 } from 'lucide-react';
import api from '../api/api';
import { Link } from 'react-router-dom';

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
  projectType: 'Personal' | 'Freelanced';
  status: string;
  client?: string;
  featured?: boolean;
}

const ProjectPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
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

  const personalProjects = projects.filter(p => p.projectType === 'Personal');
  const freelancedProjects = projects.filter(p => p.projectType === 'Freelanced');

  const sortedPersonalProjects = [...personalProjects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedFreelancedProjects = [...freelancedProjects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedAllProjects = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getTechColor = (tech: string) => {
    const colors: Record<string, string> = {
      React: "bg-blue-500/20 text-blue-400 border-blue-400/30",
      JavaScript: "bg-yellow-500/20 text-yellow-400 border-yellow-400/30",
      TailwindCSS: "bg-cyan-500/20 text-cyan-400 border-cyan-400/30",
      CSS3: "bg-pink-500/20 text-pink-400 border-pink-400/30",
      HTML5: "bg-red-500/20 text-red-400 border-red-400/30",
      Vercel: "bg-red-600/20 text-gray-300 border-gray-400/30",
      Vite: "bg-yellow-600/20 text-yellow-400 border-yellow-400/30",
      TypeScript: "bg-blue-600/20 text-blue-400 border-blue-400/30",
    };
    return colors[tech] || "bg-gray-500/20 text-gray-400 border-gray-400/30";
  };

  const ProjectCard: React.FC<{ project: Project; isFreelanced?: boolean; index: number }> = ({
    project,
    isFreelanced = false,
    index,
  }) => (
    <Link
      to={`/projects/${project.id}`}
      className="group bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-400/30 hover:shadow-2xl hover:transform hover:scale-105 transition-all duration-300 flex flex-col h-full"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none"></div>

        <div className="absolute top-4 right-4 flex gap-2">
          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-400/30 backdrop-blur-sm">
            {project.status}
          </span>
          {project.featured && (
            <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-400/30 backdrop-blur-sm flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {isFreelanced && (
          <div className="absolute top-4 left-4">
            <span className="bg-slate-900/80 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-white/20 backdrop-blur-sm">
              <Briefcase className="w-3 h-3" />
              Client Work
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2 h-12">
            {project.title}
          </h3>
        </div>

        <p className="text-blue-400 text-sm mb-2 flex items-center gap-2">
          {isFreelanced ? (
            <>
              <Briefcase className="w-4 h-4" />
              {project.client || "Client"}
            </>
          ) : (
            <>
              <User className="w-4 h-4" />
              Personal Project
            </>
          )}
        </p>

        <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3 h-[4.5rem]">
          {project.description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4 h-14 overflow-hidden relative">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={`${tech}-${idx}`}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-all duration-200 hover:scale-105 ${getTechColor(
                  tech
                )}`}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-4 py-2 rounded-lg font-bold transition-all duration-200 flex items-center gap-2 text-xs hover:scale-105 hover:shadow-lg"
            >
              <ExternalLink className="w-4 h-4" />
              View Details
            </div>
            {project.githubUrl && (
              <div className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                <Github className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            A comprehensive showcase of my web development journey, featuring personal projects and
            client collaborations. Each project highlights my dedication to crafting responsive,
            user-centric, and visually engaging web solutions.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-xl shadow-yellow-900/10">
            <div className="flex space-x-1">
              {[
                { id: "all", label: "All Projects", icon: Code },
                { id: "personal", label: "Personal", icon: User },
                { id: "freelanced", label: "Client Work", icon: Briefcase },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 transform ${activeTab === id
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 shadow-lg scale-105"
                    : "text-gray-300 hover:text-yellow-400 hover:bg-white/5 hover:scale-105"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl min-h-[600px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Architecting Portfolios...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeTab === "personal"
                ? sortedPersonalProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))
                : activeTab === "freelanced"
                  ? sortedFreelancedProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} isFreelanced={true} index={index} />
                  ))
                  : sortedAllProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isFreelanced={project.projectType === 'Freelanced'}
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
