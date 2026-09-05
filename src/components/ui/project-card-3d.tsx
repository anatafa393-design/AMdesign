"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Eye, Layers } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ProjectCard3DProps {
  project: any;
  index: number;
  language: string;
  onQuickView: (project: any) => void;
  quickViewLabel: string;
  artboardsLabel: string;
}

// Representative brand palette accents for realistic brand showcase feel
const defaultPalettes: Record<string, string[]> = {
  "nal-aljazeera": ["#00D2FF", "#002B49", "#F3F4F6"],
  "trendana": ["#EC4899", "#8B5CF6", "#1E1B4B"],
  "suroor": ["#D97706", "#78350F", "#FEF3C7"],
  "al-nakhla": ["#10B981", "#064E3B", "#D1FAE5"],
};

export default function ProjectCard3D({
  project,
  index,
  language,
  onQuickView,
  quickViewLabel,
  artboardsLabel,
}: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values for 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [0, 1], [-6, 6]);
  const glareX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const projectNumber = (index + 1).toString().padStart(2, "0");
  const slideCount = project.gallery?.length || 0;
  const brandColors = defaultPalettes[project.id] || ["#FF4500", "#FFA500", "#111827"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45 }}
      className="break-inside-avoid inline-block w-full mb-6 md:mb-8 perspective-[1000px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-[#8E162A]/60 shadow-xl shadow-black/60 transition-all duration-300"
      >
        {/* Dynamic Light Glare Effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 350px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.12), transparent 70%)`,
          }}
        />

        {/* Top Header Strip: Index & Quick View Action */}
        <div className="relative z-30 flex items-center justify-between px-5 pt-4 pb-2">
          {/* Editorial Index Number */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-widest text-[#E8A5B3] bg-[#800020]/20 px-2.5 py-1 rounded-full border border-[#8E162A]/35 backdrop-blur-md">
              [{projectNumber}]
            </span>
            {slideCount > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-white/50 bg-black/40 px-2 py-0.5 rounded-full border border-white/5">
                <Layers className="w-3 h-3 text-[#E8A5B3]" />
                {slideCount} {artboardsLabel}
              </span>
            )}
          </div>

          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(project);
            }}
            title={quickViewLabel}
            aria-label={quickViewLabel}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#8E162A] text-white text-xs font-medium backdrop-blur-md border border-white/15 hover:border-[#8E162A] transition-all duration-300 shadow-md cursor-pointer group/btn"
          >
            <Eye className="w-3.5 h-3.5 transition-transform group-hover/btn:scale-110" />
            <span className="text-[11px] hidden xs:inline">{quickViewLabel}</span>
          </button>
        </div>

        {/* Main Card Link & Image */}
        <Link
          href={`/projects/${project.id}`}
          data-cursor="view"
          className="relative block w-full outline-none"
        >
          <div className="relative overflow-hidden w-full">
            <ImageWithFallback
              src={project.heroImage}
              alt={project.title}
              width={
                (project as any).orientation === "portrait"
                  ? 800
                  : (project as any).orientation === "square"
                  ? 1000
                  : 1200
              }
              height={
                (project as any).orientation === "portrait"
                  ? 1200
                  : (project as any).orientation === "square"
                  ? 1000
                  : 800
              }
              className="w-full h-auto block opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out brightness-[0.98] group-hover:brightness-105"
            />
          </div>

          {/* Gradient Info Overlay */}
          <div className="relative z-20 bg-gradient-to-t from-black via-black/85 to-transparent p-5 sm:p-6 pt-8 flex flex-col justify-end">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-[#E8A5B3] font-semibold text-xs tracking-wider uppercase">
                {project.category}
              </span>

              {/* Brand Color Dots */}
              <div className="flex items-center gap-1.5" title="Brand Colors">
                {brandColors.map((color, i) => (
                  <span
                    key={i}
                    className="w-2.5 h-2.5 rounded-full border border-white/20 shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold flex items-center justify-between text-white font-brand group-hover:text-[#FDE8EC] transition-colors">
              <span className="line-clamp-1">{project.title}</span>
              <span className="shrink-0 p-1.5 rounded-full bg-white/5 group-hover:bg-[#8E162A] text-white/70 group-hover:text-white transition-all duration-300">
                <ArrowUpRight
                  className={`w-4 h-4 transition-transform ${
                    language === "ar"
                      ? "group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 rotate-180"
                      : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  }`}
                />
              </span>
            </h3>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
