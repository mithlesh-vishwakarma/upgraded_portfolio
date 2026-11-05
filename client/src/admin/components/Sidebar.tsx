import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  FileText,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projects", path: "/admin/projects", icon: FolderGit2 },
    { name: "Experience", path: "/admin/experience", icon: Briefcase },
    { name: "Education", path: "/admin/education", icon: GraduationCap },
    { name: "Skills", path: "/admin/skills", icon: Code2 },
    { name: "Resume Upload", path: "/admin/resume", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 h-screen sticky top-0 flex flex-col transition-colors duration-200 select-none">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Admin<span className="text-yellow-500">Panel</span></h1>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive
                ? "bg-slate-900 dark:bg-yellow-500 text-white dark:text-slate-950 shadow-md shadow-slate-200 dark:shadow-none font-bold"
                : "text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-200 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-200 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
