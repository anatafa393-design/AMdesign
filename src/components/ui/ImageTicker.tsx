"use client";

import Image from "next/image";

const TICKER_IMAGES = [
  "/photoshoots/1/chatgpt-image-may-24-2026-02-45-42-pm.png",
  "/photoshoots/2/chatgpt-image-may-17-2026-02-06-43-pm.png",
  "/photoshoots/4/chatgpt-image-may-24-2026-02-30-54-pm.png",
  "/photoshoots/5/chatgpt-image-may-4-2026-11-35-41-am.png",
  "/photoshoots/1/chatgpt-image-may-24-2026-02-45-45-pm.png",
  "/photoshoots/2/chatgpt-image-may-17-2026-02-07-00-pm.png",
  "/photoshoots/3/chatgpt-image-may-24-2026-02-37-03-pm.png",
  "/photoshoots/6/interior-shoot-1.png",
  "/photoshoots/1/chatgpt-image-may-24-2026-02-45-48-pm.png",
  "/photoshoots/2/chatgpt-image-may-17-2026-02-07-17-pm.png",
  "/photoshoots/4/chatgpt-image-may-24-2026-02-30-58-pm.png",
  "/photoshoots/5/chatgpt-image-may-4-2026-11-35-47-am.png",
];

export default function ImageTicker() {
  // Duplicate for seamless infinite loop
  const images = [...TICKER_IMAGES, ...TICKER_IMAGES];

  return (
    <div className="relative w-full overflow-hidden py-4 group">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-40 z-10 bg-gradient-to-r from-[#080808] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-40 z-10 bg-gradient-to-l from-[#080808] to-transparent" />

      {/* Ticker track */}
      <div
        className="flex gap-3 md:gap-4 animate-ticker"
        style={{ width: "max-content" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/50 w-28 h-40 md:w-48 md:h-64"
          >
            <Image
              src={src}
              alt={`Portfolio showcase ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 112px, 192px"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}
