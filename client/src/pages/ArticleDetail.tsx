import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "../components/SEO";
import BackgroundPattern from "../components/BackgroundPattern";
import { articles } from "../data/articles";
import { ArrowLeft, ArrowRight, Clock, User, Calendar, Tag } from "lucide-react";

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const pageTitle = `${article.title} | OrdinaryCoder`;
  const pageDescription = article.excerpt;
  const canonicalUrl = `https://ordinarycoder.com/articles/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": "https://ordinarycoder.com/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "OrdinaryCoder",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ordinarycoder.com/og-image.jpg"
      }
    },
    "datePublished": article.date,
    "mainEntityOfPage": canonicalUrl
  };

  return (
    <div className="min-h-screen text-white font-roboto relative">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        ogType="article"
        schema={articleSchema}
      />
      <BackgroundPattern />

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-16 relative z-10">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-gray-400">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/articles" className="hover:text-yellow-400 transition-colors">
                Articles
              </Link>
            </li>
            <li>/</li>
            <li className="text-yellow-400 font-medium truncate max-w-[200px] sm:max-w-xs">
              {article.title}
            </li>
          </ol>
        </nav>

        <Link
          to="/articles"
          className="inline-flex items-center gap-1.5 text-xs text-yellow-400 hover:text-yellow-300 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        {/* Header Content */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-md border border-yellow-500/20 mb-4">
            <Tag className="w-3.5 h-3.5" /> {article.category}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-b border-white/10 pb-6">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-yellow-400" /> {article.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-yellow-400" /> {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-yellow-400" /> {article.readTime}
            </span>
          </div>
        </div>

        {/* Article Main Body */}
        <article className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl mb-12 prose prose-invert max-w-none">
          <div className="text-gray-300 text-base leading-relaxed space-y-6 whitespace-pre-line">
            {article.content.trim()}
          </div>
        </article>

        {/* Related Service Feature Link */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Related Service</span>
            <h2 className="text-lg font-bold text-white mt-1">{article.relatedServiceTitle}</h2>
          </div>
          <Link
            to={article.relatedServiceLink}
            className="px-6 py-2.5 bg-yellow-400 text-slate-900 font-bold rounded-full text-xs hover:bg-yellow-300 transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            Explore Service <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bottom CTA */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-3">Have a Technical Question?</h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto mb-6">
            Need help implementing these architecture patterns in your project? Send me a message.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-yellow-400 text-slate-900 font-bold rounded-full hover:bg-yellow-300 transition-all text-sm shadow-md"
          >
            Contact Mithlesh Vishwakarma <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetail;
