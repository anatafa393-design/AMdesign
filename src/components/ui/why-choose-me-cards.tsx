"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Palette, Globe, CheckCircle2, Sparkles, Compass, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyChooseMeCards() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  // Card 1 state: active step in lifecycle
  const [activeStep, setActiveStep] = useState<number>(3); // default all 4 highlighted

  // Card 2 state: interactive grid hover
  const [gridHovered, setGridHovered] = useState<boolean>(false);

  // Card 3 state: active badge filter
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null);

  // 1. Lifecycle Steps for Card 1
  const lifecycleSteps = isAr
    ? [
        { id: 1, title: "الفكرة", code: "01" },
        { id: 2, title: "الهندسة والنسب", code: "02" },
        { id: 3, title: "التطبيقات والـ 3D", code: "03" },
        { id: 4, title: "كتيب الهوية", code: "04" },
      ]
    : [
        { id: 1, title: "Strategy", code: "01" },
        { id: 2, title: "Grid & Golden Ratio", code: "02" },
        { id: 3, title: "3D & Collateral", code: "03" },
        { id: 4, title: "Brand Guidelines", code: "04" },
      ];

  // 3. Global Quality Standards for Card 3
  const standards = isAr
    ? [
        { id: 1, label: "مطابقة Pantone® و CMYK", sub: "دقة لونية معتمدة للطباعة" },
        { id: 2, label: "فيكتور 100% قابل للتمدد", sub: "ملفات SVG و EPS و AI" },
        { id: 3, label: "جاهز للمطابع 300+ DPI", sub: "معايير ISO الأوروبية والخليجية" },
        { id: 4, label: "أصول رقمية لشاشات Retina", sub: "تصدير دقيق للويب والتطبيقات" },
      ]
    : [
        { id: 1, label: "Pantone® & CMYK Matched", sub: "Certified Print Color Accuracy" },
        { id: 2, label: "100% Scalable Vector", sub: "Pure SVG, EPS & Source Files" },
        { id: 3, label: "Press-Ready 300+ DPI", sub: "FOGRA39 & Global Print Specs" },
        { id: 4, label: "Retina Digital Tokens", sub: "Engineered for Web & Mobile UI" },
      ];

  return (
    <div className="relative">
      {/* Mobile Swipe Hint */}
      <div className="flex lg:hidden items-center justify-between text-[11px] font-mono text-white/50 mb-3 px-1">
        <span className="text-[#E8A5B3] font-semibold">{isAr ? "← اسحب لاستعراض الميزات" : "Swipe to explore →"}</span>
        <span>1 / 3</span>
      </div>

      <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory gap-4 sm:gap-6 pb-4 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
        {/* ══════════════════════════════════════════════════════════
            CARD 1: END-TO-END LIFECYCLE (من الفكرة حتى التسليم الكامل)
        ══════════════════════════════════════════════════════════ */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="w-[86vw] sm:w-[380px] lg:w-auto shrink-0 snap-center group relative p-5 sm:p-8 rounded-3xl bg-[#090507]/90 border border-white/10 hover:border-[#8E162A]/50 transition-colors shadow-2xl shadow-black/80 flex flex-col justify-between overflow-hidden"
        >
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#800020]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#800020]/35 transition-all duration-500" />

        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#800020] to-[#500A15] border border-[#E8A5B3]/30 flex items-center justify-center shadow-lg shadow-[#800020]/30">
              <Layers className="w-6 h-6 text-[#E8A5B3]" />
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#E8A5B3] bg-[#800020]/20 border border-[#8E162A]/40 uppercase">
              {isAr ? "دورة حياة متكاملة" : "Full Lifecycle"}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 font-brand">
            {isAr ? "تنفيذ شامل من الفكرة للتسليم" : "End-to-End Execution"}
          </h3>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6">
            {isAr
              ? "لا نتوقف عند رسم الشعار، بل نبني منظومة متكاملة تبدأ من دراسة الهوية وصولاً لتسليم أدلة الاستخدام والملفات التنفيذية."
              : "We don’t just design logos; we build complete visual architectures from initial strategic discovery to press-ready guidelines."}
          </p>
        </div>

        {/* ── Interactive Lifecycle Widget ── */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-3">
            <span>{isAr ? "مراحل رحلة المشروع:" : "Project Workflow:"}</span>
            <span className="text-[#E8A5B3] font-bold">100% {isAr ? "تسليم معتمد" : "Delivered"}</span>
          </div>

          {/* Stepper Progress Bar */}
          <div className="relative mb-4">
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#800020] via-[#8E162A] to-[#E8A5B3] transition-all duration-500 rounded-full"
                style={{ width: `${((activeStep + 1) / lifecycleSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Stepper Interactive Nodes */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {lifecycleSteps.map((step, idx) => {
              const isPassed = idx <= activeStep;
              return (
                <button
                  key={step.id}
                  type="button"
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`flex flex-col items-center text-center p-2 rounded-xl transition-all duration-300 border ${
                    isPassed
                      ? "bg-[#800020]/25 border-[#8E162A]/50 text-white shadow-sm"
                      : "bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/[0.05]"
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold mb-0.5 ${isPassed ? "text-[#E8A5B3]" : "text-white/30"}`}>
                    {step.code}
                  </span>
                  <span className="text-[10px] font-medium leading-tight line-clamp-1">
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          CARD 2: PIXEL-PERFECT PRECISION (الدقة الهندسية والنسبة الذهبية)
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setGridHovered(true)}
        onMouseLeave={() => setGridHovered(false)}
        className="w-[86vw] sm:w-[380px] lg:w-auto shrink-0 snap-center group relative p-5 sm:p-8 rounded-3xl bg-[#090507]/90 border border-white/10 hover:border-[#8E162A]/50 transition-colors shadow-2xl shadow-black/80 flex flex-col justify-between overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[#800020]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#800020]/35 transition-all duration-500" />

        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#800020] to-[#500A15] border border-[#E8A5B3]/30 flex items-center justify-center shadow-lg shadow-[#800020]/30">
              <Compass className="w-6 h-6 text-[#E8A5B3]" />
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#E8A5B3] bg-[#800020]/20 border border-[#8E162A]/40 uppercase">
              φ 1.618 {isAr ? "النسبة الذهبية" : "Golden Ratio"}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 font-brand">
            {isAr ? "دقة هندسية متناهية" : "Pixel-Perfect Precision"}
          </h3>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4">
            {isAr
              ? "نبني العناصر البصرية على شبكات هندسية دقيقة وأقواس متوازنة تمنح العلامة وقاراً وهيبة تدوم لعقود."
              : "Every stroke and curvature is rooted in mathematical geometry and golden ratio grids, ensuring eternal balance and optical harmony."}
          </p>
        </div>

        {/* ── Interactive Geometric Blueprint Widget ── */}
        <div className="relative h-32 sm:h-36 w-full rounded-2xl bg-[#040203] border border-white/10 overflow-hidden flex items-center justify-center p-3 select-none">
          {/* Subtle architectural dot grid background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(rgba(232, 165, 179, 0.4) 1px, transparent 1px)",
              backgroundSize: "14px 14px"
            }}
          />

          {/* Animated SVG Golden Geometry */}
          <svg viewBox="0 0 240 120" className="w-full h-full relative z-10 overflow-visible">
            {/* Horizontal & Vertical Crosshair Lines */}
            <line 
              x1="0" y1="60" x2="240" y2="60" 
              stroke="rgba(255,255,255,0.15)" 
              strokeDasharray="3 3" 
            />
            <line 
              x1="120" y1="0" x2="120" y2="120" 
              stroke="rgba(255,255,255,0.15)" 
              strokeDasharray="3 3" 
            />

            {/* Tangent diagonals */}
            <line 
              x1="30" y1="100" x2="210" y2="20" 
              stroke="rgba(232, 165, 179, 0.25)" 
              strokeWidth="1" 
              strokeDasharray={gridHovered ? "0" : "4 4"}
              className="transition-all duration-500"
            />

            {/* Outer Golden Ratio Circle */}
            <circle 
              cx="120" cy="60" r="48" 
              fill="none" 
              stroke={gridHovered ? "#E8A5B3" : "rgba(142, 22, 42, 0.6)"} 
              strokeWidth={gridHovered ? "2" : "1.5"}
              className="transition-colors duration-300"
            />

            {/* Mid Golden Circle */}
            <circle 
              cx="120" cy="60" r="30" 
              fill="rgba(128, 0, 32, 0.12)" 
              stroke="#8E162A" 
              strokeWidth="1.5" 
            />

            {/* Core Tangent Circle */}
            <circle 
              cx="138" cy="60" r="18" 
              fill="none" 
              stroke="rgba(212, 175, 55, 0.6)" 
              strokeWidth="1" 
              strokeDasharray="2 2"
            />

            {/* Vector Nodes / Anchors */}
            <circle cx="72" cy="60" r="3" fill="#E8A5B3" className="animate-ping opacity-75" />
            <circle cx="72" cy="60" r="3.5" fill="#E8A5B3" />
            <circle cx="168" cy="60" r="3.5" fill="#E8A5B3" />
            <circle cx="120" cy="12" r="3.5" fill="#D4AF37" />
            <circle cx="120" cy="108" r="3.5" fill="#D4AF37" />

            {/* Dynamic Coordinates Overlay */}
            <text x="14" y="22" fill="#E8A5B3" fontSize="8" fontFamily="monospace" opacity="0.8">
              {gridHovered ? "GRID: LOCKED (0.001mm)" : "PRECISION: ACTIVE"}
            </text>
            <text x="14" y="34" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">
              {gridHovered ? "φ = 1.6180339887" : "BEZIER CURVE: 100%"}
            </text>
          </svg>

          {/* Bottom badge */}
          <div className="absolute bottom-2 right-3 left-3 flex justify-between items-center text-[9px] font-mono text-white/50 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 pointer-events-none">
            <span className="text-[#E8A5B3] font-semibold">
              {gridHovered ? (isAr ? "تحقق الأقواس: دقيق" : "Arcs: Locked") : (isAr ? "مرر لمعاينة الهندسة" : "Hover to inspect")}
            </span>
            <span>VECTOR ANCHORS: 4/4</span>
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          CARD 3: GLOBAL STANDARDS & PRESS-READY SPECS (معايير عالمية)
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="w-[86vw] sm:w-[380px] lg:w-auto shrink-0 snap-center group relative p-5 sm:p-8 rounded-3xl bg-[#090507]/90 border border-white/10 hover:border-[#8E162A]/50 transition-colors shadow-2xl shadow-black/80 flex flex-col justify-between overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-12 -left-12 w-44 h-44 bg-[#800020]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#800020]/35 transition-all duration-500" />

        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#800020] to-[#500A15] border border-[#E8A5B3]/30 flex items-center justify-center shadow-lg shadow-[#800020]/30">
              <Globe className="w-6 h-6 text-[#E8A5B3]" />
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#E8A5B3] bg-[#800020]/20 border border-[#8E162A]/40 uppercase">
              {isAr ? "جاهز للتنفيذ" : "Press & Digital"}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 font-brand">
            {isAr ? "معايير عالمية معتمدة" : "Global Industry Standards"}
          </h3>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4">
            {isAr
              ? "تسليم ملفات نظيفة وخالية من الأخطاء، مطابقة لشروط كبرى مطابع وشركات الإعلان الخليجية والعالمية."
              : "Zero technical friction. Deliverables comply with strict commercial printing protocols, color swatches, and responsive digital environments."}
          </p>
        </div>

        {/* ── Interactive Standards Verification Badges ── */}
        <div className="space-y-2 pt-2">
          {standards.map((std, idx) => {
            const isHovered = hoveredBadge === idx;
            return (
              <div
                key={std.id}
                onMouseEnter={() => setHoveredBadge(idx)}
                onMouseLeave={() => setHoveredBadge(null)}
                className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-default ${
                  isHovered
                    ? "bg-[#800020]/30 border-[#E8A5B3]/40 shadow-sm"
                    : "bg-white/[0.03] border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                    isHovered ? "bg-[#8E162A] text-white" : "bg-white/10 text-white/50"
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-white tracking-wide truncate">
                      {std.label}
                    </h4>
                    <p className="text-[10px] text-white/50 truncate">
                      {std.sub}
                    </p>
                  </div>
                </div>

                {/* Status indicator tag */}
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-md shrink-0 ml-2 ${
                  isHovered 
                    ? "bg-[#E8A5B3]/20 text-[#E8A5B3] font-bold" 
                    : "bg-white/5 text-white/40"
                }`}>
                  {isHovered ? "VERIFIED" : "OK"}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
      </div>
    </div>
  );
}
