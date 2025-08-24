import { motion } from 'framer-motion';

const OrdinaryThings = () => {
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
            <span className="text-yellow-500">Ordinary</span> Things
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Cards - Replace with your actual content */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={`https://source.unsplash.com/400x300?art=${item}`}
                  alt={`Ordinary Thing ${item}`}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-yellow-500">
                  Ordinary Thing {item}
                </h3>
                <p className="text-gray-400 mb-4">
                  A brief description of this ordinary but interesting thing that makes life special.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-yellow-500 font-medium hover:text-yellow-400"
                >
                  Learn More →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdinaryThings;
