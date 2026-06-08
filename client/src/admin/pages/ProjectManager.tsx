import { useState, useEffect, useRef } from "react";
import api from "../../api/api";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Github, 
  Search,
  X,
  Info,
  Globe,
  Cpu,
  Sparkles,
  Loader2,
  Image as ImageIcon,
  GripVertical
} from "lucide-react";

import { useToast } from "../../context/ToastContext";
import { useConfirm } from "../../context/ConfirmContext";
import { toTitleCase } from "../../lib/utils";


const SECTIONS = [
  { id: "general", label: "General Details", icon: Info },
  { id: "links-assets", label: "Links & Assets", icon: Globe },
  { id: "specifications", label: "Tech Stack & Features", icon: Cpu },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const YEARS = Array.from({ length: 15 }, (_, i) => (2020 + i).toString());

const ProjectManager = () => {
    const { showToast } = useToast();
    const confirm = useConfirm();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    
    // Timeline States
    const [startMonth, setStartMonth] = useState("Jan");
    const [startYear, setStartYear] = useState("2023");
    const [endMonth, setEndMonth] = useState("Dec");
    const [endYear, setEndYear] = useState("2024");
    const [isOngoing, setIsOngoing] = useState(false);

    const [activeSection, setActiveSection] = useState("general");
    const formContainerRef = useRef<HTMLDivElement>(null);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", index.toString());
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
        
        const items = [...filteredProjects];
        const draggedItem = items[draggedIndex];
        items.splice(draggedIndex, 1);
        items.splice(index, 0, draggedItem);
        
        const updatedProjects = projects.map(p => {
            const foundIndex = items.findIndex(item => item.id === p.id);
            if (foundIndex !== -1) {
                return { ...p, sort_order: foundIndex };
            }
            return p;
        });
        
        updatedProjects.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        setProjects(updatedProjects);
        setDraggedIndex(index);
    };

    const handleDragEnd = async () => {
        setDraggedIndex(null);
        
        const orders = projects.map((p, idx) => ({
            id: p.id,
            sort_order: idx
        }));
        
        try {
            await api.post("/projects/reorder", { orders });
            showToast("Project order synchronized", "success");
        } catch (err) {
            showToast("Failed to save project order", "error");
        }
    };

    const [formData, setFormData] = useState<any>({
        name: "",
        image_url: "",
        short_description: "",
        tech_stack: [],
        features: [],
        challenges_solved: "",
        live_url: "",
        github_url: "",
        project_type: "Personal",
        start_date: "",
        end_date: "",
        sort_order: 0
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await api.get("/projects");
            setProjects(response.data);
        } catch (err) {
            showToast("Critical failure: Could not reach project grid", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const isConfirmed = await confirm({
            title: "Delete Project",
            message: "Are you sure you want to delete this project? This will permanently purge it from your portfolio history.",
            confirmText: "Delete",
            cancelText: "Cancel",
            type: "danger"
        });
        if (!isConfirmed) return;
        try {
            await api.delete(`/projects/${id}`);
            setProjects(projects.filter(p => p.id !== id));
            showToast("Project purged from evolution history", "success");
        } catch (err) {
            showToast("Purge failed: System integrity protected the project", "error");
        }
    };

    const handleEdit = async (project: any) => {
        try {
            const response = await api.get(`/projects/${project.id}`);
            const data = response.data;
            const sanitized = {
                id: data.id,
                name: data.name || "",
                image_url: data.image_url || "",
                short_description: data.short_description || "",
                tech_stack: data.tech_stack || [],
                features: data.features || [],
                challenges_solved: data.challenges_solved || "",
                live_url: data.live_url || "",
                github_url: data.github_url || "",
                project_type: data.project_type || "Personal",
                start_date: data.start_date || "",
                end_date: data.end_date || "",
                sort_order: typeof data.sort_order !== "undefined" ? data.sort_order : 0
            };
            setCurrentProject(sanitized);
            setFormData(sanitized);

            // Parse start/end dates
            const startParts = (data.start_date || "Jan 2023").split(" ");
            setStartMonth(startParts[0] || "Jan");
            setStartYear(startParts[1] || "2023");

            if (data.end_date === "Present" || data.end_date === "Ongoing" || data.end_date === "Under Development") {
                setIsOngoing(true);
                setEndMonth("Dec");
                setEndYear("2024");
            } else {
                setIsOngoing(false);
                const endParts = (data.end_date || "Dec 2024").split(" ");
                setEndMonth(endParts[0] || "Dec");
                setEndYear(endParts[1] || "2024");
            }

            setActiveSection("general");
            setIsModalOpen(true);
        } catch (err) {
            showToast("Access denied: Could not pull technical specs", "error");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            name: toTitleCase(formData.name.trim()),
            start_date: `${startMonth} ${startYear}`,
            end_date: isOngoing ? "Under Development" : `${endMonth} ${endYear}`
        };
        try {
            if (currentProject) {
                if (!currentProject.id) {
                    showToast("System Error: Project ID missing. Try refreshing.", "error");
                    return;
                }
                await api.put(`/projects/${currentProject.id}`, payload);
                showToast("Evolution sync complete: Database updated", "success");
            } else {
                await api.post("/projects", payload);
                showToast("Vision deployed: New project added to timeline", "success");
            }
            setIsModalOpen(false);
            fetchProjects();
        } catch (err: any) {
            console.error("Submission Error:", err.response?.data || err);
            const msg = err.response?.data?.message || err.response?.data?.error || "Failed to save project";
            showToast(msg, "error");
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            showToast("Only image assets are allowed", "error");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            showToast("Asset size must be under 5MB", "error");
            return;
        }

        setUploading(true);
        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                const response = await api.post("/projects/upload", {
                    image: reader.result,
                    name: file.name
                });
                setFormData(prev => ({ ...prev, image_url: response.data.imageUrl }));
                showToast("Asset uploaded successfully", "success");
            } catch (err: any) {
                console.error("Asset upload failure:", err);
                const msg = err.response?.data?.message || "Failed to upload image";
                showToast(msg, "error");
            } finally {
                setUploading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: string) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const val = e.currentTarget.value.trim().replace(',', '');
            const arr = formData[field] || [];
            if (val && !arr.includes(val)) {
                setFormData({ ...formData, [field]: [...arr, val] });
                e.currentTarget.value = '';
            }
        }
    };

    const removeArrayItem = (field: string, index: number) => {
        const arr = formData[field] || [];
        setFormData({ 
            ...formData, 
            [field]: arr.filter((_: any, i: number) => i !== index) 
        });
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...(prev.features || []), ""] }));
    };

    const handleFeatureChange = (index: number, value: string) => {
        const updated = [...(formData.features || [])];
        updated[index] = value;
        setFormData({ ...formData, features: updated });
    };

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const container = formContainerRef.current;
        const element = document.getElementById(sectionId);
        if (container && element) {
            const containerTop = container.getBoundingClientRect().top;
            const elementTop = element.getBoundingClientRect().top;
            const scrollPos = elementTop - containerTop + container.scrollTop - 24;
            container.scrollTo({ top: scrollPos, behavior: "smooth" });
        }
    };

    const handleScroll = () => {
        const container = formContainerRef.current;
        if (!container) return;
        const containerTop = container.getBoundingClientRect().top;
        
        let currentActive = SECTIONS[0].id;
        for (const sec of SECTIONS) {
            const el = document.getElementById(sec.id);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top - containerTop <= 140) {
                    currentActive = sec.id;
                }
            }
        }
        setActiveSection(currentActive);
    };

    const filteredProjects = projects.filter(p => 
        (p.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.short_description || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 font-roboto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Project Management</h2>
                    <p className="text-gray-500 font-medium text-sm">Create, update or remove portfolio showcases</p>
                </div>
                <button 
                    onClick={() => {
                        setCurrentProject(null);
                        setFormData({ 
                            name: "",
                            image_url: "",
                            short_description: "",
                            tech_stack: [],
                            features: [],
                            challenges_solved: "",
                            live_url: "",
                            github_url: "",
                            project_type: "Personal",
                            start_date: "",
                            end_date: "",
                            sort_order: 0
                        });
                        setStartMonth("Jan");
                        setStartYear("2023");
                        setEndMonth("Dec");
                        setEndYear("2024");
                        setIsOngoing(false);
                        setActiveSection("general");
                        setIsModalOpen(true);
                    }}
                    className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-yellow-500 hover:text-slate-900 hover:shadow-xl hover:shadow-yellow-250 transition-all duration-300 text-sm shadow-md"
                >
                    <Plus className="w-5 h-5" />
                    Add New Project
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center bg-gray-55 border border-gray-200 rounded-2xl px-4 py-2.5 w-full md:w-96 focus-within:ring-2 focus-within:ring-yellow-400/25 focus-within:border-yellow-400 transition-all duration-200">
                        <Search className="w-5 h-5 text-gray-400 mr-2.5" />
                        <input 
                            type="text" 
                            placeholder="Search by title or description..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none focus:outline-none text-sm w-full py-1 text-slate-700 placeholder-gray-400"
                        />
                    </div>
                    <div className="text-xs font-bold text-gray-400">
                        Showing {filteredProjects.length} of {projects.length} milestones
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Spinning up projects...</p>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="text-center py-32 border border-dashed border-gray-200 rounded-3xl bg-gray-50/30">
                        <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">No projects found</p>
                        <p className="text-xs text-gray-450 mt-1">Try refining your search terms or add a new milestone project.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project, index) => (
                            <div 
                                key={project.id} 
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragEnd={handleDragEnd}
                                className={`group bg-white border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-yellow-400/50 transition-all duration-350 flex flex-col h-[460px] relative cursor-grab active:cursor-grabbing ${
                                    draggedIndex === index ? "opacity-45 border-dashed border-yellow-500 scale-98 shadow-inner" : "border-gray-250"
                                }`}
                            >
                                {/* Card Header Image */}
                                <div className="h-44 bg-slate-100 relative overflow-hidden border-b border-gray-150 flex-shrink-0 pointer-events-none">
                                    {project.image_url ? (
                                        <img 
                                            src={project.image_url} 
                                            alt="" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-slate-400 gap-2">
                                            <ImageIcon className="w-8 h-8 opacity-40 text-slate-400" />
                                            <span className="text-[10px] font-black uppercase tracking-wider">No Image Preview</span>
                                        </div>
                                    )}
                                </div>
                                    
                                {/* Drag Handle & Project Type Badge */}
                                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 pointer-events-auto">
                                    <div className="p-1.5 bg-white/90 backdrop-blur-md rounded-lg shadow-md border border-gray-150 cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-650 transition-colors">
                                        <GripVertical className="w-3 h-3" />
                                    </div>
                                    <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg shadow-sm border ${
                                        project.project_type === "Freelanced" 
                                            ? "bg-purple-600 text-white border-purple-500/20" 
                                            : "bg-blue-600 text-white border-blue-500/20"
                                    }`}>
                                        {project.project_type || "Personal"}
                                    </span>
                                </div>
                                    
                                {/* Action Buttons Overlay */}
                                <div className="absolute top-4 right-4 flex gap-1.5 z-10 pointer-events-auto">
                                    <button 
                                        onClick={() => handleEdit(project)}
                                        className="p-2 bg-white/90 backdrop-blur-md text-slate-700 hover:text-yellow-600 hover:bg-white rounded-xl shadow-md border border-gray-150 hover:scale-105 transition-all duration-200"
                                        title="Edit Project"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(project.id)}
                                        className="p-2 bg-white/90 backdrop-blur-md text-red-500 hover:text-red-700 hover:bg-white rounded-xl shadow-md border border-gray-150 hover:scale-105 transition-all duration-200"
                                        title="Delete Project"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 flex-1 flex flex-col justify-between overflow-hidden">
                                    <div className="space-y-3">
                                        {/* Date and Title */}
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-center text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                                                {project.start_date && (
                                                    <span>
                                                        Timeline: {project.start_date} - {(!project.end_date || project.end_date === "Present" || project.end_date === "Ongoing" || project.end_date === "Under Development") ? "Under Dev" : project.end_date}
                                                    </span>
                                                )}
                                                {typeof project.sort_order !== 'undefined' && (
                                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-505 border border-gray-200 font-black">
                                                        Order: #{project.sort_order}
                                                    </span>
                                                )}
                                            </div>
                                            <h4 className="text-base font-bold text-slate-900 group-hover:text-yellow-650 transition-colors line-clamp-1 truncate" title={toTitleCase(project.name)}>
                                                {toTitleCase(project.name)}
                                            </h4>
                                        </div>

                                        {/* Description */}
                                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 h-[4.5rem] overflow-hidden" title={project.short_description}>
                                            {project.short_description}
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="space-y-4 pt-4 border-t border-gray-100 mt-4 flex-grow-0">
                                        <div className="flex flex-wrap gap-1 h-[48px] overflow-hidden content-start">
                                            {(project.tech_stack || []).slice(0, 6).map((tech: string, i: number) => (
                                                <span 
                                                    key={i} 
                                                    className="px-2 py-0.5 bg-slate-50 border border-gray-200 text-slate-600 text-[9px] font-bold rounded-lg uppercase tracking-wider"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {(project.tech_stack || []).length > 6 && (
                                                <span className="text-[9px] text-gray-400 font-bold self-center">
                                                    +{project.tech_stack.length - 6} more
                                                </span>
                                            )}
                                            {(project.tech_stack || []).length === 0 && (
                                                <span className="text-[10px] text-gray-400 italic">No technologies listed</span>
                                            )}
                                        </div>

                                        {/* Quick Redirect Links */}
                                        <div className="flex items-center gap-4 text-xs font-semibold pt-1">
                                            {project.live_url && (
                                                <a href={project.live_url} target="_blank" rel="noreferrer" className="text-blue-505 hover:text-blue-600 flex items-center gap-1.5">
                                                    <ExternalLink className="w-3.5 h-3.5"/> Live Demo
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a href={project.github_url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-700 flex items-center gap-1.5">
                                                    <Github className="w-3.5 h-3.5"/> GitHub
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-5xl h-[85vh] flex flex-col rounded-[24px] md:rounded-[32px] shadow-2xl relative overflow-hidden border border-gray-100">
                        
                        {/* Modal Header */}
                        <div className="p-6 md:p-8 pb-4 md:pb-6 border-b border-gray-100 flex justify-between items-center bg-white">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    {currentProject ? "Update Evolution Details" : "Launch New Vision Project"}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-400 font-medium mt-0.5">Provide project context, timeline specifications, and links</p>
                            </div>
                            <button 
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                                title="Close Modal"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="flex-grow flex flex-col overflow-hidden">
                            <div className="flex-1 flex overflow-hidden">
                                
                                {/* Navigation Sidebar */}
                                <div className="w-64 border-r border-gray-100 bg-gray-50/50 p-6 hidden md:flex flex-col gap-1.5 overflow-y-auto">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Sections Index</span>
                                    {SECTIONS.map((sec) => {
                                        const IconComponent = sec.icon;
                                        const isSelected = activeSection === sec.id;
                                        return (
                                            <button
                                                type="button"
                                                key={sec.id}
                                                onClick={() => scrollToSection(sec.id)}
                                                className={`w-full text-left px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-3 ${
                                                    isSelected 
                                                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 translate-x-1" 
                                                        : "text-slate-500 hover:bg-gray-100 hover:text-slate-900"
                                                }`}
                                            >
                                                <IconComponent className={`w-4 h-4 transition-colors ${isSelected ? "text-yellow-400" : "text-gray-400"}`} />
                                                {sec.label}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Form Sections Container */}
                                <div 
                                    ref={formContainerRef} 
                                    onScroll={handleScroll}
                                    className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 scroll-smooth bg-gray-55/10"
                                >
                                    {/* Section 1: General Details */}
                                    <div id="general" className="scroll-mt-6 bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6">
                                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                            <div className="p-2.5 bg-yellow-50 text-yellow-600 rounded-xl">
                                                <Info className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-slate-800">General Details</h4>
                                                <p className="text-xs text-slate-400">Core details identifying this showcase</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-650 uppercase tracking-wider block">Project Name *</label>
                                                <input 
                                                    required
                                                    type="text"
                                                    placeholder="e.g. Enterprise E-Commerce Platform" 
                                                    value={formData.name || ""}
                                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                                    className="w-full bg-gray-55 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-650 uppercase tracking-wider block">Project Type *</label>
                                                    <select 
                                                        value={formData.project_type || "Personal"}
                                                        onChange={e => setFormData({...formData, project_type: e.target.value})}
                                                        className="w-full bg-gray-55 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-705 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                                                    >
                                                        <option value="Personal">Personal Project</option>
                                                        <option value="Freelanced">Freelanced Project (Client Work)</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-1.5 flex flex-col justify-end">
                                                    <div 
                                                        onClick={() => setIsOngoing(!isOngoing)}
                                                        className="flex items-center gap-3 px-4 py-3 bg-gray-55 hover:bg-gray-100/70 border border-gray-200 rounded-xl cursor-pointer transition-all duration-200"
                                                    >
                                                        <input 
                                                            type="checkbox"
                                                            id="isOngoing"
                                                            checked={isOngoing}
                                                            onChange={e => setIsOngoing(e.target.checked)}
                                                            onClick={e => e.stopPropagation()}
                                                            className="w-4 h-4 rounded border-gray-300 text-yellow-505 focus:ring-yellow-500 accent-yellow-500 cursor-pointer"
                                                        />
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Ongoing Project</span>
                                                            <span className="text-[10px] text-slate-400">Currently active / work in progress</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Date Timeline Selects */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                                                {/* Start Date */}
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-650 uppercase tracking-wider block">Start Date *</label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <select 
                                                            value={startMonth}
                                                            onChange={e => setStartMonth(e.target.value)}
                                                            className="bg-gray-55 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                                                        >
                                                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                                                        </select>
                                                        <select 
                                                            value={startYear}
                                                            onChange={e => setStartYear(e.target.value)}
                                                            className="bg-gray-55 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                                                        >
                                                            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* End Date */}
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-650 uppercase tracking-wider block">End Date *</label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <select 
                                                            disabled={isOngoing}
                                                            value={endMonth}
                                                            onChange={e => setEndMonth(e.target.value)}
                                                            className="bg-gray-55 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all disabled:opacity-50 disabled:bg-gray-100"
                                                        >
                                                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                                                        </select>
                                                        <select 
                                                            disabled={isOngoing}
                                                            value={endYear}
                                                            onChange={e => setEndYear(e.target.value)}
                                                            className="bg-gray-55 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 focus:bg-white focus:ring-2 focus:ring-yellow-400 outline-none transition-all disabled:opacity-50 disabled:bg-gray-100"
                                                        >
                                                            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-1.5 pt-4 border-t border-gray-100">
                                                <label className="text-xs font-bold text-slate-650 uppercase tracking-wider block">Short Description *</label>
                                                <textarea 
                                                    required
                                                    placeholder="A crisp, high-level summary of the project." 
                                                    value={formData.short_description || ""}
                                                    onChange={e => setFormData({...formData, short_description: e.target.value})}
                                                    className="w-full bg-gray-55 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all min-h-[90px] resize-y"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-655 uppercase tracking-wider block">Challenges Solved *</label>
                                                <textarea 
                                                    required
                                                    placeholder="Describe the hurdles faced and how you successfully overcame them." 
                                                    value={formData.challenges_solved || ""}
                                                    onChange={e => setFormData({...formData, challenges_solved: e.target.value})}
                                                    className="w-full bg-gray-55 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all min-h-[120px] resize-y"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: Links & Assets */}
                                    <div id="links-assets" className="scroll-mt-6 bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6">
                                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                                <Globe className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-slate-800">Links & Assets</h4>
                                                <p className="text-xs text-slate-400">Project image uploads and button redirect locations</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-650 uppercase tracking-wider block">Live Demo Link</label>
                                                    <input 
                                                        type="text"
                                                        placeholder="e.g. https://myproject.com" 
                                                        value={formData.live_url || ""}
                                                        onChange={e => setFormData({...formData, live_url: e.target.value})}
                                                        className="w-full bg-gray-55 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                                                    />
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-655 uppercase tracking-wider block">GitHub Link</label>
                                                    <input 
                                                        type="text"
                                                        placeholder="e.g. https://github.com/profile/repo" 
                                                        value={formData.github_url || ""}
                                                        onChange={e => setFormData({...formData, github_url: e.target.value})}
                                                        className="w-full bg-gray-55 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-3 pt-2">
                                                <label className="text-xs font-bold text-slate-650 uppercase tracking-wider block">Project Image</label>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {/* URL Input */}
                                                    <div className="space-y-1.5">
                                                        <span className="text-[10px] text-gray-400 font-bold block">Option A: Direct URL</span>
                                                        <input 
                                                            type="text"
                                                            placeholder="https://domain.com/image.png" 
                                                            value={formData.image_url || ""}
                                                            onChange={e => setFormData({...formData, image_url: e.target.value})}
                                                            className="w-full bg-gray-55 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                                                        />
                                                    </div>

                                                    {/* File Upload */}
                                                    <div className="space-y-1.5">
                                                        <span className="text-[10px] text-gray-400 font-bold block">Option B: Upload File</span>
                                                        <label className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-300 hover:border-yellow-400 hover:bg-yellow-50/10 rounded-xl px-4 py-3 text-sm font-semibold text-slate-605 cursor-pointer transition-all bg-gray-55 select-none">
                                                            {uploading ? (
                                                                <>
                                                                    <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
                                                                    Uploading asset...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ImageIcon className="w-4 h-4 text-slate-400" />
                                                                    Choose File (Max 5MB)
                                                                </>
                                                            )}
                                                            <input 
                                                                type="file" 
                                                                accept="image/*" 
                                                                onChange={handleImageUpload} 
                                                                disabled={uploading}
                                                                className="hidden" 
                                                            />
                                                        </label>
                                                    </div>
                                                </div>

                                                {formData.image_url && (
                                                    <div className="mt-2.5 flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl w-fit">
                                                        <img 
                                                            src={formData.image_url} 
                                                            alt="Preview" 
                                                            className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm" 
                                                            onError={(e)=>{(e.target as HTMLElement).style.display='none'}} 
                                                        />
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-slate-700">Preview Asset Loaded</span>
                                                            <button 
                                                                type="button" 
                                                                onClick={() => setFormData({...formData, image_url: ""})}
                                                                className="text-[10px] text-red-500 font-bold mt-1 text-left hover:underline"
                                                            >
                                                                Clear Asset
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 3: Tech Stack & Features */}
                                    <div id="specifications" className="scroll-mt-6 bg-white border border-gray-150 rounded-2xl p-6 shadow-sm space-y-6">
                                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                            <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
                                                <Cpu className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-slate-800">Tech Stack & Features</h4>
                                                <p className="text-xs text-slate-400">Outline specifications, frameworks, and key deliverables of this project</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Tech Stack Dynamic Tags */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-650 uppercase tracking-wider block">Tech Stack *</label>
                                                <div className="flex flex-wrap gap-2 p-3 bg-gray-55 border border-gray-200 rounded-xl min-h-[50px] items-center">
                                                    {(formData.tech_stack || []).map((tech: string, i: number) => (
                                                        <span key={i} className="bg-slate-800 text-white px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                                                            {tech} 
                                                            <X className="w-3 h-3 cursor-pointer hover:text-red-400" onClick={() => removeArrayItem('tech_stack', i)} />
                                                        </span>
                                                    ))}
                                                    <input 
                                                        placeholder="Type tech and press Enter or comma..." 
                                                        onKeyDown={e => handleTagKeyDown(e, 'tech_stack')} 
                                                        className="bg-transparent border-none text-sm font-semibold outline-none flex-grow min-w-[200px] text-slate-700 placeholder-gray-400" 
                                                    />
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-semibold italic">Separate items using commas or pressing Enter.</p>
                                            </div>

                                            {/* Features Dynamic Bullet Points */}
                                            <div className="space-y-3 pt-4 border-t border-gray-100">
                                                <label className="text-xs font-bold text-slate-655 uppercase tracking-wider block">Key Features *</label>
                                                {(!formData.features || formData.features.length === 0) ? (
                                                    <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl bg-gray-55/20 text-gray-400 text-xs font-medium">
                                                        No features added yet. Click the button below to add your first feature.
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2.5">
                                                        {formData.features.map((feature: string, i: number) => (
                                                            <div key={i} className="flex gap-2 items-center">
                                                                <span className="text-xs font-bold text-gray-450 w-6 flex-shrink-0 text-center">{i + 1}.</span>
                                                                <input 
                                                                    required
                                                                    placeholder="e.g. Secure payment gateway checkout system" 
                                                                    value={feature} 
                                                                    onChange={e => handleFeatureChange(i, e.target.value)} 
                                                                    className="flex-grow bg-gray-55 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-705 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all" 
                                                                />
                                                                <button 
                                                                    type="button" 
                                                                    onClick={() => removeArrayItem('features', i)} 
                                                                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                                    title="Remove feature"
                                                                >
                                                                    <Trash2 className="w-4 h-4"/>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                <button 
                                                    type="button" 
                                                    onClick={addFeature} 
                                                    className="flex items-center justify-center gap-1.5 text-xs font-bold text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 px-4 py-2.5 rounded-xl border border-dashed border-yellow-300 w-fit transition-all mt-2"
                                                >
                                                    <Plus className="w-3.5 h-3.5" /> Add Project Feature
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-gray-100 bg-white flex gap-4 justify-end">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)} 
                                    className="px-6 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold rounded-xl transition-all text-xs uppercase tracking-wider"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-8 py-3 bg-slate-900 text-white hover:bg-yellow-500 hover:text-slate-900 font-bold rounded-xl transition-all shadow-md shadow-slate-900/10 hover:shadow-yellow-500/20 text-xs uppercase tracking-widest flex items-center gap-2"
                                >
                                    {currentProject ? "Sync Evolution" : "Launch Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectManager;
