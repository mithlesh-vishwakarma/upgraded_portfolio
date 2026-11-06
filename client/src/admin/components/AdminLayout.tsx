import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAdminTheme } from "../context/AdminThemeContext";

const AdminLayout = () => {
    const { isDark } = useAdminTheme();
    const token = localStorage.getItem("adminToken");

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className={`flex min-h-screen font-roboto transition-colors duration-200 ${isDark ? "bg-slate-950 text-slate-100" : "bg-gray-50/50 text-slate-800"}`}>
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Topbar />
                <main className="p-8 flex-1">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
