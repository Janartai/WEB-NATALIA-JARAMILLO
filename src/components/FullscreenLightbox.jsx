import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function FullscreenLightbox({ 
  images = [], 
  currentIndex = 0, 
  onClose, 
  onNavigate 
}) {
  const [zoomLevel, setZoomLevel] = useState(1);

  const activeSrc = images[currentIndex] || '';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  const handleZoomToggle = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.6 : prev === 1.6 ? 2.2 : 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 select-none"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between z-20 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-red animate-pulse" />
          <span className="font-mono text-xs text-white font-bold tracking-wider">
            ALTA DEFINICIÓN // PIEZA #{currentIndex + 1} DE {images.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Toggle */}
          <button
            onClick={handleZoomToggle}
            className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-accent-red transition-all flex items-center gap-1.5 font-mono text-xs"
            title="Cambiar escala"
          >
            {zoomLevel === 1 ? <ZoomIn size={16} /> : <ZoomOut size={16} />}
            <span className="hidden sm:inline">{zoomLevel}x</span>
          </button>

          {/* Reset Zoom if zoomed */}
          {zoomLevel > 1 && (
            <button
              onClick={() => setZoomLevel(1)}
              className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-accent-red transition-all"
              title="Restablecer"
            >
              <RotateCcw size={16} />
            </button>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-accent-red hover:border-accent-red hover:shadow-red-laser-sm transition-all"
            aria-label="Cerrar vista"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Center Image Stage */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
              className="absolute left-2 sm:left-6 z-30 p-3 sm:p-4 rounded-full bg-black/80 border border-white/20 text-white hover:bg-accent-red hover:border-accent-red hover:shadow-red-laser-sm transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => onNavigate((currentIndex + 1) % images.length)}
              className="absolute right-2 sm:right-6 z-30 p-3 sm:p-4 rounded-full bg-black/80 border border-white/20 text-white hover:bg-accent-red hover:border-accent-red hover:shadow-red-laser-sm transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          {activeSrc.toLowerCase().includes('.mp4') || activeSrc.toLowerCase().includes('.webm') ? (
            <motion.video
              key={activeSrc}
              src={activeSrc}
              controls
              autoPlay
              muted
              loop
              playsInline
              controlsList="nodownload noplaybackrate"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              className="max-h-[82vh] max-w-[92vw] object-contain rounded-2xl border border-accent-red/60 shadow-2xl shadow-red-laser no-audio-controls"
            />
          ) : (
            <motion.img
              key={activeSrc + zoomLevel}
              src={activeSrc}
              alt={`Pieza ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: zoomLevel }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              style={{
                cursor: zoomLevel > 1 ? 'grab' : 'zoom-in',
              }}
              onClick={handleZoomToggle}
              className="max-h-[82vh] max-w-[92vw] object-contain rounded-2xl border border-accent-red/60 shadow-2xl shadow-red-laser"
              onError={(e) => {
                e.target.src = "/assets/images/about/profile.png";
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Microstrip */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-20">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`w-12 h-9 rounded-lg overflow-hidden border transition-all ${
              currentIndex === i
                ? 'border-accent-red ring-2 ring-accent-red scale-110'
                : 'border-white/20 opacity-40 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Mini ${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
