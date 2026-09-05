"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { ArrowUpRight, Eye, Layers } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ProjectListEditorialProps {
  projects: any[];
  language: string;
  onQuickView: (project: any) => void;
  quickViewLabel: string;
  viewCaseLabel: string;
  artboardsLabel: string;
}

export default function ProjectListEditorial({
  projects,
  language,
  onQuickView,
  quickViewLabel,
  viewCaseLabel,
  artboardsLabel,
}: ProjectListEditorialProps) {
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse follow physics for floating preview
  const mouseX = useSpring(0, { damping: 22, stiffness: 200, mass: 0.5 });
  const mouseY = useSpring(0, { damping: 22, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full py-4">
      {/* Editorial Table-like List */}
      <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
        {projects.map((project, index) => {
          const projectNum = (index + 1).toString().padStart(2, "0");
          const slideCount = project.gallery?.length || 0;
          const isCurrentActive = activeProject?.id === project.id;

          return (
            <div
              key={project.id}
              onMouseEnter={() => setActiveProject(project)}
              onMouseLeave={() => setActiveProject(null)}
              className={`group relative flex flex-col md:flex-row items-start md:items-center justify-between py-6 md:py-8 px-4 sm:px-6 transition-all duration-300 ${
                isCurrentActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
              }`}
            >
              {/* Left / Start: Index, Title & Category */}
              <div className="flex items-center gap-4 sm:gap-8 flex-1 min-w-0">
                {/* Monospace Index Number */}
                <span className="font-mono text-sm sm:text-base font-bold text-[#E8A5B3] group-hover:text-white group-hover:scale-110 transition-all shrink-0">
                  {projectNum}
                </span>

                {/* Title & Mobile Category */}
                <div className="flex flex-col min-w-0">
                  <Link
                    href={`/projects/${project.id}`}
                    data-cursor="view"
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-brand text-white group-hover:text-[#E8A5B3] transition-colors truncate"
                  >
                    {project.title}
                  </Link>
                  <div className="flex md:hidden items-center gap-2 mt-1">
                    <span className="text-xs text-[#E8A5B3] font-medium">
                      {project.category}
                    </span>
                    {slideCount > 0 && (
                      <span className="text-[10px] text-white/40">
                        • {slideCount} {artboardsLabel}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Center (Desktop only): Category & Artboards Pill */}
              <div className="hidden md:flex items-center gap-4 px-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/60 group-hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  {project.category}
                </span>
                {slideCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/40 font-mono">
                    <Layers className="w-3.5 h-3.5 text-[#E8A5B3]" />
                    {slideCount} {artboardsLabel}
                  </span>
                )}
              </div>

              {/* Right / End: Actions */}
              <div className="flex items-center gap-3 mt-4 md:mt-0 shrink-0 self-end md:self-auto">
                {/* Quick View Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onQuickView(project);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#8E162A] text-white text-xs font-medium border border-white/15 hover:border-[#8E162A] transition-all duration-300 cursor-pointer shadow-md"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{quickViewLabel}</span>
                </button>

                {/* Direct Link to Project */}
                <Link
                  href={`/projects/${project.id}`}
                  data-cursor="view"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300"
                >
                  <ArrowUpRight
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                      language === "ar"
                        ? "group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 rotate-180"
                        : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    }`}
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Magnetic Image Preview (Desktop Only) */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="hidden lg:block fixed z-40 pointer-events-none overflow-hidden rounded-2xl border border-white/20 shadow-2xl shadow-black/80 bg-[#111]"
            style={{
              width: 320,
              height: 220,
              left: mouseX,
              top: mouseY,
              transform: "translate(30px, -50%)",
            }}
          >
            <div className="relative w-full h-full">
              <ImageWithFallback
                src={activeProject.heroImage}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[11px] font-semibold text-[#E8A5B3] uppercase tracking-wider">
                  {activeProject.category}
                </span>
                <span className="text-sm font-bold text-white truncate font-brand">
                  {activeProject.title}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
