import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { Lock, Mail, AlertCircle, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token) navigate("/admin/dashboard");
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/admin/login", { email, password });
            localStorage.setItem("adminToken", response.data.token);
            navigate("/admin/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 font-roboto">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-xl shadow-yellow-200 mb-6 text-white rotate-12 hover:rotate-0 transition-transform duration-500">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">Access</span></h1>
                    <p className="text-gray-400 font-medium tracking-wide uppercase text-xs">Enter your credentials to manage portal</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl flex items-center gap-3 mb-6 animate-shake">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-semibold">{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com" 
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 focus:bg-white transition-all text-slate-900 font-medium"
                                required 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Secret Key</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 focus:bg-white transition-all text-slate-900 font-medium"
                                required 
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((value) => !value)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-xl shadow-slate-200 hover:shadow-yellow-200 hover:bg-yellow-500 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group disabled:bg-gray-400 disabled:shadow-none disabled:translate-y-0"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <span>Sign In to Dashboard</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-between text-sm">
                    <Link to="/admin/forgot-password" className="font-semibold text-yellow-600 hover:text-yellow-700 transition-colors">
                        Forgot password?
                    </Link>
                    <span className="text-gray-300">Admin access only</span>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-300 text-sm font-medium">&copy; 2026 Mithlesh Vishwakarma. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
