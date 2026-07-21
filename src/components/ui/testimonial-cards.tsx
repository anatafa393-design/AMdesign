"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Reveal from "@/components/ui/reveal-on-scroll";
import { useLanguage } from "@/context/LanguageContext";

interface Testimonial {
  id: number;
  testimonialEn: string;
  testimonialAr: string;
  authorEn: string;
  authorAr: string;
  roleEn: string;
  roleAr: string;
  avatar: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    testimonialEn:
      "Ahmed completely transformed our brand from the ground up. Every single detail was crafted with clear intention and the final result exceeded all our expectations.",
    testimonialAr:
      "أحمد قام بتحويل علامتنا التجارية بالكامل من الصفر. كل تفصيلة تم صياغتها بعناية فائقة ونتيجة التصميم فاقت كل توقعاتنا.",
    authorEn: "Naji Qasim",
    authorAr: "ناجي قاسم",
    roleEn: "Manager @ Sarh Al-Masia Al-Raeda Holding Co.",
    roleAr: "مدير شركة صرح الماسية الرائدة القابضة",
    avatar: "https://i.pravatar.cc/128?img=11",
  },
  {
    id: 2,
    testimonialEn:
      "The level of quality and professionalism was outstanding. Our new brand identity attracted new clients within the very first month of launch.",
    testimonialAr:
      "مستوى الجودة والاحترافية كان استثنائياً. الهوية البصرية الجديدة جذبت لنا عملاء جدد خلال الشهر الأول فقط من إطلاقها.",
    authorEn: "Mohamed Roshdy",
    authorAr: "محمد رشدي",
    roleEn: "CEO @ Core Business Ltd.",
    roleAr: "الرئيس التنفيذي لشركة كور بيزنس",
    avatar: "https://i.pravatar.cc/128?img=12",
  },
  {
    id: 3,
    testimonialEn:
      "A true visionary. Ahmed doesn't just design logos — he builds entire brand worlds. We couldn't be happier with our new identity.",
    testimonialAr:
      "مصمم مبدع ورؤيوي حقيقي. أحمد لا يصمم مجرد شعارات، بل يبني عوالم كاملة للعلامة التجارية. نحن سعداء جداً بالنتيجة.",
    authorEn: "Abu Mohamed",
    authorAr: "أبو محمد",
    roleEn: "Founder @ Wajhat Al-Nujoom Est.",
    roleAr: "مؤسس مؤسسة واجهة النجوم",
    avatar: "https://i.pravatar.cc/128?img=13",
  },
  {
    id: 4,
    testimonialEn:
      "Exceptional creativity and a deep understanding of our business needs. The design process was smooth and the outcome was spectacular.",
    testimonialAr:
      "إبداع استثنائي وفهم عميق لاحتياجات عملنا. رحلة العمل والتصميم كانت سلسة وممتعة والنتيجة النهائية كانت مبهرة.",
    authorEn: "Ahmed Ali",
    authorAr: "أحمد علي",
    roleEn: "CEO @ Roqay Store",
    roleAr: "الرئيس التنفيذي لمتجر رقي",
    avatar: "https://i.pravatar.cc/128?img=14",
  },
];

type Position = "front" | "middle" | "back" | "hidden";

function TestimonialCard({
  id,
  handleShuffle,
  position,
  testimonial,
  author,
  role,
  avatar,
}: {
  id?: number;
  handleShuffle: () => void;
  position: Position;
  testimonial: string;
  author: string;
  role: string;
  avatar: string;
}) {
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
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`absolute left-0 top-0 w-full max-w-[520px] rounded-3xl p-8 cursor-grab active:cursor-grabbing select-none border border-white/10 backdrop-blur-xl ${
        isFront
          ? "bg-gradient-to-br from-white/15 via-white/10 to-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          : "bg-white/5 opacity-60 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <Quote className="w-10 h-10 text-orange-400 opacity-60" />
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
          ))}
        </div>
      </div>

      <p className="text-white/90 text-lg leading-relaxed mb-8 font-medium">
        &ldquo;{testimonial}&rdquo;
      </p>

      <div className="flex items-center gap-4 border-t border-white/10 pt-6">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
          <ImageWithFallback
            src={avatar}
            alt={author}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h4 className="text-white font-bold text-base font-brand">{author}</h4>
          <p className="text-white/50 text-xs">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const { language, t } = useLanguage();
  const [order, setOrder] = React.useState([1, 2, 3, 4]);

  const handleShuffle = () => {
    setOrder((prev) => {
      const copy = [...prev];
      const first = copy.shift()!;
      copy.push(first);
      return copy;
    });
  };

  const getPosition = (id: number): Position => {
    const idx = order.indexOf(id);
    if (idx === 0) return "front";
    if (idx === 1) return "middle";
    if (idx === 2) return "back";
    return "hidden";
  };

  return (
    <section id="about" className="relative bg-[#050505] py-28 px-6 md:px-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Section Header */}
        <Reveal>
          <div className="flex flex-col items-start gap-6">
            <span className="text-xs font-bold tracking-widest uppercase text-orange-400 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20">
              {t.testimonials.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-brand leading-tight">
              {t.testimonials.title}
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-md">
              {t.testimonials.subtitle}
            </p>
            <button
              onClick={handleShuffle}
              className="mt-4 px-6 py-3 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-all duration-300 active:scale-95"
            >
              {language === "ar" ? "المراجعة التالية ←" : "Next Testimonial →"}
            </button>
          </div>
        </Reveal>

        {/* Right: Stacked Cards */}
        <div className="relative h-[360px] w-full flex items-center justify-center lg:justify-start">
          {testimonialsData.map((item) => (
            <TestimonialCard
              key={item.id}
              position={getPosition(item.id)}
              handleShuffle={handleShuffle}
              testimonial={language === "ar" ? item.testimonialAr : item.testimonialEn}
              author={language === "ar" ? item.authorAr : item.authorEn}
              role={language === "ar" ? item.roleAr : item.roleEn}
              avatar={item.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
