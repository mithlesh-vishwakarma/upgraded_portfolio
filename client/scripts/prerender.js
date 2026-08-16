import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const routes = [
  {
    path: '/',
    title: 'OrdinaryCoder | Custom Web, SaaS, Shopify & AI Agent Developer in Surat',
    description: 'OrdinaryCoder (Mithlesh Vishwakarma) builds custom web applications, SaaS products, Shopify stores, AI agents, business dashboards, and Android apps in Surat, Gujarat, India.',
    h1: 'Custom Web, SaaS, Shopify & AI Agent Developer in Surat',
    canonical: 'https://ordinarycoder.com/'
  },
  {
    path: '/web-development',
    title: 'Custom Web Development Services in Surat, India | OrdinaryCoder',
    description: 'Professional custom web development services in Surat, Gujarat. Mithlesh Vishwakarma builds fast, accessible, SEO-ready websites using React, TypeScript, and modern CSS.',
    h1: 'Custom Web Development in Surat, India',
    canonical: 'https://ordinarycoder.com/web-development'
  },
  {
    path: '/saas-development',
    title: 'Custom SaaS Product Development in Surat, India | OrdinaryCoder',
    description: 'End-to-end SaaS product development services by Mithlesh Vishwakarma in Surat, Gujarat. Architecting scalable multi-tenant SaaS products, user auth, and dashboards with MERN stack.',
    h1: 'Custom SaaS Development in Surat, India',
    canonical: 'https://ordinarycoder.com/saas-development'
  },
  {
    path: '/ai-agent-development',
    title: 'Custom AI Agent Development Services in Surat, India | OrdinaryCoder',
    description: 'Custom AI agent development services by Mithlesh Vishwakarma in Surat, Gujarat. Integrating intelligent AI agents, automated workflows, LLM APIs, and smart assistants into web apps.',
    h1: 'Custom AI Agent Development in Surat, India',
    canonical: 'https://ordinarycoder.com/ai-agent-development'
  },
  {
    path: '/shopify-development',
    title: 'Shopify Store Development & Customization in Surat, India | OrdinaryCoder',
    description: 'Expert Shopify store development, liquid theme customization, custom app integration, and speed optimization services by Mithlesh Vishwakarma in Surat, Gujarat.',
    h1: 'Shopify Development & Customization in Surat',
    canonical: 'https://ordinarycoder.com/shopify-development'
  },
  {
    path: '/ecommerce-development',
    title: 'Custom E-Commerce Web Development Services in Surat, India | OrdinaryCoder',
    description: 'Custom e-commerce website development services in Surat, Gujarat. Mithlesh Vishwakarma builds fast, scalable online stores using React, Node.js, MongoDB, and custom shopping carts.',
    h1: 'Custom E-Commerce Development in Surat',
    canonical: 'https://ordinarycoder.com/ecommerce-development'
  },
  {
    path: '/web-app-development',
    title: 'Custom Web Application Development in Surat, India | OrdinaryCoder',
    description: 'Custom web application development services in Surat, Gujarat by Mithlesh Vishwakarma. Building scalable MERN stack web apps, dashboards, admin tools, and API backends.',
    h1: 'Custom Web Application Development in Surat',
    canonical: 'https://ordinarycoder.com/web-app-development'
  },
  {
    path: '/android-app-development',
    title: 'Custom Android App Development Services in Surat, India | OrdinaryCoder',
    description: 'Custom Android app development services in Surat, Gujarat by Mithlesh Vishwakarma. Building responsive Android applications, React Native apps, PWA solutions, and REST API backends.',
    h1: 'Custom Android App Development in Surat',
    canonical: 'https://ordinarycoder.com/android-app-development'
  },
  {
    path: '/projects',
    title: 'Web, SaaS & Shopify Projects Gallery | OrdinaryCoder',
    description: 'Explore client and personal software development projects by Mithlesh Vishwakarma (OrdinaryCoder), featuring SaaS platforms, web applications, and custom Shopify setups.',
    h1: 'Project Gallery',
    canonical: 'https://ordinarycoder.com/projects'
  },
  {
    path: '/projects/1',
    title: 'Personal Portfolio Case Study | OrdinaryCoder',
    description: 'Technical case study for Personal Portfolio built by Mithlesh Vishwakarma using React, TypeScript, and Tailwind CSS.',
    h1: 'Personal Portfolio Case Study',
    canonical: 'https://ordinarycoder.com/projects/1'
  },
  {
    path: '/projects/4',
    title: 'Sarda Chemical Corporation Case Study | OrdinaryCoder',
    description: 'Technical case study for Sarda Chemical Corporation web platform developed by Mithlesh Vishwakarma.',
    h1: 'Sarda Chemical Corporation Case Study',
    canonical: 'https://ordinarycoder.com/projects/4'
  },
  {
    path: '/projects/5',
    title: 'Bastion Research SaaS Platform Case Study | OrdinaryCoder',
    description: 'Technical case study for Bastion Research equity research platform built using MERN stack and TypeScript.',
    h1: 'Bastion Research Case Study',
    canonical: 'https://ordinarycoder.com/projects/5'
  },
  {
    path: '/articles',
    title: 'Web Development, SaaS, Shopify & AI Articles | OrdinaryCoder',
    description: 'Practical guides and technical articles on SaaS MVP development, Shopify optimization, AI agents, web apps, and mobile development by Mithlesh Vishwakarma.',
    h1: 'Articles & Insights',
    canonical: 'https://ordinarycoder.com/articles'
  },
  {
    path: '/articles/building-scalable-saas-mvp-mern-stack',
    title: "Building a Scalable SaaS MVP with MERN Stack | OrdinaryCoder",
    description: "Learn how startup founders can launch a production-ready SaaS MVP using MongoDB, Express, React, and Node.js with secure multi-tenancy.",
    h1: "Building a Scalable SaaS MVP with the MERN Stack",
    canonical: 'https://ordinarycoder.com/articles/building-scalable-saas-mvp-mern-stack'
  },
  {
    path: '/articles/shopify-theme-customization-vs-apps',
    title: "Shopify Liquid Customization vs. Apps | OrdinaryCoder",
    description: "Discover why replacing bloated third-party Shopify apps with custom Liquid code improves Google Core Web Vitals and load speed.",
    h1: "Shopify Liquid Customization vs. Third-Party Apps",
    canonical: 'https://ordinarycoder.com/articles/shopify-theme-customization-vs-apps'
  },
  {
    path: '/articles/integrating-ai-agents-into-web-apps',
    title: "Integrating AI Agents into Web Applications | OrdinaryCoder",
    description: "A practical guide for businesses on integrating custom AI agents and LLM APIs into web apps to automate support and workflows.",
    h1: "How Businesses Can Integrate Practical AI Agents into Web Applications",
    canonical: 'https://ordinarycoder.com/articles/integrating-ai-agents-into-web-apps'
  },
  {
    path: '/articles/custom-web-apps-vs-no-code-tools',
    title: "Custom Web Apps vs. No-Code Tools | OrdinaryCoder",
    description: "Compare custom MERN web applications with no-code website builders to determine when your business needs full code ownership.",
    h1: "Custom Web Applications vs. No-Code Builders",
    canonical: 'https://ordinarycoder.com/articles/custom-web-apps-vs-no-code-tools'
  },
  {
    path: '/articles/cross-platform-android-apps-for-businesses',
    title: "PWA vs. Native Android Apps | OrdinaryCoder",
    description: "An actionable breakdown comparing Progressive Web Apps (PWAs) and cross-platform Android applications for local businesses.",
    h1: "PWA vs. Native Android Apps: Choosing the Right Mobile Strategy",
    canonical: 'https://ordinarycoder.com/articles/cross-platform-android-apps-for-businesses'
  },
  {
    path: '/about',
    title: 'About Mithlesh Vishwakarma | Full Stack Developer in Surat | OrdinaryCoder',
    description: 'Learn more about Mithlesh Vishwakarma (OrdinaryCoder), a full-stack developer based in Surat, Gujarat, building custom web applications, SaaS products, and AI agents.',
    h1: 'About Mithlesh Vishwakarma',
    canonical: 'https://ordinarycoder.com/about'
  },
  {
    path: '/contact',
    title: 'Contact Mithlesh Vishwakarma | OrdinaryCoder - Surat, Gujarat',
    description: 'Get in touch with Mithlesh Vishwakarma (OrdinaryCoder) for custom web development, SaaS platforms, Shopify stores, AI agents, or Android app projects in Surat, Gujarat, India.',
    h1: 'Contact Mithlesh Vishwakarma',
    canonical: 'https://ordinarycoder.com/contact'
  }
];

