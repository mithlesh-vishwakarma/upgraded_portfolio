import { motion } from 'framer-motion';

const Articles = () => {
  const articles = [
    {
      title: 'The Future of Web Development',
      category: 'Technology',
      date: 'Aug 24, 2025',
      image: 'https://source.unsplash.com/600x400?coding',
      excerpt: 'Exploring upcoming trends and technologies in web development...'
    },
    {
      title: 'Mastering React Hooks',
      category: 'Programming',
      date: 'Aug 22, 2025',
      image: 'https://source.unsplash.com/600x400?programming',
      excerpt: 'A comprehensive guide to using React Hooks effectively...'
    },
    {
      title: 'UI/UX Best Practices',
      category: 'Design',
      date: 'Aug 20, 2025',
      image: 'https://source.unsplash.com/600x400?design',
      excerpt: 'Learn the essential principles of modern UI/UX design...'
    }
  ];

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-900 text-white overflow-hidden pt-8">
      <div className="container mx-auto h-full overflow-y-auto px-8 scrollbar-hide">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">
            Latest <span className="text-yellow-500">Articles</span>
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-yellow-500 text-sm">{article.category}</span>
                  <span className="text-gray-400 text-sm">{article.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-500 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 mb-4">{article.excerpt}</p>
                <motion.div
                  className="flex items-center text-yellow-500 font-medium"
                  whileHover={{ x: 5 }}
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
