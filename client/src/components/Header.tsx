import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlitchText from './GlitchText';

interface MenuItem {
  label: string;
  href: string;
  target?: string;
  children?: { label: string; href: string }[];
}

const MotionLink = motion.create(Link);

const Header: React.FC = () => {
  const serviceItems = [
    { label: 'Custom Web Development', href: '/web-development' },
    { label: 'SaaS Product Development', href: '/saas-development' },
    { label: 'AI Agent Development', href: '/ai-agent-development' },
    { label: 'Shopify Store Development', href: '/shopify-development' },
    { label: 'E-Commerce Development', href: '/ecommerce-development' },
    { label: 'Custom Web Applications', href: '/web-app-development' },
    { label: 'Android App Development', href: '/android-app-development' },
  ];

  const menuItems: MenuItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/web-development', children: serviceItems },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Articles', href: '/articles' },
    { label: 'Contact', href: '/contact' },
    { label: 'Notes', href: 'https://learn.ordinarycoder.com/', target: '_blank' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

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
          className="flex-shrink-0 lg:ml-8"
        >
          <MotionLink
            to="/"
            className="flex flex-col items-center hover:opacity-80 transition-opacity"
            aria-label="OrdinaryCoder Homepage"
          >
            <GlitchText
              speed={1}
              enableShadows={true}
              enableOnHover={true}
              className="text-white font-merienda text-base sm:text-lg md:text-xl lg:text-2xl leading-none text-center"
            >
              {"< OrdinaryCoder />"}
            </GlitchText>
            <div className="logo-subtitle flex justify-center text-gray-400 mt-1 lg:-mt-1 leading-none font-merienda sm:text-[7px] md:text-[9px] lg:text-[10px]">
              <span className="mr-[30px]">Vishwakarma</span>
              <span>Mithlesh</span>
            </div>
          </MotionLink>
        </motion.div>

        {/* Hamburger Menu Button (Mobile) */}
        {isMobile && (
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2 hover:text-yellow-500 transition-colors"
            aria-label="Toggle Navigation Menu"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        )}

        {/* Desktop Navigation Menu */}
        {!isMobile && (
          <motion.nav
            className="hidden lg:flex items-center space-x-4 ml-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {menuItems.map((item, index) => {
              if (item.children) {
                return (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className="px-4 py-2 rounded-full text-white hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 flex items-center gap-1 font-medium text-sm"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                    >
                      {item.label} <ChevronDown className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full mt-1 w-64 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50"
                        >
                          {item.children.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              to={sub.href}
                              className="block px-4 py-2.5 text-xs font-medium text-gray-200 hover:bg-yellow-500 hover:text-gray-900 transition-colors"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={index}
                  to={item.href}
                  target={item.target}
                  rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="px-4 py-2 rounded-full text-white hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-300 font-medium text-sm"
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.nav>
        )}

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              className="absolute top-full left-0 w-full bg-gray-900 shadow-lg border-t border-white/10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="container mx-auto py-4 px-4 space-y-1">
                {menuItems.map((item, index) => {
                  if (item.children) {
                    return (
                      <div key={index} className="space-y-1">
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className="w-full flex items-center justify-between py-2 px-4 text-white hover:bg-yellow-500 hover:text-gray-900 rounded-full transition-colors font-medium"
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`w-4 h-4 transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isServicesOpen && (
                          <div className="pl-6 space-y-1">
                            {item.children.map((sub, sIdx) => (
                              <Link
                                key={sIdx}
                                to={sub.href}
                                className="block py-2 px-4 text-xs text-gray-300 hover:text-yellow-400"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <MotionLink
                      key={index}
                      to={item.href}
                      target={item.target}
                      rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="flex items-center justify-center py-2.5 px-4 text-white hover:bg-yellow-500 hover:text-gray-900 rounded-full transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="font-medium">{item.label}</span>
                    </MotionLink>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
