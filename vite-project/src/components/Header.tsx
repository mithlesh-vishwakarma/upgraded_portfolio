import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import GlitchText from './GlitchText';
interface MenuItem {
  label: string;
  href: string;
}

const Header: React.FC = () => {
  const menuItems: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Projects', href: '/projects' },
    { label: 'Arts of OrdinaryCoder', href: '/ordinary-things' },
    { label: 'Articles', href: '/articles' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-gray-900 shadow-[0_4px_15px_#6b5815]">

      <div className="container mx-auto px-4 lg:px-16 py-4 flex flex-row items-center justify-between">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0 lg:ml-20"
        >
          <motion.a
            href="/"
            className="flex flex-col items-center hover:opacity-80 transition-opacity"
          >
            <GlitchText
              speed={1}
              enableShadows={true}
              enableOnHover={true}
              className="text-white font-merienda text-xl lg:text-2xl leading-none text-center"
            >
              {"<"} OrdinaryCoder {"/>"}
            </GlitchText>
            <div className="flex justify-center text-[10px] text-gray-400 mt-1 lg:-mt-1 leading-none font-merienda">
              <span className="mr-[30px]">Vishwakarma</span>
              <span>Mithlesh</span>
            </div>
          </motion.a>
        </motion.div>
        {/* Hamburger Menu Button (Mobile) */}
        {isMobile && (
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2 hover:text-yellow-500 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        )}

        {/* Desktop Navigation Menu */}
        {!isMobile && (
          <motion.nav
            className="hidden lg:flex items-center space-x-6 ml-auto mr-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="px-4 py-2 rounded-full text-white hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              className="absolute top-full left-0 w-full bg-gray-900 shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="container mx-auto py-4 px-4">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="flex items-center justify-center py-3 px-4 text-white hover:bg-yellow-500 hover:text-gray-900 rounded-full transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;