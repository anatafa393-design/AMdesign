"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

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
  baseSpeed = 0.04,
}: {
  images: string[];
  reverse?: boolean;
  baseSpeed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  // Framer Motion hooks for page scroll integration
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Transform vertical scroll velocity into a horizontal speed boost
  const speedBoost = useTransform(smoothVelocity, [-1000, 0, 1000], [0.15, 0, 0.15], {
    clamp: false,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let exactX = 0;

    let isDragging = false;
    let dragVelocity = 0; // pixels per ms
    let lastDragX = 0;
    let lastDragTime = 0;

    const handleDragStart = (x: number) => {
      isDragging = true;
      lastDragX = x;
      lastDragTime = performance.now();
      dragVelocity = 0;
      track.style.cursor = "grabbing";
    };

    const handleDragMove = (x: number) => {
      if (!isDragging) return;
      const now = performance.now();
      const dt = Math.max(now - lastDragTime, 1);
      const dx = x - lastDragX; // positive if mouse moved right

      dragVelocity = dx / dt;
      lastDragX = x;
      lastDragTime = now;

      // Moving mouse left (dx < 0) should increase exactX (scroll track left)
      exactX -= dx;
    };

    const handleDragEnd = () => {
      isDragging = false;
      track.style.cursor = "grab";
    };

    // Touch events
    const onTouchStart = (e: TouchEvent) => handleDragStart(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientX);
    const onTouchEnd = () => handleDragEnd();

    // Mouse events
    const onMouseDown = (e: MouseEvent) => handleDragStart(e.clientX);
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleDragMove(e.clientX);
    };
    const onMouseUp = () => handleDragEnd();
    const onMouseLeave = () => {
      if (isDragging) handleDragEnd();
    };

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);
    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("mouseleave", onMouseLeave);

    // Initial setup for reverse
    // We delay the half-width calculation to ensure DOM is fully rendered
    setTimeout(() => {
      if (reverse && track) exactX = track.scrollWidth / 2;
    }, 100);

    const scroll = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      // Ensure halfWidth is dynamically accurate
      const currentHalfWidth = track.scrollWidth / 2;

      if (!isDragging) {
        if (Math.abs(dragVelocity) > 0.01) {
          // Physics momentum friction
          const friction = Math.pow(0.95, delta / 16);
          exactX -= dragVelocity * delta;
          dragVelocity *= friction;
        } else {
          // Normal auto scroll
          const currentBoost = speedBoost.get();
          const speed = baseSpeed + currentBoost;
          const moveDelta = reverse ? -speed * delta : speed * delta;

          if (!isHovered.current) {
            exactX += moveDelta;
          } else {
            // Apply only the scroll boost if hovered
            exactX += reverse ? -currentBoost * delta : currentBoost * delta;
          }
        }
      }

      // Loop teleportation
      // Make sure we have a valid width before wrapping
      if (currentHalfWidth > 0) {
        if (exactX >= currentHalfWidth) {
          exactX -= currentHalfWidth;
        } else if (exactX <= 0) {
          exactX += currentHalfWidth;
        }
      }

      // Apply sub-pixel translation for buttery smooth animation
      track.style.transform = `translate3d(${-exactX}px, 0, 0)`;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [reverse, baseSpeed, speedBoost]);

  // Duplicate for seamless infinite loop
  const items = [...images, ...images];

  return (
    <div className="w-full overflow-hidden touch-pan-y" ref={containerRef}>
      <div
        ref={trackRef}
        className="flex gap-4 w-max cursor-grab active:cursor-grabbing"
        onMouseEnter={() => (isHovered.current = true)}
        onMouseLeave={() => (isHovered.current = false)}
        style={{ willChange: "transform" }}
      >
        {items.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/50 pointer-events-none"
            style={{ width: "clamp(140px, 38vw, 240px)", aspectRatio: "3/4" }}
          >
            <Image
              src={src}
              alt={`Portfolio showcase ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={100}
              loading="lazy"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}
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
