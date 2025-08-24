import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Portfolio from "../components/Portfolio";
import Articles from "../components/Articles";
import Ebooks from "../components/Ebooks";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="bg-gray-900">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Portfolio />
        <Articles />
        <Ebooks />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
