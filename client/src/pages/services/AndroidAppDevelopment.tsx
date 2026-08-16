import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import BackgroundPattern from "../../components/BackgroundPattern";
import { Smartphone, CheckCircle, ArrowRight, HelpCircle, Cpu } from "lucide-react";

const AndroidAppDevelopment: React.FC = () => {
  const pageTitle = "Custom Android App Development Services in Surat, India | OrdinaryCoder";
  const pageDescription =
    "Custom Android app development services in Surat, Gujarat by Mithlesh Vishwakarma. Building responsive Android applications, React Native apps, PWA solutions, and REST API integrations.";
  const canonicalUrl = "https://ordinarycoder.com/android-app-development";

  const faqs = [
    {
      q: "What types of Android applications do you build?",
      a: "I develop cross-platform Android apps using React Native / Progressive Web Apps (PWAs) as well as custom mobile frontends integrated with secure backend Node.js APIs."
    },
    {
      q: "Can the Android app connect to my website or database?",
      a: "Yes. Mobile apps are built with RESTful APIs or WebSockets connecting directly to your centralized database (MongoDB, PostgreSQL) for real-time synchronization."
    },
    {
      q: "Do you assist with publishing to the Google Play Store?",
      a: "Yes. I prepare production app release bundles, configure app permissions, write store listing assets, and assist throughout the Google Play Console review process."
    },
    {
      q: "Is a PWA a good alternative to a native Android app?",
      a: "For many business applications, a Progressive Web App (PWA) offers fast loading, offline capability, installability on Android devices, and instant updates without store delays."
    }
  ];

  const serviceSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Custom Android App Development Services",
      "provider": {
        "@type": "ProfessionalService",
        "name": "OrdinaryCoder",
        "url": "https://ordinarycoder.com/"
      },
      "areaServed": "Global",
      "serviceType": "Android App Development",
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
          "name": "Android App Development",
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
            <li className="text-yellow-400 font-medium">Android App Development</li>
          </ol>
        </nav>

        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Surat, Gujarat, India
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent leading-tight">
            Custom Android App Development in Surat
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Reach smartphone users with custom Android applications and Progressive Web Apps (PWAs). 
            From mobile client portals to specialized field tools, get clean, intuitive mobile experiences built for performance.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold rounded-full hover:from-yellow-500 hover:to-yellow-600 shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Start Android App Project
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
            <Smartphone className="w-6 h-6" /> Who Is Android Development For?
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            For businesses wanting to put their software directly onto client or employee smartphones in Surat and across global markets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">Field & Service Operations</h3>
              <p className="text-gray-400 text-sm">Equip staff with mobile tools for quick status updates, order verification, and data capture.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">E-Commerce & Retail</h3>
              <p className="text-gray-400 text-sm">Provide customers with mobile ordering, push notifications, and fast checkout on Android.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">Startups & SaaS Extensions</h3>
              <p className="text-gray-400 text-sm">Extend your web application into mobile environments with synchronized cloud state.</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" /> Key Deliverables
            </h2>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Responsive Mobile UI:</strong> Touch-friendly controls, fast screens, and smooth transitions.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Backend API Sync:</strong> Secure real-time REST API integration with Node.js and MongoDB databases.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Progressive Web App (PWA):</strong> Offline caching, home screen installation, and fast mobile loading.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Security & Authentication:</strong> Mobile token management and safe data storage.</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <Cpu className="w-6 h-6" /> Mobile Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {["React Native", "Android PWA", "JavaScript", "TypeScript", "Node.js", "Express.js", "MongoDB", "RESTful APIs"].map((tech) => (
                <span key={tech} className="bg-yellow-500/10 text-yellow-300 border border-yellow-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-6 leading-relaxed">
              Leveraging modern cross-platform patterns to deliver reliable mobile apps without unnecessary complexity or high maintenance costs.
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
            <Link to="/web-app-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> Custom Web Applications
            </Link>
            <Link to="/saas-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> SaaS Product Development
            </Link>
            <Link to="/web-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> Custom Web Development
            </Link>
          </div>
        </section>

        <div className="bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-amber-500/20 border border-yellow-500/40 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build Your Android Application?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm md:text-base">
            Turn your app concept into a functional, user-friendly mobile experience.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-yellow-400 text-slate-900 font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg"
          >
            Start Mobile App Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AndroidAppDevelopment;
