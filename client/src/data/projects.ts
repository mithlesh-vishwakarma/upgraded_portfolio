import PersonalProject1 from "../assets/PersonalProject1.jpg";
import ClientProject1 from "../assets/clientProject1.jpg";
import ClientProject2 from "../assets/clientProject2.png";

export interface Milestone {
  event: string;
  date: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl?: string;
  image: string;
  images: string[];
  category: string;
  date: string; // Delivery date
  assignedDate: string; // Picked date
  location: string;
  projectType: "Personal" | "Freelanced";
  status: string;
  client?: string;
  featured?: boolean;
  problem: string;
  solution: string;
  techStackDescription: string;
  result: string;
  timeline: Milestone[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Personal-Portfolio",
    category: "Full Stack Development",
    description: "A modern personal portfolio website showcasing my projects, skills, and experience.",
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion", "TypeScript", "Vercel"],
    liveUrl: "https://ordinarycoder.com",
    githubUrl: "https://github.com/mithlesh-vishwakarma/upgraded_portfolio",
    image: PersonalProject1,
    images: [PersonalProject1], // Add more if available
    date: "2025-09-25",
    assignedDate: "2025-08-10",
    location: "Remote",
    projectType: "Personal",
    status: "Live",
    featured: true,
    problem: "As a developer, I needed a way to showcase my work, skills, and personality in a professional yet creative manner. Existing templates were either too generic or difficult to customize to my needs.",
    solution: "I built a custom portfolio using React and Tailwind CSS. The solution focused on performance, smooth animations with Framer Motion, and a responsive design that works across all devices. I implemented a glassmorphic UI to give it a premium feel.",
    techStackDescription: "The project uses Vite for fast development, TypeScript for type safety, and Tailwind CSS for rapid styling. Framer Motion is utilized for the sophisticated entrance animations and interactive elements.",
    result: "A high-performance, visually stunning portfolio that effectively communicates my value proposition as a developer. It has received positive feedback for its clean design and smooth user experience.",
    timeline: [
      { event: "Project Kickoff", date: "2025-08-10" },
      { event: "Design Phase", date: "2025-08-20" },
      { event: "Frontend Development", date: "2025-09-05" },
      { event: "Beta Testing", date: "2025-09-20" },
      { event: "Final Launch", date: "2025-09-25" },
    ],
  },
  {
    id: 4,
    title: "Sarda Chemical Corporation",
    category: "Corporate Website",
    description: "Developed a modern industrial website for Sarda Chemical Corporation to showcase their chemical products and manufacturing capabilities.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Elementor"],
    liveUrl: "https://sardachemicalcorporation.com/",
    githubUrl: "https://github.com/mithlesh-vishwakarma/sarda",
    image: ClientProject1,
    images: [ClientProject1],
    date: "2024-06-10",
    assignedDate: "2024-04-15",
    location: "Indore, MP",
    projectType: "Freelanced",
    status: "Live",
    client: "Sarda Chemical Corporation",
    problem: "The client needed an online presence to showcase their industrial chemical products and reach a wider market. Their existing online presence was minimal, and they wanted something that reflected their scale and expertise.",
    solution: "Created a professional, SEO-optimized website that clearly categorizes their products. I focused on building an intuitive navigation system so that potential clients can easily find technical specifications and contact information.",
    techStackDescription: "Built using HTML5, CSS3, and JavaScript, with Elementor for flexible layout management. The focus was on ensuring the site remains lightweight and fast despite having numerous product listings.",
    result: "A significant increase in online inquiries and a more professional digital footprint. The client can now easily update their product list and share their manufacturing capabilities with global partners.",
    timeline: [
      { event: "Requirement Gathering", date: "2024-04-15" },
      { event: "Structure & Planning", date: "2024-05-01" },
      { event: "Content Integration", date: "2024-05-20" },
      { event: "Review & Testing", date: "2024-05-30" },
      { event: "Production Deploy", date: "2024-06-10" },
    ],
  },
  {
    id: 5,
    title: "Bastion Research",
    category: "Financial Services Platform",
    description: "A boutique equity-research platform focused on the Indian market, offering detailed business reports and quantitative screens.",
    technologies: ["React", "NodeJS", "ExpressJS", "MongoDB", "TailwindCSS", "TypeScript", "Vercel"],
    liveUrl: "https://bastionresearch.in/",
    githubUrl: "#",
    image: ClientProject2,
    images: [ClientProject2],
    date: "2025-10-11",
    assignedDate: "2025-06-01",
    location: "Mumbai, MH",
    projectType: "Freelanced",
    status: "In Development",
    client: "Bastion Research",
    featured: true,
    problem: "Bastion Research needed a secure, efficient platform to deliver high-quality equity research to their subscribers. The challenge was handling complex data sets and providing a seamless subscription experience.",
    solution: "Developed a full-stack MERN platform. I implemented secure user authentication, a subscription management system, and interactive dashboards for viewing financial reports and quantitative data screens.",
    techStackDescription: "The MERN stack was chosen for its scalability. React with TypeScript ensures a robust frontend, while Node.js and MongoDB handle the diverse data requirements of financial research efficiently.",
    result: "Currently in development, the platform is already improving how research is delivered to early testers. It provides a centralized hub for all Bastion CORE offerings, including the Spotlight reports and quantitative screens.",
    timeline: [
      { event: "Discovery & Planning", date: "2025-06-01" },
      { event: "Database Schema Design", date: "2025-07-15" },
      { event: "Backend API Dev", date: "2025-08-30" },
      { event: "Frontend Core Logic", date: "2025-09-25" },
      { event: "Beta Release", date: "2025-10-11" },
    ],
  },
];
