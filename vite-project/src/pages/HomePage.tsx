import Hero from "../components/Hero";
// import About from "../components/About";
// import Skills from "../components/Skills";
// import Experience from "../components/Experience";
// import Education from "../components/Education";
// import Ebooks from "../components/Ebooks";

const HomePage = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Hero />
      {/* Other components will be shown in different routes */}
    </div>
  );
};

export default HomePage;
