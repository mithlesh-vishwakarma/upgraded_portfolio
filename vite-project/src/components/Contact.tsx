import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="py-20 bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-10">
          Get in Touch
        </h2>
        <div className="md:flex">
          <motion.div
            className="md:w-1/2 md:pr-10"
            initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-bold"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
          <motion.div
            className="md:w-1/2 mt-10 md:mt-0 md:pl-10"
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p><strong>Address:</strong> 123 Main St, Anytown, USA</p>
            <p><strong>Phone:</strong> +1 123 456 7890</p>
            <div className="mt-4 flex space-x-4">
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-white text-2xl"><FaLinkedin /></motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-white text-2xl"><FaGithub /></motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-white text-2xl"><FaTwitter /></motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
