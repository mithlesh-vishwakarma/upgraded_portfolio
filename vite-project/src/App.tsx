import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";


// Lazy load non-critical components
const HomePage = lazy(() => import("./pages/HomePage"));
const Projects = lazy(() => import("./pages/Projects"));
const Articles = lazy(() => import("./pages/Articles"));
const Contact = lazy(() => import("./pages/Contact"));
const OrdinaryThings = lazy(() => import("./pages/OrdinaryThings"));
const About = lazy(() => import("./pages/About"));
const ComingSoon = lazy(() => import("./components/ComingSoon"));
const BackgroundPattern = lazy(() => import("./components/BackgroundPattern"));
const ResumeViewerPage = lazy(() => import("./pages/ResumeViewerPage"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen ">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className=" min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow relative">
          <BackgroundPattern />

          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ordinary-things" element={<OrdinaryThings />} />
              <Route path="/background" element={<BackgroundPattern />} />
              <Route path="/resume-mithlesh" element={<ResumeViewerPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
