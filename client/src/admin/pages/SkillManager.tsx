import { useState, useEffect } from "react";
import api from "../../api/api";
import { 
  Trash2, 
  Edit3, 
  Layers, 
  Star, 
  X,
  PlusCircle,
  Zap
} from "lucide-react";

const SkillManager = () => {
    const [data, setData] = useState<any>({ categories: [], extra_skills: [] });
    const [loading, setLoading] = useState(true);
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [isExtraSkillModalOpen, setIsExtraSkillModalOpen] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<any>(null);
    const [formData, setFormData] = useState<any>({
        name: "",
        percentage: 80,
        category_id: ""
    });
    const [extraSkillName, setExtraSkillName] = useState("");

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        setLoading(true);
        try {
            const response = await api.get("/skills");
            setData(response.data);
            if (response.data.categories.length > 0) {
                setFormData((f: any) => ({ ...f, category_id: response.data.categories[0].id }));
            }
        } catch (err) {
            console.error("Failed to fetch skills");
        } finally {
            setLoading(false);
        }
    };

    const handleSkillSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentSkill) {
                await api.put(`/skills/${currentSkill.id}`, formData);
            } else {
                await api.post("/skills", formData);
            }
            setIsSkillModalOpen(false);
            fetchSkills();
        } catch (err) {
            alert("Failed to save skill");
        }
    };

    const handleExtraSkillSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/skills/extra", { name: extraSkillName });
            setExtraSkillName("");
            setIsExtraSkillModalOpen(false);
            fetchSkills();
        } catch (err) {
            alert("Failed to save extra skill");
        }
    };

    const deleteSkill = async (id: string) => {
        if (!window.confirm("Remove this skill?")) return;
        try {
            await api.delete(`/skills/${id}`);
            fetchSkills();
        } catch (err) {
            alert("Failed to delete skill");
        }
    };

    const deleteExtraSkill = async (id: string) => {
        if (!window.confirm("Remove this extra skill?")) return;
        try {
            await api.delete(`/skills/extra/${id}`);
            fetchSkills();
        } catch (err) {
            alert("Failed to delete extra skill");
        }
    };

    return (
        <div className="space-y-10 font-roboto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Expertise Reservoir</h2>
                    <p className="text-gray-400 font-medium tracking-wide">Quantify and categorize your core technical abilities</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={() => {
                            setCurrentSkill(null);
                            setFormData({ ...formData, name: "", percentage: 80 });
                            setIsSkillModalOpen(true);
                        }}
                        className="bg-slate-900 text-white px-6 py-3.5 rounded-3xl font-bold flex items-center gap-2 hover:bg-yellow-500 hover:shadow-2xl transition-all duration-300 uppercase tracking-widest text-[10px]"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Add Core Skill
                    </button>
                    <button 
                        onClick={() => setIsExtraSkillModalOpen(true)}
                        className="bg-gray-100 text-slate-600 px-6 py-3.5 rounded-3xl font-bold flex items-center gap-2 hover:bg-yellow-400/20 hover:text-yellow-600 transition-all duration-300 uppercase tracking-widest text-[10px]"
                    >
                        <Zap className="w-4 h-4" />
                        Other Expertise
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-40 text-gray-300 font-bold uppercase tracking-widest">Profiling Expertise...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-2 px-2">
                            <h3 className="text-xl font-bold text-slate-800">Operational Domains</h3>
                            <div className="h-px flex-1 bg-gray-100"></div>
                        </div>
                        
                        {data.categories.map((cat: any) => (
                            <div key={cat.id} className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm group">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-yellow-400/10 rounded-2xl text-yellow-500">
                                            <Layers className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">{cat.name}</h4>
                                    </div>
                                    <span className="px-3 py-1 bg-gray-50 text-gray-300 text-[10px] font-black rounded-lg uppercase tracking-widest">
                                        {cat.skills.length} Items
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    {cat.skills.map((skill: any) => (
                                        <div key={skill.id} className="group/skill relative">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-bold text-slate-700">{skill.name}</span>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{skill.percentage}% Proficiency</span>
                                                    <div className="flex opacity-0 group-hover/skill:opacity-100 transition-opacity">
                                                        <button onClick={() => {
                                                            setCurrentSkill(skill);
                                                            setFormData(skill);
                                                            setIsSkillModalOpen(true);
                                                        }} className="p-1 text-blue-500 hover:scale-125 transition-transform"><Edit3 className="w-3 h-3"/></button>
                                                        <button onClick={() => deleteSkill(skill.id)} className="p-1 text-red-400 hover:scale-125 transition-transform"><Trash2 className="w-3 h-3"/></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-1000"
                                                    style={{ width: `${skill.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                    {cat.skills.length === 0 && <p className="text-center text-xs font-bold text-gray-300 italic py-4">Domain empty. Insert technical capacity.</p>}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-2 px-2">
                            <h3 className="text-xl font-bold text-slate-800">Ancillary Proficiencies</h3>
                            <div className="h-px flex-1 bg-gray-100"></div>
                        </div>

                        <div className="bg-slate-900 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
                           <div className="relative z-10 grid grid-cols-2 gap-4">
                                {data.extra_skills.map((skill: any) => (
                                    <div key={skill.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-yellow-400/20 transition-all hover:-translate-y-1">
                                        <div className="flex items-center gap-3">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400/20" />
                                            <span className="text-sm font-bold text-white tracking-wide">{skill.name}</span>
                                        </div>
                                        <button onClick={() => deleteExtraSkill(skill.id)} className="text-white/20 hover:text-red-400 transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                {data.extra_skills.length === 0 && <p className="col-span-2 text-center text-slate-500 font-bold italic py-10">Expand your horizontal Expertise.</p>}
                           </div>
                           <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-yellow-400/20 transition-all"></div>
                        </div>
                    </section>
                </div>
            )}

            {/* Modals */}
            {isSkillModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
                    <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl relative animate-in slide-in-from-bottom-5">
                        <button onClick={() => setIsSkillModalOpen(false)} className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-2xl transition-all">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                        
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-8">Skill Blueprint</h3>
                        
                        <form onSubmit={handleSkillSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Domain Classification</label>
                                <select 
                                    value={formData.category_id}
                                    onChange={e => setFormData({...formData, category_id: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 outline-none font-black appearance-none"
                                    required
                                >
                                    {data.categories.map((cat: any) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Competency Name</label>
                                <input 
                                    placeholder="e.g. React Engine" 
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 outline-none font-black"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between ml-1 mb-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mastery Level</label>
                                    <span className="text-xl font-black text-yellow-600">{formData.percentage}%</span>
                                </div>
                                <input 
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.percentage}
                                    onChange={e => setFormData({...formData, percentage: parseInt(e.target.value)})}
                                    className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
                                />
                            </div>

                            <button className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl hover:bg-yellow-500 uppercase tracking-widest transition-all mt-4">
                                Calibrate Expertise
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isExtraSkillModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
                    <div className="bg-white w-full max-w-sm rounded-[40px] p-10 shadow-2xl relative animate-in zoom-in">
                        <button onClick={() => setIsExtraSkillModalOpen(false)} className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-2xl transition-all">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                        
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Extend Horizon</h3>
                        
                        <form onSubmit={handleExtraSkillSubmit} className="space-y-6">
                            <input 
                                placeholder="e.g. System Design Architecture" 
                                value={extraSkillName}
                                onChange={e => setExtraSkillName(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 outline-none font-black"
                                required
                            />
                            <button className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-yellow-500 hover:shadow-xl uppercase tracking-widest transition-all">
                                Expand Capability
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillManager;
