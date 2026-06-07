"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Reveal from "@/components/ui/reveal-on-scroll";

interface Testimonial {
  id: number;
  testimonial: string;
  author: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    testimonial:
      "Ahmed completely transformed our brand from the ground up. Every single detail was crafted with clear intention and the final result exceeded all our expectations.",
    author: "Naji Qasim",
    role: "Manager @ Sarh Al-Masia Al-Raeda Holding Co.",
    avatar: "https://i.pravatar.cc/128?img=11",
  },
  {
    id: 2,
    testimonial:
      "The level of quality and professionalism was outstanding. Our new brand identity attracted new clients within the very first month of launch.",
    author: "Mohamed Roshdy",
    role: "CEO @ Core Business Ltd.",
    avatar: "https://i.pravatar.cc/128?img=12",
  },
  {
    id: 3,
    testimonial:
      "A true visionary. Ahmed doesn't just design logos — he builds entire brand worlds. We couldn't be happier with our new identity.",
    author: "Abu Mohamed",
    role: "Founder @ Wajhat Al-Nujoom Est.",
    avatar: "https://i.pravatar.cc/128?img=13",
  },
  {
    id: 4,
    testimonial:
      "Exceptional creativity and a deep understanding of our business needs. The design process was smooth and the outcome was spectacular.",
    author: "Ahmed Ali",
    role: "CEO @ Roqay Store",
    avatar: "https://i.pravatar.cc/128?img=14",
  },
];

type Position = "front" | "middle" | "back" | "hidden";

function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  author,
  role,
  avatar,
}: Testimonial & { handleShuffle: () => void; position: Position }) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 3 : position === "middle" ? 2 : position === "back" ? 1 : 0,
      }}
      animate={{
        rotate:
          position === "front"
            ? "-5deg"
            : position === "middle"
            ? "0deg"
            : position === "back"
            ? "5deg"
            : "0deg",
        x:
          position === "front"
            ? "0%"
            : position === "middle"
            ? "30%"
            : position === "back"
            ? "60%"
            : "60%",
        opacity: position === "hidden" ? 0 : 1,
      }}
      drag={isFront}
      dragElastic={0.3}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e: MouseEvent | TouchEvent | PointerEvent) => {
        dragRef.current = (e as PointerEvent).clientX;
      }}
      onDragEnd={(e: MouseEvent | TouchEvent | PointerEvent) => {
        if (dragRef.current - (e as PointerEvent).clientX > 120) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 flex flex-col h-[400px] w-[300px] sm:w-[320px] select-none rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-8 shadow-2xl shadow-black/40 ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      {/* Stars with shimmer on front card */}
      <div className="flex gap-1 mb-5 relative">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
        {isFront && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 1.8,
              delay: 0.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
            style={{ WebkitMaskImage: "linear-gradient(black, black)" }}
          />
        )}
      </div>

      <Quote className="w-7 h-7 text-orange-400 mb-4 opacity-60" />

      <p className="text-white/75 text-base italic leading-relaxed flex-1">
        &ldquo;{testimonial}&rdquo;
      </p>

      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/[0.08]">
        <ImageWithFallback
          src={avatar}
          alt={`Avatar of ${author}`}
          className="w-11 h-11 rounded-full object-cover border border-orange-500/30"
        />
        <div>
          <p className="text-white font-semibold text-sm">{author}</p>
          <p className="text-orange-400 text-xs mt-0.5">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const [positions, setPositions] = React.useState<Position[]>([
    "front",
    "middle",
    "back",
    "hidden",
  ]);

  const handleShuffle = () => {
    setPositions((prev) => {
      const next = [...prev];
      next.unshift(next.pop()!);
      return next;
    });
  };

  return (
    <Reveal>
      <section id="about" className="py-32 max-w-7xl px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-orange-400 font-medium mb-4 tracking-widest text-xs uppercase">
              What Clients Say
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm border rounded-full border-white/10 bg-white/5 backdrop-blur-md">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white/70">Client Reviews</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Trusted by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
                Ambitious
              </span>{" "}
              Brands
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              Don&apos;t take my word for it. Hear from the founders and leaders
              who&apos;ve elevated their brands to the next level.
            </p>

            {/* Gradient-border Next Review button */}
            <div className="relative inline-block rounded-full p-[1px] bg-gradient-to-r from-orange-500 via-pink-500 to-orange-400">
              <button
                onClick={handleShuffle}
                className="relative px-8 py-4 rounded-full bg-neutral-950 text-white/80 hover:text-white transition-all duration-300 text-sm font-semibold tracking-wide hover:bg-neutral-900"
              >
                Next Review →
              </button>
            </div>
          </div>

          {/* Right: Draggable Cards */}
          <div className="flex justify-start lg:justify-center">
            <div className="relative h-[400px] w-[300px] sm:w-[320px] ml-[80px] sm:ml-[120px]">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  {...testimonial}
                  handleShuffle={handleShuffle}
                  position={positions[index]}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
