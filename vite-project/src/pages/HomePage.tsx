// import { motion } from 'framer-motion';
import Hero from "../components/Hero";
// import About from "../components/About";
// import Skills from "../components/Skills";
// import Experience from "../components/Experience";
// import Education from "../components/Education";
// import Ebooks from "../components/Ebooks";

const HomePage = () => {
  return (
    <div className="h-[calc(100vh-4rem)] max-h-[900px] bg-gray-900 text-white overflow-hidden pt-8">
      {/* <div className="container mx-auto h-full overflow-y-auto px-8 scrollbar-hide max-w-7xl"> */}
        {/* Page Title */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-16 pl-8 mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Welcome to my <span className="text-yellow-500">Portfolio</span>
          </h1>
          <div className="w-32 h-1 bg-yellow-500"></div>
        </motion.div> */}

        {/* Hero Section */}
        <Hero />
      </div>
    // </div>
  );
};

export default HomePage;
