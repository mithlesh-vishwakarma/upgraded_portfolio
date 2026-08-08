import { useState, useEffect } from "react";
import api from "../../api/api";
import { FolderGit2, Briefcase, GraduationCap, Code2, TrendingUp } from "lucide-react";

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
        </div>
    );
};

export default Dashboard;
