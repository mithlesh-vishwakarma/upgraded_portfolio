import { useState, useEffect } from "react";
import api from "../../api/api";
import { 
  Trash2, 
  Edit3, 
  Layers, 
  Star, 
  X,
  PlusCircle,
  Zap,
  Server,
  Layout,
  Database,
  Cpu,
  Wrench,
  Award,
  Terminal,
  Code2,
  GripVertical
} from "lucide-react";

import { useToast } from "../../context/ToastContext";
import { useConfirm } from "../../context/ConfirmContext";

const getCategoryIcon = (name: string) => {
  const normalizedName = name.toLowerCase();
  
  if (normalizedName.includes('front')) {
    return Layout;
  }
  if (normalizedName.includes('back') || normalizedName.includes('api')) {
    return Server;
  }
  if (normalizedName.includes('database') || normalizedName.includes('db')) {
    return Database;
  }
  if (normalizedName.includes('language') || normalizedName.includes('programming') || normalizedName.includes('code')) {
    return Terminal;
  }
  if (normalizedName.includes('ai') || normalizedName.includes('artificial') || normalizedName.includes('machine learning')) {
    return Cpu;
  }
  if (normalizedName.includes('tool') || normalizedName.includes('devops') || normalizedName.includes('git') || normalizedName.includes('cloud')) {
    return Wrench;
  }
  if (normalizedName.includes('soft') || normalizedName.includes('interpersonal') || normalizedName.includes('skill')) {
    return Award;
  }
  
  return Code2; // Default fallback icon
};


