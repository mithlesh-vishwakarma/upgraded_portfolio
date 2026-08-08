import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundPattern from "./components/BackgroundPattern";

// Public Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const Projects = lazy(() => import("./pages/Projects"));
const Articles = lazy(() => import("./pages/Articles"));
const Contact = lazy(() => import("./pages/Contact"));
const OrdinaryThings = lazy(() => import("./pages/OrdinaryThings"));
const About = lazy(() => import("./pages/About"));
const ComingSoon = lazy(() => import("./components/ComingSoon"));
const ResumeViewerPage = lazy(() => import("./pages/ResumeViewerPage"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

// Admin Pages
const AdminLayout = lazy(() => import("./admin/components/AdminLayout"));
const Login = lazy(() => import("./admin/pages/Login"));
const ForgotPassword = lazy(() => import("./admin/pages/ForgotPassword"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const ProjectManager = lazy(() => import("./admin/pages/ProjectManager"));
const ExperienceManager = lazy(() => import("./admin/pages/ExperienceManager"));
const EducationManager = lazy(() => import("./admin/pages/EducationManager"));
const SkillManager = lazy(() => import("./admin/pages/SkillManager"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen ">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
  </div>
);

import { ToastProvider } from "./context/ToastContext";
import Toast from "./components/Toast";
import { ConfirmProvider } from "./context/ConfirmContext";


const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPath && <Header />}
      <main className="flex-grow relative">
        {!isAdminPath && <BackgroundPattern />}

        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ordinary-things" element={<OrdinaryThings />} />
            <Route path="/background" element={<BackgroundPattern />} />
            <Route path="/resume-mithlesh" element={<ResumeViewerPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<ProjectManager />} />
              <Route path="experience" element={<ExperienceManager />} />
              <Route path="education" element={<EducationManager />} />
              <Route path="skills" element={<SkillManager />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      {!isAdminPath && <Footer />}
      <Toast />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ConfirmProvider>
          <AppContent />
        </ConfirmProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
