import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-white/10 font-roboto">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Location Column */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold font-merienda text-yellow-400 mb-3">
              &lt; OrdinaryCoder /&gt;
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Mithlesh Vishwakarma — Custom Web, SaaS, Shopify &amp; AI Agent Developer.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-300">
              <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <span>Surat, Gujarat, India</span>
            </div>
            {/* TODO: Google Business Profile link will be inserted here when verified */}
          </div>

          {/* Service Links Column */}
          <div>
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link to="/web-development" className="hover:text-yellow-400 transition-colors">
                  Custom Web Development
                </Link>
              </li>
              <li>
                <Link to="/saas-development" className="hover:text-yellow-400 transition-colors">
                  SaaS Product Development
                </Link>
              </li>
              <li>
                <Link to="/ai-agent-development" className="hover:text-yellow-400 transition-colors">
                  AI Agent Development
                </Link>
              </li>
              <li>
                <Link to="/shopify-development" className="hover:text-yellow-400 transition-colors">
                  Shopify Development
                </Link>
              </li>
              <li>
                <Link to="/ecommerce-development" className="hover:text-yellow-400 transition-colors">
                  E-Commerce Development
                </Link>
              </li>
              <li>
                <Link to="/web-app-development" className="hover:text-yellow-400 transition-colors">
                  Custom Web Applications
                </Link>
              </li>
              <li>
                <Link to="/android-app-development" className="hover:text-yellow-400 transition-colors">
                  Android App Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Main Navigation Column */}
          <div>
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link to="/" className="hover:text-yellow-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-400 transition-colors">
                  About Mithlesh
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-yellow-400 transition-colors">
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-yellow-400 transition-colors">
                  Articles &amp; Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-400 transition-colors">
                  Contact Me
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links & Contact Column */}
          <div>
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex space-x-4 mb-4">
              <motion.a
                href="https://www.instagram.com/_ordinary_coder_/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                aria-label="Instagram Profile"
                className="text-white text-xl hover:text-yellow-500 transition-colors"
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/mithlesh-vishwakarma-9a7b54235/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                aria-label="LinkedIn Profile"
                className="text-white text-xl hover:text-yellow-500 transition-colors"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="https://github.com/mithlesh-vishwakarma"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                aria-label="GitHub Profile"
                className="text-white text-xl hover:text-yellow-500 transition-colors"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://x.com/Mithles08742315"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                aria-label="Twitter X Profile"
                className="text-white text-xl hover:text-yellow-500 transition-colors"
              >
                <FaTwitter />
              </motion.a>
            </div>
            <p className="text-gray-400 text-xs">
              Email: mithlesh.workplace@gmail.com
            </p>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="pt-6 border-t border-white/5 text-center flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mithlesh Vishwakarma (OrdinaryCoder). All rights reserved.</p>
          <p className="mt-2 md:mt-0">Surat, Gujarat, India • Canonical: https://ordinarycoder.com/</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
