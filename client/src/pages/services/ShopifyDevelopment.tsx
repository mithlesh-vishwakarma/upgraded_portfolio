import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import BackgroundPattern from "../../components/BackgroundPattern";
import { CheckCircle, ArrowRight, HelpCircle, Store, Zap } from "lucide-react";

const ShopifyDevelopment: React.FC = () => {
  const pageTitle = "Shopify Store Development & Customization in Surat, India | OrdinaryCoder";
  const pageDescription =
    "Expert Shopify store development, liquid theme customization, custom app integration, and speed optimization services by Mithlesh Vishwakarma in Surat, Gujarat.";
  const canonicalUrl = "https://ordinarycoder.com/shopify-development";

  const faqs = [
    {
      q: "What Shopify development services do you provide?",
      a: "I offer custom Liquid theme modification, store setup, product catalog configuration, app integrations, payment gateway setup, mobile UX optimization, and store speed enhancements."
    },
    {
      q: "Can you customize existing Shopify themes?",
      a: "Yes. I customize standard Shopify OS 2.0 themes (Dawn, Impulse, Prestige, etc.) using custom Liquid templates, CSS, and JavaScript to match your exact brand identity."
    },
    {
      q: "Do you build custom Shopify storefronts?",
      a: "Yes. In addition to Liquid theme customizations, I can develop headless Shopify storefronts using React and the Shopify Storefront API for ultra-fast performance."
    },
    {
      q: "How do you improve Shopify site speed?",
      a: "By auditing app overhead, compressing image assets, eliminating unused JavaScript, lazy-loading heavy media, and optimizing theme code execution."
    }
  ];

  const serviceSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Shopify Store Development Services",
      "provider": {
        "@type": "ProfessionalService",
        "name": "OrdinaryCoder",
        "url": "https://ordinarycoder.com/"
      },
      "areaServed": "Global",
      "serviceType": "Shopify Development",
      "description": pageDescription,
      "url": canonicalUrl
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://ordinarycoder.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Shopify Development",
          "item": canonicalUrl
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  ];

  return (
    <div className="min-h-screen text-white font-roboto relative">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        schema={serviceSchema}
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
            <li className="text-yellow-400 font-medium">Shopify Development</li>
          </ol>
        </nav>

        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Surat, Gujarat, India
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent leading-tight">
            Shopify Development & Customization in Surat
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Build and optimize high-converting Shopify stores. I help e-commerce brands in Surat and worldwide build custom theme layouts, 
            integrate payment systems, and speed up store performance for higher sales conversion.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold rounded-full hover:from-yellow-500 hover:to-yellow-600 shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Start Shopify Project
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3 border border-yellow-400/50 text-yellow-400 font-bold rounded-full hover:bg-yellow-400/10 transition-all duration-300"
            >
              View Client Projects
            </Link>
          </div>
        </div>

        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 mb-12 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <Store className="w-6 h-6" /> Who Needs Shopify Development?
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Perfect for e-commerce brands, D2C startups, textile manufacturers in Surat, and online store owners who want to upgrade beyond 
            basic off-the-shelf templates and deliver a premium shopping experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">D2C E-Commerce Brands</h3>
              <p className="text-gray-400 text-sm">Stand out with custom product pages, dynamic filters, cart drawers, and upsell modules.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">Textile & Local Manufacturers</h3>
              <p className="text-gray-400 text-sm">Bring your products online directly from Surat to national and international buyers.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">Store Redesigns</h3>
              <p className="text-gray-400 text-sm">Speed up slow Shopify stores and improve mobile checkout conversion rates.</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" /> Shopify Deliverables
            </h2>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Custom Theme Customization:</strong> Liquid, HTML5, CSS3, and JS section development for Shopify OS 2.0.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>App Integration & Configuration:</strong> Seamless integration of reviews, inventory management, and marketing apps.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Speed & Mobile UX Optimization:</strong> Code cleanup and image asset optimization to pass Google Core Web Vitals.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Payment Gateway Setup:</strong> Razorpay, Stripe, and localized currency configuration.</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6" /> Technologies & Tools
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {["Shopify OS 2.0", "Liquid", "JavaScript", "HTML5/CSS3", "Shopify Storefront API", "React", "GraphQL", "Tailwind CSS"].map((tech) => (
                <span key={tech} className="bg-yellow-500/10 text-yellow-300 border border-yellow-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-6 leading-relaxed">
              Focusing on clean theme architecture so store managers can easily update homepage banners, products, and promos without breaking code.
            </p>
          </section>
        </div>

        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 mb-12 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-8 text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6" /> Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-12 shadow-xl">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">Explore Related Services</h2>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <Link to="/ecommerce-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> Custom E-Commerce Development
            </Link>
            <Link to="/web-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> Custom Web Development
            </Link>
            <Link to="/ai-agent-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> AI Agent Integration
            </Link>
          </div>
        </section>

        <div className="bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-amber-500/20 border border-yellow-500/40 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Grow Your Shopify Store?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm md:text-base">
            Get custom Shopify development and boost your online store performance.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-yellow-400 text-slate-900 font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg"
          >
            Contact Shopify Expert <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ShopifyDevelopment;
