import { useState, useEffect } from "react";
import api from "../../api/api";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  X,
  Clock,
  Building
} from "lucide-react";

const ExperienceManager = () => {
    const [experiences, setExperiences] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentExp, setCurrentExp] = useState<any>(null);
    const [formData, setFormData] = useState<any>({
        role: "",
        company: "",
        duration: "",
        description: "",
        technologies: []
    });

    useEffect(() => {
        fetchExperience();
    }, []);

    const fetchExperience = async () => {
        setLoading(true);
        try {
            const response = await api.get("/experience");
            setExperiences(response.data);
        } catch (err) {
            console.error("Failed to fetch experience");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Delete this experience record?")) return;
        try {
            await api.delete(`/experience/${id}`);
            setExperiences(experiences.filter(e => e.id !== id));
        } catch (err) {
            alert("Failed to delete experience");
        }
    };

    const handleEdit = (exp: any) => {
        setCurrentExp(exp);
        setFormData(exp);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentExp) {
                await api.put(`/experience/${currentExp.id}`, formData);
            } else {
                await api.post("/experience", formData);
            }
            setIsModalOpen(false);
            fetchExperience();
        } catch (err) {
            alert("Failed to save experience");
        }
    };

    return (
        <div className="space-y-6 font-roboto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Work History</h2>
                    <p className="text-gray-400 font-medium">Manage your professional career timeline</p>
                </div>
                <button 
                    onClick={() => {
                        setCurrentExp(null);
                        setFormData({ role: "", company: "", duration: "", description: "", technologies: [] });
                        setIsModalOpen(true);
                    }}
                    className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-yellow-500 hover:shadow-xl transition-all duration-300"
                >
                    <Plus className="w-5 h-5" />
                    New Experience
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <div className="md:col-span-2 text-center py-20 text-gray-300 font-bold uppercase tracking-widest">Chronologically sorting...</div>
                ) : experiences.length === 0 ? (
                    <div className="md:col-span-2 text-center py-20 text-gray-300 font-bold uppercase tracking-widest">No history recorded.</div>
                ) : experiences.map((exp) => (
                    <div key={exp.id} className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                             <button onClick={() => handleEdit(exp)} className="p-3 bg-yellow-50 text-yellow-600 rounded-2xl hover:bg-yellow-100 transition-colors">
                                <Edit3 className="w-5 h-5" />
                             </button>
                             <button onClick={() => handleDelete(exp.id)} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors">
                                <Trash2 className="w-5 h-5" />
                             </button>
                        </div>

                        <div className="flex items-start gap-5 mb-6">
                            <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-slate-400">
                                <Building className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-slate-900 group-hover:text-yellow-600 transition-colors">{exp.role}</h4>
                                <div className="flex items-center gap-4 mt-1 text-xs font-bold uppercase tracking-widest text-blue-500">
                                    <span className="flex items-center gap-1"><Building className="w-3 h-3"/> {exp.company}</span>
                                    <span className="flex items-center gap-1 text-gray-400"><Clock className="w-3 h-3"/> {exp.duration}</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">"{exp.description}"</p>

                        <div className="flex flex-wrap gap-2">
                            {exp.technologies?.map((tech: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-gray-100 italic">
                                    #{tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] p-10 shadow-2xl relative animate-in slide-in-from-bottom-5">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-2xl transition-all">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                        
                        <div className="mb-10 text-center">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{currentExp ? "Update Milestone" : "Add Career Chapter"}</h3>
                            <p className="text-gray-400 font-medium">Document your professional development</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-600 ml-1 uppercase tracking-widest">Job Title</label>
                                    <input 
                                        placeholder="e.g. Lead Developer" 
                                        value={formData.role}
                                        onChange={e => setFormData({...formData, role: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 outline-none font-bold"
                                        required 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-600 ml-1 uppercase tracking-widest">Organization</label>
                                    <input 
                                        placeholder="e.g. Google" 
                                        value={formData.company}
                                        onChange={e => setFormData({...formData, company: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 outline-none font-bold"
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-600 ml-1 uppercase tracking-widest">Time Period</label>
                                <input 
                                    placeholder="e.g. 2021 - Present" 
                                    value={formData.duration}
                                    onChange={e => setFormData({...formData, duration: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 outline-none font-bold text-yellow-600"
                                    required 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-600 ml-1 uppercase tracking-widest">Responsibilities & Impact</label>
                                <textarea 
                                    placeholder="Describe your core tasks and achievements..." 
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 outline-none font-bold min-h-[120px] resize-none"
                                    required 
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl hover:bg-yellow-500 hover:shadow-2xl transition-all duration-500 uppercase tracking-widest mt-4"
                            >
                                {currentExp ? "Sync History Record" : "Append to Career Timeline"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExperienceManager;
