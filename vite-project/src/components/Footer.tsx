import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-5 font-roboto">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4 flex justify-center space-x-4">
          <motion.a
            href="https://www.instagram.com/_ordinary_coder_/"
            whileHover={{ scale: 1.2 }}
            className="text-white text-2xl hover:text-yellow-500 transition-colors"
          >
            <FaInstagram />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/mithlesh-vishwakarma-9a7b54235/"
            whileHover={{ scale: 1.2 }}
            className="text-white text-2xl hover:text-yellow-500 transition-colors"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="https://github.com/mithlesh-vishwakarma"
            whileHover={{ scale: 1.2 }}
            className="text-white text-2xl hover:text-yellow-500 transition-colors"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://x.com/Mithles08742315"
            whileHover={{ scale: 1.2 }}
            className="text-white text-2xl hover:text-yellow-500 transition-colors"
          >
            <FaTwitter />
          </motion.a>
        </div>
        <p className="text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} Mithlesh Vishwakarma. All rights reserved.
        </p>
        <p className="text-gray-400 text-xs">Made with ❤️ in Bharat</p>
      </div>

    </footer>
  );
};

export default Footer;
