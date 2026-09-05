"use client";

import { useState, useEffect, useRef } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface OrbitItem {
  id: string;
  name: string;
  renderIcon: () => React.ReactNode;
}

export default function Hero3DOrbit() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  // Orbit parameters
  const radiusX = 290; // Horizontal radius in px
  const radiusY = 80;  // Vertical radius in px (creates the 3D tilt perspective)

  useEffect(() => {
    let lastTimestamp = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (!isPaused) {
        setTime((prev) => prev + delta * 0.35); // Controlled smooth orbital speed
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused]);

  // 8 Custom 3D Design & Creative Tool Icons
  const items: OrbitItem[] = [
    {
      id: "ai",
      name: "Illustrator",
      renderIcon: () => (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#261300] via-[#150a00] to-[#0a0500] border-2 border-[#FF7C00]/80 p-1 flex items-center justify-center shadow-[0_10px_25px_rgba(255,124,0,0.35)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
          <span className="font-extrabold text-[#FF9A00] text-lg sm:text-xl font-mono tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Ai
          </span>
        </div>
      ),
    },
    {
      id: "ps",
      name: "Photoshop",
      renderIcon: () => (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#00142b] via-[#000a17] to-[#00050d] border-2 border-[#00B4FF]/80 p-1 flex items-center justify-center shadow-[0_10px_25px_rgba(0,180,255,0.35)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
          <span className="font-extrabold text-[#38C5FF] text-lg sm:text-xl font-mono tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Ps
          </span>
        </div>
      ),
    },
    {
      id: "ae",
      name: "After Effects",
      renderIcon: () => (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#1c0033] via-[#0e001a] to-[#05000a] border-2 border-[#9D00FF]/80 p-1 flex items-center justify-center shadow-[0_10px_25px_rgba(157,0,255,0.35)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
          <span className="font-extrabold text-[#D199FF] text-lg sm:text-xl font-mono tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Ae
          </span>
        </div>
      ),
    },
    {
      id: "figma",
      name: "Figma",
      renderIcon: () => (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#1c1917] via-[#0c0a09] to-black border-2 border-white/20 p-2 flex items-center justify-center shadow-[0_10px_25px_rgba(242,78,30,0.3)] relative overflow-hidden">
          <svg viewBox="0 0 38 57" className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-md">
            <path fill="#F24E1E" d="M19 0H9.5C4.25 0 0 4.25 0 9.5C0 14.75 4.25 19 9.5 19H19V0Z" />
            <path fill="#A259FF" d="M0 28.5C0 23.25 4.25 19 9.5 19H19V38H9.5C4.25 38 0 33.75 0 28.5Z" />
            <path fill="#0ACF83" d="M0 47.5C0 42.25 4.25 38 9.5 38H19V47.5C19 52.75 14.75 57 9.5 57C4.25 57 0 52.75 0 47.5Z" />
            <path fill="#1ABCFE" d="M19 19H28.5C33.75 19 38 23.25 38 28.5C38 33.75 33.75 38 28.5 38C23.25 38 19 33.75 19 28.5V19Z" />
            <path fill="#FF7262" d="M38 9.5C38 14.75 33.75 19 28.5 19H19V0H28.5C33.75 0 38 4.25 38 9.5Z" />
          </svg>
        </div>
      ),
    },
    {
      id: "canva",
      name: "Canva",
      renderIcon: () => (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#00C4CC] via-[#3B66E0] to-[#7D2AE8] p-0.5 flex items-center justify-center shadow-[0_10px_25px_rgba(0,196,204,0.35)] relative overflow-hidden group">
          <div className="w-full h-full rounded-[14px] bg-[#0c0d14]/85 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-white drop-shadow-md">
              <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1.6 14.5a4.2 4.2 0 0 1-2.9 1.1 4.5 4.5 0 0 1-4.5-4.5 4.6 4.6 0 0 1 4.6-4.6 4.1 4.1 0 0 1 2.7.9l-1 1.4a2.7 2.7 0 0 0-1.7-.6 2.8 2.8 0 0 0-2.8 2.8 2.8 2.8 0 0 0 2.8 2.8 2.7 2.7 0 0 0 1.9-.8z" />
            </svg>
          </div>
        </div>
      ),
    },
    {
      id: "pen",
      name: "Vector Pen",
      renderIcon: () => (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#2a1a1a] via-[#190f0f] to-[#0d0707] border-2 border-[#D4AF37]/80 p-2 flex items-center justify-center shadow-[0_10px_25px_rgba(212,175,55,0.3)] relative overflow-hidden">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7 text-[#F3E5AB]">
            <path d="m12 19 7-7 3 3-7 7-3-3z" fill="#D4AF37" stroke="#D4AF37" fillOpacity="0.3" />
            <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="m2 2 7.586 7.586" />
            <circle cx="11" cy="11" r="2" fill="#D4AF37" />
          </svg>
        </div>
      ),
    },
    {
      id: "palette",
      name: "Brand Palette",
      renderIcon: () => (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#240810] via-[#140409] to-black border-2 border-[#9E1B32]/80 p-2 flex items-center justify-center shadow-[0_10px_25px_rgba(158,27,50,0.4)] relative overflow-hidden">
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#800020] shadow-sm ring-1 ring-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-sm ring-1 ring-white/20" />
            </div>
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] shadow-sm ring-1 ring-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#111827] shadow-sm ring-1 ring-white/20" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "camera",
      name: "Photoshoot",
      renderIcon: () => (
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#1e1b24] via-[#100e14] to-black border-2 border-white/30 p-2 flex items-center justify-center shadow-[0_10px_25px_rgba(255,255,255,0.15)] relative overflow-hidden">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-dashed border-white/60 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400/40 via-purple-500/40 to-rose-400/40 border border-white/40" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div 
      className="relative w-full h-[38vh] sm:h-[48vh] lg:h-[65vh] flex justify-center items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ═══ 1. LUXURY BURGUNDY AMBIENT GLOW ═══ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-[#800020]/30 via-[#4A0E17]/25 to-transparent rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* ═══ 2. TILTED 3D ORBIT TRACK RING (SUBTLE PERSPECTIVE) ═══ */}
      <div 
        className="absolute pointer-events-none rounded-[50%] border border-white/10"
        style={{
          width: radiusX * 2 + 60,
          height: radiusY * 2 + 40,
          boxShadow: "0 0 40px rgba(128, 0, 32, 0.25), inset 0 0 30px rgba(128, 0, 32, 0.15)",
          transform: "rotateX(12deg)",
        }}
      />

      {/* ═══ 3. MAIN PORTRAIT IMAGE ═══ */}
      <div className="relative z-15 h-full w-auto flex justify-center items-end pointer-events-none">
        <ImageWithFallback
          src="/profile.png"
          className="h-full w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] z-10"
          alt="Ahmed Aljamal - Brand Architect"
        />
      </div>

      {/* ═══ 4. 3D ORBITING ICONS ═══ */}
      {items.map((item, index) => {
        const itemAngle = time + (index * (2 * Math.PI)) / items.length;
        
        // Calculate 3D position
        const x = Math.cos(itemAngle) * radiusX;
        const y = Math.sin(itemAngle) * radiusY;
        const z = Math.sin(itemAngle); // z > 0: in front of portrait; z < 0: behind portrait

        const isFront = z > 0;
        const scale = 0.82 + ((z + 1) / 2) * 0.32; // scales from 0.82 behind to 1.14 in front
        const opacity = isFront ? 1 : 0.65 + ((z + 1) / 2) * 0.3;
        const zIndex = isFront ? 30 : 5;
        const blurAmount = isFront ? 0 : Math.abs(z) * 0.6;

        return (
          <div
            key={item.id}
            className="absolute transition-transform duration-75 ease-out cursor-pointer hover:scale-125"
            style={{
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              zIndex,
              opacity,
              filter: `blur(${blurAmount}px)`,
            }}
            title={item.name}
          >
            <div className="relative transform hover:-translate-y-1 transition-transform">
              {item.renderIcon()}
              {/* Tooltip on hover */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] text-white/80 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                {item.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
