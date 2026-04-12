import { useState, useEffect } from "react";
import api from "../../api/api";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  GraduationCap, 
  Award, 
  X,
  BookOpen
} from "lucide-react";

import { useToast } from "../../context/ToastContext";

const EducationManager = () => {
    const { showToast } = useToast();
    const [education, setEducation] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEdu, setCurrentEdu] = useState<any>(null);
    const [formData, setFormData] = useState<any>({
        year: "",
        title: "",
        institution: "",
        description: "",
        grade: ""
    });

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        setLoading(true);
        try {
            const response = await api.get("/education");
            setEducation(response.data);
        } catch (err) {
            showToast("Academic records currently unreachable", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Archive this education record?")) return;
        try {
            await api.delete(`/education/${id}`);
            setEducation(education.filter(e => e.id !== id));
            showToast("Educational entry archived", "success");
        } catch (err) {
            showToast("Archive failed: System encryption locked", "error");
        }
    };

    const handleEdit = (edu: any) => {
        setCurrentEdu(edu);
        setFormData(edu);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentEdu) {
                await api.put(`/education/${currentEdu.id}`, formData);
                showToast("Academic certification updated", "success");
            } else {
                await api.post("/education", formData);
                showToast("New education milestone established", "success");
            }
            setIsModalOpen(false);
            fetchEducation();
        } catch (err) {
            showToast("Failed to sync education: Validation error", "error");
        }
    };

    return (
        <div className="space-y-6 font-roboto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Academic History</h2>
                    <p className="text-gray-400 font-medium">Manage your educational background and qualifications</p>
                </div>
                <button 
                    onClick={() => {
                        setCurrentEdu(null);
                        setFormData({ year: "", title: "", institution: "", description: "", grade: "" });
                        setIsModalOpen(true);
                    }}
                    className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-yellow-500 hover:shadow-xl transition-all duration-300"
                >
                    <Plus className="w-5 h-5" />
                    Record Degree
                </button>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-20 text-gray-300 font-bold uppercase tracking-widest animate-pulse">Retrieving academic credentials...</div>
                ) : education.length === 0 ? (
                    <div className="text-center py-20 text-gray-300 font-bold uppercase tracking-widest">No degrees found.</div>
                ) : education.map((edu) => (
                    <div key={edu.id} className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col md:flex-row gap-8 relative">
                        <div className="absolute top-8 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => handleEdit(edu)} className="p-3 bg-yellow-50 text-yellow-600 rounded-2xl hover:bg-yellow-100 transition-colors">
                                <Edit3 className="w-5 h-5" />
                             </button>
                             <button onClick={() => handleDelete(edu.id)} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors">
                                <Trash2 className="w-5 h-5" />
                             </button>
                        </div>

                        <div className="flex-shrink-0 w-20 h-20 bg-blue-50 border border-blue-100 rounded-3xl flex items-center justify-center text-blue-500 shadow-inner group-hover:scale-110 transition-transform duration-300">
                             <GraduationCap className="w-10 h-10" />
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between pr-20">
                                <div>
                                    <h4 className="text-2xl font-black text-slate-900 group-hover:text-yellow-600 transition-colors">{edu.title}</h4>
                                    <div className="flex items-center gap-3 mt-1 font-bold text-gray-400 text-sm tracking-wide">
                                        <BookOpen className="w-4 h-4 text-blue-400" />
                                        <span>{edu.institution}</span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <span className="px-4 py-2 bg-slate-900 text-white rounded-2xl text-xs font-black tracking-widest shadow-lg shadow-slate-200">
                                        {edu.year}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-500 leading-relaxed max-w-3xl font-medium">"{edu.description}"</p>

                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-2xl text-xs font-black tracking-widest uppercase border border-green-100">
                                <Award className="w-4 h-4" />
                                {edu.grade || "Distinction"}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] p-10 shadow-2xl relative animate-in zoom-in-95 duration-300">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-2xl transition-all">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                        
                        <div className="mb-10 text-center">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{currentEdu ? "Certify Qualification" : "New Enrollment"}</h3>
                            <p className="text-gray-400 font-medium tracking-wide">Update your formal training records</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <input 
                                    placeholder="Program Title (e.g. Bachelor of Technology)" 
                                    value={formData.title}
                                    onChange={e => setFormData({...formData, title: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 outline-none font-bold placeholder:text-gray-300"
                                    required 
                                />
                                <input 
                                    placeholder="College / University Name" 
                                    value={formData.institution}
                                    onChange={e => setFormData({...formData, institution: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 outline-none font-bold placeholder:text-gray-300"
                                    required 
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input 
                                        placeholder="Duration (e.g. 2018 - 2022)" 
                                        value={formData.year}
                                        onChange={e => setFormData({...formData, year: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 outline-none font-bold text-blue-600 placeholder:text-gray-300"
                                        required 
                                    />
                                    <input 
                                        placeholder="Grade (e.g. CGPA: 8.5)" 
                                        value={formData.grade}
                                        onChange={e => setFormData({...formData, grade: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 outline-none font-bold text-green-600 placeholder:text-gray-300"
                                    />
                                </div>
                                <textarea 
                                    placeholder="Brief course overview and major subjects..." 
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 focus:ring-4 focus:ring-yellow-400/20 outline-none font-bold min-h-[120px] resize-none placeholder:text-gray-300"
                                    required 
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl hover:bg-yellow-500 hover:shadow-2xl transition-all duration-500 uppercase tracking-widest mt-4"
                            >
                                {currentEdu ? "Finalize Records Sync" : "Enroll Education Entry"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EducationManager;
