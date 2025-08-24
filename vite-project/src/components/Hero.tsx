import { motion } from "framer-motion";
import alluArjun from "../assets/allu-arjun.jpg";

const Hero = () => {
  return (
    <div className="h-[calc(100vh-4rem)] max-h-[900px] bg-gray-900 relative overflow-hidden">
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

      <div className="container mx-auto px-8 h-full flex items-center max-w-7xl">
        <div className="flex items-center w-full justify-center">
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
                src={alluArjun}
                alt="mithlesh-vishwakarma"
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
              className="text-white-300 text-lg leading-relaxed mb-10 mx-auto max-w-2xl text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
             Software Developer | Ordinary Artist | Fitness Enthusiast
            </motion.p>


            {/* Description */}
            <motion.p
              className="text-gray-300 text-lg leading-relaxed mb-10 mx-auto max-w-2xl text-center"
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
        www.ordinaryCoder.com
      </motion.div>
    </div>
  );
};

export default Hero;
