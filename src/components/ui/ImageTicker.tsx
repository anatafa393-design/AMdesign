"use client";

import Image from "next/image";

import { useEffect, useRef } from "react";

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

function TickerRow({ images, reverse = false }: { images: string[], reverse?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 0.05; // pixels per ms

    // Initialize exact scroll tracker
    let exactScrollLeft = 0;
    
    // For reverse ticker, start midway so it has room to scroll left
    if (scrollRef.current && reverse) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
      exactScrollLeft = scrollRef.current.scrollLeft;
    } else if (scrollRef.current) {
      exactScrollLeft = scrollRef.current.scrollLeft;
    }

    const scroll = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (scrollRef.current && !isDragging.current) {
        const { scrollWidth } = scrollRef.current;
        
        // Add delta to our floating point tracker
        exactScrollLeft += reverse ? -speed * delta : speed * delta;
        
        // Loop logic
        if (!reverse && exactScrollLeft >= scrollWidth / 2) {
          exactScrollLeft -= scrollWidth / 2;
        } else if (reverse && exactScrollLeft <= 0) {
          exactScrollLeft += scrollWidth / 2;
        }
        
        scrollRef.current.scrollLeft = exactScrollLeft;
      } else if (scrollRef.current && isDragging.current) {
        // Sync our tracker with user's manual scroll position
        exactScrollLeft = scrollRef.current.scrollLeft;
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [reverse]);

  // Duplicate the array for seamless infinite scroll
  const displayImages = [...images, ...images];

  return (
    <div
      ref={scrollRef}
      className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar touch-pan-x select-none snap-x snap-mandatory"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      onTouchStart={() => (isDragging.current = true)}
      onTouchEnd={() => {
        setTimeout(() => { isDragging.current = false }, 500);
      }}
      onMouseEnter={() => (isDragging.current = true)}
      onMouseLeave={() => (isDragging.current = false)}
    >
      {displayImages.map((src, i) => (
        <div
          key={i}
          className="relative flex-shrink-0 snap-center rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/50 w-44 h-64 md:w-64 md:h-80"
        >
          <Image
            src={src}
            alt={`Portfolio showcase ${i + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 176px, 256px"
            loading="lazy"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      ))}
    </div>
  );
}

export default function ImageTicker() {
  return (
    <div className="relative w-full overflow-hidden py-8 group flex flex-col gap-4 md:gap-6">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-40 z-10 bg-gradient-to-r from-[#080808] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-40 z-10 bg-gradient-to-l from-[#080808] to-transparent" />

      {/* Row 1: Left to Right */}
      <TickerRow images={ROW_1} />
      
      {/* Row 2: Right to Left */}
      <TickerRow images={ROW_2} reverse={true} />
    </div>
  );
}
