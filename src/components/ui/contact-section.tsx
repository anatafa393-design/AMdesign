"use client";

import { ArrowRight, Mail, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/reveal-on-scroll";
import MagneticButton from "@/components/ui/magnetic-button";
import { useLanguage } from "@/context/LanguageContext";
import { trackPixelEvent } from "@/components/MetaPixel";

// Custom SVG icons for social platforms not in lucide v1
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.763 1.88 1.853 1.88.603 0 1.364-.24 1.703-.873zM15.781 13.396c-.102-1.26-.6-2.084-1.82-2.084-1.27 0-1.857.825-1.988 2.084h3.808zM7.633 5c.868 0 1.698.09 2.452.274 1.744.432 2.714 1.575 2.714 3.18 0 1.49-.786 2.43-2.03 2.94 1.572.43 2.535 1.545 2.535 3.28 0 2.188-1.49 3.763-4.124 4.048C8.72 18.78 8.17 18.8 7.583 18.8H1V5h6.633zm-.26 5.38c1.15 0 1.79-.47 1.79-1.42 0-.892-.627-1.343-1.748-1.343H4.123v2.763h3.25zm.184 5.64c1.28 0 1.983-.51 1.983-1.56 0-1.025-.71-1.546-1.975-1.546H4.123v3.105H7.557z"/>
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.069.993 11.996.993c-5.452 0-9.879 4.37-9.883 9.8-.001 1.777.472 3.51 1.369 5.022L2.5 21.5l5.856-1.515zM17.47 15.35c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    </svg>
  );
}

interface ContactItem {
  labelEn: string;
  labelAr: string;
  value: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  iconFrom: string;
  iconTo: string;
}

const contacts: ContactItem[] = [
  {
    labelEn: "Email Direct",
    labelAr: "البريد الإلكتروني",
    value: "anatafa393@gmail.com",
    href: "mailto:anatafa393@gmail.com",
    Icon: Mail,
    color: "orange",
    iconFrom: "from-orange-500/20",
    iconTo: "to-orange-500/10",
  },
  {
    labelEn: "WhatsApp / Call",
    labelAr: "واتساب / اتصال مباشر",
    value: "01145137067",
    href: "https://wa.me/201145137067",
    Icon: WhatsAppIcon,
    color: "green",
    iconFrom: "from-green-500/20",
    iconTo: "to-green-500/10",
  },
  {
    labelEn: "LinkedIn",
    labelAr: "لينكد إن",
    value: "Ahmed Mostafa",
    href: "https://www.linkedin.com/in/ahmed-mostafa-6a5855233/",
    Icon: Globe,
    color: "blue",
    iconFrom: "from-blue-500/20",
    iconTo: "to-blue-500/10",
  },
  {
    labelEn: "Instagram",
    labelAr: "إنستغرام",
    value: "@am_designart",
    href: "https://www.instagram.com/am_designart/",
    Icon: InstagramIcon,
    color: "pink",
    iconFrom: "from-pink-500/20",
    iconTo: "to-pink-500/10",
  },
  {
    labelEn: "Behance",
    labelAr: "بيهانس",
    value: "amdesignart",
    href: "https://www.behance.net/amdesignart/projects",
    Icon: BehanceIcon,
    color: "purple",
    iconFrom: "from-purple-500/20",
    iconTo: "to-purple-500/10",
  },
];

const colorMap: Record<string, { text: string; border: string; bg: string }> = {
  orange: { text: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/30" },
  blue:   { text: "text-blue-400",   border: "border-blue-500/30",   bg: "bg-blue-500/30" },
  pink:   { text: "text-pink-400",   border: "border-pink-500/30",   bg: "bg-pink-500/30" },
  purple: { text: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/30" },
  green:  { text: "text-green-400",  border: "border-green-500/30",  bg: "bg-green-500/30" },
};

export function ContactSection() {
  const { language, t } = useLanguage();

  return (
    <section id="contact" className="relative py-28 px-6 md:px-10 bg-[#050505] overflow-hidden">
      {/* Glow gradient in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-orange-600/10 via-red-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col items-center text-center gap-4 mb-20">
            <span className="text-xs font-bold tracking-widest uppercase text-orange-400 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
              {t.contact.badge}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white font-brand">
              {t.contact.title}
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl">
              {t.contact.subtitle}
            </p>
          </div>
        </Reveal>

        {/* Contact Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((item, i) => {
            const colors = colorMap[item.color] || colorMap.orange;
            const Icon = item.Icon;

            const handleLinkClick = () => {
              const platform = item.color;
              const methodMap: Record<string, string> = {
                orange: 'email',
                green: 'whatsapp',
                blue: 'linkedin',
                pink: 'instagram',
                purple: 'behance'
              };
              const method = methodMap[platform] || platform;
              trackPixelEvent('Contact', { method, value: item.value });
            };

            return (
              <Reveal key={item.value} delay={0.08 * i}>
                <motion.a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  onClick={handleLinkClick}
                  className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full"
                >
                  {/* Subtle hover gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.iconFrom} ${item.iconTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  {/* Top row: Icon + Arrow */}
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className={`w-12 h-12 rounded-2xl bg-white/5 border ${colors.border} flex items-center justify-center ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300">
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${language === "ar" ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`} />
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="relative z-10">
                    <span className="block text-xs font-bold tracking-wider uppercase text-white/40 mb-1">
                      {language === "ar" ? item.labelAr : item.labelEn}
                    </span>
                    <span className="block text-lg font-bold text-white font-brand group-hover:text-orange-300 transition-colors">
                      {item.value}
                    </span>
                  </div>
                </motion.a>
              </Reveal>
            );
          })}
        </div>

        {/* Direct Footer CTA */}
        <Reveal delay={0.4}>
          <div className="mt-20 p-10 rounded-3xl bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/5 border border-white/10 text-center flex flex-col items-center gap-6">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white font-brand">
              {language === "ar" ? "جاهز لبداية مشروعك القادم؟" : "Ready to Start Your Next Project?"}
            </h3>
            <MagneticButton>
              <a
                href="https://wa.me/201145137067"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPixelEvent('Contact', { method: 'whatsapp_footer_cta' })}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-wider"
              >
                {language === "ar" ? "تحدث معي على الواتساب مباشرة" : "Chat Directly on WhatsApp"}
                <ArrowRight className={`w-4 h-4 ${language === "ar" ? "rotate-180" : ""}`} />
              </a>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
