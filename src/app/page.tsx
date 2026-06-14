"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { renderCanvas } from "@/components/ui/canvas";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import dynamic from "next/dynamic";
import ImageTicker from "@/components/ui/ImageTicker";
import MagneticButton from "@/components/ui/magnetic-button";
import Reveal from "@/components/ui/reveal-on-scroll";
import TextReveal from "@/components/ui/text-reveal";
import {
  ArrowRight,
  Sparkles,
  ArrowUpRight,
  Layers,
  Palette,
  Globe,
  Package,
  Camera,
  PenTool,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialsSection = dynamic(
  () =>
    import("@/components/ui/testimonial-cards").then(
      (mod) => mod.TestimonialsSection
    ),
  { ssr: false }
);
const ContactSection = dynamic(
  () =>
    import("@/components/ui/contact-section").then(
      (mod) => mod.ContactSection
    ),
  { ssr: false }
);

const clientLogos = Array.from(
  { length: 15 },
  (_, i) => `/logos/Artboard ${i + 16}@0.5x.png`
);

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Visual Identity",
    "Packaging Design",
    "Social Media Design",
    "Photoshoots",
  ];

  const getNormalizedCategory = (category: string) => {
    const cat = category.toLowerCase();
    if (
      cat.includes("branding") ||
      cat.includes("identity") ||
      cat.includes("logo") ||
      cat.includes("visual")
    ) {
      return "Visual Identity";
    }
    if (cat.includes("packaging")) {
      return "Packaging Design";
    }
    if (cat.includes("social")) {
      return "Social Media Design";
    }
    if (cat.includes("photoshoot")) {
      return "Photoshoots";
    }
    return category;
  };

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter(
          (p) => getNormalizedCategory(p.category) === selectedCategory
        );

  useEffect(() => {
    fetch(`/api/projects?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch((err) => console.error("Failed to fetch projects", err));
  }, []);

  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <div className="relative bg-[#050505] text-white selection:bg-orange-500/30 selection:text-white font-sans min-h-screen overflow-x-hidden">
      {/* Background Canvas */}
      <canvas
        className="pointer-events-none fixed inset-0 z-0 w-full h-full opacity-30"
        id="canvas"
      />

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative w-full min-h-screen flex flex-col justify-center bg-gradient-to-b from-[#ff3c00] via-[#c41400] to-[#050505] pt-28 pb-16 px-6 md:px-10 overflow-hidden z-10">
        {/* Giant background text */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-[18vw] font-black uppercase text-transparent tracking-tighter"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}
          >
            DESIGN
          </motion.span>
        </div>

        {/* Floating particles (decorative) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/20"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Hero Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16 flex-1">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-start gap-8"
          >
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-orange-300" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/80">
                Premium Brand Design
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white font-brand">
              Crafting Visual
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-white/80">
                Excellence
              </span>
              <br />
              That Speaks.
            </h1>

            <p className="text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Professional brand strategy, modern interfaces, premium packaging,
              and digital designs that captivate audiences and elevate
              businesses.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <MagneticButton>
                <Link
                  href="#projects"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold tracking-wider text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] uppercase"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 sm:flex sm:items-center sm:gap-6 mt-4 w-full">
              <div className="text-center sm:text-left">
                <span className="block text-2xl sm:text-3xl font-black font-brand text-white">
                  10+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-white/50">
                  Premium Brands
                </span>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/20" />
              <div className="text-center sm:text-left">
                <span className="block text-2xl sm:text-3xl font-black font-brand text-white">
                  100%
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-white/50">
                  Satisfaction
                </span>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/20" />
              <div className="text-center sm:text-left">
                <span className="block text-2xl sm:text-3xl font-black font-brand text-white">
                  52+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-white/50">
                  Projects Done
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center items-center relative"
          >
            {/* Decorative rings */}
            <div className="absolute w-[80%] aspect-square rounded-full border border-white/10 animate-[spin_30s_linear_infinite]" />
            <div className="absolute w-[60%] aspect-square rounded-full border border-white/5 animate-[spin_20s_linear_infinite_reverse]" />

            <div className="relative h-[50vh] lg:h-[65vh] w-full flex justify-center">
              <ImageWithFallback
                src="/profile.png"
                className="h-full w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10"
                alt="Ahmed Aljamal - Brand Designer"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-widest text-white/40">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 rounded-full bg-white/60"
              animate={{ y: [0, 8], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══ CLIENT LOGOS MARQUEE ═══ */}
      <section className="relative z-10 bg-[#050505] py-12 border-y border-white/5 overflow-hidden">
        <div className="flex">
          <div className="flex shrink-0 items-center animate-marquee">
            {clientLogos.map((src, i) => (
              <div
                key={`a-${i}`}
                className="flex items-center justify-center w-24 md:w-32 h-12 mx-8 md:mx-12 opacity-20 hover:opacity-80 hover:scale-110 transition-all duration-500 shrink-0"
              >
                <ImageWithFallback
                  src={encodeURI(src)}
                  className="w-full h-full object-contain filter brightness-0 invert"
                  alt={`Client ${i + 1}`}
                />
              </div>
            ))}
          </div>
          <div
            className="flex shrink-0 items-center animate-marquee"
            aria-hidden="true"
          >
            {clientLogos.map((src, i) => (
              <div
                key={`b-${i}`}
                className="flex items-center justify-center w-24 md:w-32 h-12 mx-8 md:mx-12 opacity-20 hover:opacity-80 hover:scale-110 transition-all duration-500 shrink-0"
              >
                <ImageWithFallback
                  src={encodeURI(src)}
                  className="w-full h-full object-contain filter brightness-0 invert"
                  alt={`Client ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT / VALUE PROPOSITION ═══ */}
      <section className="relative z-10 bg-[#050505] py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <Reveal className="text-center mb-20">
            <p className="text-orange-400 font-semibold mb-4 tracking-widest text-sm uppercase">
              Why Choose Me
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-brand text-white">
              <TextReveal text="Helping Businesses Reach New Heights" />
            </h2>
          </Reveal>

          {/* Feature cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Layers,
                title: "End-to-End",
                desc: "Complete brand lifecycle management from concept to final deliverables.",
              },
              {
                icon: Palette,
                title: "Pixel Perfect",
                desc: "Every design is crafted with meticulous attention to detail and consistency.",
              },
              {
                icon: Globe,
                title: "Global Standards",
                desc: "Designs that meet international quality standards and best practices.",
              },
            ].map((feat, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div className="group p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feat.icon className="w-7 h-7 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Featured projects mini row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden aspect-[16/10] group bg-neutral-900 border border-white/5">
                <ImageWithFallback
                  src="/project-1-cover.jpg"
                  alt="Branding Project"
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-orange-400 mb-2">
                    Visual Strategy
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    Product Identity Rebuild
                  </h4>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden aspect-[16/10] group bg-neutral-900 border border-white/5">
                <ImageWithFallback
                  src="/project-2-cover.jpg"
                  alt="Digital Design"
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-orange-400 mb-2">
                    Interactive Design
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    Digital Presence Strategy
                  </h4>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES SECTION ═══ */}
      <section id="services" className="relative z-10 py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-20">
            <p className="text-orange-400 font-semibold mb-4 tracking-widest text-sm uppercase">
              What I Offer
            </p>
            <h2 className="text-4xl md:text-6xl font-bold font-brand">
              From{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                A
              </span>{" "}
              to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
                Z
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mt-6">
              You don&apos;t need multiple agencies. I handle your entire brand
              lifecycle.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: PenTool,
                title: "Visual Identity",
                desc: "Logos, colors, and typography that make you stand out.",
                image: "/project-1-cover.jpg",
                overlayImage: "/project-1-cover.jpg",
                targetCategory: "Visual Identity",
              },
              {
                icon: Globe,
                title: "Website Building",
                desc: "Immersive, high-performance websites that convert visitors.",
                image: "/website-building-service.png",
                overlayImage: "/website-building-service.png",
                targetCategory: "Visual Identity",
              },
              {
                icon: Package,
                title: "Product Packaging",
                desc: "Packaging that reflects premium quality and attracts consumers.",
                image: "/packaging/1/2.jpg",
                overlayImage: "/packaging/1/2.jpg",
                targetCategory: "Packaging Design",
              },
              {
                icon: Camera,
                title: "Photoshoots",
                desc: "Professional photography showcasing your products and services.",
                image: "/photoshoots/1/chatgpt-image-may-24-2026-02-45-42-pm.png",
                overlayImage: "/photoshoots/1/chatgpt-image-may-24-2026-02-45-42-pm.png",
                targetCategory: "Photoshoots",
              },
              {
                icon: Palette,
                title: "Social Media Designs",
                desc: "Engaging visual content for social platforms.",
                image: "/social-media/1/chatgpt-image-may-22-2026-05-29-10-pm.png",
                overlayImage: "/social-media/1/chatgpt-image-may-22-2026-05-29-10-pm.png",
                targetCategory: "Social Media Design",
              },
              {
                icon: BookOpen,
                title: "Company Profile Design",
                desc: "Comprehensive and professional company profiles that tell your brand's story.",
                image: "/company-profile-design.png",
                overlayImage: "/company-profile-design.png",
                targetCategory: "Visual Identity",
              },
            ].map((service, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div 
                  onClick={() => {
                    setSelectedCategory(service.targetCategory);
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  role="button"
                  tabIndex={0}
                  className="group relative bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 md:p-8 flex flex-col transition-all duration-500 hover:bg-white/[0.06] hover:border-white/10 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(255,60,0,0.15)] overflow-hidden h-full cursor-pointer text-left"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/10 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 md:w-7 md:h-7 text-orange-400" />
                  </div>

                  {/* Image preview */}
                  <div className="relative flex items-center justify-center mb-4 md:mb-6 h-32 md:h-40">
                    <ImageWithFallback
                      src={service.image}
                      alt={`${service.title} showcase`}
                      className="absolute w-28 md:w-36 h-auto rounded-xl shadow-md transform -rotate-6 transition-transform duration-500 group-hover:rotate-[-10deg] group-hover:scale-110 object-cover"
                      style={{ aspectRatio: "4/3" }}
                    />
                    <ImageWithFallback
                      src={service.overlayImage}
                      alt={`${service.title} example`}
                      className="absolute w-28 md:w-36 h-auto rounded-xl shadow-2xl transform rotate-3 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110 object-cover"
                      style={{ aspectRatio: "4/3" }}
                    />
                  </div>

                  {/* Text */}
                  <div className="relative z-10 mt-auto">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IMAGE TICKER ═══ */}
      <section className="relative z-10 py-4 overflow-hidden">
        <ImageTicker />
      </section>

      {/* ═══ PROJECTS SECTION ═══ */}
      <section id="projects" className="relative z-10 py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-orange-400 font-semibold mb-4 tracking-widest text-sm uppercase">
              Portfolio
            </p>
            <h2 className="text-4xl md:text-6xl font-bold font-brand">
              <TextReveal text="Selected Work" />
            </h2>
          </Reveal>

          {/* Category filter tabs */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-16">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabHighlight"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-full -z-10 shadow-[0_0_25px_rgba(255,60,0,0.4)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Projects masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={project.id}
                    className="break-inside-avoid inline-block w-full mb-8 group relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/[0.06]"
                  >
                    <Link
                      href={`/projects/${project.id}`}
                      className="relative block w-full"
                    >
                      <ImageWithFallback
                        src={project.heroImage}
                        alt={project.title}
                        width={(project as any).orientation === 'portrait' ? 800 : (project as any).orientation === 'square' ? 1000 : 1200}
                        height={(project as any).orientation === 'portrait' ? 1200 : (project as any).orientation === 'square' ? 1000 : 800}
                        className="w-full h-auto block opacity-85 md:opacity-50 group-hover:opacity-95 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10 translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="text-orange-400 font-medium text-xs md:text-sm mb-2">
                          {project.category}
                        </div>
                        <h3 className="text-xl md:text-3xl font-bold flex items-center justify-between text-white">
                          {project.title}
                          <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 opacity-100 md:opacity-0 -translate-x-0 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100" />
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <TestimonialsSection />

      {/* ═══ CONTACT ═══ */}
      <ContactSection />
    </div>
  );
}
