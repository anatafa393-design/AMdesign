"use client";

import Image from "next/image";
import { useRef } from "react";

const ROW_1 = [
  "/photoshoots/1/chatgpt-image-may-24-2026-02-45-42-pm.png",
  "/projects/project-1/Artboard 2@4x-100.jpg",
  "/social-media/1/chatgpt-image-may-22-2026-05-29-10-pm.png",
  "/photoshoots/2/chatgpt-image-may-17-2026-02-06-43-pm.png",
  "/projects/project-2/Artboard 1@4x-100.jpg",
  "/social-media/2/chatgpt-image-may-22-2026-06-06-24-pm.png",
  "/photoshoots/3/chatgpt-image-may-24-2026-02-37-03-pm.png",
];

const ROW_2 = [
  "/projects/project-3/Artboard 1@4x-100.jpg",
  "/social-media/3/chatgpt-image-may-22-2026-06-26-58-pm.png",
  "/photoshoots/4/chatgpt-image-may-24-2026-02-31-18-pm.png",
  "/social-media/4/chatgpt-image-may-24-2026-01-31-35-pm.png",
  "/photoshoots/5/chatgpt-image-may-4-2026-11-35-41-am.png",
  "/social-media/5/chatgpt-image-may-6-2026-06-28-02-pm.png",
  "/photoshoots/6/interior-shoot-1.png",
];

function TickerRow({
  images,
  reverse = false,
}: {
  images: string[];
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Duplicate for seamless loop
  const items = [...images, ...images];

  return (
    <div className="w-full overflow-hidden">
      {/* Outer wrapper — pauses on hover */}
      <div
        className="flex"
        style={{ willChange: "transform" }}
        onMouseEnter={() => {
          if (trackRef.current)
            trackRef.current.style.animationPlayState = "paused";
        }}
        onMouseLeave={() => {
          if (trackRef.current)
            trackRef.current.style.animationPlayState = "running";
        }}
      >
        {/* Animated track */}
        <div
          ref={trackRef}
          className={`flex gap-4 flex-shrink-0 ${
            reverse ? "animate-ticker-reverse" : "animate-ticker"
          }`}
          style={{ minWidth: "max-content" }}
        >
          {items.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/50"
              style={{ width: "clamp(140px, 38vw, 240px)", aspectRatio: "3/4" }}
            >
              <Image
                src={src}
                alt={`Portfolio showcase ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 38vw, 240px"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ImageTicker() {
  return (
    <div className="relative w-full py-8 flex flex-col gap-4 md:gap-6 overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[#050505] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[#050505] to-transparent" />

      {/* Row 1: Left → Right */}
      <TickerRow images={ROW_1} />

      {/* Row 2: Right → Left */}
      <TickerRow images={ROW_2} reverse />
    </div>
  );
}
