"use client";

import { Download } from "lucide-react";
import { trackPixelEvent } from "@/components/MetaPixel";

interface DownloadButtonProps {
  href: string;
  projectTitle: string;
}

export default function DownloadButton({ href, projectTitle }: DownloadButtonProps) {
  const handleDownload = () => {
    trackPixelEvent("Lead", {
      content_name: "PDF Brand Guidelines Download",
      project: projectTitle,
    });
  };

  return (
    <a
      href={href}
      download
      onClick={handleDownload}
      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
    >
      <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
      Download PDF Brand Book
    </a>
  );
}
