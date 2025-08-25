import { motion } from 'framer-motion';
import BackgroundPattern from '../components/BackgroundPattern';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React and Node.js',
      image: 'https://source.unsplash.com/600x400?ecommerce',
      tags: ['React', 'Node.js', 'MongoDB', 'Express']
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management',
      image: 'https://source.unsplash.com/600x400?dashboard',
      tags: ['Vue.js', 'Firebase', 'Tailwind CSS']
    },
    {
      title: 'Mobile Fitness App',
      description: 'Cross-platform fitness tracking application',
      image: 'https://source.unsplash.com/600x400?fitness',
      tags: ['React Native', 'TypeScript', 'Redux']
    }
  ];

  return (
    <div className="h-[calc(100vh)] bg-gray-900 text-white overflow-hidden relative">
      {/* Background Pattern */}
      <BackgroundPattern />
      
      <div className="container mx-auto h-full overflow-y-auto px-8 scrollbar-hide relative z-10">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-16 pl-8"
        >
          <h1 className="text-5xl font-bold mb-4">
            My <span className="text-yellow-500">Projects</span>
          </h1>
          <div className="w-32 h-1 bg-yellow-500 mx-auto"></div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-yellow-500">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm text-yellow-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-2 bg-yellow-500 text-gray-900 rounded-full font-medium hover:bg-yellow-400 transition-colors"
                >
                  View Project
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
