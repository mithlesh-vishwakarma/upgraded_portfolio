import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SEO from "../components/SEO";
import EcosystemSection from "../components/EcosystemSection";
import {
  Code2,
  Layers,
  Bot,
  ShoppingCart,
  Layout,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { SiWordpress, SiShopify } from "react-icons/si";
import { projects } from "../data/projects";

const HomePage: React.FC = () => {
  const pageTitle = "OrdinaryCoder | Custom Web, SaaS, Shopify & AI Agent Developer in Surat";
  const pageDescription =
    "OrdinaryCoder (Mithlesh Vishwakarma) offers custom web development, SaaS product development, Shopify store setup, AI agents, business dashboards, and Android app development in Surat, Gujarat, India.";
  const canonicalUrl = "https://ordinarycoder.com/";

  const homepageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://ordinarycoder.com/#person",
      "name": "Mithlesh Vishwakarma",
      "alternateName": "OrdinaryCoder",
      "url": canonicalUrl,
      "jobTitle": "Full Stack & AI Developer",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "addressCountry": "India"
      },
      "sameAs": [
        "https://x.com/Mithles08742315",
        "https://github.com/mithlesh-vishwakarma",
        "https://www.linkedin.com/in/mithlesh-vishwakarma-9a7b54235/",
        "https://www.instagram.com/_ordinary_coder_/"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": "https://ordinarycoder.com/#organization",
      "name": "OrdinaryCoder",
      "url": canonicalUrl,
      "logo": "https://ordinarycoder.com/og-image.jpg",
      "image": "https://ordinarycoder.com/og-image.jpg",
      "founder": {
        "@type": "Person",
        "name": "Mithlesh Vishwakarma"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "addressCountry": "India"
      },
      "priceRange": "$$",
      "description": pageDescription
    }
  ];

  const [activeCategory, setActiveCategory] = useState<"web" | "advanced">("web");

  const webOfferings = [
    {
      title: "WordPress Development",
      description: "Custom WordPress websites that are fast, SEO-friendly, and easy to manage.",
      features: [
        "Custom Theme Development",
        "Plugin Integration",
        "SEO Optimized",
        "Performance Focused"
      ],
      icon: SiWordpress,
      badgeBg: "bg-blue-950/70 border border-blue-500/40 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)]",
      glowColor: "rgba(37, 99, 235, 0.45)",
      accentColor: "#3b82f6",
      link: "/wordpress-development"
    },
    {
      title: "Shopify Development",
      description: "High-converting Shopify stores built for sales, scalability, and a seamless shopping experience.",
      features: [
        "Custom Store Design",
        "App Integration",
        "Payment Gateway Setup",
        "Conversion Optimization"
      ],
      icon: SiShopify,
      badgeBg: "bg-emerald-950/70 border border-emerald-500/40 text-[#95BF47] shadow-[0_0_15px_rgba(16,185,129,0.25)]",
      glowColor: "rgba(16, 185, 129, 0.45)",
      accentColor: "#10b981",
      link: "/shopify-development"
    },
    {
      title: "E-commerce Development",
      description: "Powerful e-commerce solutions that drive sales and improve customer satisfaction.",
      features: [
        "Custom E-commerce Solutions",
        "Product Management",
        "Secure Checkout",
        "Analytics & Reporting"
      ],
      icon: ShoppingCart,
      badgeBg: "bg-sky-950/70 border border-sky-500/40 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]",
      glowColor: "rgba(2, 132, 199, 0.45)",
      accentColor: "#38bdf8",
      link: "/ecommerce-development"
    },
    {
      title: "Custom Website Development",
      description: "Tailored websites that reflect your brand, engage your audience, and grow your business.",
      features: [
        "Custom Design & Development",
        "Responsive & Mobile-First",
        "Speed Optimization",
        "Ongoing Support"
      ],
      icon: Code2,
      badgeBg: "bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]",
      glowColor: "rgba(16, 185, 129, 0.45)",
      accentColor: "#10b981",
      link: "/web-development"
    }
  ];

  const advancedOfferings = [
    {
      title: "SaaS Product Development",
      description: "Scalable multi-tenant SaaS products with user authentication, administrative control panels, and cloud scalability.",
      features: [
        "Multi-Tenant Architecture",
        "Subscription & Stripe Billing",
        "Role-Based Access Control",
        "Scalable Cloud Backends"
      ],
      icon: Layers,
      badgeBg: "bg-purple-950/70 border border-purple-500/40 text-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.25)]",
      glowColor: "rgba(147, 51, 234, 0.45)",
      accentColor: "#a855f7",
      link: "/saas-development"
    },
    {
      title: "AI Agent Development",
      description: "Intelligent AI agents and automated workflows integrated into web software using modern LLM APIs.",
      features: [
        "Custom LLM & Tool Integration",
        "Automated Business Workflows",
        "Knowledge Retrieval & RAG",
        "Conversational User Interfaces"
      ],
      icon: Bot,
      badgeBg: "bg-pink-950/70 border border-pink-500/40 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.25)]",
      glowColor: "rgba(236, 72, 153, 0.45)",
      accentColor: "#f472b6",
      link: "/ai-agent-development"
    },
    {
      title: "Custom Web Applications",
      description: "Performant MERN stack web applications engineered for speed, search optimization, and seamless user interaction.",
      features: [
        "Full-Stack MERN Architecture",
        "High-Performance REST APIs",
        "Secure Database Schemas",
        "Interactive Real-Time Dashboards"
      ],
      icon: Layout,
      badgeBg: "bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)]",
      glowColor: "rgba(6, 182, 212, 0.45)",
      accentColor: "#22d3ee",
      link: "/web-app-development"
    },
    {
      title: "Android Applications",
      description: "Cross-platform Android applications and Progressive Web Apps (PWAs) synchronized with cloud backends.",
      features: [
        "Cross-Platform Development",
        "Offline Cache & Sync",
        "Push Notification Systems",
        "Cloud Backend Integration"
      ],
      icon: Smartphone,
      badgeBg: "bg-teal-950/70 border border-teal-500/40 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.25)]",
      glowColor: "rgba(20, 184, 166, 0.45)",
      accentColor: "#2dd4bf",
      link: "/android-app-development"
    }
  ];

  const currentOfferings = activeCategory === "web" ? webOfferings : advancedOfferings;

  return (
    <div className="min-h-screen text-white font-roboto relative overflow-x-hidden">
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        schema={homepageSchema}
      />

      {/* Hero Section */}
      <Hero />

      {/* Main Content Sections */}
      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10 space-y-16">

        {/* Location & Brand Statement */}
        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 text-center shadow-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold mb-4">
            <MapPin className="w-4 h-4" /> Based in Surat, Gujarat, India — Available Globally
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Engineering Tailored Software for Startups & Growing Businesses
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
            I specialize in turning business requirements into production-ready software solutions.
            Whether you need a custom web application, a scalable SaaS platform, a Shopify store, an AI agent, or an Android app,
            I build clean, maintainable code focused on performance and business outcomes.
          </p>
        </section>

        {/* Services Showcase Grid */}
        <section>
          <div className="text-center mb-8">
            <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs">Core Offerings</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">What I Build For Clients</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mt-3 text-sm md:text-base leading-relaxed">
              {activeCategory === "web"
                ? "We build fast, secure, and scalable websites that attract, engage, and convert your audience into loyal customers."
                : "We build scalable SaaS products, intelligent AI agents, and mobile applications that power modern operations."}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setActiveCategory("web")}
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeCategory === "web"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Web & E-Commerce
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory("advanced")}
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeCategory === "advanced"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                SaaS, AI & Mobile Apps
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentOfferings.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="relative group rounded-2xl bg-[#080d1a]/85 hover:bg-[#0c1428]/95 backdrop-blur-xl border border-white/10 hover:border-white/20 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 overflow-hidden shadow-2xl"
                  style={{
                    boxShadow: `0 0 28px -10px ${card.glowColor}`,
                  }}
                >
                  {/* Top ambient diffuse glow */}
                  <div
                    className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-32 rounded-full blur-2xl pointer-events-none opacity-45 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ background: card.glowColor }}
                  />

                  {/* Top illuminated border highlight */}
                  <div
                    className="absolute top-0 inset-x-8 h-[2px] pointer-events-none blur-[0.5px]"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${card.accentColor} 50%, transparent 100%)`,
                      boxShadow: `0 0 16px 2px ${card.accentColor}`,
                    }}
                  />

                  {/* Card Content Top */}
                  <div className="relative z-10">
                    {/* Icon Squircle Badge */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105 ${card.badgeBg}`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2.5 tracking-tight group-hover:text-white transition-colors">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-normal min-h-[54px]">
                      {card.description}
                    </p>

                    {/* Checklist */}
                    <div className="space-y-3 mb-8">
                      {card.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300 font-medium">
                          <CheckCircle2
                            className="w-4 h-4 text-emerald-400 shrink-0"
                            strokeWidth={2.2}
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Link: "Learn More ->" */}
                  <div className="relative z-10 pt-4 border-t border-white/5">
                    <Link
                      to={card.link}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-all group-hover:gap-2.5"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Independent Products & Open Tools Section (Futuristic 3D Ecosystem) */}
        <EcosystemSection />

        {/* Featured Case Studies Section */}
        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs">Factual Case Studies</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">Featured Client & Personal Projects</h2>
            </div>
            <Link
              to="/projects"
              className="mt-4 md:mt-0 text-sm font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1.5"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.filter(p => p.id === 1 || p.id === 5).map((project) => (
              <div key={project.id} className="bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-yellow-400/30 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 bg-yellow-500/10 px-2.5 py-1 rounded-md border border-yellow-500/20">
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-400">{project.projectType}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-[10px] uppercase font-bold text-gray-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/projects/${project.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-400 hover:text-yellow-300 uppercase tracking-wider"
                >
                  Read Detailed Case Study <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Why Work With Me */}
        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-xl">
          <div className="text-center mb-8">
            <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs">Direct Collaboration</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">Why Clients Trust OrdinaryCoder</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <CheckCircle2 className="w-8 h-8 text-yellow-400 mb-3" />
              <h3 className="font-bold text-white text-lg mb-2">No Misleading Claims</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                I only promise what I genuinely build and deliver. Honest communication, realistic timelines, and clean engineering.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <Sparkles className="w-8 h-8 text-yellow-400 mb-3" />
              <h3 className="font-bold text-white text-lg mb-2">SEO & Performance First</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Clean HTML structure, optimized Core Web Vitals, mobile responsiveness, and proper schema markup built in from day one.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <Code2 className="w-8 h-8 text-yellow-400 mb-3" />
              <h3 className="font-bold text-white text-lg mb-2">Modern Technology Stack</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Leveraging React, TypeScript, Node.js, Tailwind CSS, Liquid, and AI APIs to ensure long-term platform maintainability.
              </p>
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <div className="bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-amber-500/20 border border-yellow-500/40 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Have a Project in Mind?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
            Let's build a fast, modern, custom website, web application, SaaS product, Shopify store, AI agent, or Android app tailored to your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-yellow-400 text-slate-900 font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg text-sm md:text-base flex items-center gap-2"
            >
              Start a Project <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3.5 border border-yellow-400/60 text-yellow-400 font-bold rounded-full hover:bg-yellow-400/10 transition-all duration-300 text-sm md:text-base"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border border-gray-600 text-gray-300 font-medium rounded-full hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 text-sm md:text-base"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
