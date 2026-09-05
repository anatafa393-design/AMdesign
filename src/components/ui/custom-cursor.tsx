"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag">("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const ringSpringX = useSpring(ringX, springConfig);
  const ringSpringY = useSpring(ringY, springConfig);

  useEffect(() => {
    // Hide on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const viewElement = target.closest("[data-cursor='view']");
      const dragElement = target.closest("[data-cursor='drag']");
      const isInteractive = target.closest("a, button, [data-cursor-hover], input, textarea, select");
      
      if (viewElement) {
        setCursorType("view");
        setCursorText("VIEW");
      } else if (dragElement) {
        setCursorType("drag");
        setCursorText("DRAG");
      } else if (isInteractive) {
        setCursorType("hover");
        setCursorText("");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dynamic Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-white mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={
          cursorType === "default"
            ? { width: 8, height: 8 }
            : { width: 0, height: 0 }
        }
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />

      {/* Dynamic Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-white/40 mix-blend-difference flex items-center justify-center overflow-hidden"
        style={{
          x: ringSpringX,
          y: ringSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={
          cursorType === "default"
            ? {
                width: 36,
                height: 36,
                backgroundColor: "rgba(255, 255, 255, 0)",
                borderColor: "rgba(255, 255, 255, 0.4)",
              }
            : cursorType === "hover"
            ? {
                width: 56,
                height: 56,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.8)",
              }
            : cursorType === "view"
            ? {
                width: 75,
                height: 75,
                backgroundColor: "#800020",
                borderColor: "#800020",
              }
            : {
                width: 60,
                height: 60,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderColor: "rgba(255, 255, 255, 0.9)",
              }
        }
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className={`text-[10px] font-bold tracking-widest uppercase select-none ${
                cursorType === "drag" ? "text-black" : "text-white"
              }`}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
