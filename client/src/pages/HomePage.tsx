import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SEO from "../components/SEO";
import { 
  Code2, 
  Layers, 
  Bot, 
  ShoppingBag, 
  ShoppingCart, 
  Layout, 
  Smartphone, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Sparkles,
  ExternalLink
} from "lucide-react";
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

  const servicesList = [
    {
      title: "Custom Web Applications",
      description: "Performant MERN stack web applications engineered for speed, search optimization, and seamless user interaction.",
      icon: Layout,
      link: "/web-app-development"
    },
    {
      title: "SaaS Product Development",
      description: "Full-stack multi-tenant SaaS products with user authentication, administrative control panels, and cloud scalability.",
      icon: Layers,
      link: "/saas-development"
    },
    {
      title: "AI Agent Development",
      description: "Intelligent AI agents and automated workflows integrated into web software using OpenAI, Gemini, and Claude APIs.",
      icon: Bot,
      link: "/ai-agent-development"
    },
    {
      title: "Shopify Store Development",
      description: "Custom Shopify Liquid themes, page speed optimizations, payment integrations, and D2C e-commerce setup.",
      icon: ShoppingBag,
      link: "/shopify-development"
    },
    {
      title: "E-Commerce Platforms",
      description: "Custom online shopping platforms built tailored to your business model with complete database control.",
      icon: ShoppingCart,
      link: "/ecommerce-development"
    },
    {
      title: "Custom Web Development",
      description: "Responsive, accessible, and fast websites designed to deliver strong conversion rates for businesses.",
      icon: Code2,
      link: "/web-development"
    },
    {
      title: "Android Applications",
      description: "Cross-platform Android applications and Progressive Web Apps (PWAs) synchronized with cloud backends.",
      icon: Smartphone,
      link: "/android-app-development"
    }
  ];

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
          <div className="text-center mb-10">
            <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs">Core Offerings</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">What I Build For Clients</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-yellow-400/40 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="p-3 bg-yellow-400/10 rounded-xl border border-yellow-400/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-yellow-400 hover:text-yellow-300 tracking-wider group-hover:translate-x-1 transition-all"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

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
            {projects.filter(p => p.featured || p.projectType === "Freelanced").slice(0, 2).map((project) => (
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
