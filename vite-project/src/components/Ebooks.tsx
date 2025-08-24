import { motion } from "framer-motion";

const Ebooks = () => {
  const ebooks = [
    {
      image: "https://picsum.photos/seed/10/200/300",
      title: "The Art of Minimalist Design",
      description: "Discover the principles of minimalism and how to apply them to your work.",
    },
    {
      image: "https://picsum.photos/seed/11/200/300",
      title: "JavaScript for Beginners",
      description: "A comprehensive guide to learning the fundamentals of JavaScript.",
    },
    {
      image: "https://picsum.photos/seed/12/200/300",
      title: "Mastering CSS Grid",
      description: "Learn how to create complex and responsive layouts with CSS Grid.",
    },
  ];

  return (
    <motion.section
      id="ebooks"
      className="py-20 bg-gray-800 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-10">
          My E-Books
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {ebooks.map((ebook, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 p-4 rounded-lg text-center transform hover:scale-105 transition-transform duration-300"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={ebook.image}
                alt="E-Book"
                className="w-full h-64 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-bold">{ebook.title}</h3>
              <p className="mt-2">{ebook.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-yellow-500 text-gray-900 px-6 py-2 rounded-full font-bold"
              >
                Download / Buy Now
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Ebooks;
