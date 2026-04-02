import { useState, useEffect } from "react";
import api from "../../api/api";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Github, 
  Search,
  CheckCircle2,
  X
} from "lucide-react";

const ProjectManager = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<any>(null);
    const [formData, setFormData] = useState<any>({
        title: "",
        category: "",
        description: "",
        technologies: [],
        liveUrl: "",
        githubUrl: "",
        image: "",
        projectType: "Personal",
        status: "Live",
        problem: "",
        solution: "",
        techStackDescription: "",
        result: "",
        date: "",
        assignedDate: "",
        location: "",
        client: "",
        featured: false,
        tags: [],
        journey: [],
        problems: [],
        solutions: [],
        techStack: [],
        results: [],
        resources: []
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
            console.error("Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await api.delete(`/projects/${id}`);
            setProjects(projects.filter(p => p.id !== id));
        } catch (err) {
            alert("Failed to delete project");
        }
    };

    const handleEdit = async (project: any) => {
        try {
            const response = await api.get(`/projects/${project.id}`);
            setCurrentProject(response.data);
            setFormData(response.data);
            setIsModalOpen(true);
        } catch (err) {
            alert("Failed to fetch project details");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentProject) {
                await api.put(`/projects/${currentProject.id}`, formData);
            } else {
                await api.post("/projects", formData);
            }
            setIsModalOpen(false);
            fetchProjects();
        } catch (err) {
            alert("Failed to save project");
        }
    };

    const filteredProjects = projects.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 font-roboto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Project Management</h2>
                    <p className="text-gray-400 font-medium">Create, update or remove portfolio showcases</p>
                </div>
                <button 
                    onClick={() => {
                        setCurrentProject(null);
                        setFormData({ title: "", category: "", projectType: "Personal", status: "Live", technologies: [], featured: false });
                        setIsModalOpen(true);
                    }}
                    className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-yellow-500 hover:shadow-xl hover:shadow-yellow-200 transition-all duration-300"
                >
                    <Plus className="w-5 h-5" />
                    Add New Project
                </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm">
                <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2 mb-6 w-full md:w-96 focus-within:ring-2 focus-within:ring-yellow-400/20 focus-within:border-yellow-400 transition-all duration-200">
                    <Search className="w-5 h-5 text-gray-400 mr-2" />
                    <input 
                        type="text" 
                        placeholder="Search by title or category..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none focus:outline-none text-sm w-full py-1 text-slate-700"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-gray-400 uppercase text-[10px] font-black tracking-widest px-4">
                                <th className="pb-4 pl-4">Project Info</th>
                                <th className="pb-4">Category / Type</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Featured</th>
                                <th className="pb-4 pr-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} className="text-center py-20 text-gray-300 font-bold">Spinning up projects...</td></tr>
                            ) : filteredProjects.length === 0 ? (
                                <tr><td colSpan={5} className="text-center py-20 text-gray-300 font-bold">No projects found.</td></tr>
                            ) : filteredProjects.map((project) => (
                                <tr key={project.id} className="group hover:bg-gray-50/50 transition-all duration-200">
                                    <td className="bg-white py-4 pl-4 rounded-l-2xl border-y border-l border-gray-50 group-hover:border-gray-200">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                                                <img src={project.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 group-hover:text-yellow-600 transition-colors">{project.title}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <a href={project.liveUrl} target="_blank" className="text-[10px] font-bold text-blue-500 hover:underline flex items-center gap-0.5"><ExternalLink className="w-3 h-3"/> Live</a>
                                                    {project.githubUrl && <a href={project.githubUrl} target="_blank" className="text-[10px] font-bold text-slate-400 hover:underline flex items-center gap-0.5"><Github className="w-3 h-3"/> Repo</a>}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="bg-white py-4 border-y border-gray-50 group-hover:border-gray-200">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-slate-700 tracking-tight">{project.category}</span>
                                            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{project.projectType}</span>
                                        </div>
                                    </td>
                                    <td className="bg-white py-4 border-y border-gray-50 group-hover:border-gray-200">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${project.status === "Live" ? "bg-green-50 text-green-600 border border-green-100" : "bg-orange-50 text-orange-600 border border-orange-100"}`}>
                                            {project.status || "Live"}
                                        </span>
                                    </td>
                                    <td className="bg-white py-4 border-y border-gray-50 group-hover:border-gray-200">
                                       {project.featured ? <CheckCircle2 className="w-5 h-5 text-yellow-500" /> : <X className="w-5 h-5 text-gray-200" />}
                                    </td>
                                    <td className="bg-white py-4 pr-4 rounded-r-2xl border-y border-r border-gray-50 group-hover:border-gray-200 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => handleEdit(project)}
                                                className="p-2 text-slate-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all"
                                            >
                                                <Edit3 className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(project.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal - Simplified version as example */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] p-10 shadow-2xl relative">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-2xl transition-all"
                        >
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                        
                        <div className="mb-10">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{currentProject ? "Update Evolution" : "Launch New Vision"}</h3>
                            <p className="text-gray-400 font-medium">Provide the technical specs and creative context</p>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <section className="space-y-4">
                                    <h5 className="text-xs font-black text-yellow-500 uppercase tracking-widest">Base Metadata</h5>
                                    <div className="space-y-4">
                                        <input 
                                            placeholder="Project Title" 
                                            value={formData.title}
                                            onChange={e => setFormData({...formData, title: e.target.value})}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none font-bold"
                                        />
                                        <input 
                                            placeholder="Category (e.g. Full Stack)" 
                                            value={formData.category}
                                            onChange={e => setFormData({...formData, category: e.target.value})}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none font-bold"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <select 
                                                value={formData.projectType}
                                                onChange={e => setFormData({...formData, projectType: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none font-bold appearance-none"
                                            >
                                                <option value="Personal">Personal</option>
                                                <option value="Freelanced">Freelanced</option>
                                            </select>
                                            <select 
                                               value={formData.status}
                                               onChange={e => setFormData({...formData, status: e.target.value})}
                                               className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none font-bold appearance-none"
                                            >
                                                <option value="Live">Live</option>
                                                <option value="Development">Development</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h5 className="text-xs font-black text-blue-500 uppercase tracking-widest">Visuals & Links</h5>
                                    <div className="space-y-4">
                                        <input 
                                            placeholder="Thumbnail URL" 
                                            value={formData.image}
                                            onChange={e => setFormData({...formData, image: e.target.value})}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none font-bold"
                                        />
                                        <input 
                                            placeholder="Public Link (Live)" 
                                            value={formData.liveUrl}
                                            onChange={e => setFormData({...formData, liveUrl: e.target.value})}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none font-bold text-blue-500"
                                        />
                                        <input 
                                            placeholder="Source Code Link" 
                                            value={formData.githubUrl}
                                            onChange={e => setFormData({...formData, githubUrl: e.target.value})}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none font-bold text-slate-400"
                                        />
                                    </div>
                                </section>
                            </div>

                            <div className="space-y-6">
                                <section className="space-y-4">
                                    <h5 className="text-xs font-black text-purple-500 uppercase tracking-widest">Storytelling</h5>
                                    <textarea 
                                        placeholder="One-line summary for cards" 
                                        value={formData.description}
                                        onChange={e => setFormData({...formData, description: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none font-bold min-h-[100px] resize-none"
                                    />
                                    <textarea 
                                        placeholder="The Challenge (Problem)" 
                                        value={formData.problem}
                                        onChange={e => setFormData({...formData, problem: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none font-bold min-h-[120px] resize-none"
                                    />
                                    <textarea 
                                        placeholder="The Solution Architected" 
                                        value={formData.solution}
                                        onChange={e => setFormData({...formData, solution: e.target.value})}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none font-bold min-h-[120px] resize-none"
                                    />
                                </section>
                            </div>

                            <div className="md:col-span-2 pt-6 flex gap-4">
                                <button 
                                    type="submit"
                                    className="flex-1 bg-slate-900 text-white font-black py-5 rounded-3xl hover:bg-yellow-500 hover:shadow-2xl hover:shadow-yellow-200 transition-all duration-500 uppercase tracking-widest"
                                >
                                    {currentProject ? "Sync Changes to Database" : "Deploy Vision to Portfolio"}
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 bg-gray-100 text-gray-500 font-black rounded-3xl hover:bg-red-50 hover:text-red-500 transition-all uppercase tracking-widest"
                                >
                                    Abort
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
