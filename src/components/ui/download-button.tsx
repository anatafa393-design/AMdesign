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
      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#8E162A] to-[#500A15] hover:from-[#A31D36] hover:to-[#6B0D1C] text-white font-bold text-sm shadow-md shadow-[#8E162A]/25 hover:shadow-[#8E162A]/45 hover:scale-[1.02] active:scale-[0.98] border border-[#E8A5B3]/20 transition-all duration-300 group"
    >
      <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
      Download PDF Brand Book
    </a>
  );
}
