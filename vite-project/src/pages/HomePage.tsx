import Hero from "../components/Hero";
import BackgroundPattern from "../components/BackgroundPattern";

const HomePage = () => {
  return (
    <div className="h-[calc(100vh)] bg-gray-900 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <BackgroundPattern />
      
      {/* Hero Section */}
      <Hero />
    </div>
  );
};

export default HomePage;
