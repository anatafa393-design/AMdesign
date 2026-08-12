import type { Metadata } from "next";
import { Inter, Syne, Tajawal } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import CustomCursor from "@/components/ui/custom-cursor";
import LoadingScreen from "@/components/ui/loading-screen";
import SmoothScroll from "@/components/ui/smooth-scroll";
import { LanguageProvider } from "@/context/LanguageContext";
import MetaPixel from "@/components/MetaPixel";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Trendy and artistic font for headings
const syne = Syne({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Modern & Elegant Arabic Font
const tajawal = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ahmed Aljamal — Premium Brand & Graphic Designer",
  description:
    "I craft professional visual identities, logos, and websites for ambitious startups and businesses. Full-service brand design from A to Z.",
  openGraph: {
    title: "Ahmed Aljamal — Premium Brand & Graphic Designer",
    description: "Premium brand & graphic design services for ambitious startups. Elite visual branding, packaging, and web experiences.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${tajawal.variable}`}>
      <body className="bg-[#050505] text-white selection:bg-purple-500/30 font-sans overflow-x-hidden">
        <LanguageProvider>
          <MetaPixel />
          <header role="banner">
            <Navbar aria-label="Primary navigation" />
          </header>
          <main role="main" className="flex-grow">
            {children}
          </main>
          {/* Global overlays */}
          <LoadingScreen />
          <CustomCursor />
          <SmoothScroll />
          {/* Grid lines & grain / noise texture overlay */}
          <div aria-hidden="true" className="grid-lines pointer-events-none fixed inset-0 z-[1] opacity-70" />
          <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-[9990] opacity-[0.035]" />
        </LanguageProvider>
      </body>
    </html>
  );
}
