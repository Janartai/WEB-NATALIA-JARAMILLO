import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, RotateCcw, ArrowRight, ArrowLeft, Sparkles, Eye } from 'lucide-react';

/**
 * ReadymagStackedCards
 * Galería estilo baraja interactiva (Card Deck Shuffle / Stacked Layers).
 * Característica de publicaciones de diseño en Readymag: las piezas descansan
 * en una pila tridimensional con perspectiva y pueden deslizarse o barajarse.
 */
export default function ReadymagStackedCards({
  items = [],
  title = "Stacked Editorial Deck",
  subtitle = "Pila interactiva de cartas / Desliza o baraja",
  onSelectImage
}) {
  const [deck, setDeck] = useState(() => items.map((item, index) => ({ item, index })));
  const [direction, setDirection] = useState(1);

  // Sync if items change
  React.useEffect(() => {
    setDeck(items.map((item, index) => ({ item, index })));
  }, [items]);

  const handleNext = () => {
    if (deck.length <= 1) return;
    setDirection(1);
    setDeck((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const handlePrev = () => {
    if (deck.length <= 1) return;
    setDirection(-1);
    setDeck((prev) => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest];
    });
  };

  const handleReset = () => {
    setDeck(items.map((item, index) => ({ item, index })));
  };

  if (!deck.length) return null;

  const currentItem = deck[0].item;
  const currentIdx = deck[0].index;
  const imgSrc = typeof currentItem === 'string' ? currentItem : currentItem.src || currentItem.coverImage;
  const caption = typeof currentItem === 'object' ? currentItem.caption || currentItem.title : `Pieza #${currentIdx + 1}`;
  const meta = typeof currentItem === 'object' ? currentItem.subtitle || currentItem.meta : 'Exploración Editorial';

  return (
    <div className="relative w-full py-8 text-surface-light select-none font-satoshi">
      {/* Header telemetry */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between px-6 mb-8 gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent-red flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
            READYMAG EDITORIAL // DECK 02
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
            {title}
          </h3>
          <p className="font-mono text-xs text-surface-light/60 mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs text-surface-light/70 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
            <Layers size={13} className="text-accent-red" />
            <span>CARTA {currentIdx + 1} DE {items.length}</span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-full border border-white/15 bg-black/60 hover:bg-white/10 text-surface-light/70 hover:text-white transition-all cursor-pointer"
            title="Reiniciar baraja"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6 max-w-6xl mx-auto">
        
        {/* Left / Center: The 3D Stack */}
        <div className="lg:col-span-7 flex justify-center items-center py-6 min-h-[460px]">
          <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5]">
            <AnimatePresence initial={false} custom={direction}>
              {deck.slice(0, 4).map(({ item, index: originalIdx }, stackIdx) => {
                const itemImg = typeof item === 'string' ? item : item.src || item.coverImage;
                const isTop = stackIdx === 0;

                // 3D layering offsets
                const rotation = isTop ? 0 : (stackIdx % 2 === 0 ? stackIdx * 3.5 : -stackIdx * 3.5);
                const translateY = stackIdx * 14;
                const scale = 1 - stackIdx * 0.05;
                const zIndex = 30 - stackIdx;
                const opacity = 1 - stackIdx * 0.18;

                return (
                  <motion.div
                    key={originalIdx}
                    custom={direction}
                    initial={{ scale: 0.9, y: 30, opacity: 0 }}
                    animate={{
                      scale,
                      y: translateY,
                      rotateZ: rotation,
                      opacity,
                      zIndex
                    }}
                    exit={{
                      x: direction > 0 ? 320 : -320,
                      rotateZ: direction > 0 ? 25 : -25,
                      opacity: 0,
                      transition: { duration: 0.35, ease: 'easeOut' }
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 24
                    }}
                    drag={isTop ? 'x' : false}
                    dragConstraints={{ left: -120, right: 120 }}
                    onDragEnd={(e, info) => {
                      if (info.offset.x > 80) handleNext();
                      else if (info.offset.x < -80) handlePrev();
                    }}
                    whileTap={isTop ? { cursor: 'grabbing' } : undefined}
                    className={`absolute inset-0 rounded-[32px] border-2 ${
                      isTop ? 'border-accent-red shadow-2xl' : 'border-white/10 shadow-lg'
                    } bg-gradient-to-b from-[#18090d] via-[#100608] to-[#0a0506] p-4 flex flex-col justify-between overflow-hidden cursor-grab`}
                  >
                    {/* Top tape element */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-[11px] text-surface-light/60">
                      <span className="font-bold text-accent-red">#{String(originalIdx + 1).padStart(2, '0')}</span>
                      <span className="uppercase text-[9px] tracking-widest text-surface-light/40">
                        {isTop ? 'ACTIVA // ARRASTRA' : `EN ESPERA (${stackIdx})`}
                      </span>
                    </div>

                    {/* Image display */}
                    <div className="relative my-2 flex-1 rounded-2xl overflow-hidden bg-black/90 border border-white/10">
                      <img
                        src={itemImg}
                        alt="Deck item"
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                    </div>

                    {/* Bottom label */}
                    <div className="pt-2 flex items-center justify-between font-mono text-xs text-white">
                      <span className="truncate max-w-[200px] font-bold">
                        {typeof item === 'object' ? item.title || item.caption : `Pieza #${originalIdx + 1}`}
                      </span>
                      <span className="text-[10px] text-accent-red font-semibold">BARAJAR ↗</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Focused Detail & Step Controls */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-6">
          <div className="p-6 rounded-3xl border border-white/15 bg-neutral-950/80 backdrop-blur-md shadow-xl">
            <span className="font-mono text-[10px] uppercase text-accent-red tracking-widest font-bold block mb-1">
              // PIEZA EN PRIMER PLANO
            </span>
            <h4 className="text-3xl font-black text-white tracking-tight">
              {caption}
            </h4>
            <p className="font-mono text-xs text-surface-light/70 mt-2 leading-relaxed">
              {typeof meta === 'object' ? meta.es || meta.en : meta}
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-surface-light/70">
                Interacción: Arrastra la carta a un lado
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-surface-light/70">
                {items.length} piezas en la pila
              </span>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="flex-1 py-3 px-5 rounded-full border border-white/20 bg-black/60 hover:border-accent-red hover:bg-accent-red/20 text-white font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft size={15} />
              <span>CARTA ANTERIOR</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-3 px-5 rounded-full bg-accent-red hover:bg-white hover:text-black text-white font-mono text-xs font-bold tracking-wider shadow-red-laser-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>SIGUIENTE CARTA</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
