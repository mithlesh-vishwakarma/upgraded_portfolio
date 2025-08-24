import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-900 relative overflow-hidden">
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

      <div className="container mx-auto px-8 h-full flex items-center">
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
                  <span className="text-yellow-500"></span>
                </motion.h1>
              </div>
              
              <motion.h2 
                className="text-4xl font-bold text-white mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Mithlesh Vishwakarma
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
            <motion.a
              href="/education"
              className="relative inline-flex items-center overflow-hidden px-8 py-3 rounded-full font-semibold group"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background fill animation */}
              <span className="absolute inset-0 w-0 bg-yellow-500 transition-all duration-500 ease-out group-hover:w-full border-2 border-yellow-500 rounded-full"></span>
              
              {/* Button text */}
              <span className="relative text-yellow-500 group-hover:text-gray-900 transition-colors duration-300">
                MORE ABOUT ME
              </span>
              
              {/* Arrow icon */}
              <motion.span
                className="relative ml-2 flex items-center"
                animate={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    className="text-yellow-500 group-hover:text-gray-900 transition-colors duration-300"
                  />
                </motion.svg>
              </motion.span>
            </motion.a>
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