import { motion } from "framer-motion";

const Articles = () => {
  const articles = [
    {
      image: "https://picsum.photos/seed/7/300/200",
      title: "The Ultimate Guide to Modern Web Design",
      description: "A deep dive into the latest trends and techniques in web design.",
    },
    {
      image: "https://picsum.photos/seed/8/300/200",
      title: "10 Tips for a Better User Experience",
      description: "Learn how to improve your website's usability and user satisfaction.",
    },
    {
      image: "https://picsum.photos/seed/9/300/200",
      title: "Getting Started with React and Tailwind CSS",
      description: "A beginner-friendly tutorial on building web apps with React and Tailwind.",
    },
  ];

  return (
    <motion.section
      id="articles"
      className="py-20 bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-10">
          My Blog
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
          {articles.map((article, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-4 rounded-lg transform hover:scale-105 transition-transform duration-300"
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <img src={article.image} alt="Article" className="w-full mb-4 rounded-lg" />
              <h3 className="text-xl font-bold">{article.title}</h3>
              <p className="mt-2">{article.description}</p>
              <a href="#" className="text-yellow-500 mt-4 inline-block font-bold">
                Read More
              </a>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-12">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-bold"
            >
                Load More
            </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Articles;
