import { useState } from "react";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [filter, setFilter] = useState("All");

  const projects = [
    { category: "Logo", image: "https://picsum.photos/seed/1/300/200" },
    { category: "Video", image: "https://picsum.photos/seed/2/300/200" },
    { category: "Graphic Design", image: "https://picsum.photos/seed/3/300/200" },
    { category: "Mockup", image: "https://picsum.photos/seed/4/300/200" },
    { category: "Logo", image: "https://picsum.photos/seed/5/300/200" },
    { category: "Video", image: "https://picsum.photos/seed/6/300/200" },
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  const tabs = ["All", "Logo", "Video", "Graphic Design", "Mockup"];

  return (
    <motion.section
      id="portfolio"
      className="py-20 bg-gray-800 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-10">
          My Portfolio
        </h2>
        <div className="flex justify-center space-x-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full font-bold transition-colors ${
                filter === tab
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-700 hover:bg-yellow-500 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
            >
              <img src={project.image} alt="Project" className="w-full rounded-lg" />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                <p className="text-white text-xl font-bold">View Project</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
