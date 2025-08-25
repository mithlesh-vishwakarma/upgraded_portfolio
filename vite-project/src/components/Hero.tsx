import { motion } from "framer-motion";
import alluArjun from "../assets/allu-arjun.jpg";

const Hero = () => {
  return (
    <div className="h-screen bg-gray-900 relative overflow-hidden flex items-center justify-center p-4 md:p-8">
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

      <div className="container mx-auto px-4 md:px-8 h-full flex items-center justify-center max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 md:gap-12">
          {/* Image Section - Positioned to overlap with content on mobile */}
          <motion.div
            className="relative order-2 md:order-1"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Yellow Background Shape */}
            <div className="absolute -left-4 -top-4 md:-left-8 md:-top-8 w-48 h-56 md:w-72 md:h-80 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-tr-3xl"></div>

            {/* Profile Image */}
            <div className="relative z-20 w-40 h-48 md:w-64 md:h-72 bg-gray-800 rounded-tr-3xl overflow-hidden shadow-2xl">
              <img
                src={alluArjun}
                alt="mithlesh-vishwakarma"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content Section - Positioned to overlap with image on mobile */}
          <motion.div
            className="flex-1 order-1 md:order-2 text-center md:text-left md:ml-8 lg:ml-12"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Main Heading */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center flex flex-col items-center"
            >
              <motion.div
                className="w-16 h-1 bg-yellow-500 mb-6"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.div>

              <motion.h2
                className="text-4xl font-bold text-white mb-1 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Mithlesh Vishwakarma
              </motion.h2>
            </motion.div>
             <motion.p
              className="text-white-300 text-base md:text-lg leading-relaxed mb-4 mx-auto max-w-2xl text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
             Software Developer | Ordinary Artist | Fitness Enthusiast
            </motion.p>


            {/* Description */}
            <motion.p
              className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 mx-auto max-w-2xl text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Ex-Account Executive to managing a garment manufacturing company
              turned Software Developer in the AI era. An Ordinary Coder with a
              passion for coding, especially frontend, while exploring & working
              on backend and databases. I combine expertise in accounting,
              management, and full-stack development. My business experience
              honed leadership, problem-solving, and efficiency, which now fuel
              my coding projects. With Ordinary Developer Skills done ExtraOrdinary Projects.
            </motion.p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <motion.a
                href="/coming-soon"
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
            </div>
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
        www.OrdinaryCoder.com
      </motion.div>
    </div>
  );
};

export default Hero;
