"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, Download, ExternalLink, Layers } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ProjectQuickModalProps {
  project: any | null;
  isOpen: boolean;
  onClose: () => void;
  language: string;
  labels: {
    close: string;
    viewCaseStudy: string;
    artboards: string;
  };
}

export default function ProjectQuickModal({
  project,
  isOpen,
  onClose,
  language,
  labels,
}: ProjectQuickModalProps) {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  // Reset slide index whenever a new project is opened
  useEffect(() => {
    if (project) {
      setActiveSlideIdx(0);
    }
  }, [project]);

  // Lock background scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        if (project?.gallery?.length) {
          setActiveSlideIdx((prev) => (prev + 1) % project.gallery.length);
        }
      } else if (e.key === "ArrowLeft") {
        if (project?.gallery?.length) {
          setActiveSlideIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, project]);

  if (!isOpen || !project) return null;

  const gallery = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [{ id: "hero", type: "image", content: project.heroImage }];

  const currentSlide = gallery[activeSlideIdx] || gallery[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-40 cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 26, stiffness: 280 }}
          className="relative z-50 w-full max-w-6xl max-h-[92vh] bg-[#0d0d0d] border border-white/15 rounded-3xl shadow-2xl shadow-black overflow-hidden flex flex-col my-auto"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#800020]/20 border border-[#8E162A]/40 text-[#E8A5B3] text-xs font-semibold uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-brand truncate max-w-xs sm:max-w-md">
                {project.title}
              </h3>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title={labels.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body: Two columns on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 overflow-y-auto flex-1">
            {/* Left: Gallery & Slider (7 columns) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Main Preview Screen */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] bg-black/60 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center group">
                <ImageWithFallback
                  src={currentSlide.content}
                  alt={`${project.title} - Slide ${activeSlideIdx + 1}`}
                  className="w-full h-full object-contain"
                />

                {/* Slider Nav Buttons */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveSlideIdx((prev) => (prev - 1 + gallery.length) % gallery.length)
                      }
                      className="absolute left-3 p-2.5 rounded-full bg-black/60 hover:bg-[#8E162A] text-white border border-white/15 transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveSlideIdx((prev) => (prev + 1) % gallery.length)
                      }
                      className="absolute right-3 p-2.5 rounded-full bg-black/60 hover:bg-[#8E162A] text-white border border-white/15 transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Counter Tag */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white/80 font-mono text-xs">
                  {activeSlideIdx + 1} / {gallery.length}
                </div>
              </div>

              {/* Thumbnails Strip */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20">
                  {gallery.map((item: any, idx: number) => (
                    <button
                      key={item.id || idx}
                      onClick={() => setActiveSlideIdx(idx)}
                      className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                        activeSlideIdx === idx
                          ? "border-[#8E162A] ring-2 ring-[#8E162A]/50 scale-105"
                          : "border-white/15 opacity-50 hover:opacity-100"
                      }`}
                    >
                      <ImageWithFallback
                        src={item.content}
                        alt={`Thumb ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Project Details & Deliverables (5 columns) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#E8A5B3] mb-2">
                    {language === "ar" ? "نبذة عن المشروع" : "Project Overview"}
                  </h4>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed max-h-40 overflow-y-auto pr-1">
                    {project.overview}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                {project.deliverables && project.deliverables.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#E8A5B3]" />
                      {language === "ar" ? "المخرجات والتسليمات" : "Key Deliverables"}
                    </h4>
                    <ul className="space-y-2 max-h-36 overflow-y-auto pr-1">
                      {project.deliverables.slice(0, 5).map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-[#E8A5B3] shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                {project.pdfUrl && (
                  <a
                    href={project.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold transition-colors"
                  >
                    <Download className="w-4 h-4 text-[#E8A5B3]" />
                    <span>{language === "ar" ? "تحميل العرض التقديمي (PDF)" : "Download Brand Presentation (PDF)"}</span>
                  </a>
                )}

                <Link
                  href={`/projects/${project.id}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8E162A] to-[#500A15] hover:from-[#A31D36] hover:to-[#6B0D1C] text-white font-bold text-sm shadow-lg shadow-[#8E162A]/30 transition-all group"
                >
                  <span>{labels.viewCaseStudy}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${language === "ar" ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
