import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ChangingText = () => {
  const texts = [
    "A Website For Your Business?",
    "A Portfolio Website?",
    "An E-Commerce Website?",
  ];

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(120); // Typing speed

  useEffect(() => {
    const currentText = texts[index];
    let timer;
    if (!isDeleting && displayText.length < currentText.length) {
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, speed);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      }, 60);
    } else if (!isDeleting && displayText.length === currentText.length) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

  return (
    <motion.div
      className="flex flex-col custom-923:flex-row items-center custom-923:items-center custom-923:justify-between text-gray-400 text-sm md:text-base mb-6 md:mb-14 p-3 md:p-4 shadow-[0_0_15px_#6b5815,0_0_30px_#6b5815] rounded-full bg-gray-900 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.6 }}
    >
      {/* Static + Typing Effect */}
      <div className="text-center custom-923:text-left">
        <span className="text-white">Want to Build &nbsp;</span>
        <span className="text-yellow-500">{displayText}</span>
        <span className="animate-pulse text-yellow-500">|</span>
      </div>

      {/* Just text link */}
      <Link
        to="/contact"
        className="text-yellow-500 font-semibold mt-3 custom-923:mt-0"
      >
        Let's Connect
      </Link>
    </motion.div>
  );
};

export default ChangingText;
