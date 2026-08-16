import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import BackgroundPattern from "../../components/BackgroundPattern";
import { CheckCircle, ArrowRight, HelpCircle, Layers, Cpu, Globe } from "lucide-react";

const WebDevelopment: React.FC = () => {
  const pageTitle = "Custom Web Development Services in Surat, India | OrdinaryCoder";
  const pageDescription =
    "Professional custom web development services in Surat, Gujarat. Mithlesh Vishwakarma builds fast, accessible, SEO-ready websites and responsive web interfaces using React, TypeScript, and modern CSS.";
  const canonicalUrl = "https://ordinarycoder.com/web-development";

  const faqs = [
    {
      q: "What technologies do you use for custom web development?",
      a: "I build responsive, high-performance web applications using React, TypeScript, HTML5, Vanilla CSS, Tailwind CSS, and Node.js, ensuring clean code, fast load times, and search engine optimization."
    },
    {
      q: "Will my website be mobile-responsive and SEO-optimized?",
      a: "Yes. Every website I develop is built mobile-first, fully responsive across screen sizes, and optimized for search engine crawlers, Core Web Vitals, and accessibility."
    },
    {
      q: "Do you redesign existing websites?",
      a: "Absolutely. I can re-architect and modernize existing legacy websites to improve loading speed, UX design, responsiveness, and technical SEO structure."
    },
    {
      q: "How long does a custom web development project take?",
      a: "Timelines typically range from 2 to 5 weeks depending on project scope, custom design requirements, dynamic features, and integrations."
    }
  ];

  const serviceSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Custom Web Development Services",
      "provider": {
        "@type": "ProfessionalService",
        "name": "OrdinaryCoder",
        "url": "https://ordinarycoder.com/"
      },
      "areaServed": "Global",
      "serviceType": "Web Development",
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
          "name": "Custom Web Development",
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
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-gray-400">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-yellow-400 font-medium">Custom Web Development</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Surat, Gujarat, India
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent leading-tight">
            Custom Web Development in Surat, India
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            I craft tailored, lightning-fast web solutions for startups, businesses, and brands. 
            From pixel-perfect user interfaces to seamless backend integration, get clean code built for conversion and long-term scalability.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold rounded-full hover:from-yellow-500 hover:to-yellow-600 shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Start a Project
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3 border border-yellow-400/50 text-yellow-400 font-bold rounded-full hover:bg-yellow-400/10 transition-all duration-300"
            >
              View Projects
            </Link>
          </div>
        </div>

        {/* Who This Service Is For */}
        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 mb-12 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6" /> Who Is This For?
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            This service is ideal for startups seeking a high-converting web presence, established companies needing website modernization, 
            and local businesses in Surat and beyond looking to expand online with custom interactive web platforms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">Startups</h3>
              <p className="text-gray-400 text-sm">Build brand credibility quickly with custom landing pages and scalable frontends.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">Growing Businesses</h3>
              <p className="text-gray-400 text-sm">Replace generic templates with responsive, optimized code built specifically for your audience.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">E-Commerce & Service Brands</h3>
              <p className="text-gray-400 text-sm">Engage buyers with fast page speeds, interactive UX, and structured SEO.</p>
            </div>
          </div>
        </section>

        {/* Key Deliverables & Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Deliverables */}
          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" /> What I Deliver
            </h2>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Custom Frontend Architecture:</strong> Modern React + TypeScript code tailored to your exact workflow.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Mobile-First Design:</strong> 100% responsive layouts tested across smartphones, tablets, and desktops.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Technical SEO & Core Web Vitals:</strong> Built-in semantic HTML, meta routing, schema markup, and performance optimization.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Clean Maintainable Code:</strong> Modular components with strict TypeScript safety.</span>
              </li>
            </ul>
          </section>

          {/* Technology Stack */}
          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <Cpu className="w-6 h-6" /> Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {["React 19", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Framer Motion", "Vercel / Netlify"].map((tech) => (
                <span key={tech} className="bg-yellow-500/10 text-yellow-300 border border-yellow-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-6 leading-relaxed">
              Every technology is chosen to maintain fast build times, reliable hosting infrastructure, clean component reuse, and ease of future updates.
            </p>
          </section>
        </div>

        {/* Development Process */}
        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 mb-12 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-8 text-center flex items-center justify-center gap-2">
            <Layers className="w-6 h-6" /> Development Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center">
              <div className="w-10 h-10 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center font-black mx-auto mb-3">1</div>
              <h3 className="font-bold text-white mb-2">Discovery</h3>
              <p className="text-gray-400 text-xs">Analyze project goals, target audience, and business requirements.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center">
              <div className="w-10 h-10 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center font-black mx-auto mb-3">2</div>
              <h3 className="font-bold text-white mb-2">Architecture</h3>
              <p className="text-gray-400 text-xs">Structure design system, state management, and component breakdown.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center">
              <div className="w-10 h-10 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center font-black mx-auto mb-3">3</div>
              <h3 className="font-bold text-white mb-2">Development</h3>
              <p className="text-gray-400 text-xs">Write clean React code with responsive styling, animations, and SEO optimization.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center">
              <div className="w-10 h-10 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center font-black mx-auto mb-3">4</div>
              <h3 className="font-bold text-white mb-2">Launch</h3>
              <p className="text-gray-400 text-xs">Deploy to production hosting, verify Core Web Vitals, and submit sitemaps.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
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

        {/* Related Services Internal Links */}
        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-12 shadow-xl">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">Explore Related Services</h2>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <Link to="/saas-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> SaaS Product Development
            </Link>
            <Link to="/web-app-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> Custom Web Applications
            </Link>
            <Link to="/shopify-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> Shopify Development
            </Link>
            <Link to="/ai-agent-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> AI Agent Development
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-amber-500/20 border border-yellow-500/40 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build Your Custom Website?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm md:text-base">
            Let's discuss your goals and turn your vision into a performant, custom-coded web solution.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-yellow-400 text-slate-900 font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg"
          >
            Contact Mithlesh Vishwakarma <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default WebDevelopment;
