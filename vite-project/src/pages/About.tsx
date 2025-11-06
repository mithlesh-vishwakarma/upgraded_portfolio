import React, { useState, useEffect } from "react";
import {  Briefcase,GraduationCap, Code2, Database, Globe, Palette, Terminal, Server, GitBranch, Earth } from 'lucide-react';
import BackgroundPattern from "../components/BackgroundPattern";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const educationData = [
    {
      year: "2019 - 2024",
      title: " BCA- Bachelor of Computer Applications",
      institution: "IGNOU- Indira Gandhi National Open University",
      description: "Comprehensive study in computer science fundamentals, software engineering principles, data structures, algorithms, and modern web technologies. Specialized in full-stack development with focus on scalable web applications.",
      grade: "CGPA: 6.6/10"
    },
    {
      year: "2016 - 2018",
      title: "Higher Secondary Education-12th (Science)",
      institution: "Gujarat State Education Board",
      description: "Focused on Mathematics, Physics, and Computer Science. Built strong analytical and problem-solving foundations that later supported my journey into software development.",
      grade: "Percentage: 80%"
    },
    {
      year: "2015 - 2016",
      title: "Secondary Education- 10th (SSC)",
      institution: "Gujarat State Education Board",
      description: "Completed with distinction, developing fundamental academic skills and discovering passion for technology and mathematics.",
      grade: "Percentage: 88.69%"
    }
  ];

  const experienceData = [
    {
      role: "Frontend Developer",
      company: "Freelance & Personal Projects",
      duration: "2024 - Present",
      description: "Developing custom web applications and digital solutions for various clients. Specializing in modern JavaScript frameworks, responsive design, and scalable backend architectured clone. Successfully delivered 5+ projects ranging from e-commerce platforms to business management systems.",
      technologies: ["React", "HTML5", "CSS3", "TypeScript", "JavaScript", "Bootstrap", "Tailwind CSS"]
    },
    {
      role: "Assistant Manager",
      company: "La Colours - Ref/Promoted. from (Sarra Fab Int. P.Ltd.)",
      duration: "2024 - 2025",
      description: "Managed and supervised daily operations across multiple departments, ensuring smooth workflow and timely delivery. Conducted data analysis to monitor production efficiency, resource utilization, and cost optimization. Coordinated with cross-functional teams to implement process improvements, manage inventory, and enhance overall productivity.",
      technologies: ["MS Excel", "Process Optimization", "ERP Systems", "Team Leadership", "Data Analysis", "Inventory Management Tools", "Reporting & Documentation"]
    },
    {
      role: "Account Executive",
      company: "Sarra Fab International Pvt. Ltd.",
      duration: "2019 - 2024",
      description: "Managed client accounts and maintained strong relationships to ensure customer satisfaction and repeat business. Handled order processing, invoicing, and payment follow-ups. Coordinated with production and logistics teams for timely delivery of goods. Prepared financial reports, monitored account statements, and ensured compliance with company policies.",
      technologies: ["MS Excel", "Tally ERP", "Google Sheets", "Email Communication", "CRM Tools", "Account Handling", "Billing & Invoicing", "Data Entry & Analysis", "Financial Reporting"]
    }
  ];

  const skillsData = {
    frontend: [
      { name: "HTML/CSS", percentage: 85, icon: Globe },
      { name: "JavaScript", percentage: 75, icon: Terminal },
      { name: "React.js + Vite", percentage: 75, icon: Code2 },
      { name: "Tailwind CSS", percentage: 65, icon: Palette }
    ],
    backend: [
      { name: "Node.js", percentage: 35, icon: Server },
      { name: "MySQL", percentage: 70, icon: Database }
    ],
    tools: [
      { name: "Git/GitHub", percentage: 70, icon: GitBranch },
      { name: "VS Code", percentage: 95, icon: Terminal },
      { name: "MS Office", percentage: 80, icon: Globe },
      { name: "SEO Optimization", percentage: 95, icon: Earth }
    ]
  };

  return (
    <div className="min-h-screen ">
      <BackgroundPattern />
      <div className="min-h-screen  text-white font-roboto">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
          {/* Header Section */}
          <div
            className={`text-center mb-16 transition-all duration-1000 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
              About Me
            </h1>
            <p className="text-gray-300 text-sm lg:text-lg leading-relaxed mb-6 md:mb-8 max-w-full">
              Enthusiastic and self-taught web developer with a strong foundation in front-end technologies and a passion for building responsive, user-friendly websites. Quick learner, dedicated to continuous improvement, and actively engaged in freelance projects to gain hands-on experience.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-[0_0_15px_#6b5815,0_0_30px_#6b5815]">
              <div className="flex space-x-1">
                {[
                  { id: 'experience', label: 'Experience', icon: Briefcase },
                  { id: 'education', label: 'Education', icon: GraduationCap },
                  { id: 'skills', label: 'Skills', icon: Code2 }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform ${activeTab === id ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 shadow-lg scale-105' : 'text-gray-300 hover:text-yellow-400 hover:bg-white/5 hover:scale-102'}`}
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
            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="space-y-8 animate-fade-in-up">
                {educationData.map((edu, index) => (
                  <div
                    key={index}
                    className="group bg-white/5 rounded-2xl p-6 border-l-4 border-yellow-400 hover:bg-white/10 hover:transform hover:translate-x-2 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        <div className="text-yellow-400 font-bold text-sm mb-2">{edu.year}</div>
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                          {edu.title}
                        </h3>
                        <div className="text-blue-400 text-lg mb-3">{edu.institution}</div>
                      </div>
                      <div className="text-green-400 font-semibold text-sm">{edu.grade}</div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{edu.description}</p>
                    <div className="mt-4 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-8 animate-fade-in-up">
                {experienceData.map((exp, index) => (
                  <div
                    key={index}
                    className="group bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-yellow-400/50 hover:shadow-xl hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-yellow-400 mb-1">{exp.role}</h3>
                        <div className="text-white text-lg">{exp.company}</div>
                      </div>
                      <div className="text-blue-400 font-medium text-sm mt-2 md:mt-0">{exp.duration}</div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-4">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium border border-yellow-400/30 hover:bg-yellow-400/30 transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="animate-fade-in-up">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Frontend Skills */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-yellow-400/20 rounded-lg">
                        <Palette className="w-6 h-6 text-yellow-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-yellow-400">Frontend</h3>
                    </div>
                    {skillsData.frontend.map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} delay={index * 100} />
                    ))}
                  </div>

                  {/* Backend Skills */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-yellow-400/20 rounded-lg">
                        <Server className="w-6 h-6 text-yellow-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-yellow-400">Backend (Basics)</h3>
                    </div>
                    {skillsData.backend.map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} delay={index * 100} />
                    ))}
                  </div>

                  {/* Tools & Technologies */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-yellow-400/20 rounded-lg">
                        <Terminal className="w-6 h-6 text-yellow-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-yellow-400">Tools & Other Expertise</h3>
                    </div>
                    {skillsData.tools.map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} delay={index * 100} />
                    ))}
                  </div>
                </div>

                {/* Additional Skills Section */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { name: "Problem Solving", level: "Expert", icon: "🧠" },
                    { name: "Team Leadership", level: "Advanced", icon: "👥" },
                    { name: "AI Enhanced-Frontend", level: "Advanced", icon: "🤖" },
                    { name: "Project Management", level: "Advanced", icon: "📋" }
                  ].map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 text-center border border-white/10 hover:border-yellow-400/30 transition-all duration-300 hover:transform hover:scale-105 group"
                    >
                      <div className="text-3xl mb-2 group-hover:animate-bounce">{skill.icon}</div>
                      <div className="font-medium text-white text-sm">{skill.name}</div>
                      <div className="text-yellow-400 text-xs font-semibold">{skill.level}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

type Skill = {
  name: string;
  percentage: number;
  icon: React.ComponentType<any>;
};

type SkillBarProps = {
  skill: Skill;
  delay?: number;
};

const SkillBar: React.FC<SkillBarProps> = ({ skill, delay = 0 }) => {
  const IconComponent = skill.icon;

  return (
    <div
      className="mb-6 transform transition-all duration-500 hover:scale-105 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <IconComponent className="w-4 h-4 text-yellow-400" />
          <span className="font-medium text-gray-200">{skill.name}</span>
        </div>
        <span className="text-yellow-400 font-semibold text-sm">{skill.percentage}%</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden animate-skill-fill"
          style={{ width: `${skill.percentage}%` }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
