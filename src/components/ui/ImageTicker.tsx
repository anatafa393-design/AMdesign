"use client";

import Image from "next/image";

const TICKER_IMAGES = [
  "/project-2-cover.jpg",
  "/photoshoots/2/chatgpt-image-may-17-2026-02-06-43-pm.png",
  "/photoshoots/3/chatgpt-image-may-24-2026-02-37-03-pm.png",
  "/photoshoots/4/chatgpt-image-may-24-2026-02-30-54-pm.png",
  "/photoshoots/5/chatgpt-image-may-4-2026-11-35-41-am.png",
  "/photoshoots/6/interior-shoot-1.png",
  "/packaging/1/chatgpt-image-may-24-2026-02-59-02-pm.png",
  "/packaging/2/1-2.png",
  "/packaging/3/revo-menu-final-page-1.png",
  "/social-media/3/chatgpt-image-may-22-2026-06-27-03-pm.png",
  "/social-media/5/chatgpt-image-may-6-2026-06-28-02-pm.png",
  "/projects/project-3/Artboard 1@4x-100.jpg",
];

export default function ImageTicker() {
  // Duplicate for seamless infinite loop
  const images = [...TICKER_IMAGES, ...TICKER_IMAGES];

  return (
    <div className="relative w-full overflow-hidden py-4 group">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />

      {/* Ticker track */}
      <div
        className="flex gap-4 animate-ticker group-hover:[animation-play-state:paused]"
        style={{ width: "max-content" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/50"
            style={{ width: "200px", height: "280px" }}
          >
            <Image
              src={src}
              alt={`Portfolio showcase ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              sizes="200px"
              loading="lazy"
              onError={(e) => {
                const el = e.currentTarget.parentElement as HTMLElement;
                if (el) el.style.display = "none";
              }}
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}
