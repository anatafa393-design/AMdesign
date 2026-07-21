"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, translations } from "@/data/translations";

interface LanguageContextType {
  language: Language;
  dir: "ltr" | "rtl";
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("am_design_lang") as Language | null;
      if (saved === "en" || saved === "ar") {
        return saved;
      }
      if (navigator.language.toLowerCase().startsWith("ar")) {
        return "ar";
      }
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("am_design_lang", lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const dir = language === "ar" ? "rtl" : "ltr";
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = dir;
      document.documentElement.lang = language;
      if (language === "ar") {
        document.documentElement.classList.add("lang-ar");
      } else {
        document.documentElement.classList.remove("lang-ar");
      }
    }
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, dir, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
