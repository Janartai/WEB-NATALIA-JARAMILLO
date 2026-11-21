import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, 
  Maximize2
} from 'lucide-react';
import SoftwareIcon from './SoftwareIcon';
import FullscreenLightbox from './FullscreenLightbox';
import PhoneMockup from './PhoneMockup';
import UiPhonesCarousel from './UiPhonesCarousel';

/**
 * ProjectDetailView
 * Seamless editorial presentation rendered directly on the smoke background:
 * 1. Top Bar: Return to catalog + Prev/Next switcher + Behance link + Close.
 * 2. Header: Left hanging bookmark ribbon (Proyecto 01) + Monumental Title & Subtitle.
 * 3. Top Tripartite Block:
 *    - Left: "EL CONCEPTO" (Two cream paper cards).
 *    - Center: Lead hero mockup cycling through project images automatically.
 *    - Right: "EL RETO:" cream paper note with tape + CATEGORÍAS.
 * 4. Full-width horizontal text for "// SOLUCIÓN & IMPACTO" (spanning total page width).
 * 5. RECONOCIDO banner.
 * 6. Big central interactive gallery of spreads (auto-advancing with arrows & dots).
 * 7. Non-repeating 3-piece grid of complementary images.
 * 8. Bottom Row: AÑO | PROGRAMAS UTILIZADOS | CRÉDITOS (Taped cream paper cards).
 * 9. Bottom Navigation Bar.
 */
