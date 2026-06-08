import React, { useState, useEffect } from "react";
import { Briefcase, GraduationCap, Code2, GitBranch, Loader2, Zap } from 'lucide-react';
import api from "../api/api";
import BackgroundPattern from "../components/BackgroundPattern";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const [educationData, setEducationData] = useState<any[]>([]);
  const [experienceData, setExperienceData] = useState<any[]>([]);
  const [skillsData, setSkillsData] = useState<{ categories: any[], extra_skills: any[] }>({ categories: [], extra_skills: [] });

  useEffect(() => {
    setIsLoaded(true);
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [edu, exp, skills] = await Promise.all([
        api.get("/education"),
        api.get("/experience"),
        api.get("/skills")
      ]);
      setEducationData(edu.data);
      setExperienceData(exp.data);
      setSkillsData(skills.data);
    } catch (error) {
      console.error("Failed to fetch about data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-roboto relative">
      <BackgroundPattern />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16 relative z-10">
        {/* Header Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
            The Journey
          </h1>
          <p className="text-gray-300 text-sm lg:text-lg leading-relaxed mb-6 md:mb-8 max-w-full">
            Enthusiastic and self-taught web developer with a strong foundation in front-end technologies and a passion for building responsive, user-friendly websites. Quick learner, dedicated to continuous improvement.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-xl shadow-yellow-900/10">
            <div className="flex space-x-1">
              {[
                { id: 'experience', label: 'Experience', icon: Briefcase },
                { id: 'education', label: 'Education & Cirtification', icon: GraduationCap },
                { id: 'skills', label: 'Skills', icon: Code2 }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all duration-300 transform ${activeTab === id ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 shadow-lg scale-105' : 'text-gray-300 hover:text-yellow-400 hover:bg-white/5 hover:scale-102'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline uppercase tracking-widest text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl min-h-[600px] relative overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Accessing Chronicles...</p>
            </div>
          ) : (
            <>
              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                  {educationData.map((edu, index) => (
                    <div
                      key={edu.id}
                      className="group bg-white/5 rounded-[32px] p-8 border border-white/10 hover:border-yellow-400/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden shadow-xl"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div className="flex-1">
                          <div className="text-yellow-400 font-black text-xs uppercase tracking-widest mb-3">{edu.year}</div>
                          <h3 className="text-2xl font-black text-white mb-2 group-hover:text-yellow-400 transition-colors">
                            {edu.title}
                          </h3>
                          <div className="text-blue-400 font-bold text-lg mb-3 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            {edu.institution}
                          </div>
                        </div>
                        <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-2xl border border-green-500/20 font-black text-[10px] uppercase tracking-widest mt-4 md:mt-0 shadow-inner">
                          {edu.grade}
                        </div>
                      </div>
                      <p className="text-gray-400 leading-relaxed font-medium italic">"{edu.description}"</p>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl group-hover:bg-yellow-400/10 transition-all"></div>
                    </div>
                  ))}
                  {educationData.length === 0 && <p className="text-center py-20 text-gray-500 font-black italic uppercase tracking-widest">Educational ledger is empty.</p>}
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                  {experienceData.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="group bg-white/5 rounded-[32px] p-10 border border-white/10 hover:border-yellow-400/30 hover:bg-white/10 transition-all duration-300 shadow-xl"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-black text-yellow-400 mb-1 group-hover:scale-105 transition-transform origin-left">{exp.role}</h3>
                          <div className="text-white font-bold text-lg flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-gray-500" />
                            {exp.company}
                          </div>
                        </div>
                        <div className="text-blue-400 font-black text-xs uppercase tracking-widest mt-2 md:mt-0 flex items-center gap-2">
                          <GitBranch className="w-4 h-4" />
                          {exp.duration}
                        </div>
                      </div>

                      <p className="text-gray-400 leading-relaxed mb-8 font-medium italic">"{exp.description}"</p>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies?.map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="bg-white/5 text-gray-400 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 hover:border-yellow-400/30 hover:text-yellow-400 transition-all cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {experienceData.length === 0 && <p className="text-center py-20 text-gray-500 font-black italic uppercase tracking-widest">Professional history pending entry.</p>}
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {skillsData.categories.map((cat) => (
                      <div key={cat.id} className="bg-white/5 rounded-[32px] p-10 border border-white/10 hover:border-yellow-400/20 transition-all duration-300 group shadow-xl">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="p-3 bg-yellow-400/10 rounded-2xl border border-yellow-400/20 group-hover:scale-110 transition-transform">
                            <Code2 className="w-6 h-6 text-yellow-400" />
                          </div>
                          <h3 className="text-xl font-black text-yellow-400 uppercase tracking-tighter">{cat.name}</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {cat.skills.map((skill: any) => (
                            <div
                              key={skill.name}
                              className="bg-white/5 text-gray-300 px-4 py-2.5 rounded-xl text-xs font-bold border border-white/5 hover:border-yellow-400/30 hover:text-yellow-400 transition-all duration-300 cursor-default flex items-center gap-2 hover:-translate-y-1 shadow-lg"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
                              <span className="uppercase tracking-widest text-[10px]">{skill.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Extra Skills Section */}
                  {skillsData.extra_skills.length > 0 && (
                    <div className="mt-16">
                      <div className="flex items-center gap-4 mb-8 px-2">
                        <Zap className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-black uppercase tracking-widest text-gray-400">Ancillary Proficiencies</h3>
                        <div className="h-px flex-1 bg-white/5"></div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {skillsData.extra_skills.map((skill: any) => (
                          <div
                            key={skill.id}
                            className="bg-white/5 rounded-2xl p-5 text-center border border-white/5 hover:border-yellow-400/30 transition-all duration-500 hover:-translate-y-2 group shadow-lg"
                          >
                            <div className="text-2xl mb-3 group-hover:scale-125 transition-transform">⭐</div>
                            <div className="font-black text-white text-[10px] uppercase tracking-widest">{skill.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>
    </div>
  );
};

export default AboutPage;
