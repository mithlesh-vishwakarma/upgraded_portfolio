import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import BackgroundPattern from "../components/BackgroundPattern";
import { AlertCircle, Home } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen text-white font-roboto flex items-center justify-center relative">
      <SEO
        title="404 - Page Not Found | OrdinaryCoder"
        description="The page you are looking for does not exist on OrdinaryCoder."
        noindex={true}
      />
      <BackgroundPattern />

      <div className="max-w-md mx-auto px-6 py-20 text-center relative z-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
        <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        
        <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-xl font-bold text-white mb-4">Page Not Found</h2>
        
        <p className="text-gray-300 text-sm mb-8 leading-relaxed">
          The route you navigated to does not exist or may have been moved. Explore our core services or return home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-yellow-400 text-slate-900 font-bold rounded-full text-xs hover:bg-yellow-300 transition-colors shadow-md"
          >
            <Home className="w-4 h-4" /> Go to Homepage
          </Link>
          <Link
            to="/web-development"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-yellow-400/40 text-yellow-400 font-bold rounded-full text-xs hover:bg-yellow-400/10 transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
