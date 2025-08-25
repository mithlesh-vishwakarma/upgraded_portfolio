import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  Mail, 
  MessageCircle,
  Home,
  Pencil,
  Menu,
  X,
} from 'lucide-react';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const Header: React.FC = () => {
  const menuItems: MenuItem[] = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Briefcase, label: 'Projects', href: '/projects' },
    { icon: MessageCircle, label: 'Articles', href: '/articles' },
    { icon: Pencil, label: 'Ordinary Things', href: '/ordinary-things' },
    { icon: Mail, label: 'About', href: '/about' },
    { icon: User, label: 'Contact', href: '/contact' },
  ];

  const [hoveredMenuItem, setHoveredMenuItem] = useState<number | null>(null);
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
    <header className="fixed w-full top-0 left-0 z-50 bg-gray-900 shadow-lg">
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
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* <img
              src="/src/assets/"
              alt="OrdinaryCoder Logo"
              className="w-12 h-12 object-contain"
            /> */}
            <span className="text-white font-merienda text-xl lg:text-2xl">OrdinaryCoder</span>
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
            className="hidden lg:flex items-center space-x-12 ml-auto mr-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredMenuItem(index)}
                onMouseLeave={() => setHoveredMenuItem(null)}
              >
                <motion.a
                  href={item.href}
                  className="w-12 h-12 rounded-full bg-gray-800 hover:bg-yellow-500 text-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon size={20} />
                </motion.a>

                {hoveredMenuItem === index && (
                  <motion.div
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg shadow-lg font-medium whitespace-nowrap"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-500 rotate-45"></div>
                  </motion.div>
                )}
              </motion.div>
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
                    className="flex items-center gap-4 py-3 px-4 text-white hover:bg-gray-800 rounded-lg transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon size={20} />
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
