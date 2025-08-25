import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Projects from "./pages/Projects";
import Articles from "./pages/Articles";
import Contact from "./pages/Contact";
import OrdinaryThings from "./pages/OrdinaryThings";
import About from "./pages/About";
import ComingSoon from "./components/ComingSoon";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackgroundPattern from "./components/BackgroundPattern";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ordinary-things" element={<OrdinaryThings />} />
            <Route path="/background" element={<BackgroundPattern />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
