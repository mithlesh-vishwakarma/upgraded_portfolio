import { User, Bell, Search, Sun, Moon } from "lucide-react";
import { useAdminTheme } from "../context/AdminThemeContext";

const Topbar = () => {
    const { isDark, toggleTheme } = useAdminTheme();

    return (
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-20 transition-colors duration-200">
            <div className="flex items-center bg-gray-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700/60 rounded-2xl px-4 py-2 w-96 group focus-within:ring-2 focus-within:ring-yellow-400/20 focus-within:border-yellow-400 transition-all duration-200">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                    type="text" 
                    placeholder="Search projects or settings..." 
                    className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-600 dark:text-slate-200 placeholder:text-gray-400"
                />
            </div>

            <div className="flex items-center gap-3 md:gap-5">
                {/* Night Mode / Dark Mode Toggle */}
                <button
                    onClick={toggleTheme}
                    title={isDark ? "Switch to Day Mode" : "Switch to Night / Dark Mode"}
                    aria-label="Toggle Night Mode"
                    className="flex items-center gap-2 py-2 px-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-slate-700 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200 shadow-sm cursor-pointer select-none"
                >
                    {isDark ? (
                        <>
                            <Moon className="w-4 h-4 text-yellow-400 fill-yellow-400/20" />
                            <span className="text-xs font-bold text-slate-200 hidden sm:inline">Night Mode</span>
                        </>
                    ) : (
                        <>
                            <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                            <span className="text-xs font-bold text-slate-700 hidden sm:inline">Day Mode</span>
                        </>
                    )}
                </button>

                <button className="relative p-2 text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                </button>

                <div className="h-10 w-[1px] bg-gray-100 dark:bg-slate-800"></div>

                <div className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/80 p-2 rounded-2xl transition-all duration-200">
                    <div className="text-right">
                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Mithlesh</p>
                        <p className="text-xs font-medium text-gray-400">Admin</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-yellow-200 dark:shadow-none group-hover:scale-105 transition-transform duration-200">
                        <User className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
