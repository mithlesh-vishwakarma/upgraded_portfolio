import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  MessageCircle,
  MapPin 
} from 'lucide-react';

const Header = () => {
  const [hoveredMenuItem, setHoveredMenuItem] = useState<number | null>(null);

  const menuItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about' },
    { icon: Briefcase, label: 'Portfolio', href: '#portfolio' },
    { icon: Mail, label: 'Contact', href: '#contact' },
    { icon: MessageCircle, label: 'Blog', href: '#blog' },
  ];

  return (
    <header className="fixed w-full top-0 right-0 z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500"></div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Navigation Menu */}
      <motion.nav 
        className="fixed right-8 top-1/2 transform -translate-y-1/2"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="bg-gray-800 rounded-full p-2 shadow-2xl border border-gray-700">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative mb-4 last:mb-0"
              onMouseEnter={() => setHoveredMenuItem(index)}
              onMouseLeave={() => setHoveredMenuItem(null)}
            >
              <motion.a
                href={item.href}
                className="w-12 h-12 rounded-full bg-gray-700 hover:bg-yellow-500 text-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon size={20} />
              </motion.a>
              
              {/* Tooltip */}
              {hoveredMenuItem === index && (
                <motion.div
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg shadow-lg font-medium whitespace-nowrap"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-yellow-500 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.nav>

      {/* Location Pin */}
      <motion.div 
        className="absolute top-8 right-8 text-yellow-500"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <MapPin size={24} />
      </motion.div>
    </header>
  );
};

export default Header;
