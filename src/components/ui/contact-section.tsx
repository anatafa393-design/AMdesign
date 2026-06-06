"use client";

import { ArrowRight, Mail, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/reveal-on-scroll";
import MagneticButton from "@/components/ui/magnetic-button";

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
  label: string;
  value: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  iconFrom: string;
  iconTo: string;
}

const contacts: ContactItem[] = [
  {
    label: "Email",
    value: "anatafa393@gmail.com",
    href: "mailto:anatafa393@gmail.com",
    Icon: Mail,
    color: "orange",
    iconFrom: "from-orange-500/20",
    iconTo: "to-orange-500/10",
  },
  {
    label: "WhatsApp / Call",
    value: "01145137067",
    href: "https://wa.me/201145137067",
    Icon: WhatsAppIcon,
    color: "green",
    iconFrom: "from-green-500/20",
    iconTo: "to-green-500/10",
  },
  {
    label: "LinkedIn",
    value: "Ahmed Mostafa",
    href: "https://www.linkedin.com/in/ahmed-mostafa-6a5855233/",
    Icon: Globe,
    color: "blue",
    iconFrom: "from-blue-500/20",
    iconTo: "to-blue-500/10",
  },
  {
    label: "Instagram",
    value: "@am_designart",
    href: "https://www.instagram.com/am_designart/",
    Icon: InstagramIcon,
    color: "pink",
    iconFrom: "from-pink-500/20",
    iconTo: "to-pink-500/10",
  },
  {
    label: "Behance",
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

function ContactCard({ item, index }: { item: ContactItem; index: number }) {
  const colors = colorMap[item.color];
  const { Icon } = item;

  return (
    <motion.a
      href={item.href}
      target={item.href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 flex flex-col gap-5"
    >
      <div
        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.iconFrom} ${item.iconTo} flex items-center justify-center transition-colors duration-300 group-hover:${colors.bg}`}
      >
        <Icon className={`w-6 h-6 ${colors.text}`} />
      </div>
      <div className="flex-1">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-1.5">
          {item.label}
        </p>
        <p className="text-white font-semibold text-base">{item.value}</p>
      </div>
      <motion.div
        className="inline-flex"
        initial={{ x: 0 }}
        whileHover={{ x: 4 }}
      >
        <ArrowRight
          className={`w-4 h-4 text-white/20 ${colors.text.replace("text-", "group-hover:text-")} group-hover:translate-x-1 transition-all duration-300`}
        />
      </motion.div>
    </motion.a>
  );
}

export function ContactSection() {
  const emailItem = contacts[0];
  const otherItems = contacts.slice(1);

  return (
    <section id="contact" className="relative pt-24 pb-16 border-t border-white/10 overflow-hidden">
      {/* Decorative gradient circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-orange-400 opacity-20 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Big CTA Heading */}
        <Reveal>
          <div className="text-center mb-20">
            <p className="text-orange-400 font-medium mb-5 tracking-widest text-sm uppercase">
              Ready to Start?
            </p>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] font-brand">
              Let&apos;s Build Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400">
                Dream Brand.
              </span>
            </h2>
            <p className="mt-8 text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
              Whether you need a full identity from scratch or just want to
              elevate what you already have — I&apos;m here for it.
            </p>
          </div>
        </Reveal>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-20">
          {/* Email card wrapped in MagneticButton */}
          <MagneticButton strength={0.15}>
            <ContactCard item={emailItem} index={0} />
          </MagneticButton>

          {otherItems.map((item, idx) => (
            <ContactCard key={item.label} item={item} index={idx + 1} />
          ))}
        </div>

        {/* Footer Bar */}
        <div className="border-t border-white/[0.06]" />
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6">
          <p className="text-2xl font-brand text-white">
            Ahmed Aljamal
          </p>

          {/* Social icon links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/am_designart/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-orange-400 hover:border-orange-400/30 transition-all duration-300"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.behance.net/amdesignart/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-orange-400 hover:border-orange-400/30 transition-all duration-300"
              aria-label="Behance"
            >
              <BehanceIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-mostafa-6a5855233/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-orange-400 hover:border-orange-400/30 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          <p className="text-white/25 text-sm">
            © 2026 Ahmed Aljamal Graphic Design. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
