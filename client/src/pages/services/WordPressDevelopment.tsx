import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import BackgroundPattern from "../../components/BackgroundPattern";
import { CheckCircle, ArrowRight, HelpCircle, Globe, Zap, ShieldCheck } from "lucide-react";
import { SiWordpress } from "react-icons/si";

const WordPressDevelopment: React.FC = () => {
  const pageTitle = "Custom WordPress Development Services in Surat, India | OrdinaryCoder";
  const pageDescription =
    "Professional custom WordPress development services in Surat, Gujarat. Mithlesh Vishwakarma crafts fast, secure, SEO-friendly custom WordPress websites, theme development, plugin integrations, and WooCommerce stores.";
  const canonicalUrl = "https://ordinarycoder.com/wordpress-development";

  const faqs = [
    {
      q: "What WordPress development services do you provide?",
      a: "I deliver bespoke WordPress theme development, plugin integration and customization, WooCommerce e-commerce setups, migration, security hardening, and Core Web Vitals speed optimization."
    },
    {
      q: "Do you build custom WordPress themes or use pre-made templates?",
      a: "I build custom, clean-coded WordPress themes tailored specifically to your branding and business requirements, avoiding bloated multi-purpose themes that slow down websites."
    },
    {
      q: "Can you optimize the speed of an existing WordPress website?",
      a: "Yes. I conduct comprehensive audits to optimize database queries, cache static assets, eliminate redundant plugins, defer JavaScript, and compress media to achieve sub-second load times."
    },
    {
      q: "Is WordPress safe and secure against malware?",
      a: "When properly configured, hardened with two-factor authentication, managed login limits, SSL encryption, and timely updates, WordPress is exceptionally secure and reliable."
    }
  ];

  const serviceSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Custom WordPress Development Services",
      "provider": {
        "@type": "ProfessionalService",
        "name": "OrdinaryCoder",
        "url": "https://ordinarycoder.com/"
      },
      "areaServed": "Global",
      "serviceType": "WordPress Development",
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
          "name": "WordPress Development",
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
            <li className="text-yellow-400 font-medium">WordPress Development</li>
          </ol>
        </nav>

        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Surat, Gujarat, India
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent leading-tight">
            Custom WordPress Development in Surat
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Fast, secure, and scalable WordPress websites that attract visitors, rank on search engines, and convert your audience into loyal clients.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Start WordPress Project
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3 border border-blue-400/50 text-blue-400 font-bold rounded-full hover:bg-blue-400/10 transition-all duration-300"
            >
              View Work Showcase
            </Link>
          </div>
        </div>

        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 mb-12 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <SiWordpress className="w-6 h-6" /> Why Choose Custom WordPress?
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            WordPress powers over 40% of the web. With a clean, bespoke implementation, you get the freedom of an intuitive content management system without the bloat, slowness, or security vulnerabilities of off-the-shelf templates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-blue-400 font-bold mb-2 text-lg">Custom Theme Engineering</h3>
              <p className="text-gray-400 text-sm">Pixel-perfect designs coded from scratch. Lightweight, accessible, and 100% brand aligned.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-blue-400 font-bold mb-2 text-lg">Speed & Core Web Vitals</h3>
              <p className="text-gray-400 text-sm">Optimized assets, database indexing, and caching to ensure sub-second page loads and green PageSpeed scores.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-blue-400 font-bold mb-2 text-lg">Robust Security Hardening</h3>
              <p className="text-gray-400 text-sm">Enterprise-grade security hygiene, DDoS protection, firewall configuration, and automated backups.</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" /> WordPress Capabilities
            </h2>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Custom Theme Development:</strong> Tailored PHP/Gutenberg blocks engineered for flexibility and speed.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Plugin Integration:</strong> Clean integration of CRM, mailing lists, payment gateways, and analytics.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>SEO Optimization:</strong> Schema markup, Open Graph metadata, semantic HTML, and sitemap generation.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>WooCommerce Stores:</strong> Scalable e-commerce setup with multi-currency and localized payment flows.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Easy Client Admin:</strong> Intuitive dashboard allowing your team to edit copy, images, and pages with zero code.</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6" /> Maintenance & Support
            </h2>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Regular Core & Plugin Updates:</strong> Staged testing before pushing updates live to avoid regressions.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Automated Cloud Backups:</strong> Off-site daily backups ensuring your data is always protected and restorable.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Security Monitoring:</strong> Real-time intrusion detection and malware scanning to keep your site safe.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span><strong>Performance Tuning:</strong> Regular asset optimization and database cleanup to sustain high speeds.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* FAQs */}
        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 mb-12 shadow-xl">
          <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6" /> Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-white/10 pb-4 last:border-b-0">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-gradient-to-r from-blue-500/20 via-sky-500/10 to-blue-600/20 border border-blue-500/40 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for a High-Performance WordPress Website?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
            Let's build a fast, secure, and easily manageable WordPress website designed to drive business conversions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center gap-2"
            >
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3.5 border border-blue-400/60 text-blue-400 font-bold rounded-full hover:bg-blue-400/10 transition-all duration-300"
            >
              Explore Projects
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WordPressDevelopment;

