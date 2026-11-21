import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Move, RotateCcw, Grid, Maximize2, Sparkles, Pin } from 'lucide-react';

/**
 * ReadymagDraggableCollage
 * Lienzo libre con elementos de collage flotantes y arrastrables.
 * Inspirado en los moodboards y portafolios experimentales de Readymag donde el usuario
 * puede mover fotos, notas con cinta y pósters por el espacio de trabajo libremente.
 */
export default function ReadymagDraggableCollage({
  items = [],
  title = "Freeform Collage Canvas",
  subtitle = "Lienzo libre interactivo / Arrastra y compone a tu gusto",
  onSelectImage
}) {
  const containerRef = useRef(null);
  const [showGrid, setShowGrid] = useState(true);
  const [activeZIndex, setActiveZIndex] = useState(10);
  const [resetKey, setResetKey] = useState(0);

  // Default coordinate layout for up to 8 collage elements
  const defaultPositions = [
    { x: 30, y: 30, rotate: -4, scale: 1 },
    { x: 340, y: 70, rotate: 3, scale: 0.95 },
    { x: 680, y: 40, rotate: -2, scale: 1.05 },
    { x: 140, y: 320, rotate: 5, scale: 1 },
    { x: 500, y: 280, rotate: -5, scale: 0.9 },
    { x: 820, y: 260, rotate: 4, scale: 1.02 },
    { x: 300, y: 520, rotate: -2, scale: 0.95 },
    { x: 660, y: 540, rotate: 3, scale: 1 },
  ];

  const handleBringToFront = (e) => {
    e.stopPropagation();
    setActiveZIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setResetKey((k) => k + 1);
  };

  return (
    <div className="relative w-full py-8 text-surface-light select-none font-satoshi">
      {/* Header telemetry */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between px-6 mb-6 gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent-red flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
            READYMAG EDITORIAL // COLLAGE 03
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
            {title}
          </h3>
          <p className="font-mono text-xs text-surface-light/60 mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            className={`px-3 py-1.5 rounded-full border font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              showGrid
                ? 'bg-accent-red/20 border-accent-red text-white'
                : 'bg-black/60 border-white/15 text-surface-light/60 hover:text-white'
            }`}
          >
            <Grid size={13} />
            <span>RETÍCULA</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-full border border-white/15 bg-black/60 hover:bg-white/10 text-surface-light/70 hover:text-white transition-all cursor-pointer"
            title="Reiniciar posiciones"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Interactive Freeform Canvas */}
      <div className="px-6">
        <div
          ref={containerRef}
          key={resetKey}
          className={`relative w-full min-h-[620px] sm:min-h-[720px] rounded-[36px] border-2 border-white/15 bg-neutral-950 overflow-hidden shadow-2xl ${
            showGrid ? 'bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]' : ''
          }`}
        >
          {/* Canvas telemetry watermark */}
          <div className="absolute top-4 left-6 pointer-events-none font-mono text-[11px] text-surface-light/30 flex items-center gap-2">
            <Move size={12} className="text-accent-red" />
            <span>LIENZO DINÁMICO // ARRASTRA LAS PIEZAS LIBREMENTE</span>
          </div>

          <div className="absolute bottom-4 right-6 pointer-events-none font-mono text-[10px] text-surface-light/25">
            READYMAG ARTBOARD V.26
          </div>

          {/* Draggable Collage Elements */}
          {items.slice(0, 8).map((item, idx) => {
            const imgSrc = typeof item === 'string' ? item : item.src || item.coverImage;
            const caption = typeof item === 'object' ? item.caption || item.title : `Fragmento #${idx + 1}`;
            const pos = defaultPositions[idx] || defaultPositions[0];

            return (
              <motion.div
                key={`${idx}-${resetKey}`}
                drag
                dragConstraints={containerRef}
                dragMomentum={true}
                dragElastic={0.05}
                initial={{
                  x: pos.x,
                  y: pos.y,
                  rotate: pos.rotate,
                  scale: 0.9,
                  opacity: 0
                }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  rotate: pos.rotate,
                  scale: pos.scale,
                  opacity: 1
                }}
                whileHover={{
                  scale: pos.scale * 1.04,
                  cursor: 'grab'
                }}
                whileDrag={{
                  scale: pos.scale * 1.08,
                  zIndex: 100,
                  cursor: 'grabbing',
                  boxShadow: "0 25px 50px -12px rgba(200, 10, 31, 0.4)"
                }}
                onMouseDown={handleBringToFront}
                className="absolute w-[220px] sm:w-[270px] rounded-2xl border border-white/20 bg-gradient-to-b from-[#18090d] to-[#0a0506] p-3 shadow-xl backdrop-blur-md"
                style={{ zIndex: idx + 5 }}
              >
                {/* Visual Tape Element */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/75 backdrop-blur-sm border border-neutral-300 transform -rotate-2 opacity-85 shadow pointer-events-none z-10" />

                {/* Top bar with pin icon */}
                <div className="flex items-center justify-between pb-1.5 border-b border-white/10 font-mono text-[10px] text-surface-light/50">
                  <span className="text-accent-red font-bold">#{String(idx + 1).padStart(2, '0')}</span>
                  <div className="flex items-center gap-1">
                    <Pin size={10} className="text-accent-red" />
                    <span>PIN</span>
                  </div>
                </div>

                {/* Image frame */}
                <div className="relative my-2 w-full h-[160px] sm:h-[190px] rounded-xl overflow-hidden bg-black/90 border border-white/10">
                  <img
                    src={imgSrc}
                    alt={caption}
                    className="w-full h-full object-cover select-none pointer-events-none filter contrast-105"
                  />
                  
                  {/* Expand button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectImage) onSelectImage(imgSrc, idx);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 hover:bg-accent-red text-white transition-colors cursor-pointer"
                    title="Ampliar detalle"
                  >
                    <Maximize2 size={11} />
                  </button>
                </div>

                {/* Bottom title */}
                <div className="pt-1.5 flex items-center justify-between font-mono text-[11px] text-white">
                  <span className="truncate max-w-[170px] font-bold">{caption}</span>
                  <span className="text-[9px] text-accent-red">COLLAGE</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