const SkillManager = () => {
    const { showToast } = useToast();
    const confirm = useConfirm();
    const [data, setData] = useState<any>({ categories: [], extra_skills: [] });
    const [loading, setLoading] = useState(true);
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [isExtraSkillModalOpen, setIsExtraSkillModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<any>(null);
    const [currentCategory, setCurrentCategory] = useState<any>(null);
    const [categoryName, setCategoryName] = useState("");
    const [formData, setFormData] = useState<any>({
        name: "",
        percentage: 80,
        category_id: ""
    });
    const [extraSkillName, setExtraSkillName] = useState("");

    const [draggedCategoryIndex, setDraggedCategoryIndex] = useState<number | null>(null);
    const [draggedSkillInfo, setDraggedSkillInfo] = useState<{ categoryId: string; index: number } | null>(null);

    const handleCategoryDragStart = (e: React.DragEvent, index: number) => {
        setDraggedCategoryIndex(index);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleCategoryDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedCategoryIndex === null || draggedCategoryIndex === index) return;
        
        const categories = [...data.categories];
        const draggedItem = categories[draggedCategoryIndex];
        categories.splice(draggedCategoryIndex, 1);
        categories.splice(index, 0, draggedItem);
        
        const updated = categories.map((cat, idx) => ({ ...cat, sort_order: idx }));
        setData({ ...data, categories: updated });
        setDraggedCategoryIndex(index);
    };

    const handleCategoryDragEnd = async () => {
        setDraggedCategoryIndex(null);
        
        const orders = data.categories.map((cat: any, idx: number) => ({
            id: cat.id,
            sort_order: idx
        }));
        
        try {
            await api.post("/skills/categories/reorder", { orders });
            showToast("Category order synchronized", "success");
        } catch (err) {
            showToast("Failed to save category order", "error");
        }
    };

    const handleSkillDragStart = (e: React.DragEvent, categoryId: string, index: number) => {
        e.stopPropagation(); // prevent category drag
        setDraggedSkillInfo({ categoryId, index });
        e.dataTransfer.effectAllowed = "move";
    };

    const handleSkillDragOver = (e: React.DragEvent, categoryId: string, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedSkillInfo === null || draggedSkillInfo.categoryId !== categoryId || draggedSkillInfo.index === index) return;
        
        const categories = [...data.categories];
        const categoryIdx = categories.findIndex(cat => cat.id === categoryId);
        if (categoryIdx === -1) return;
        
        const skills = [...categories[categoryIdx].skills];
        const draggedItem = skills[draggedSkillInfo.index];
        skills.splice(draggedSkillInfo.index, 1);
        skills.splice(index, 0, draggedItem);
        
        categories[categoryIdx].skills = skills.map((s, idx) => ({ ...s, sort_order: idx }));
        setData({ ...data, categories });
        setDraggedSkillInfo({ categoryId, index });
    };

    const handleSkillDragEnd = async () => {
        if (!draggedSkillInfo) return;
        const categoryId = draggedSkillInfo.categoryId;
        setDraggedSkillInfo(null);
        
        const category = data.categories.find((cat: any) => cat.id === categoryId);
        if (!category) return;
        
        const orders = category.skills.map((s: any, idx: number) => ({
            id: s.id,
            sort_order: idx
        }));
        
        try {
            await api.post("/skills/reorder", { orders });
            showToast("Skill order synchronized", "success");
        } catch (err) {
            showToast("Failed to save skill order", "error");
        }
    };

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
            showToast("Failed to fetch skills", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSkillSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { id, ...payload } = formData;
            if (currentSkill) {
                await api.put(`/skills/${currentSkill.id}`, payload);
                showToast("Skill updated successfully", "success");
            } else {
                await api.post("/skills", payload);
                showToast("New skill added successfully", "success");
            }
            setIsSkillModalOpen(false);
            fetchSkills();
        } catch (err) {
            showToast("Failed to save skill", "error");
        }
    };

    const handleExtraSkillSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/skills/extra", { name: extraSkillName });
            setExtraSkillName("");
            setIsExtraSkillModalOpen(false);
            fetchSkills();
            showToast("Horizon expanded: Peripheral skill added", "success");
        } catch (err) {
            showToast("Expansion blocked: Domain out of reach", "error");
        }
    };

    const deleteSkill = async (id: string) => {
        const isConfirmed = await confirm({
            title: "Remove Skill",
            message: "Are you sure you want to remove this skill?",
            confirmText: "Remove",
            cancelText: "Cancel",
            type: "danger"
        });
        if (!isConfirmed) return;
        try {
            await api.delete(`/skills/${id}`);
            fetchSkills();
            showToast("Skill removed successfully", "success");
        } catch (err) {
            showToast("Decommission failed: Skill is hardwired", "error");
        }
    };

    const deleteExtraSkill = async (id: string) => {
        const isConfirmed = await confirm({
            title: "Remove Ancillary Skill",
            message: "Are you sure you want to remove this extra skill?",
            confirmText: "Remove",
            cancelText: "Cancel",
            type: "danger"
        });
        if (!isConfirmed) return;
        try {
            await api.delete(`/skills/extra/${id}`);
            fetchSkills();
            showToast("Peripheral skill removed", "success");
        } catch (err) {
            showToast("Archive failed: System memory locked", "error");
        }
    };

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentCategory) {
                await api.put(`/skills/categories/${currentCategory.id}`, { name: categoryName });
                showToast("Domain title updated", "success");
            } else {
                await api.post("/skills/categories", { name: categoryName });
                showToast("New operational domain established", "success");
            }
            setCategoryName("");
            setIsCategoryModalOpen(false);
            fetchSkills();
        } catch (err) {
            showToast("Failed to manifest domain: Reality anchor failed", "error");
        }
    };

    const deleteCategory = async (id: string) => {
        const isConfirmed = await confirm({
            title: "Collapse Domain",
            message: "Are you sure you want to delete this entire operational domain and ALL contained skills? This action cannot be undone.",
            confirmText: "Collapse Domain",
            cancelText: "Cancel",
            type: "danger"
        });
        if (!isConfirmed) return;
        try {
            await api.delete(`/skills/categories/${id}`);
            fetchSkills();
            showToast("Domain collapsed: All contained skills purged", "success");
        } catch (err) {
            showToast("Collapse failed: Domain is protected", "error");
        }
    };

    return (
        <div className="space-y-10 font-roboto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Skills</h2>
                    <p className="text-gray-400 font-medium tracking-wide">Categorize and manage your core technical abilities</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={() => {
                            setCurrentSkill(null);
                            setFormData({
                                name: "",
                                percentage: 80,
                                category_id: formData.category_id || (data.categories[0]?.id || "")
                            });
                            setIsSkillModalOpen(true);
                        }}
                        className="bg-slate-900 text-white px-6 py-3.5 rounded-3xl font-bold flex items-center gap-2 hover:bg-yellow-500 hover:shadow-2xl transition-all duration-300 uppercase tracking-widest text-[10px]"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Add Core Skill
                    </button>
                    <button 
                        onClick={() => {
                            setCurrentCategory(null);
                            setCategoryName("");
                            setIsCategoryModalOpen(true);
                        }}
                        className="bg-slate-100 text-slate-600 px-6 py-3.5 rounded-3xl font-bold flex items-center gap-2 hover:bg-yellow-400/20 hover:text-yellow-600 transition-all duration-300 uppercase tracking-widest text-[10px]"
                    >
                        <Layers className="w-4 h-4" />
                        New Domain
                    </button>
                    <button 
                        onClick={() => setIsExtraSkillModalOpen(true)}
                        className="bg-gray-100 text-slate-600 px-6 py-3.5 rounded-3xl font-bold flex items-center gap-2 hover:bg-yellow-400/20 hover:text-yellow-600 transition-all duration-300 uppercase tracking-widest text-[10px]"
                    >
                        <Zap className="w-4 h-4" />
                        Other Skills
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-40 text-gray-300 font-bold uppercase tracking-widest">Profiling Skills...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-2 px-2">
                            <h3 className="text-xl font-bold text-slate-800">Operational Domains</h3>
                            <div className="h-px flex-1 bg-gray-100"></div>
                        </div>
                        
                        {data.categories.map((cat: any, index: number) => {
                            const CategoryIcon = getCategoryIcon(cat.name);
                            return (
                                <div 
                                    key={cat.id} 
                                    draggable
                                    onDragStart={(e) => handleCategoryDragStart(e, index)}
                                    onDragOver={(e) => handleCategoryDragOver(e, index)}
                                    onDragEnd={handleCategoryDragEnd}
                                    className={`bg-white border rounded-[32px] p-8 shadow-sm group transition-all duration-200 cursor-grab active:cursor-grabbing ${
                                        draggedCategoryIndex === index ? "opacity-45 border-dashed border-yellow-500 scale-98 shadow-inner" : "border-gray-100"
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1 bg-gray-50 border border-gray-150 rounded cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 transition-colors pointer-events-auto">
                                                <GripVertical className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="p-3 bg-yellow-400/10 rounded-2xl text-yellow-500">
                                                <CategoryIcon className="w-5 h-5" />
                                            </div>
                                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-wider">{cat.name}</h4>
                                            <div className="flex gap-1">
                                                <button onClick={() => {
                                                    setCurrentCategory(cat);
                                                    setCategoryName(cat.name);
                                                    setIsCategoryModalOpen(true);
                                                }} className="p-1.5 text-slate-300 hover:text-yellow-600 transition-colors"><Edit3 className="w-3.5 h-3.5"/></button>
                                                <button onClick={() => deleteCategory(cat.id)} className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-gray-50 text-gray-300 text-[10px] font-black rounded-lg uppercase tracking-widest">
                                            {cat.skills.length} Items
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2.5">
                                        {cat.skills.map((skill: any, skillIdx: number) => (
                                            <div 
                                                key={skill.id} 
                                                draggable
                                                onDragStart={(e) => handleSkillDragStart(e, cat.id, skillIdx)}
                                                onDragOver={(e) => handleSkillDragOver(e, cat.id, skillIdx)}
                                                onDragEnd={handleSkillDragEnd}
                                                className={`group/skill relative flex items-center gap-2 px-4 py-2 border rounded-2xl transition-all duration-200 cursor-grab active:cursor-grabbing ${
                                                    draggedSkillInfo?.categoryId === cat.id && draggedSkillInfo?.index === skillIdx
                                                        ? "bg-yellow-400/10 border-dashed border-yellow-500 opacity-60 scale-95"
                                                        : "bg-slate-50 border-gray-100 hover:border-yellow-400/50 hover:bg-yellow-400/5"
                                                }`}
                                            >
                                                <span className="font-bold text-slate-700 text-sm">{skill.name}</span>
                                                <div className="flex items-center gap-1.5 ml-2">
                                                    <button onClick={() => {
                                                        setCurrentSkill(skill);
                                                        setFormData(skill);
                                                        setIsSkillModalOpen(true);
                                                    }} className="p-1 text-blue-500 hover:scale-125 transition-transform"><Edit3 className="w-3.5 h-3.5"/></button>
                                                    <button onClick={() => deleteSkill(skill.id)} className="p-1 text-red-400 hover:scale-125 transition-transform"><Trash2 className="w-3.5 h-3.5"/></button>
                                                </div>
                                            </div>
                                        ))}
                                        {cat.skills.length === 0 && <p className="w-full text-center text-xs font-bold text-gray-300 italic py-4">Domain empty. Insert technical capacity.</p>}
                                    </div>
                                </div>
                            );
                        })}
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
                                {data.extra_skills.length === 0 && <p className="col-span-2 text-center text-slate-500 font-bold italic py-10">Expand your horizontal skills.</p>}
                           </div>
                           <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-yellow-400/20 transition-all"></div>
                        </div>
                    </section>
                </div>
            )}

            {/* Modals */}
            {isCategoryModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
                    <div className="bg-white w-full max-w-sm rounded-[40px] p-10 shadow-2xl relative animate-in zoom-in">
                        <button onClick={() => setIsCategoryModalOpen(false)} className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-2xl transition-all">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                        
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">{currentCategory ? "Rebrand Domain" : "Define Domain"}</h3>
                        
                        <form onSubmit={handleCategorySubmit} className="space-y-6">
                            <input 
                                placeholder="e.g. Distributed Systems" 
                                value={categoryName}
                                onChange={e => setCategoryName(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 outline-none font-black"
                                required
                            />
                            <button className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-yellow-500 hover:shadow-xl uppercase tracking-widest transition-all">
                                {currentCategory ? "Finalize Rebrand" : "Establish Domain"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
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

                            <button className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl hover:bg-yellow-500 uppercase tracking-widest transition-all mt-4">
                                Save Skill
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
