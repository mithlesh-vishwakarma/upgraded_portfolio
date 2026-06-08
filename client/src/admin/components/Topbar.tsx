import { User, Bell, Search } from "lucide-react";

const Topbar = () => {
    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20">
            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2 w-96 group focus-within:ring-2 focus-within:ring-yellow-400/20 focus-within:border-yellow-400 transition-all duration-200">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                    type="text" 
                    placeholder="Search projects or settings..." 
                    className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-600 placeholder:text-gray-400"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-gray-400 hover:text-slate-900 transition-all duration-200 rounded-xl hover:bg-gray-50">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-10 w-[1px] bg-gray-100"></div>

                <div className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-2 rounded-2xl transition-all duration-200">
                    <div className="text-right">
                        <p className="text-sm font-bold text-slate-900 leading-tight">Mithlesh</p>
                        <p className="text-xs font-medium text-gray-400">Project Manager</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-yellow-200 group-hover:scale-105 transition-transform duration-200">
                        <User className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
