import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Rocket,
  Zap,
  ShieldCheck,
  Code2,
  ExternalLink,
  BookOpen,
  ArrowRight
} from "lucide-react";

// Isometric 3D Cube Icon
const IsometricCubeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

// Interactive 3D Tilt Card wrapper
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  glowColor = "rgba(59, 130, 246, 0.4)"
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className={`relative h-full transition-shadow duration-300 ${className}`}
    >
      {/* Background glow when hovered */}
      <div
        className="absolute -inset-0.5 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none blur-xl group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

const EcosystemSection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Ambient Cybernetic Blue Background Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 mb-14">
        {/* Glowing Pill Badge with Dashed Accent Lines */}
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-blue-500/60" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <IsometricCubeIcon className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>SELF-BUILT ECOSYSTEM</span>
          </div>
          <span className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-blue-500/60" />
        </div>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          Independent Products &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.55)]">
            Open Tools
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
          Live web applications and open-access resources built, shipped, and maintained under the OrdinaryCoder ecosystem.
        </p>
      </div>

      {/* Main 2-Card 3D Interactive Showcase */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* ========================================================= */}
          {/* CARD 1: ORDINARY TOOLS (Clickable redirect to tools.ordinarycoder.com) */}
          {/* ========================================================= */}
          <TiltCard glowColor="rgba(59, 130, 246, 0.45)">
            <a
              href="https://tools.ordinarycoder.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between h-full relative rounded-3xl bg-gradient-to-br from-[#0c1630]/90 via-[#0a1226]/85 to-[#060b18]/95 backdrop-blur-2xl border border-blue-500/30 hover:border-blue-400/60 p-7 sm:p-8 shadow-[0_10px_40px_rgba(10,20,50,0.6)] hover:shadow-[0_15px_50px_rgba(37,99,235,0.35)] overflow-hidden transition-all duration-300 cursor-pointer"
            >
              {/* Radiant top-right corner neon light bar */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/20 rounded-full blur-2xl pointer-events-none group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 inset-x-12 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[0.5px]" />
              <div className="absolute bottom-0 right-10 w-32 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

              {/* Top External Link Button */}
              <div className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-blue-300 group-hover:text-white group-hover:bg-blue-600/30 group-hover:border-blue-400/50 transition-all z-20">
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              <div>
                <div className="flex flex-col sm:flex-row items-start gap-5 mb-5 relative z-10">
                  {/* Glowing 3D Cube Squircle Badge */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/30 via-blue-900/40 to-slate-950 border border-blue-400/50 flex items-center justify-center text-blue-400 shrink-0 shadow-[0_0_25px_rgba(59,130,246,0.35)] group-hover:scale-105 transition-transform duration-300">
                    <IsometricCubeIcon className="w-8 h-8 text-blue-300 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                  </div>

                  {/* Title & Status */}
                  <div className="flex-1 pr-8 sm:pr-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-xs font-bold shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE PRODUCT</span>
                      </div>
                      <span className="text-[11px] font-mono text-blue-300/80 bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/20">
                        tools.ordinarycoder.com
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-blue-200 transition-colors">
                      Ordinary Tools
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal relative z-10">
                  A 100% client-side, privacy-first browser utility suite. High-speed file processing, in-browser PDF editing, and converters run entirely inside your browser's RAM with zero server uploads.
                </p>

                {/* Tech Stack / Tags */}
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {["100% Client-Side", "Zero Server Uploads", "PDF Suite", "Privacy-First", "No Sign-up"].map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wide backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action CTA Button */}
              <div className="pt-2 relative z-10">
                <span className="px-6 py-2.5 rounded-full bg-gradient-to-r from-white via-blue-50 to-blue-100 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] group-hover:bg-white transition-all transform group-hover:-translate-y-0.5 inline-flex items-center gap-2">
                  <span>Launch tools.ordinarycoder.com</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          </TiltCard>

          {/* ========================================================= */}
          {/* CARD 2: ORDINARY LEARN (Clickable redirect to learn.ordinarycoder.com) */}
          {/* ========================================================= */}
          <TiltCard glowColor="rgba(6, 182, 212, 0.45)">
            <a
              href="https://learn.ordinarycoder.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between h-full relative rounded-3xl bg-gradient-to-br from-[#081826]/90 via-[#071320]/85 to-[#050c14]/95 backdrop-blur-2xl border border-cyan-500/30 hover:border-cyan-400/60 p-7 sm:p-8 shadow-[0_10px_40px_rgba(6,20,35,0.6)] hover:shadow-[0_15px_50px_rgba(6,182,212,0.35)] overflow-hidden transition-all duration-300 cursor-pointer"
            >
              {/* Radiant top-right corner neon light bar */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 inset-x-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[0.5px]" />
              <div className="absolute bottom-0 right-10 w-32 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

              {/* Top External Link Button */}
              <div className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-cyan-300 group-hover:text-white group-hover:bg-cyan-600/30 group-hover:border-cyan-400/50 transition-all z-20">
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              <div>
                <div className="flex flex-col sm:flex-row items-start gap-5 mb-5 relative z-10">
                  {/* Glowing BookOpen Squircle Badge */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-600/30 via-cyan-900/40 to-slate-950 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_25px_rgba(6,182,212,0.35)] group-hover:scale-105 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  </div>

                  {/* Title & Status */}
                  <div className="flex-1 pr-8 sm:pr-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/35 text-cyan-400 text-xs font-bold shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span>LIVE PRODUCT</span>
                      </div>
                      <span className="text-[11px] font-mono text-cyan-300/80 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                        learn.ordinarycoder.com
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                      OrdinaryCoder Notes &amp; Learn
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal relative z-10">
                  An open learning portal and technical reference guide for software engineers. Packed with practical architecture breakdowns, full-stack React &amp; Node.js tutorials, and cheat sheets.
                </p>

                {/* Tech Stack / Tags */}
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {["Engineering Notes", "MERN Architecture", "System Design", "Cheat Sheets", "Free Tutorials"].map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action CTA Button */}
              <div className="pt-2 relative z-10">
                <span className="px-6 py-2.5 rounded-full bg-gradient-to-r from-white via-cyan-50 to-cyan-100 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] group-hover:bg-white transition-all transform group-hover:-translate-y-0.5 inline-flex items-center gap-2">
                  <span>Explore learn.ordinarycoder.com</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          </TiltCard>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM METRICS / ECOSYSTEM CAPSULE BAR                    */}
        {/* ========================================================= */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="rounded-full bg-gradient-to-r from-[#091228]/85 via-[#0b1735]/90 to-[#091228]/85 backdrop-blur-2xl border border-blue-500/30 px-6 sm:px-10 py-4 shadow-[0_10px_35px_rgba(10,20,50,0.5)]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10 items-center">
              
              {/* Stat 1: 2 Products */}
              <div className="flex items-center gap-3 py-2 md:py-0 justify-center sm:justify-start">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-sm">
                  <Rocket className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-extrabold text-sm sm:text-base leading-tight">
                    2 Products
                  </div>
                  <div className="text-gray-400 text-[11px] sm:text-xs">
                    In the ecosystem
                  </div>
                </div>
              </div>

              {/* Stat 2: 2 Live */}
              <div className="flex items-center gap-3 py-2 md:py-0 md:pl-6 justify-center sm:justify-start">
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 shadow-sm">
                  <Zap className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <div className="text-white font-extrabold text-sm sm:text-base leading-tight">
                    2 Live
                  </div>
                  <div className="text-gray-400 text-[11px] sm:text-xs">
                    Publicly accessible
                  </div>
                </div>
              </div>

              {/* Stat 3: Privacy-First */}
              <div className="flex items-center gap-3 py-2 md:py-0 md:pl-6 justify-center sm:justify-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-white font-extrabold text-sm sm:text-base leading-tight">
                    Privacy-First
                  </div>
                  <div className="text-gray-400 text-[11px] sm:text-xs">
                    Zero server uploads
                  </div>
                </div>
              </div>

              {/* Stat 4: Free Access */}
              <div className="flex items-center gap-3 py-2 md:py-0 md:pl-6 justify-center sm:justify-start">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-sm">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-white font-extrabold text-sm sm:text-base leading-tight">
                    Free Access
                  </div>
                  <div className="text-gray-400 text-[11px] sm:text-xs">
                    Community friendly
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EcosystemSection;
