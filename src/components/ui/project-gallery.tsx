"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface GalleryItem {
  id: string;
  type: string;
  content: string;
}

interface ProjectGalleryProps {
  gallery: GalleryItem[];
  layout?: "masonry" | "grid";
}

export default function ProjectGallery({ gallery, layout = "masonry" }: ProjectGalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => {
    setActiveIdx(idx);
  };

  const closeLightbox = () => {
    setActiveIdx(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % gallery.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + gallery.length) % gallery.length);
    }
  };

  const isGrid = layout === "grid";

  return (
    <div className="w-full" dir="ltr" style={{ direction: "ltr" }}>
      {isGrid ? (
        /* Uniform Grid Layout (Keeps page order sequential left-to-right) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, i) => (
            <div
              key={item.id || i}
              onClick={() => item.type === "image" && openLightbox(i)}
              className={`w-full rounded-2xl overflow-hidden shadow-xl shadow-black/40 border border-white/10 bg-white/5 transition-all duration-300 group flex flex-col justify-between ${
                item.type === "image" ? "cursor-zoom-in hover:border-orange-500/40 hover:scale-[1.02]" : ""
              }`}
            >
              {item.type === "image" && (
                <div className="relative w-full overflow-hidden flex-grow flex items-center justify-center bg-black/20" style={{ aspectRatio: "1.414/1" }}>
                  <Image
                    src={item.content}
                    alt={`Showcase artboard ${i + 1}`}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      e.currentTarget.srcset = "";
                      e.currentTarget.src = "/placeholder.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="w-8 h-8 text-white drop-shadow-md scale-75 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                </div>
              )}
              {item.type === "video" && (
                <video
                  src={item.content}
                  controls
                  className="w-full h-auto object-contain"
                />
              )}
              {item.type === "text" && (
                <div className="p-8 bg-[#0d0d0d] text-center w-full flex-grow flex items-center justify-center">
                  <p className="text-lg text-white/90 leading-relaxed font-light">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Masonry Grid Layout (Best for mixed dimensions) */
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {gallery.map((item, i) => (
            <div
              key={item.id || i}
              onClick={() => item.type === "image" && openLightbox(i)}
              className={`break-inside-avoid inline-block w-full mb-6 rounded-2xl overflow-hidden shadow-xl shadow-black/40 border border-white/10 bg-white/5 transition-all duration-300 group ${
                item.type === "image" ? "cursor-zoom-in hover:border-orange-500/40 hover:scale-[1.02]" : ""
              }`}
            >
              {item.type === "image" && (
                <div className="relative overflow-hidden">
                  <Image
                    src={item.content}
                    alt={`Showcase artboard ${i + 1}`}
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    width={1200}
                    height={1200}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      e.currentTarget.srcset = "";
                      e.currentTarget.src = "/placeholder.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="w-8 h-8 text-white drop-shadow-md scale-75 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                </div>
              )}
              {item.type === "video" && (
                <video
                  src={item.content}
                  controls
                  className="w-full h-auto object-contain"
                />
              )}
              {item.type === "text" && (
                <div className="p-8 bg-[#0d0d0d] text-center">
                  <p className="text-lg text-white/90 leading-relaxed font-light">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Premium Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300 z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Pagination Indicator */}
            <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm z-50 select-none">
              {activeIdx + 1} / {gallery.length}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-6 p-4 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300 z-50 cursor-pointer hidden md:flex"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 p-4 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300 z-50 cursor-pointer hidden md:flex"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Content */}
            <motion.div
              key={activeIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90vw] max-h-[85vh] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[activeIdx].content}
                alt={`Showcase full artboard ${activeIdx + 1}`}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl border border-white/5 cursor-default select-none"
                width={1920}
                height={1080}
                sizes="100vw"
                onError={(e) => {
                  e.currentTarget.srcset = "";
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
