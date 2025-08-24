import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Hero = () => {
  return (
    <motion.section
      id="home"
      className="bg-gray-900 text-white py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-6 md:flex items-center">
        <motion.div
          className="md:w-1/2"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://picsum.photos/seed/picsum/400/400"
            alt="Profile"
            className="rounded-full w-64 h-64 mx-auto md:mx-0"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2 md:pl-10 mt-10 md:mt-0 text-center md:text-left"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-yellow-500">
            Hi, I'm John Doe
          </h1>
          <p className="text-2xl mt-2">A Passionate Web Designer</p>
          <p className="mt-4">
            I design and build beautiful and responsive websites. I am passionate about creating great user experiences.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-bold"
          >
            More About Me
          </motion.button>
          <div className="mt-6 flex justify-center md:justify-start space-x-4">
            <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-white text-2xl"><FaLinkedin /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-white text-2xl"><FaGithub /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-white text-2xl"><FaTwitter /></motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
