import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2, Sparkles, BookOpen, Layers } from 'lucide-react';

/**
 * ReadymagSplitSlider
 * Galería editorial de pantalla dividida (Split Screen Showcase).
 * Frecuente en proyectos de identidad y diseño editorial en Readymag:
 * un lado sostiene la narrativa y tipografía fija, mientras el otro despliega
 * la imagen activa con transiciones cinemáticas y selector numérico.
 */
export default function ReadymagSplitSlider({
  items = [],
  title = "Split Screen Story",
  subtitle = "Narrativa editorial dividida / Tipografía y registro",
  onSelectImage
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) return null;

  const currentItem = items[activeIndex];
  const imgSrc = typeof currentItem === 'string' ? currentItem : currentItem.src || currentItem.coverImage;
  const caption = typeof currentItem === 'object' ? currentItem.caption || currentItem.title : `Pieza #${activeIndex + 1}`;
  const meta = typeof currentItem === 'object' ? currentItem.subtitle || currentItem.meta : 'Documentación Editorial';
  const desc = typeof currentItem === 'object' && currentItem.concept 
    ? (typeof currentItem.concept === 'object' ? currentItem.concept.es : currentItem.concept)
    : "Exploración de forma, retícula y materialidad gráfica. Cada registro dialoga con el concepto central de la pieza.";

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="relative w-full py-8 text-surface-light select-none font-satoshi">
      {/* Header telemetry */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between px-6 mb-6 gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent-red flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
            READYMAG EDITORIAL // SPLIT 04
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
            {title}
          </h3>
          <p className="font-mono text-xs text-surface-light/60 mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Numeric pagination list */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`font-mono text-xs px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'bg-accent-red text-white font-bold shadow-red-laser-sm'
                  : 'bg-white/5 border border-white/10 text-surface-light/60 hover:text-white hover:border-accent-red'
              }`}
            >
              {String(idx + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Split Stage */}
      <div className="px-6">
        <div className="rounded-[36px] border-2 border-white/15 bg-gradient-to-b from-[#18090d] via-[#100608] to-[#0a0506] p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Typographic Narrative */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-accent-red mb-3">
                  <span className="w-2 h-2 rounded-full bg-accent-red animate-ping" />
                  <span>REGISTRO {String(activeIndex + 1).padStart(2, '0')} // {String(items.length).padStart(2, '0')}</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-4"
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-[0.95]">
                      {caption}
                    </h2>
                    
                    <p className="font-mono text-xs text-accent-red font-semibold">
                      {typeof meta === 'object' ? meta.es || meta.en : meta}
                    </p>

                    <p className="text-sm sm:text-base text-surface-light/80 leading-relaxed font-normal pt-2 border-t border-white/10">
                      {desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation controls */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="p-3 rounded-full border border-white/15 bg-black/60 hover:bg-accent-red hover:border-accent-red text-white transition-all cursor-pointer"
                    aria-label="Anterior diapositiva"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="p-3 rounded-full border border-white/15 bg-black/60 hover:bg-accent-red hover:border-accent-red text-white transition-all cursor-pointer"
                    aria-label="Siguiente diapositiva"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>

                <span className="font-mono text-[11px] text-surface-light/40">
                  READYMAG DUAL VIEW
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Frame */}
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-black/90 border border-white/10 shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={imgSrc}
                    alt={caption}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="w-full h-full object-cover filter contrast-105"
                  />
                </AnimatePresence>

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Expand overlay */}
                <button
                  type="button"
                  onClick={() => onSelectImage && onSelectImage(imgSrc, activeIndex)}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-full bg-black/85 backdrop-blur-md border border-accent-red text-white font-mono text-xs flex items-center gap-2 hover:bg-accent-red transition-all cursor-pointer shadow-red-laser-sm"
                >
                  <Maximize2 size={13} />
                  <span>AMPLIAR DETALLE</span>
                </button>
              </div>

              {/* Thumbnails row below visual */}
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                {items.map((item, idx) => {
                  const thumbSrc = typeof item === 'string' ? item : item.src || item.coverImage;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`relative w-16 h-12 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeIndex === idx
                          ? 'border-accent-red scale-105 shadow-red-laser-sm'
                          : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                      }`}
                    >
                      <img src={thumbSrc} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
