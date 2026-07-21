"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import MagneticButton from "@/components/ui/magnetic-button";
import { useLanguage } from "@/context/LanguageContext";

const socialLinks = [
  { label: "Wa", href: "https://wa.me/201145137067" },
  { label: "Li", href: "https://www.linkedin.com/in/ahmed-mostafa-6a5855233/" },
  { label: "Ig", href: "https://www.instagram.com/am_designart/" },
  { label: "Be", href: "https://www.behance.net/amdesignart/projects" },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActive]    = useState<string>("");
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { label: t.nav.work,     href: "/#projects", sectionId: "projects"  },
    { label: t.nav.services, href: "/#services", sectionId: "services"  },
    { label: t.nav.about,    href: "/#about",    sectionId: "about"     },
    { label: t.nav.contact,  href: "/#contact",  sectionId: "contact"   },
  ];

  /* Scroll state */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const ids = ["projects", "services", "about", "contact"];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? "py-3 bg-black/70 backdrop-blur-3xl shadow-lg shadow-black/20"
          : "py-6 bg-transparent"
      }`}
    >
      {/* Gradient bottom border when scrolled */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      )}

      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <motion.span
            className="font-brand text-2xl text-white inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            Ahmed Aljamal
          </motion.span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <Link
                key={link.sectionId}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 relative group flex flex-col items-center ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {/* Active dot indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavDot"
                    className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-orange-500 to-red-600"
                    transition={{ type: "spring", stiffness: 380, damping: 25 }}
                  />
                )}
                {/* Hover dot (shows when not active) */}
                {!isActive && (
                  <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/30 scale-0 group-hover:scale-100 transition-transform duration-200" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Side: Language Switcher & CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher Toggle */}
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-bold text-white hover:bg-white/15 hover:border-orange-500/50 transition-all duration-300"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-orange-400" />
            <span>{language === "en" ? "العربية" : "English"}</span>
          </button>

          {/* CTA Button */}
          <MagneticButton>
            <Link
              href="/#contact"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {t.nav.letsTalk}
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Right Controls */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-bold text-white"
          >
            <Globe className="w-3 h-3 text-orange-400" />
            <span>{language === "en" ? "عربي" : "EN"}</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors relative z-[110]"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-[105] bg-black/95 backdrop-blur-3xl flex flex-col"
          >
            {/* Close button — circle top-right */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.sectionId}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.08 * i, duration: 0.35, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-3xl font-bold font-brand transition-colors ${
                      activeSection === link.sectionId
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {activeSection === link.sectionId && (
                      <span className="ml-3 inline-block w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 align-middle" />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.08 * navLinks.length, duration: 0.35, ease: "easeOut" }}
                className="mt-4 flex flex-col items-center gap-4"
              >
                <Link
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                >
                  {t.nav.letsTalk}
                </Link>
              </motion.div>
            </div>

            {/* Social links at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="flex items-center justify-center gap-4 pb-10"
            >
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 text-xs font-bold hover:text-white hover:border-white/40 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