export default function ProjectDetailView({ 
  project, 
  allProjects = [], 
  onClose, 
  onSelectProject, 
  language = 'es' 
}) {
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [activeSecondGalleryIdx, setActiveSecondGalleryIdx] = useState(0);
  const [leadHeroIdx, setLeadHeroIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // All images
  const allImages = project?.images || [project?.coverImage];
  const leadImage = project?.coverImage || allImages[0];

  // Scroll smoothly to top on project load & reset gallery indexes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveGalleryIdx(0);
    setActiveSecondGalleryIdx(0);
    setLeadHeroIdx(0);
  }, [project?.id]);

  // Auto-cycle lead images in the top center mockup (every 3.2 seconds)
  useEffect(() => {
    if (!allImages || allImages.length <= 1) return;
    const interval = setInterval(() => {
      setLeadHeroIdx((prev) => (prev + 1) % allImages.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [allImages, project?.id]);

  // 1. Spreads for first central gallery (typically indices 1, 2, 3)
  const spreadImages = React.useMemo(() => {
    if (!allImages || allImages.length <= 1) return [leadImage];
    if (allImages.length > 3) return allImages.slice(1, 4);
    return allImages.slice(1);
  }, [allImages, leadImage]);

  // Auto-cycle spreads in the big central gallery (every 3.5 seconds)
  useEffect(() => {
    if (!spreadImages || spreadImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveGalleryIdx((prev) => (prev + 1) % spreadImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [spreadImages.length, project?.id]);

  // 2. Row 1 of 3 small images (indices 4, 5, 6)
  const row1Images = React.useMemo(() => {
    if (allImages.length >= 7) return allImages.slice(4, 7);
    if (allImages.length > 4) return allImages.slice(4);
    const used = new Set([allImages[0], ...spreadImages]);
    return allImages.filter(img => !used.has(img)).slice(0, 3);
  }, [allImages, spreadImages]);

  // 3. Row 2 of other 3 small images (indices 7, 8, 9)
  const row2Images = React.useMemo(() => {
    if (allImages.length >= 10) return allImages.slice(7, 10);
    const used = new Set([allImages[0], ...spreadImages, ...row1Images]);
    const rem = allImages.filter(img => !used.has(img));
    if (rem.length >= 3) return rem.slice(0, 3);
    return [];
  }, [allImages, spreadImages, row1Images]);

  // 4. Second big image(s) right before final cards (indices 10 onwards)
  const secondBigImages = React.useMemo(() => {
    if (allImages.length > 10) return allImages.slice(10);
    const used = new Set([allImages[0], ...spreadImages, ...row1Images, ...row2Images]);
    const rem = allImages.filter(img => !used.has(img));
    if (rem.length > 0) return rem;
    return [];
  }, [allImages, spreadImages, row1Images, row2Images]);

  // Auto-cycle second big gallery if multiple images (every 4.2 seconds)
  useEffect(() => {
    if (!secondBigImages || secondBigImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSecondGalleryIdx((prev) => (prev + 1) % secondBigImages.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [secondBigImages.length, project?.id]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxIdx !== null) {
          setLightboxIdx(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, lightboxIdx]);

  if (!project) return null;

  // Calculate Next and Previous project
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  // Helper for recognition text: STRICTLY ONLY for rebel, sincronika, and terralma!
  const getRecognitionText = () => {
    const pid = (project.id || '').toLowerCase();
    if (pid === 'rebel') {
      return language === 'es'
        ? 'como Mejor Proyecto Integrador de Aula en el año 2024 por su desarrollo narrativo editorial y propósito de interacción física.'
        : 'as Best Classroom Capstone Project in 2024 for its editorial narrative development and physical interaction purpose.';
    }
    if (pid === 'sincronika') {
      return language === 'es'
        ? 'como Mejor Proyecto Integrador de Aula en el año 2026 por su conceptualización y desarrollo estratégico de marca para Filarmed.'
        : 'as Best Classroom Capstone Project in 2026 for its conceptualization and strategic brand development for Filarmed.';
    }
    if (pid.includes('terralma')) {
      return language === 'es'
        ? 'como Proyecto Destacado en Diseño de Empaques y Sostenibilidad Artesanal en el año 2026.'
        : 'as Featured Project in Packaging Design & Artisanal Sustainability in 2026.';
    }
    // For all other projects, return null so NO "RECONOCIDO" banner is shown!
    return null;
  };

  const recognitionText = getRecognitionText();
  const isUiProject = project.discipline === 'ui' || project.isPhoneMockup;

  // Concept split: top card (quote) and second card (detail)
  const conceptFull = project.concept ? project.concept[language] : '';
  const conceptFirstSentence = conceptFull.includes('.') 
    ? conceptFull.split('.')[0] + '.' 
    : conceptFull;
  const conceptSecondPart = conceptFull.includes('.') 
    ? conceptFull.substring(conceptFull.indexOf('.') + 1).trim() 
    : '';

  return (
    <article className="relative min-h-screen text-surface-light px-4 sm:px-6 lg:px-8 py-6 md:py-10 max-w-7xl mx-auto w-full select-text">
      
      {/* =========================================================================
          1. TOP MINIMALIST NAV BAR
      ========================================================================= */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 font-mono text-xs">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-accent-red hover:bg-accent-red/20 text-white transition-all group cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>{language === 'es' ? 'VOLVER AL CATÁLOGO' : 'BACK TO CATALOG'}</span>
        </button>

        <div className="hidden md:flex items-center gap-2 text-surface-light/60">
          <span className="text-accent-red font-bold">//</span>
          <span>{project.altar} • {project.disciplineName ? project.disciplineName[language] : ''}</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.behance.net/gallery/256653357/NATALIA-JARAMILLO-PORTAFOLIO-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/20 hover:border-accent-red hover:bg-accent-red/20 text-white transition-all"
            title="Ver en Behance"
          >
            <span className="font-bold text-accent-red">Bē</span>
            <span>BEHANCE ↗</span>
          </a>

          {/* Prev / Next */}
          {allProjects.length > 1 && (
            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/10">
              <button
                onClick={() => onSelectProject && onSelectProject(prevProject.id)}
                className="p-1.5 rounded-full hover:bg-accent-red hover:text-white transition-all text-surface-light/80 cursor-pointer"
                title={`Anterior: ${prevProject.title}`}
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-[11px] text-surface-light/50 px-1 hidden sm:inline">
                {currentIndex + 1} / {allProjects.length}
              </span>
              <button
                onClick={() => onSelectProject && onSelectProject(nextProject.id)}
                className="p-1.5 rounded-full hover:bg-accent-red hover:text-white transition-all text-surface-light/80 cursor-pointer"
                title={`Siguiente: ${nextProject.title}`}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 border border-white/20 text-white hover:bg-accent-red hover:border-accent-red transition-all cursor-pointer"
            title="Cerrar caso de estudio"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. HEADER: BOOKMARK RIBBON + MONUMENTAL TITLE & SUBTITLE
      ========================================================================= */}
      <div className="relative mb-10">
        
        {/* Left Bookmark Hanging Ribbon (Proyecto 01) */}
        <div className="absolute -top-3 left-0 sm:left-2 z-20 flex flex-col items-center pointer-events-none">
          <div className="bg-accent-red text-white font-mono text-[11px] sm:text-xs font-black tracking-widest px-2.5 sm:px-3 py-3 sm:py-4 rounded-b-md shadow-2xl border-t border-accent-red/80 select-none [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
            {project.badgeNumber || `Proyecto 0${currentIndex + 1}`}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="pl-14 sm:pl-20">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight uppercase leading-[0.9]">
            {project.title}
          </h1>
          <p className="font-mono text-sm sm:text-lg text-surface-light/80 mt-2 tracking-wide font-normal">
            {project.subtitle ? project.subtitle[language] : ''}
          </p>
        </div>
      </div>

      {/* =========================================================================
          3. TOP TRIPARTITE EDITORIAL BLOCK (As in media_1794859280949_0cffed7f.jpg)
      ========================================================================= */}
      <div className="mb-8">
        
        {/* 3 Columns Row: Concept Cards | Center Mockup (Auto-Cycle) | Challenge Note + Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* COLUMN 1 (LEFT): EL CONCEPTO (Two cream paper cards) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Card 1: EL CONCEPTO Quote */}
            <div className="relative bg-[#f5eee1] text-[#221c17] p-5 rounded-[3px] shadow-xl border border-[#d8cca8] rotate-[-0.5deg]">
              <span className="font-mono text-xs font-black uppercase text-accent-red tracking-wider block mb-2 pb-1 border-b border-[#d8cca8]">
                EL CONCEPTO
              </span>
              <p className="font-mono text-xs leading-relaxed italic text-[#261f1a]">
                {conceptFirstSentence}
              </p>
            </div>

            {/* Card 2: Attached detail below */}
            {conceptSecondPart && conceptSecondPart.replace(/[^a-zA-Z0-9]/g, '').length > 5 && (
              <div className="relative bg-[#efe5d0] text-[#221c17] p-4 sm:p-5 rounded-[2px] shadow-md border border-[#d2c29c] text-xs leading-relaxed font-mono rotate-[0.5deg]">
                <p>
                  {conceptSecondPart}
                </p>
              </div>
            )}

            {/* Context Detail if available */}
            {project.contextDetail && (
              <div className="p-4 rounded-xl border border-white/10 bg-black/40 font-mono text-xs text-surface-light/70">
                <span className="text-accent-red font-bold block mb-1">// CONTEXTO</span>
                <p className="text-[11px] leading-relaxed">{project.contextDetail[language]}</p>
              </div>
            )}

          </div>

          {/* COLUMN 2 (CENTER): Mockup with Auto-Cycle */}
          <div className="lg:col-span-6 flex flex-col gap-4 items-center">
            
            {/* Center Lead Mockup with Auto-Cycle */}
            {project.isPhoneMockup && project.phoneScreens ? (
              <div className="w-full flex justify-center items-center py-1 sm:py-2">
                <PhoneMockup
                  src={project.phoneScreens[0].src}
                  isVideo={project.phoneScreens[0].type === 'video'}
                  poster={project.phoneScreens[0].poster}
                  size="compact"
                  title={project.title}
                  subtitle={project.subtitle ? project.subtitle[language] : ''}
                  badge="PROTOTIPO INTERACTIVO"
                  autoPlay={true}
                  loop={true}
                  onExpand={() => setLightboxIdx(0)}
                />
              </div>
            ) : (
              <div 
                onClick={() => setLightboxIdx(leadHeroIdx)}
                className="relative w-full cursor-pointer group select-none"
              >
                {/* Paper mat backing */}
                <div className="absolute inset-0 bg-[#e6ddc8]/10 rounded-lg border border-white/10 rotate-[-1.5deg] scale-[1.02] group-hover:rotate-0 transition-transform duration-500 shadow-2xl pointer-events-none" />

                {/* Main Mockup Cover with Auto-Cycling Images */}
                <div className="relative rounded-lg overflow-hidden shadow-2xl bg-black border border-white/15 aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={allImages[leadHeroIdx]}
                      src={allImages[leadHeroIdx]} 
                      alt={project.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover filter contrast-105"
                    />
                  </AnimatePresence>

                  {/* Micro indicator dots for cycling */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-black/75 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      {allImages.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLeadHeroIdx(dotIdx);
                          }}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            leadHeroIdx === dotIdx ? 'w-4 bg-accent-red' : 'w-1.5 bg-white/40 hover:bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Hover zoom overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs">
                    <div className="px-4 py-2 rounded-full bg-black/80 border border-white/30 flex items-center gap-2 shadow-2xl">
                      <Maximize2 size={14} className="text-accent-red" />
                      <span>AMPLIAR DETALLE</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* COLUMN 3 (RIGHT): EL RETO (Taped Note) + CATEGORÍAS */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* "EL RETO:" Note with Masking Tape */}
            <div className="relative bg-[#f5eee1] text-[#221c17] p-5 sm:p-6 rounded-[3px] shadow-2xl border border-[#d8cca8] rotate-[1deg] transition-transform hover:rotate-0">
              {/* Semi-translucent drafting tape centered at the top border */}
              <div 
                aria-hidden="true"
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-neutral-200/70 backdrop-blur-[2px] border border-white/40 shadow-sm rounded-[1px] -rotate-1 select-none pointer-events-none"
              />

              <span className="font-mono text-xs font-black uppercase text-accent-red tracking-wider block mb-2 pb-1 border-b border-[#d8cca8]">
                EL RETO:
              </span>
              <p className="font-mono text-xs leading-relaxed text-[#261f1a]">
                {project.challenge ? project.challenge[language] : ''}
              </p>
            </div>

            {/* CATEGORÍAS List */}
            <div className="space-y-3 font-mono text-xs pl-1">
              <span className="text-white font-black block uppercase tracking-wider">
                CATEGORÍAS
              </span>
              <div className="space-y-1.5 text-surface-light/85 text-[11px]">
                {project.categories && project.categories[language] ? (
                  project.categories[language].map((cat, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-1.5">
                      <span className="text-accent-red font-black">//</span>
                      <span>{cat.replace(/^\/\/\s*/, '')}</span>
                    </div>
                  ))
                ) : (
                  <div>{project.disciplineName ? project.disciplineName[language] : ''}</div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* =========================================================================
          4. SOLUCIÓN & IMPACTO (Full-width horizontal text before RECONOCIDO & Gallery)
      ========================================================================= */}
      {project.solution && (
        <div className="my-10 w-full font-mono">
          <span className="text-accent-red font-black uppercase tracking-widest block mb-3 text-xs sm:text-sm">
            // SOLUCIÓN & IMPACTO
          </span>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-none text-left font-normal">
            {project.solution[language]}
          </p>
          {project.impact && (
            <p className="mt-3 text-surface-light/70 text-xs sm:text-sm leading-relaxed">
              <span className="text-accent-red font-bold">// IMPACTO:</span> {project.impact[language]}
            </p>
          )}
        </div>
      )}

      {/* =========================================================================
          5. RECOGNITION LINE (Right before the big image gallery, as requested)
      ========================================================================= */}
      {recognitionText && (
        <div className="mb-10 py-3.5 px-5 sm:px-6 rounded-lg border border-accent-red/30 bg-gradient-to-r from-accent-red/15 via-black/80 to-transparent flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="font-black text-accent-red uppercase tracking-widest px-2.5 py-0.5 bg-accent-red/20 border border-accent-red rounded text-[11px]">
            RECONOCIDO
          </span>
          <span className="text-white/95 font-medium">
            {recognitionText}
          </span>
        </div>
      )}

      {/* =========================================================================
          SHOWCASE GALLERY: UI CONVEYOR (3 PHONES MOVING RTL) OR EDITORIAL SPREADS
      ========================================================================= */}
      {isUiProject ? (
        <UiPhonesCarousel
          screens={project.phoneScreens || allImages}
          language={language}
          onSelectScreen={(screenSrc) => {
            const idx = allImages.indexOf(screenSrc);
            setLightboxIdx(idx >= 0 ? idx : 0);
          }}
        />
      ) : (
        <>
          {/* =========================================================================
              6. BIG CENTRAL IMAGE GALLERY (Spread carousel auto-advancing + controls)
          ========================================================================= */}
      <div className="my-10">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/15 group">
          
          {/* Active Spread Image Display */}
          <div 
            onClick={() => {
              const globalIdx = allImages.indexOf(spreadImages[activeGalleryIdx]);
              setLightboxIdx(globalIdx >= 0 ? globalIdx : 1);
            }}
            className="cursor-pointer relative aspect-[16/9] sm:aspect-[21/9] flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={spreadImages[activeGalleryIdx]}
                src={spreadImages[activeGalleryIdx]} 
                alt={`${project.title} - Pliego ${activeGalleryIdx + 1}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover filter contrast-105"
              />
            </AnimatePresence>

            {/* Hover zoom overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs">
              <div className="px-5 py-2.5 rounded-full bg-black/80 border border-white/30 flex items-center gap-2 shadow-2xl">
                <Maximize2 size={15} className="text-accent-red" />
                <span>AMPLIAR PLIEGO CENTRAL</span>
              </div>
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-red" />
              <span>PLIEGO {activeGalleryIdx + 1} DE {spreadImages.length}</span>
            </div>
          </div>

          {/* Navigation Controls (If multiple spreads available) */}
          {spreadImages.length > 1 && (
            <>
              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveGalleryIdx((prev) => (prev > 0 ? prev - 1 : spreadImages.length - 1));
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 border border-white/20 text-white hover:bg-accent-red hover:border-accent-red transition-all cursor-pointer shadow-2xl z-20"
                aria-label="Pliego anterior"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveGalleryIdx((prev) => (prev < spreadImages.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 border border-white/20 text-white hover:bg-accent-red hover:border-accent-red transition-all cursor-pointer shadow-2xl z-20"
                aria-label="Siguiente pliego"
              >
                <ChevronRight size={18} />
              </button>

              {/* Spread Indicator Dots */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/75 px-3 py-1.5 rounded-full border border-white/15">
                {spreadImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveGalleryIdx(idx);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeGalleryIdx === idx 
                        ? 'w-6 bg-accent-red' 
                        : 'w-2 bg-white/40 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      {/* =========================================================================
          7. COMPLEMENTARY IMAGES: 2 ROWS OF 3 SMALL IMAGES (6 IMAGES TOTAL)
      ========================================================================= */}
      {row1Images.length > 0 && (
        <div className="my-10 space-y-6">
          <div className="font-mono text-xs text-surface-light/60 flex items-center gap-2">
            <span className="text-accent-red font-bold">//</span>
            <span>PIEZAS COMPLEMENTARIAS & REGISTROS DE DETALLE</span>
          </div>

          {/* Row 1: 3 small images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {row1Images.map((imgSrc, imgIdx) => (
              <div
                key={`row1-${imgIdx}`}
                onClick={() => {
                  const globalIdx = allImages.indexOf(imgSrc);
                  setLightboxIdx(globalIdx >= 0 ? globalIdx : 0);
                }}
                className="relative rounded-xl overflow-hidden shadow-xl bg-black/90 border border-white/10 cursor-pointer group aspect-[4/3] flex items-center justify-center"
              >
                <img 
                  src={imgSrc} 
                  alt={`${project.title} - Detalle ${imgIdx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/75 border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={13} className="text-accent-red" />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: other 3 small images */}
          {row2Images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {row2Images.map((imgSrc, imgIdx) => (
                <div
                  key={`row2-${imgIdx}`}
                  onClick={() => {
                    const globalIdx = allImages.indexOf(imgSrc);
                    setLightboxIdx(globalIdx >= 0 ? globalIdx : 0);
                  }}
                  className="relative rounded-xl overflow-hidden shadow-xl bg-black/90 border border-white/10 cursor-pointer group aspect-[4/3] flex items-center justify-center"
                >
                  <img 
                    src={imgSrc} 
                    alt={`${project.title} - Detalle ${imgIdx + 4}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-black/75 border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={13} className="text-accent-red" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          8. SECOND BIG IMAGE / GALLERY (Before final information cards)
      ========================================================================= */}
      {secondBigImages.length > 0 && (
        <div className="my-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/15 group">
            <div 
              onClick={() => {
                const globalIdx = allImages.indexOf(secondBigImages[activeSecondGalleryIdx]);
                setLightboxIdx(globalIdx >= 0 ? globalIdx : 0);
              }}
              className="cursor-pointer relative aspect-[16/9] sm:aspect-[21/9] flex items-center justify-center overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={secondBigImages[activeSecondGalleryIdx]}
                  src={secondBigImages[activeSecondGalleryIdx]} 
                  alt={`${project.title} - Despliegue General`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover filter contrast-105"
                />
              </AnimatePresence>

              {/* Hover zoom overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs">
                <div className="px-5 py-2.5 rounded-full bg-black/80 border border-white/30 flex items-center gap-2 shadow-2xl">
                  <Maximize2 size={15} className="text-accent-red" />
                  <span>AMPLIAR DESPLIEGUE</span>
                </div>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-red" />
                <span>DESPLIEGUE {activeSecondGalleryIdx + 1} DE {secondBigImages.length}</span>
              </div>
            </div>

            {/* Navigation Controls if multiple */}
            {secondBigImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSecondGalleryIdx((prev) => (prev > 0 ? prev - 1 : secondBigImages.length - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 border border-white/20 text-white hover:bg-accent-red hover:border-accent-red transition-all cursor-pointer shadow-2xl z-20"
                  aria-label="Despliegue anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSecondGalleryIdx((prev) => (prev < secondBigImages.length - 1 ? prev + 1 : 0));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 border border-white/20 text-white hover:bg-accent-red hover:border-accent-red transition-all cursor-pointer shadow-2xl z-20"
                  aria-label="Siguiente despliegue"
                >
                  <ChevronRight size={18} />
                </button>

                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/75 px-3 py-1.5 rounded-full border border-white/15">
                  {secondBigImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSecondGalleryIdx(idx);
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeSecondGalleryIdx === idx 
                          ? 'w-6 bg-accent-red' 
                          : 'w-2 bg-white/40 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
        </>
      )}

      {/* =========================================================================
          9. BOTTOM ROW: AÑO | PROGRAMAS UTILIZADOS | CRÉDITOS (Placed at the end)
      ========================================================================= */}
      <div className="my-14 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Item 1: AÑO (Cream paper note with centered drafting tape) */}
        <div className="md:col-span-3 relative bg-[#f5eee1] text-[#221c17] p-5 rounded-[3px] shadow-md border border-[#d8cca8] font-mono text-xs flex flex-col justify-center rotate-[-0.5deg]">
          <div 
            aria-hidden="true"
            className="w-20 h-5 bg-neutral-200/75 backdrop-blur-[2px] border border-white/40 absolute -top-2.5 left-1/2 -translate-x-1/2 shadow-sm rounded-[1px] select-none pointer-events-none" 
          />
          <span className="font-black uppercase text-accent-red tracking-wider block mb-1 text-[11px]">
            AÑO: {project.year}
          </span>
          <span className="text-[#2a221d] text-[11px] font-medium leading-tight">
            {project.context ? (typeof project.context === 'object' ? project.context[language] : project.context) : ''}
          </span>
        </div>

        {/* Item 2: PROGRAMAS UTILIZADOS (Cream paper note with centered drafting tape) */}
        <div className="md:col-span-5 relative bg-[#f5eee1] text-[#221c17] p-5 rounded-[3px] shadow-md border border-[#d8cca8] font-mono text-xs flex flex-col justify-center">
          <div 
            aria-hidden="true"
            className="w-24 h-5 bg-neutral-200/75 backdrop-blur-[2px] border border-white/40 absolute -top-2.5 left-1/2 -translate-x-1/2 shadow-sm rounded-[1px] select-none pointer-events-none" 
          />
          <span className="font-black uppercase text-accent-red tracking-wider block mb-2 text-[11px]">
            PROGRAMAS UTILIZADOS
          </span>
          <div className="flex flex-wrap gap-2">
            {project.softwares && project.softwares.map((swName) => (
              <SoftwareIcon key={swName} name={swName} size="sm" showLabel={true} />
            ))}
          </div>
        </div>

        {/* Item 3: CRÉDITOS (Cream paper note with centered drafting tape) */}
        <div className="md:col-span-4 relative bg-[#f5eee1] text-[#221c17] p-5 rounded-[3px] shadow-md border border-[#d8cca8] font-mono text-xs flex flex-col justify-center rotate-[0.5deg]">
          <div 
            aria-hidden="true"
            className="w-20 h-5 bg-neutral-200/75 backdrop-blur-[2px] border border-white/40 absolute -top-2.5 left-1/2 -translate-x-1/2 shadow-sm rounded-[1px] select-none pointer-events-none" 
          />
          <span className="font-black uppercase text-accent-red tracking-wider block mb-2 text-[11px]">
            CRÉDITOS
          </span>
          <div className="space-y-1 text-[11px]">
            {project.credits && project.credits.map((c, i) => {
              const isInsta = c.handle && c.handle.startsWith('@');
              const handleClean = isInsta ? c.handle.replace('@', '').trim() : '';
              return (
                <div key={i}>
                  <strong>{c.name}</strong>{' '}
                  {isInsta ? (
                    <a
                      href={`https://instagram.com/${handleClean}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-red hover:underline hover:text-[#990014] transition-colors"
                      title={`Ver Instagram de ${c.name}`}
                    >
                      — {c.handle}
                    </a>
                  ) : (
                    <span className="text-accent-red">— {c.handle}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* =========================================================================
          9. BOTTOM NAVIGATION BAR
      ========================================================================= */}
      <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-full border border-white/20 text-white hover:border-accent-red hover:bg-accent-red/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>{language === 'es' ? 'VOLVER AL CATÁLOGO' : 'BACK TO CATALOG'}</span>
        </button>

        <a
          href="https://www.behance.net/gallery/256653357/NATALIA-JARAMILLO-PORTAFOLIO-2026"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full border border-white/20 hover:border-accent-red hover:bg-accent-red/20 text-white transition-all flex items-center gap-2"
        >
          <span className="font-bold text-accent-red">Bē</span>
          <span>{language === 'es' ? 'VER PROYECTO EN BEHANCE ↗' : 'VIEW ON BEHANCE ↗'}</span>
        </a>

        {allProjects.length > 1 && (
          <button
            onClick={() => onSelectProject && onSelectProject(nextProject.id)}
            className="px-6 py-2.5 rounded-full bg-accent-red text-white uppercase font-bold tracking-wider hover:bg-white hover:text-black transition-all flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <span>{language === 'es' ? 'SIGUIENTE' : 'NEXT'}: {nextProject.title}</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && allImages && (
          <FullscreenLightbox
            images={allImages}
            currentIndex={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onNavigate={(idx) => setLightboxIdx(idx)}
          />
        )}
      </AnimatePresence>

    </article>
  );
}
