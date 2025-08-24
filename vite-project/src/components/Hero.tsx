import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
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

      <div className="container mx-auto px-8 py-20 flex items-center min-h-screen">
        <div className="flex items-center w-full">
          {/* Left Section - Photo */}
          <motion.div 
            className="relative"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Yellow Background Shape */}
            <div className="absolute -left-8 -top-8 w-80 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-tr-3xl"></div>
            
            {/* Profile Image */}
            <div className="relative z-10 w-72 h-80 bg-gray-800 rounded-tr-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
                alt="Steve Milner"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Section - Content */}
          <motion.div 
            className="flex-1 ml-20"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Heading */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center mb-4">
                <motion.div 
                  className="w-16 h-1 bg-yellow-500 mr-6"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                ></motion.div>
                <motion.h1 
                  className="text-5xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <span className="text-yellow-500">I'M STEVE MILNER.</span>
                </motion.h1>
              </div>
              
              <motion.h2 
                className="text-4xl font-bold text-white mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                WEB DESIGNER
              </motion.h2>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              I'm a Tunisian based web designer & front-end developer focused on crafting 
              clean & user-friendly experiences, I am passionate about building excellent 
              software that improves the lives of those around me.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              className="bg-transparent border-2 border-yellow-500 text-yellow-500 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 flex items-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              MORE ABOUT ME
              <motion.div 
                className="ml-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center group-hover:bg-gray-900"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-gray-900 group-hover:text-yellow-500 text-lg">→</span>
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Right Website Credit */}
      <motion.div 
        className="absolute bottom-8 right-8 text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        www.DownloadNewThemes.com
      </motion.div>
    </div>
  );
};

export default Hero;