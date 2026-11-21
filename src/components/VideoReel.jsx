import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Film } from 'lucide-react';
import { uiTranslations } from '../data/translations';
import KineticText from './KineticText';

/**
 * VideoReel: Analog Editorial Stacked Paper Presentation
 * Clean fine-art print stack with zero text clutter on the video canvas,
 * accompanied by a discreet section header above the composition.
 */
export default function VideoReel({ language = 'es' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const t = uiTranslations[language]?.reel || {};

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(curr);
    setProgress((curr / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * (videoRef.current.duration || 1);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleFullscreen = (e) => {
    e?.stopPropagation();
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 overflow-visible">
      
      {/* 1. Discreet Section Header (Matches section aesthetic but compact) */}
      <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-xs uppercase text-accent-red tracking-wider flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
            {t.tag || (language === 'es' ? 'REGISTRO AUDIOVISUAL // REEL' : 'MOTION RECORD // REEL')}
          </span>
          <KineticText
            text={language === 'es' ? 'Showreel Audiovisual' : 'Audiovisual Showreel'}
            as="h2"
            className="text-2xl sm:text-4xl font-black text-white tracking-tight"
          />
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-surface-light/60">
          <Film size={13} className="text-accent-red" />
          <span>{language === 'es' ? 'DIRECCIÓN DE ARTE // 2024 — 2026' : 'ART DIRECTION // 2024 — 2026'}</span>
        </div>
      </div>

      {/* 2. Outer Stacked Paper Assembly (Matches Reference Image with Piled Sheets) */}
      <motion.div 
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl mx-auto select-none group/reel"
      >

        {/* =========================================================================
            LAYER 1: Deepest Warm Proof Sheet (tilted to the left)
            ========================================================================= */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 -top-3 sm:-top-5 -left-3 sm:-left-6 -bottom-2 bg-[#ebe3d3] rounded-[2px] shadow-[0_12px_28px_rgba(0,0,0,0.6)] border border-[#dcd3be] pointer-events-none transform -rotate-[1.8deg] transition-transform duration-500 group-hover/reel:-rotate-[2.2deg]"
        >
          {/* Subtle archival crop marks */}
          <div className="absolute top-2 left-2 text-[#a89e87] font-mono text-[8px] sm:text-[9px] tracking-widest opacity-60">
            + PROOF // 01
          </div>
          <div className="absolute bottom-2 left-2 text-[#a89e87] font-mono text-[8px] sm:text-[9px] tracking-widest opacity-60">
            NATALIA JARAMILLO
          </div>
        </div>

        {/* =========================================================================
            LAYER 2: Dark Contact Sheet / Photographic Print (tilted to the right)
            ========================================================================= */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 -top-2 sm:-top-4 -right-3 sm:-right-5 -bottom-1 bg-[#1a1718] rounded-[2px] shadow-[0_15px_32px_rgba(0,0,0,0.7)] border border-white/10 pointer-events-none transform rotate-[1.6deg] transition-transform duration-500 group-hover/reel:rotate-[2.0deg]"
        >
          {/* Inner hairline border */}
          <div className="absolute inset-1.5 border border-white/5 rounded-[1px]" />
          <div className="absolute top-2 right-3 text-white/30 font-mono text-[8px] tracking-widest">
            CONTACT SHEET // REEL
          </div>
        </div>

        {/* =========================================================================
            LAYER 3: Middle Ivory Archival Sheet (subtle offset at bottom)
            ========================================================================= */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 top-2 sm:top-3 right-1 sm:right-2 -bottom-3 sm:-bottom-4 bg-[#f3ede2] rounded-[2px] shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-[#ded5c2] pointer-events-none transform -rotate-[0.5deg]"
        />

        {/* =========================================================================
            TOP LAYER: Primary Art Print Frame (Directly Houses the Video)
            ========================================================================= */}
        <div className="relative bg-[#faf7f2] p-2.5 sm:p-4 md:p-5 rounded-[3px] shadow-[0_22px_55px_rgba(0,0,0,0.9),0_0_35px_rgba(200,10,31,0.12)] border border-[#e8dfcf] transform rotate-0 transition-transform duration-500 group-hover/reel:scale-[1.004]">
          
          {/* Top Drafting Tape Strip (holds the stack physically) */}
          <div 
            aria-hidden="true"
            className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none w-28 sm:w-36 h-6 sm:h-7 bg-neutral-100/60 backdrop-blur-[2px] border border-white/50 shadow-[0_2px_6px_rgba(0,0,0,0.35)] rounded-[1px] rotate-[-0.4deg]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 4px)',
            }}
          />

          {/* Clean Video Screen Container (No Clutter on Canvas) */}
          <div 
            onClick={togglePlay}
            className="relative w-full aspect-[16/9] bg-black rounded-[2px] overflow-hidden cursor-pointer group/screen border border-black/20 shadow-inner flex items-center justify-center"
          >
            {/* HTML5 Native Video Element */}
            <video
              ref={videoRef}
              src="/assets/videos/VIDEO REEL NATALIA JARAMILLO.mp4"
              poster="/assets/images/about/PORTAFOLIO NATALIA JARAMILLO ARISMENDI-02.png"
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover filter contrast-105"
            />

            {/* Subtle Vignette for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

            {/* Pure Play Icon (Centered, without text clutter) */}
            {!isPlaying && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] transition-all z-20 pointer-events-none"
              >
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent-red text-white flex items-center justify-center shadow-2xl shadow-red-laser hover:scale-110 transition-transform pointer-events-auto cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  title="Reproducir video"
                >
                  <Play size={28} className="ml-1 text-white fill-white" />
                </div>
              </motion.div>
            )}

            {/* Floating Minimal Controls Bar (Fades in on Hover) */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex flex-col gap-1.5 bg-black/85 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/15 shadow-2xl opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300"
            >
              {/* Progress Bar */}
              <div 
                onClick={handleSeek}
                className="relative w-full h-1.5 sm:h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden group/bar"
              >
                <div 
                  style={{ width: `${progress}%` }}
                  className="h-full bg-accent-red shadow-red-laser-sm rounded-full transition-all"
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-white font-mono text-xs pt-0.5">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={togglePlay}
                    className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                  </button>

                  <button 
                    onClick={toggleMute}
                    className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>

                  <span className="text-surface-light/70 text-[10px] sm:text-[11px]">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <button 
                  onClick={toggleFullscreen}
                  className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
                  aria-label="Pantalla completa"
                >
                  <Maximize2 size={14} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </motion.div>
    </section>
  );
}