function prerender() {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Build output dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  routes.forEach((route) => {
    let routeHtml = templateHtml;

    // 1. Replace Title
    routeHtml = routeHtml.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
    
    // 2. Replace Primary Title & Description Meta Tags
    routeHtml = routeHtml.replace(/<meta\s+name="title"\s+content=".*?"\s*\/?>/i, `<meta name="title" content="${route.title}" />`);
    routeHtml = routeHtml.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${route.description}" />`);

    // 3. Replace Canonical Link
    routeHtml = routeHtml.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${route.canonical}" />`);

    // 4. Replace OG Title, Description, and URL
    routeHtml = routeHtml.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${route.title}" />`);
    routeHtml = routeHtml.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${route.description}" />`);
    routeHtml = routeHtml.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${route.canonical}" />`);

    // 5. Replace Twitter Title, Description, and URL
    routeHtml = routeHtml.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${route.title}" />`);
    routeHtml = routeHtml.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${route.description}" />`);
    routeHtml = routeHtml.replace(/<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:url" content="${route.canonical}" />`);

    // 6. Pre-render fallback H1 in #root shell for crawlers without JS
    if (route.h1) {
      const rootFallback = `<div id="root"><header style="opacity:0;position:absolute;"><h1>${route.h1}</h1><p>${route.description}</p></header></div>`;
      routeHtml = routeHtml.replace('<div id="root"></div>', rootFallback);
    }

    // Determine target output directory
    let targetFile;
    if (route.path === '/') {
      targetFile = templatePath;
    } else {
      const targetSubDir = path.join(distDir, route.path);
      if (!fs.existsSync(targetSubDir)) {
        fs.mkdirSync(targetSubDir, { recursive: true });
      }
      targetFile = path.join(targetSubDir, 'index.html');
    }

    fs.writeFileSync(targetFile, routeHtml, 'utf8');
    console.log(`Pre-rendered HTML for ${route.path} -> ${targetFile}`);
  });

  console.log(`Static pre-rendering complete for ${routes.length} public indexable routes!`);
}

prerender();
