import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2, Sparkles } from 'lucide-react';

/**
 * ReadymagHorizontalScroll
 * Galería editorial horizontal con deslizamiento continuo, arrastre táctil (drag inertia),
 * barra de progreso milimétrica y tarjetas editoriales numeradas.
 */
export default function ReadymagHorizontalScroll({
  items = [],
  title = "Horizontal Stream",
  subtitle = "Readymag-Style Horizontal Gallery",
  onSelectImage,
  accentColor = "#c80a1f"
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const x = useMotionValue(0);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        const maxScroll = Math.min(0, containerWidth - trackWidth - 40);
        setConstraints({ left: maxScroll, right: 0 });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [items]);

  // Track progress based on x value
  useEffect(() => {
    return x.on('change', (latest) => {
      if (constraints.left < 0) {
        const progress = Math.min(100, Math.max(0, (latest / constraints.left) * 100));
        setScrollProgress(progress);
        const approxIdx = Math.round((progress / 100) * (items.length - 1));
        setActiveIdx(approxIdx);
      }
    });
  }, [constraints, items.length, x]);

  const slideBy = (delta) => {
    const current = x.get();
    const next = Math.max(constraints.left, Math.min(0, current + delta));
    x.set(next);
  };

  return (
    <div className="relative w-full py-8 text-surface-light select-none font-satoshi overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between px-6 mb-6 gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent-red flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
            READYMAG EDITORIAL // STREAM 01
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
            {title}
          </h3>
          <p className="font-mono text-xs text-surface-light/60 mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Counter and manual arrows */}
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs text-surface-light/70 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-accent-red font-bold">{String(activeIdx + 1).padStart(2, '0')}</span>
            <span className="text-white/40 mx-1">/</span>
            <span>{String(items.length).padStart(2, '0')}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => slideBy(400)}
              className="p-2 rounded-full border border-white/15 bg-black/60 hover:bg-accent-red hover:border-accent-red text-white transition-all cursor-pointer"
              aria-label="Anterior"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => slideBy(-400)}
              className="p-2 rounded-full border border-white/15 bg-black/60 hover:bg-accent-red hover:border-accent-red text-white transition-all cursor-pointer"
              aria-label="Siguiente"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Draggable Filmstrip Track */}
      <div ref={containerRef} className="cursor-grab active:cursor-grabbing px-6">
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.08}
          dragTransition={{ power: 0.25, timeConstant: 250 }}
          className="flex items-stretch gap-6 w-max py-2"
        >
          {items.map((item, idx) => {
            const imgSrc = typeof item === 'string' ? item : item.src || item.coverImage;
            const caption = typeof item === 'object' ? item.caption || item.title : `Pieza #${idx + 1}`;
            const meta = typeof item === 'object' ? item.meta || item.subtitle : 'Registro Editorial';

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                onClick={() => onSelectImage && onSelectImage(imgSrc, idx)}
                className="group relative flex flex-col justify-between w-[280px] sm:w-[360px] md:w-[420px] rounded-3xl border border-white/15 bg-gradient-to-b from-[#18090d] via-[#100608] to-[#0a0506] p-4 shadow-xl hover:border-accent-red/80 hover:shadow-red-laser-sm transition-all duration-300"
              >
                {/* Top index pill */}
                <div className="flex items-center justify-between pb-2.5 border-b border-white/10 font-mono text-[11px] text-surface-light/60">
                  <span className="font-bold text-accent-red">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="uppercase text-[10px] tracking-wider text-surface-light/40">
                    DIAPOSITIVA HORIZONTAL
                  </span>
                </div>

                {/* Image frame */}
                <div className="relative my-3 w-full h-[240px] sm:h-[300px] rounded-2xl overflow-hidden bg-black/80 border border-white/10">
                  <img
                    src={imgSrc}
                    alt={caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/80 border border-accent-red text-white font-mono text-xs flex items-center gap-1.5 shadow-lg">
                      <Maximize2 size={13} className="text-accent-red" />
                      AMPLIAR
                    </span>
                  </div>
                </div>

                {/* Bottom caption */}
                <div className="pt-2 border-t border-white/10">
                  <h4 className="font-bold text-sm sm:text-base text-white tracking-tight line-clamp-1 group-hover:text-accent-red transition-colors">
                    {caption}
                  </h4>
                  <p className="font-mono text-xs text-surface-light/50 mt-0.5 line-clamp-1">
                    {typeof meta === 'object' ? meta.es || meta.en : meta}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Progress track at bottom */}
      <div className="px-6 mt-6 flex items-center gap-4">
        <span className="font-mono text-[10px] text-surface-light/40 tracking-wider">
          0%
        </span>
        <div className="relative flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            style={{ width: `${scrollProgress}%` }}
            className="h-full bg-accent-red shadow-red-laser-sm rounded-full transition-all duration-75"
          />
        </div>
        <span className="font-mono text-[10px] text-accent-red font-bold tracking-wider">
          {Math.round(scrollProgress)}%
        </span>
      </div>
    </div>
  );
}
