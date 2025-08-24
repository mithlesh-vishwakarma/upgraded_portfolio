import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4">
          <a href="#home" className="px-3 hover:text-yellow-500 transition-colors">Home</a>
          <a href="#about" className="px-3 hover:text-yellow-500 transition-colors">About</a>
          <a href="#portfolio" className="px-3 hover:text-yellow-500 transition-colors">Portfolio</a>
          <a href="#blog" className="px-3 hover:text-yellow-500 transition-colors">Blog</a>
          <a href="#contact" className="px-3 hover:text-yellow-500 transition-colors">Contact</a>
        </div>
        <div className="mb-4 flex justify-center space-x-4">
          <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-white text-2xl"><FaLinkedin /></motion.a>
          <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-white text-2xl"><FaGithub /></motion.a>
          <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-white text-2xl"><FaTwitter /></motion.a>
        </div>
        <p>&copy; 2024 John Doe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
