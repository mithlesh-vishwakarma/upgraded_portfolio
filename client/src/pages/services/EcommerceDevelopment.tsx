import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import BackgroundPattern from "../../components/BackgroundPattern";
import { ShoppingCart, CheckCircle, ArrowRight, HelpCircle, Database } from "lucide-react";

const EcommerceDevelopment: React.FC = () => {
  const pageTitle = "Custom E-Commerce Web Development Services in Surat, India | OrdinaryCoder";
  const pageDescription =
    "Custom e-commerce website development services in Surat, Gujarat. Mithlesh Vishwakarma builds fast, scalable online stores using React, Node.js, MongoDB, and custom shopping cart platforms.";
  const canonicalUrl = "https://ordinarycoder.com/ecommerce-development";

  const faqs = [
    {
      q: "What is the difference between custom e-commerce and Shopify?",
      a: "Custom e-commerce platforms offer complete control over database schemas, zero platform commission fees, custom workflows, and unlimited scaling without platform constraints."
    },
    {
      q: "Which payment gateways can be integrated?",
      a: "I integrate Razorpay, Stripe, PayPal, and custom banking APIs with secure webhooks and instant payment verification."
    },
    {
      q: "Is the e-commerce store optimized for search engines?",
      a: "Yes. Product listings, category pages, canonical tags, product schema markup (JSON-LD), and fast loading speed are engineered for top search engine visibility."
    },
    {
      q: "Can you build custom product inventory dashboards?",
      a: "Yes. I develop full admin control panels to manage stock levels, order status updates, customer records, and sales analytics."
    }
  ];

  const serviceSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Custom E-Commerce Development Services",
      "provider": {
        "@type": "ProfessionalService",
        "name": "OrdinaryCoder",
        "url": "https://ordinarycoder.com/"
      },
      "areaServed": "Global",
      "serviceType": "E-Commerce Development",
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
          "name": "E-Commerce Development",
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
            <li className="text-yellow-400 font-medium">E-Commerce Development</li>
          </ol>
        </nav>

        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Surat, Gujarat, India
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent leading-tight">
            Custom E-Commerce Development in Surat
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Scale your online retail business with custom-built e-commerce platforms. 
            Enjoy total design freedom, tailored checkout flows, fast loading speeds, and robust backend product management.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold rounded-full hover:from-yellow-500 hover:to-yellow-600 shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Start E-Commerce Project
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3 border border-yellow-400/50 text-yellow-400 font-bold rounded-full hover:bg-yellow-400/10 transition-all duration-300"
            >
              View Work Showcase
            </Link>
          </div>
        </div>

        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 mb-12 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" /> Who Is Custom E-Commerce For?
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            For businesses requiring unique product configurators, high transaction volume, custom B2B bulk pricing models, 
            or specialized database integrations that standard CMS platforms cannot easily accommodate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">Textile & Wholesale Businesses</h3>
              <p className="text-gray-400 text-sm">Custom catalog pricing, bulk order inquiries, and tiered catalog access.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">Scaling Retail Brands</h3>
              <p className="text-gray-400 text-sm">Full ownership over user accounts, order data, product search, and payment flow.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">Specialized Product Marketplaces</h3>
              <p className="text-gray-400 text-sm">Build multi-vendor or niche listing platforms tailored to your business model.</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" /> Platform Features
            </h2>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Custom Product Catalog:</strong> Dynamic variant selection, high-resolution gallery views, and instant search.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Seamless Shopping Cart & Checkout:</strong> Fast, frictionless cart state management and checkout workflow.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Secure Gateway Integrations:</strong> SSL encryption, Webhook payment callbacks, and transaction security.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Admin Dashboard:</strong> Manage inventory, track order fulfillment, view sales revenue reports.</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <Database className="w-6 h-6" /> Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {["React", "Node.js", "Express.js", "MongoDB", "TypeScript", "Tailwind CSS", "REST APIs", "Vercel"].map((tech) => (
                <span key={tech} className="bg-yellow-500/10 text-yellow-300 border border-yellow-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-6 leading-relaxed">
              Designed to remain responsive under heavy traffic spikes, guaranteeing fast page rendering for mobile online shoppers.
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
            <Link to="/shopify-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> Shopify Development
            </Link>
            <Link to="/web-app-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> Custom Web Applications
            </Link>
            <Link to="/web-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> Web Development
            </Link>
          </div>
        </section>

        <div className="bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-amber-500/20 border border-yellow-500/40 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Build Your Custom E-Commerce Store Today</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm md:text-base">
            Get a tailored online shopping experience built specifically for your brand and business goals.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-yellow-400 text-slate-900 font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg"
          >
            Launch E-Commerce Store <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default EcommerceDevelopment;
