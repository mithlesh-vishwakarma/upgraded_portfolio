import React, { useState, useEffect } from 'react';
import BackgroundPattern from '../components/BackgroundPattern';
import { ExternalLink, Code, User, Briefcase, Globe, Github, Star } from 'lucide-react';
import PersonalProject1 from "../assets/PersonalProject1.jpg";
import ClientProject1 from "../assets/clientProject1.jpg";
import ClientProject2 from "../assets/clientProject2.png";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl?: string;
  image: string;
  date: string; 
  featured?: boolean;
  status: string;
  client?: string;
}

const ProjectPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Sample project data (use YYYY-MM-DD format for better sorting)
  const personalProjects: Project[] = [
    {
      id: 1,
      title: "Personal-Portfolio",
      description:
        "A modern personal portfolio website showcasing my projects, skills, and experience. Built with React and Tailwind CSS for a responsive and interactive UI, featuring smooth animations, a contact form, and optimized performance.",
      technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "TypeScript", "Vercel"],
      liveUrl: "https://ordinarycoder.com",
      githubUrl: "https://github.com/mithlesh-vishwakarma/upgraded_portfolio",
      image: PersonalProject1,
      date: "2025-09-25",
      featured: true,
      status: "Live",
    },
  ];

  const freelancedProjects: Project[] = [
    {
      id: 4,
      title: "Sarda Chemical Corporation",
      description:
        "Developed a modern industrial website for Sarda Chemical Corporation to showcase their chemical products, manufacturing capabilities, and corporate information. The site features an intuitive navigation system, product detail pages, responsive design for all devices, and SEO optimization to enhance online visibility.",
      technologies: ["JavaScript", "HTML5", "CSS3", "Elementor"],
      liveUrl: "https://sardachemicalcorporation.com/",
      githubUrl: "https://github.com/mithlesh-vishwakarma/sarda",
      image: ClientProject1,
      date: "2024-06-10",
      client: "Sarda Chemical Corporation",
      featured: false,
      status: "Live",
    },
    {
      id: 5,
      title: "Bastion Research",
      description:
        "Bastion Research is a boutique equity-research company focused on the Indian market. Their clients are mainly fund managers, institutions, family offices, and self-directed (DIY) investors. They aim to help these clients make more informed investment decisions. It runs a subscription platform called Bastion CORE, which offers detailed business reports, quantitative screens (QUANT), “Spotlight” reports, continuous updates, etc.",
      technologies: [
        "React",
        "NodeJs",
        "ExpressJs",
        "MongoDB",
        "TailwindCSS",
        "Vite",
        "Framer Motion",
        "TypeScript",
        "Vercel",
      ],
      liveUrl: "https://dev.bastionresearch.in/",
      githubUrl: "#",
      image: ClientProject2,
      date: "2025-10-11",
      client: "Bastion Research",
      featured: true,
      status: "In Development",
    },
  ];

  // ✅ Sort projects by date (latest first)
  const sortedPersonalProjects = [...personalProjects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedFreelancedProjects = [...freelancedProjects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sortedAllProjects = [...personalProjects, ...freelancedProjects].sort(
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
      Elementor: "bg-blue-500/20 text-blue-400 border-blue-400/30",
      TypeScript: "bg-blue-600/20 text-blue-400 border-blue-400/30",
      ExpressJs: "bg-gray-700/20 text-gray-400 border-gray-400/30",
      MongoDB: "bg-green-500/20 text-green-400 border-green-400/30",
      NodeJs: "bg-green-600/20 text-green-400 border-green-400/30",
      
    };
    return colors[tech] || "bg-gray-500/20 text-gray-400 border-gray-400/30";
  };

  const ProjectCard: React.FC<{ project: Project; isFreelanced?: boolean; index: number }> = ({
    project,
    isFreelanced = false,
    index,
  }) => (
    <div
      className="group bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-400/30 hover:shadow-2xl hover:transform hover:scale-105 transition-all duration-300 flex flex-col h-full"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

        {/* Status badges */}
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

        {/* Quick action buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors duration-200"
          >
            <Globe className="w-4 h-4" />
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300">
            {project.title}
          </h3>
          {/* <div className="flex items-center text-yellow-400 text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {project.date}
          </div> */}
        </div>

        {isFreelanced && project.client && (
          <p className="text-blue-400 text-sm mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            {project.client}
          </p>
        )}

        <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-4">{project.description}</p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, idx) => (
              <span
                key={`${tech}-${idx}`}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 hover:scale-105 ${getTechColor(
                  tech
                )}`}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-sm hover:scale-105 hover:shadow-lg"
            >
              <ExternalLink className="w-4 h-4" />
              View Live
            </a>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-4 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  text-white font-roboto">
      <BackgroundPattern />
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        {/* Header Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
            Projects
          </h1>
          <p className="text-gray-300 text-sm lg:text-lg leading-relaxed mb-6 md:mb-8 max-w-full">
            A comprehensive showcase of my web development journey, featuring personal projects and
            client collaborations. Each project highlights my dedication to crafting responsive,
            user-centric, and visually engaging web solutions with modern technologies.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-[0_0_15px_#6b5815,0_0_30px_#6b5815]">
            <div className="flex space-x-1">
              {[
                { id: "all", label: "All Projects", icon: Code },
                { id: "personal", label: "Personal Projects", icon: User },
                { id: "freelanced", label: "Freelanced Projects", icon: Briefcase },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
                    activeTab === id
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

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl min-h-[600px]">
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
                    isFreelanced={freelancedProjects.includes(project)}
                    index={index}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
