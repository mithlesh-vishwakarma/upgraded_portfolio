import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ChangingText from "./ChangingText";
import ProfilePic1 from "../assets/profile-img-cutout.png";
import Magnet from './Magnet';
import api from "../api/api";
import { useToast } from "../context/ToastContext";

const MotionLink = motion.create(Link);
const MotionButton = motion.button;

const Hero = () => {
  const { showToast } = useToast();
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    api.get("/resume")
      .then((res: any) => {
        if (res.data?.resumeUrl) {
          setResumeUrl(res.data.resumeUrl);
        }
      })
      .catch(() => {});
  }, []);

  const handleViewResume = () => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
    } else {
      showToast("My resume will be updated and uploaded shortly. Please check back soon!", "info");
    }
  };

  return (
    <div className="relative flex items-center justify-center p-4 md:p-8 pt-32 pb-16 md:pt-40 md:pb-18">
      <div className="container mx-auto px-4 md:px-8 py-8 flex items-center justify-center max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8 md:gap-12">
          {/* Image Section */}
          <motion.div
            className="relative order-1 md:order-1 flex-shrink-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Background Shape */}
            <motion.div
              className="absolute -left-1 -top-1 sm:-left-2 sm:-top-2 md:-left-5 md:-top-5 w-36 h-40 sm:w-40 sm:h-44 md:w-64 md:h-60 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-tr-3xl"
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
            </motion.div>

            {/* Profile Image (LCP Prioritized) */}
            <motion.div
              className="relative z-20 w-40 h-40 sm:w-44 sm:h-44 md:w-64 md:h-56 bg-gray-800 rounded-tr-3xl overflow-visible shadow-[0_0_15px_#6b5815,0_0_30px_#6b5815] mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-tr-3xl"></div>

              {/* LCP Image optimized with fetchpriority high and loading eager */}
              <img
                src={ProfilePic1}
                alt="Profile Picture of Mithlesh Vishwakarma - OrdinaryCoder"
                loading="eager"
                // @ts-expect-error fetchpriority attribute is supported in modern browsers
                fetchpriority="high"
                decoding="sync"
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[105%] object-contain z-10"
              />

              <div className="absolute inset-0 border-2 border-yellow-400/30 rounded-tr-3xl"></div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="flex-1 order-2 md:order-2 text-center md:text-left md:ml-8 lg:ml-12 w-full"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center md:text-left flex flex-col items-center md:items-start"
            >
              <div className="w-16 h-1 bg-yellow-500 mb-4 md:mb-6"></div>

              {/* Single Clear Primary H1 Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-100 mb-4 text-center md:text-left font-merienda leading-tight">
                Custom Web, SaaS, Shopify & AI Agent Developer in Surat
              </h1>
            </motion.div>

            <motion.p
              className="text-yellow-400 font-semibold text-lg md:text-xl leading-relaxed mb-3 text-center md:text-left"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Mithlesh Vishwakarma | OrdinaryCoder
            </motion.p>

            <motion.p
              className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 text-center md:text-left max-w-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Helping startups, local businesses, and e-commerce brands in Surat, Gujarat, and worldwide build high-performance web applications, scalable SaaS products, custom Shopify stores, AI agents, and Android applications.
            </motion.p>

            <ChangingText />

            {/* Prominent CTAs */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-8">
              <Magnet padding={100} disabled={false} magnetStrength={20}>
                <MotionLink
                  to="/contact"
                  className="inline-flex bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold px-7 py-3 rounded-full text-sm md:text-base hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-400/30"
                  whileTap={{ scale: 0.95 }}
                >
                  Start a Project
                </MotionLink>
              </Magnet>

              <Magnet padding={100} disabled={false} magnetStrength={20}>
                <MotionLink
                  to="/projects"
                  className="inline-flex border border-yellow-500 text-yellow-400 font-semibold px-7 py-3 rounded-full text-sm md:text-base hover:bg-yellow-500/10 transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </MotionLink>
              </Magnet>

              <Magnet padding={100} disabled={false} magnetStrength={20}>
                <MotionButton
                  onClick={handleViewResume}
                  className="inline-flex border border-gray-600 text-gray-300 font-medium px-6 py-3 rounded-full text-sm md:text-base hover:border-yellow-500 hover:text-yellow-400 transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  View Resume
                </MotionButton>
              </Magnet>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
