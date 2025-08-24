import { useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-yellow-500">
          MyPortfolio
        </a>
        <div className="hidden md:flex space-x-6">
          <motion.a href="#home" whileHover={{ scale: 1.1 }} className="hover:text-yellow-500 transition-colors">Home</motion.a>
          <motion.a href="#about" whileHover={{ scale: 1.1 }} className="hover:text-yellow-500 transition-colors">About</motion.a>
          <motion.a href="#skills" whileHover={{ scale: 1.1 }} className="hover:text-yellow-500 transition-colors">Skills</motion.a>
          <motion.a href="#portfolio" whileHover={{ scale: 1.1 }} className="hover:text-yellow-500 transition-colors">Portfolio</motion.a>
          <motion.a href="#blog" whileHover={{ scale: 1.1 }} className="hover:text-yellow-500 transition-colors">Blog</motion.a>
          <motion.a href="#contact" whileHover={{ scale: 1.1 }} className="hover:text-yellow-500 transition-colors">Contact</motion.a>
          <motion.a href="#articles" whileHover={{ scale: 1.1 }} className="hover:text-yellow-500 transition-colors">Articles</motion.a>
          <motion.a href="#ebooks" whileHover={{ scale: 1.1 }} className="hover:text-yellow-500 transition-colors">E-Books</motion.a>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </nav>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden flex flex-col items-center space-y-4 py-4 bg-gray-900"
        >
          <a href="#home" className="hover:text-yellow-500">Home</a>
          <a href="#about" className="hover:text-yellow-500">About</a>
          <a href="#skills" className="hover:text-yellow-500">Skills</a>
          <a href="#portfolio" className="hover:text-yellow-500">Portfolio</a>
          <a href="#blog" className="hover:text-yellow-500">Blog</a>
          <a href="#contact" className="hover:text-yellow-500">Contact</a>
          <a href="#articles" className="hover:text-yellow-500">Articles</a>
          <a href="#ebooks" className="hover:text-yellow-500">E-Books</a>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
