import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import BackgroundPattern from "../../components/BackgroundPattern";
import { CheckCircle, ArrowRight, HelpCircle, Bot, Sparkles } from "lucide-react";

const AIAgentDevelopment: React.FC = () => {
  const pageTitle = "Custom AI Agent Development Services in Surat, India | OrdinaryCoder";
  const pageDescription =
    "Custom AI agent development services by Mithlesh Vishwakarma in Surat, Gujarat. Integrating intelligent AI agents, automated workflows, LLM APIs, and smart assistants into modern web apps.";
  const canonicalUrl = "https://ordinarycoder.com/ai-agent-development";

  const faqs = [
    {
      q: "What types of AI agents can you build?",
      a: "I build conversational customer support agents, automated internal workflow bots, data extraction tools, AI powered content generators, and custom LLM integrations tailored to specific business tasks."
    },
    {
      q: "Which AI models and APIs do you integrate?",
      a: "I integrate leading AI models including OpenAI (GPT-4o), Anthropic Claude, Gemini API, as well as open-source models via custom backend APIs in Node.js and Python."
    },
    {
      q: "Can AI agents connect with our existing software?",
      a: "Yes. AI agents can be integrated into your existing React web applications, custom databases, CRMs, or third-party webhooks."
    },
    {
      q: "How do you handle API cost efficiency and safety?",
      a: "I implement strict token limits, prompt optimization, caching strategies, fallback error handling, and rate limiting to maintain cost efficiency and reliability."
    }
  ];

  const serviceSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Custom AI Agent Development Services",
      "provider": {
        "@type": "ProfessionalService",
        "name": "OrdinaryCoder",
        "url": "https://ordinarycoder.com/"
      },
      "areaServed": "Global",
      "serviceType": "AI Agent Development",
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
          "name": "AI Agent Development",
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
            <li className="text-yellow-400 font-medium">AI Agent Development</li>
          </ol>
        </nav>

        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Surat, Gujarat, India
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent leading-tight">
            Custom AI Agent Development in Surat, India
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Automate routine operations and elevate customer experience with intelligent AI agents. 
            I design and integrate custom AI solutions into web platforms, dashboards, and mobile applications.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold rounded-full hover:from-yellow-500 hover:to-yellow-600 shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Build an AI Agent
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3 border border-yellow-400/50 text-yellow-400 font-bold rounded-full hover:bg-yellow-400/10 transition-all duration-300"
            >
              Explore AI & Tech Projects
            </Link>
          </div>
        </div>

        <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 mb-12 shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <Bot className="w-6 h-6" /> Who Are AI Agents For?
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Ideal for businesses seeking to reduce manual data processing, automate lead capture, provide 24/7 intelligent customer response, 
            or equip internal teams with custom AI tools tailored to company knowledge bases.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">E-Commerce & Brands</h3>
              <p className="text-gray-400 text-sm">Deploy smart product recommendation and instant support bots directly on your store.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">SaaS Platforms</h3>
              <p className="text-gray-400 text-sm">Integrate generative AI assistants, automated report summaries, and dynamic user help agents.</p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h3 className="text-yellow-400 font-bold mb-2 text-lg">Local Businesses</h3>
              <p className="text-gray-400 text-sm">Automate client intake, appointment scheduling queries, and FAQ handling seamlessly.</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" /> AI Deliverables
            </h2>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Custom LLM Integration:</strong> OpenAI, Gemini, and Claude API pipelines built directly into your app.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Automated Workflow Agents:</strong> Background agents for data extraction, parsing, and automated notifications.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Interactive Chat Interfaces:</strong> Modern, responsive React UI components built for chat streaming and prompt inputs.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span><strong>Cost & Rate Control:</strong> Prompt engineering, token usage management, and secure API key management.</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6" /> Tech Stack & Tools
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {["OpenAI API", "Gemini API", "Node.js", "TypeScript", "React", "Python", "REST APIs", "WebSockets", "MongoDB"].map((tech) => (
                <span key={tech} className="bg-yellow-500/10 text-yellow-300 border border-yellow-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-6 leading-relaxed">
              Combining modern frontend design with reliable backend API integration to make AI features practical, fast, and cost-effective.
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
            <Link to="/saas-development" className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <ArrowRight className="w-4 h-4 text-yellow-400" /> SaaS Product Development
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
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Automate with AI Agents?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm md:text-base">
            Discuss your AI agent concept and integrate custom intelligence into your business workflow.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-yellow-400 text-slate-900 font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg"
          >
            Get Started with AI <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AIAgentDevelopment;
