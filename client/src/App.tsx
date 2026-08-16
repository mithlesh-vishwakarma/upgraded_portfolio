import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundPattern from "./components/BackgroundPattern";
import SEO from "./components/SEO";

// Public Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const Projects = lazy(() => import("./pages/Projects"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const ComingSoon = lazy(() => import("./components/ComingSoon"));
const ResumeViewerPage = lazy(() => import("./pages/ResumeViewerPage"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Service Pages
const WebDevelopment = lazy(() => import("./pages/services/WebDevelopment"));
const SaaSDevelopment = lazy(() => import("./pages/services/SaaSDevelopment"));
const AIAgentDevelopment = lazy(() => import("./pages/services/AIAgentDevelopment"));
const ShopifyDevelopment = lazy(() => import("./pages/services/ShopifyDevelopment"));
const EcommerceDevelopment = lazy(() => import("./pages/services/EcommerceDevelopment"));
const WebAppDevelopment = lazy(() => import("./pages/services/WebAppDevelopment"));
const AndroidAppDevelopment = lazy(() => import("./pages/services/AndroidAppDevelopment"));

// Admin Pages
const AdminLayout = lazy(() => import("./admin/components/AdminLayout"));
const Login = lazy(() => import("./admin/pages/Login"));
const ForgotPassword = lazy(() => import("./admin/pages/ForgotPassword"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const ProjectManager = lazy(() => import("./admin/pages/ProjectManager"));
const ExperienceManager = lazy(() => import("./admin/pages/ExperienceManager"));
const EducationManager = lazy(() => import("./admin/pages/EducationManager"));
const SkillManager = lazy(() => import("./admin/pages/SkillManager"));
const ResumeManager = lazy(() => import("./admin/pages/ResumeManager"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
  </div>
);

import { ToastProvider } from "./context/ToastContext";
import Toast from "./components/Toast";
import { ConfirmProvider } from "./context/ConfirmContext";

const AdminWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <SEO title="Admin | OrdinaryCoder" description="Admin portal" noindex={true} />
    {children}
  </>
);

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
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/background" element={<BackgroundPattern />} />
            <Route path="/resume-mithlesh" element={<ResumeViewerPage />} />

            {/* Service Pages */}
            <Route path="/web-development" element={<WebDevelopment />} />
            <Route path="/saas-development" element={<SaaSDevelopment />} />
            <Route path="/ai-agent-development" element={<AIAgentDevelopment />} />
            <Route path="/shopify-development" element={<ShopifyDevelopment />} />
            <Route path="/ecommerce-development" element={<EcommerceDevelopment />} />
            <Route path="/web-app-development" element={<WebAppDevelopment />} />
            <Route path="/android-app-development" element={<AndroidAppDevelopment />} />

            {/* Admin Routes with Noindex */}
            <Route path="/admin/login" element={<AdminWrapper><Login /></AdminWrapper>} />
            <Route path="/admin/forgot-password" element={<AdminWrapper><ForgotPassword /></AdminWrapper>} />
            <Route path="/admin" element={<AdminWrapper><AdminLayout /></AdminWrapper>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<ProjectManager />} />
              <Route path="experience" element={<ExperienceManager />} />
              <Route path="education" element={<EducationManager />} />
              <Route path="skills" element={<SkillManager />} />
              <Route path="resume" element={<ResumeManager />} />
            </Route>

            {/* Fallback 404 Route */}
            <Route path="*" element={<NotFound />} />
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
