import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-900 text-white overflow-hidden pt-8">
      <div className="container mx-auto h-full overflow-y-auto px-8 scrollbar-hide">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Get in <span className="text-yellow-500">Touch</span>
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-gray-900" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-400">Email</p>
                  <p className="text-lg">contact@example.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-gray-900" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-400">Phone</p>
                  <p className="text-lg">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-gray-900" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-400">Location</p>
                  <p className="text-lg">New York, NY 10001</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 p-8 rounded-lg"
          >
            <form>
              <div className="mb-6">
                <label className="block text-gray-400 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-400 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500"
                  placeholder="Your email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-400 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500"
                  placeholder="Your message"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-yellow-500 text-gray-900 py-3 px-6 rounded-lg font-semibold flex items-center justify-center"
              >
                Send Message
                <Send className="w-5 h-5 ml-2" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
