import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import BackgroundPattern from "../components/BackgroundPattern";
import { articles } from "../data/articles";
import { ArrowRight, Clock, Tag } from "lucide-react";

const Articles: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const pageTitle = "Web Development, SaaS, Shopify & AI Articles | OrdinaryCoder";
  const pageDescription =
    "Practical guides and technical articles on SaaS MVP development, Shopify optimization, AI agents, web apps, and mobile development by Mithlesh Vishwakarma.";
  const canonicalUrl = "https://ordinarycoder.com/articles";

  const categories = ["All", "SaaS & Architecture", "E-Commerce & Shopify", "AI & Automation", "Web Development", "Mobile Development"];

  const filteredArticles = selectedCategory === "All"
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const articlesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Person",
      "name": "Mithlesh Vishwakarma",
      "url": "https://ordinarycoder.com/"
    }
  };

  return (
    <div className="min-h-screen text-white font-roboto relative">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        schema={articlesSchema}
      />
      <BackgroundPattern />

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-16 relative z-10">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-gray-400">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-yellow-400 font-medium">Articles &amp; Insights</li>
          </ol>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            Articles &amp; Insights
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Actionable insights, architecture guides, and practical engineering advice for founders, e-commerce brands, and businesses.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-yellow-400 text-slate-900 shadow-md"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-yellow-400 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-yellow-400/40 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span className="inline-flex items-center gap-1 text-yellow-400 font-bold bg-yellow-500/10 px-2.5 py-1 rounded-md border border-yellow-500/20">
                    <Tag className="w-3 h-3" /> {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {article.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors leading-snug">
                  <Link to={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">By {article.author} • {article.date}</span>
                <Link
                  to={`/articles/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-yellow-400 hover:text-yellow-300 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-3">Looking for Custom Development?</h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto mb-6">
            If you need tailored software engineering for your business, let's connect and discuss your project.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-slate-900 font-bold rounded-full hover:bg-yellow-300 transition-all text-sm shadow-md"
          >
            Contact Mithlesh Vishwakarma <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Articles;
