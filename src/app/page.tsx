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
import { useLanguage } from "@/context/LanguageContext";
import { trackPixelEvent } from "@/components/MetaPixel";
import initialProjects from "@/data/projects.json";
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
  LayoutGrid,
  List,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard3D from "@/components/ui/project-card-3d";
import ProjectListEditorial from "@/components/ui/project-list-editorial";
import ProjectQuickModal from "@/components/ui/project-quick-modal";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import Hero3DOrbit from "@/components/ui/hero-3d-orbit";
import WhyChooseMeCards from "@/components/ui/why-choose-me-cards";

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
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<any[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [quickViewProject, setQuickViewProject] = useState<any | null>(null);

  const categoriesMap: Record<string, { en: string; ar: string }> = {
    All: { en: t.portfolio.categories.all, ar: t.portfolio.categories.all },
    "Visual Identity": { en: t.portfolio.categories.visualIdentity, ar: t.portfolio.categories.visualIdentity },
    "Packaging Design": { en: t.portfolio.categories.packagingDesign, ar: t.portfolio.categories.packagingDesign },
    "Social Media Design": { en: t.portfolio.categories.socialMedia, ar: t.portfolio.categories.socialMedia },
    Photoshoots: { en: t.portfolio.categories.photoshoots, ar: t.portfolio.categories.photoshoots },
  };

  const categories = Object.keys(categoriesMap);

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
    <div className="relative bg-[#080406] text-white selection:bg-[#800020]/40 selection:text-white font-sans min-h-screen overflow-x-hidden">
      {/* Background Canvas */}
      <canvas
        className="pointer-events-none fixed inset-0 z-0 w-full h-full opacity-20"
        id="canvas"
      />

      {/* ═══ HERO SECTION (LUXURY BURGUNDY PALETTE) ═══ */}
      <section className="relative w-full min-h-screen flex flex-col justify-center bg-gradient-to-b from-[#4A0E17] via-[#24060B] to-[#080406] pt-28 pb-12 md:pt-32 md:pb-20 px-6 md:px-10 overflow-hidden z-10">
        {/* Giant background typography watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none" dir="ltr">
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-[19vw] font-black uppercase text-transparent tracking-tighter font-brand-en"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
          >
            DESIGN
          </motion.span>
        </div>

        {/* Hero Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14 flex-1">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start gap-6 md:gap-8"
          >
            {/* Clean Confident Strategic Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white font-brand">
              <span>{language === "ar" ? "نبني" : "We Architect"}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDE8EC] via-white to-[#E8A5B3] block mt-1.5">
                <AnimatedTextCycle
                  words={(t.hero as any).cycleWords || [
                    "هويات قيادية تتصدر السوق",
                    "سلطة بصرية لا تُنافس",
                    "قيمة تجارية مضاعفة",
                    "أصولاً بصرية ذات أثر دائم"
                  ]}
                  interval={3200}
                  className="text-white"
                />
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              {t.hero.description}
            </p>

            <div className="flex items-center gap-3 md:gap-4 flex-wrap">
              <MagneticButton>
                <Link
                  href="#projects"
                  onClick={() => trackPixelEvent('ViewContent', { content_name: 'Hero View Work' })}
                  className="group inline-flex items-center gap-2.5 md:gap-3 px-6 md:px-8 py-3.5 md:py-4 rounded-full bg-white text-black font-bold tracking-wider text-xs md:text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(128,0,32,0.45)] uppercase"
                >
                  {t.hero.viewWork}
                  <ArrowRight className={`w-4 h-4 transition-transform ${language === "ar" ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} />
                </Link>
              </MagneticButton>
              <Link
                href="#contact"
                onClick={() => trackPixelEvent('Contact', { method: 'hero_get_in_touch' })}
                className="inline-flex items-center gap-2 px-5 md:px-6 py-3.5 md:py-4 rounded-full border border-white/20 text-white font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
              >
                {t.hero.getInTouch}
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 sm:flex sm:items-center sm:gap-6 mt-2 md:mt-4 w-full">
              <div className="text-center sm:text-start">
                <span className="block text-2xl sm:text-3xl font-black font-brand text-white">
                  10+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-white/50">
                  {t.hero.stats.brands}
                </span>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/15" />
              <div className="text-center sm:text-start">
                <span className="block text-2xl sm:text-3xl font-black font-brand text-white">
                  100%
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-white/50">
                  {t.hero.stats.satisfaction}
                </span>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/15" />
              <div className="text-center sm:text-start">
                <span className="block text-2xl sm:text-3xl font-black font-brand text-white">
                  52+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-white/50">
                  {t.hero.stats.projects}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: 3D Design Tools Orbit around Portrait */}
          <div className="flex justify-center items-center relative mt-6 lg:mt-0 w-full">
            <Hero3DOrbit />
          </div>
        </div>
      </section>

      {/* ═══ CLIENT LOGOS MARQUEE ═══ */}
      <section className="relative z-10 bg-[#050505] py-6 md:py-12 border-y border-white/5 overflow-hidden" dir="ltr" style={{ direction: "ltr" }}>
        <div className="flex">
          <div className="flex shrink-0 items-center animate-marquee">
            {clientLogos.map((src, i) => (
              <div
                key={`a-${i}`}
                className="flex items-center justify-center w-24 md:w-32 h-12 mx-6 md:mx-12 opacity-20 hover:opacity-80 hover:scale-110 transition-all duration-500 shrink-0"
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
                className="flex items-center justify-center w-24 md:w-32 h-12 mx-6 md:mx-12 opacity-20 hover:opacity-80 hover:scale-110 transition-all duration-500 shrink-0"
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
      <section className="relative z-10 bg-[#050505] py-14 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <Reveal className="text-center mb-10 md:mb-16">
            <p className="text-[#E8A5B3] font-semibold mb-2 md:mb-4 tracking-widest text-xs md:text-sm uppercase">
              {t.whyMe.subtitle}
            </p>
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight font-brand text-white">
              <TextReveal text={t.whyMe.title} />
            </h2>
          </Reveal>

          {/* Interactive Micro-Craft Cards */}
          <Reveal delay={0.2}>
            <WhyChooseMeCards />
          </Reveal>
        </div>
      </section>

      {/* ═══ SERVICES SECTION ═══ */}
      <section id="services" className="relative z-10 py-14 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-8 md:mb-20">
            <p className="text-[#E8A5B3] font-semibold mb-2 md:mb-4 tracking-widest text-xs md:text-sm uppercase">
              {t.services.badge}
            </p>
            <h2 className="text-3xl md:text-6xl font-bold font-brand">
              {t.services.title}
            </h2>
            <p className="text-white/50 text-sm md:text-lg max-w-2xl mx-auto mt-3 md:mt-6">
              {t.services.subtitle}
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {[
              {
                icon: PenTool,
                title: t.services.items.visualIdentity.title,
                desc: t.services.items.visualIdentity.description,
                image: "/project-1-cover.jpg",
                overlayImage: "/project-1-cover.jpg",
                targetCategory: "Visual Identity",
              },
              {
                icon: Globe,
                title: t.services.items.websiteBuilding.title,
                desc: t.services.items.websiteBuilding.description,
                image: "/website-building-service.png",
                overlayImage: "/website-building-service.png",
                targetCategory: "Visual Identity",
              },
              {
                icon: Package,
                title: t.services.items.productPackaging.title,
                desc: t.services.items.productPackaging.description,
                image: "/packaging/1/2.jpg",
                overlayImage: "/packaging/1/2.jpg",
                targetCategory: "Packaging Design",
              },
              {
                icon: Camera,
                title: t.services.items.photoshoots.title,
                desc: t.services.items.photoshoots.description,
                image: "/photoshoots/1/chatgpt-image-may-24-2026-02-45-42-pm.png",
                overlayImage: "/photoshoots/1/chatgpt-image-may-24-2026-02-45-42-pm.png",
                targetCategory: "Photoshoots",
              },
              {
                icon: Palette,
                title: t.services.items.socialMedia.title,
                desc: t.services.items.socialMedia.description,
                image: "/social-media/1/chatgpt-image-may-22-2026-05-29-10-pm.png",
                overlayImage: "/social-media/1/chatgpt-image-may-22-2026-05-29-10-pm.png",
                targetCategory: "Social Media Design",
              },
              {
                icon: BookOpen,
                title: t.services.items.companyProfile.title,
                desc: t.services.items.companyProfile.description,
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
                  className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col justify-between transition-all duration-500 hover:bg-white/[0.06] hover:border-white/10 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-15px_rgba(128,0,32,0.3)] overflow-hidden h-full cursor-pointer text-start"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#800020]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#800020]/25 to-[#4A0E17]/10 flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-[#E8A5B3]" />
                  </div>

                  {/* Image preview (desktop only to prevent mobile scroll bloat) */}
                  <div className="hidden md:flex relative items-center justify-center mb-4 md:mb-6 h-32 md:h-40">
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
                    <h3 className="text-sm sm:text-base md:text-xl font-bold text-white mb-1 md:mb-3 font-brand">
                      {service.title}
                    </h3>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
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
      <section className="relative z-10 py-4 overflow-hidden" dir="ltr">
        <ImageTicker />
      </section>

      {/* ═══ PROJECTS SECTION ═══ */}
      <section id="projects" className="relative z-10 py-14 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-8 md:mb-16">
            <p className="text-[#E8A5B3] font-semibold mb-2 md:mb-4 tracking-widest text-xs md:text-sm uppercase">
              {t.portfolio.badge}
            </p>
            <h2 className="text-3xl md:text-6xl font-bold font-brand">
              <TextReveal text={t.portfolio.title} />
            </h2>
          </Reveal>

          {/* Control Bar: Categories Filter & View Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 mb-8 md:mb-14">
            {/* Category filter tabs */}
            <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2">
              {categories.map((catKey) => {
                const label = categoriesMap[catKey]?.[language] || catKey;
                const isActive = selectedCategory === catKey;
                return (
                  <button
                    key={catKey}
                    onClick={() => setSelectedCategory(catKey)}
                    className={`relative px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "text-white"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabHighlight"
                        className="absolute inset-0 bg-gradient-to-r from-[#8E162A] to-[#4A0E17] rounded-full -z-10 shadow-[0_0_25px_rgba(142,22,42,0.45)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {label}
                  </button>
                );
              })}
            </div>

            {/* View Mode Switcher (Grid vs Editorial List) */}
            <div className="flex items-center bg-white/[0.04] p-1 rounded-full border border-white/10 backdrop-blur-md shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-[#8E162A] to-[#4A0E17] text-white shadow-[0_0_15px_rgba(142,22,42,0.35)]"
                    : "text-white/50 hover:text-white"
                }`}
                title={(t.portfolio as any).gridView || "Grid View"}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{(t.portfolio as any).gridView || "Grid View"}</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-[#8E162A] to-[#4A0E17] text-white shadow-[0_0_15px_rgba(142,22,42,0.35)]"
                    : "text-white/50 hover:text-white"
                }`}
                title={(t.portfolio as any).listView || "Editorial List"}
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{(t.portfolio as any).listView || "Editorial List"}</span>
              </button>
            </div>
          </div>

          {/* Dynamic Showcase Container */}
          {viewMode === "grid" ? (
            /* 3D Tilt Masonry Grid */
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard3D
                    key={project.id}
                    project={project}
                    index={index}
                    language={language}
                    onQuickView={(p) => setQuickViewProject(p)}
                    quickViewLabel={(t.portfolio as any).quickView || "Quick View"}
                    artboardsLabel={(t.portfolio as any).artboards || "Artboards"}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* Interactive Editorial List View */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <ProjectListEditorial
                projects={filteredProjects}
                language={language}
                onQuickView={(p) => setQuickViewProject(p)}
                quickViewLabel={(t.portfolio as any).quickView || "Quick View"}
                viewCaseLabel={(t.portfolio as any).viewCaseStudy || "Full Case Study"}
                artboardsLabel={(t.portfolio as any).artboards || "Artboards"}
              />
            </motion.div>
          )}

          {/* Quick View Modal Popup */}
          <ProjectQuickModal
            isOpen={!!quickViewProject}
            project={quickViewProject}
            onClose={() => setQuickViewProject(null)}
            language={language}
            labels={{
              close: (t.portfolio as any).close || "Close",
              viewCaseStudy: (t.portfolio as any).viewCaseStudy || "Full Case Study",
              artboards: (t.portfolio as any).artboards || "Artboards",
            }}
          />
        </div>
      </section>

      {/* ═══ TESTIMONIALS SECTION ═══ */}
      <TestimonialsSection />

      {/* ═══ CONTACT SECTION ═══ */}
      <ContactSection />
    </div>
  );
}
