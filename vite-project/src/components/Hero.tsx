import { motion } from "framer-motion";
import AlluArjun from "../assets/allu-arjun.jpg";

const Hero = () => {
  return (
    <div className="bg-gray-900 relative flex items-center justify-center p-4 md:p-8 py-24 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500"></div>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 flex items-center justify-center max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 md:gap-12">
          {/* ✅ Fixed Image Section */}
          <motion.div
            className="relative order-1 md:order-1 flex-shrink-0"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Yellow Background Shape */}
            <motion.div
              className="absolute -left-1 -top-1 sm:-left-2 sm:-top-2 md:-left-6 md:-top-6 w-40 h-48 sm:w-44 sm:h-52 md:w-72 md:h-80 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-tr-3xl"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                type: "spring",
                stiffness: 80,
                damping: 15
              }}
            >
              {/* Floating particles animation */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full"
                animate={{
                  y: [-10, 10, -10],
                  x: [-5, 5, -5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-white/30 rounded-full"
                animate={{
                  y: [10, -10, 10],
                  x: [5, -5, 5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div
                className="absolute top-1/2 left-2 w-1 h-1 bg-white/25 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </motion.div>

            {/* ✅ Profile Image (mobile-friendly) */}
            <motion.div
              className="relative z-20 w-40 h-52 sm:w-44 sm:h-56 md:w-64 md:h-72 bg-gray-800 rounded-tr-3xl overflow-hidden shadow-2xl mx-auto"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                <img
                  src={AlluArjun}
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image border animation */}
              <motion.div
                className="absolute inset-0 border-2 border-yellow-400/30 rounded-tr-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              />
            </motion.div>
          </motion.div>

          {/* ✅ Content Section (unchanged) */}
          <motion.div
            className="flex-1 order-2 md:order-2 text-center md:text-left md:ml-8 lg:ml-12 w-full"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Heading */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center md:text-left flex flex-col items-center md:items-start"
            >
              <motion.div
                className="w-16 h-1 bg-yellow-500 mb-4 md:mb-6"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.div>

              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-center md:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Mithlesh Vishwakarma
              </motion.h2>
            </motion.div>

            {/* Role/Title */}
            <motion.p
              className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 text-center md:text-left"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Software Developer | Ordinary Artist | Fitness Enthusiast
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 text-center md:text-left max-w-full md:max-w-2xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Ex-Account Executive to managing a garment manufacturing company
              turned Software Developer in the AI era. An Ordinary Coder with a
              passion for coding, especially frontend, while exploring & working
              on backend and databases. I combine expertise in accounting,
              management, and full-stack development. My business experience
              honed leadership, problem-solving, and efficiency, which now fuel
              my coding projects. With Ordinary Developer Skills done
              ExtraOrdinary Projects.
            </motion.p>

            {/* CTA Button */}
            <div className="flex justify-center md:justify-start">
              <motion.a
                href="/coming-soon"
                className="relative inline-flex items-center overflow-hidden px-6 md:px-8 py-3 rounded-full font-semibold group cursor-pointer"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background fill animation */}
                <span className="absolute inset-0 w-0 bg-yellow-500 transition-all duration-500 ease-out group-hover:w-full border-2 border-yellow-500 rounded-full"></span>

                {/* Button text */}
                <span className="relative text-yellow-500 group-hover:text-gray-900 transition-colors duration-300 text-sm md:text-base">
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
                    className="h-5 w-5 md:h-6 md:w-6"
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
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Right Website Credit */}
      <motion.div
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-gray-400 text-xs md:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        www.OrdinaryCoder.com
      </motion.div>
    </div>
  );
};

export default Hero;
