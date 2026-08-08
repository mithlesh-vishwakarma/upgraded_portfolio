import { useState, useEffect } from "react";
import api from "../../api/api";
import { FolderGit2, Briefcase, GraduationCap, Code2, ArrowUpRight, TrendingUp, Users, Clock } from "lucide-react";

const Dashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        experience: 0,
        skills: 0,
        education: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [p, exp, s, edu] = await Promise.all([
                    api.get("/projects"),
                    api.get("/experience"),
                    api.get("/skills"),
                    api.get("/education")
                ]);
                setStats({
                    projects: p.data.length,
                    experience: exp.data.length,
                    skills: s.data.categories.reduce((acc: number, cat: any) => acc + cat.skills.length, 0),
                    education: edu.data.length
                });
            } catch (error) {
                console.error("Error fetching stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: "Total Projects", value: stats.projects, icon: FolderGit2, color: "bg-blue-500", text: "text-blue-500" },
        { label: "Work Experience", value: stats.experience, icon: Briefcase, color: "bg-green-500", text: "text-green-500" },
        { label: "Skills Mastered", value: stats.skills, icon: Code2, color: "bg-yellow-500", text: "text-yellow-500" },
        { label: "Education Years", value: stats.education, icon: GraduationCap, color: "bg-purple-500", text: "text-purple-400" },
    ];

    if (loading) return <div className="text-center py-20 font-bold text-slate-400 animate-pulse uppercase tracking-widest">Loading Dashboard...</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-roboto">
            <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Overview Dashboard</h2>
                <p className="text-gray-400 font-medium tracking-wide">Summary of your professional portfolio assets</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-gray-100 hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`${card.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}>
                                <card.icon className="w-7 h-7" />
                            </div>
                            <span className="text-xs font-bold text-green-500 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full uppercase tracking-tighter">
                                <TrendingUp className="w-3 h-3" />
                                12% Up
                            </span>
                        </div>
                        <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{card.label}</h4>
                        <p className="text-3xl font-black text-slate-900 tracking-tight">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                             System Activity
                        </h3>
                        <button className="text-yellow-500 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                            View All <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                    
                    <div className="space-y-6">
                        {[
                            { title: "Project 'Sarda Chemical' updated", time: "2 hours ago", icon: Clock },
                            { title: "New Skill 'Supabase' added", time: "5 hours ago", icon: Code2 },
                            { title: "Education details refreshed", time: "1 day ago", icon: GraduationCap },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:border-gray-200 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-slate-400">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-700 text-sm">{item.title}</p>
                                        <p className="text-xs text-gray-400 font-medium">{item.time}</p>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-gray-300" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                   <div className="relative z-10">
                        <Users className="w-12 h-12 text-yellow-400 mb-6" />
                        <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight">Professional Portfolio Status</h3>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">Your portfolio is currently live and synchronized with Supabase. All management tools are active.</p>
                        <button className="w-full bg-white text-slate-900 font-black py-4 rounded-2xl hover:bg-yellow-400 transition-colors">
                            Backup Database
                        </button>
                   </div>
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
