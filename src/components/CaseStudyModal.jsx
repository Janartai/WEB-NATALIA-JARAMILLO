import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Award, ArrowLeft, Users, Sparkles, UserCheck, 
  Layers, FileText, CheckCircle2, Eye, BookOpen, 
  Maximize2, ArrowRight, Grid3X3
} from 'lucide-react';
import { uiTranslations } from '../data/translations';
import SoftwareIcon from './SoftwareIcon';
import ProjectGallerySwiper from './ProjectGallerySwiper';
import FullscreenLightbox from './FullscreenLightbox';
import ParallaxCard from './ParallaxCard';
import KineticText from './KineticText';

export default function CaseStudyModal({ project, onClose, language }) {
  const t = uiTranslations[language].caseStudy;
  const [activeTab, setActiveTab] = useState('visual'); // 'visual' (default), 'strategy', 'credits'
  const [hoveredTab, setHoveredTab] = useState(null);
  const [visualDisplayMode, setVisualDisplayMode] = useState('swiper'); // 'swiper' or 'grid'
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
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
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, lightboxIdx]);

  if (!project) return null;

  const tabsConfig = [
    {
      id: 'visual',
      label: t.tabVisual,
      icon: Eye,
      hint: t.hintVisual,
      badge: `${project.images.length} PIEZAS`
    },
    {
      id: 'strategy',
      label: t.tabStrategy,
      icon: BookOpen,
      hint: t.hintStrategy,
      badge: 'BRIEF & RETO'
    },
    {
      id: 'credits',
      label: t.tabCredits,
      icon: Users,
      hint: t.hintCredits,
      badge: `${project.softwares.length} TOOLS`
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl transition-opacity"
        />

        {/* Modal Scroll Container */}
        <div className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex items-center justify-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 25 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl rounded-[36px] border-2 border-accent-red/90 bg-neutral-950 text-surface-light p-6 sm:p-10 shadow-2xl overflow-hidden my-6"
          >

            {/* Red Laser Glow line inside modal */}
            <div className="laser-horizontal top-0 left-0" />

            {/* TOP BAR: Ribbon Badge, Meta, Close Button */}
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-full bg-accent-red text-white font-mono text-xs font-bold tracking-widest shadow-red-laser-sm">
                  {project.badgeNumber}
                </div>
                <span className="font-mono text-xs text-surface-light/50">
                  {project.altar} // {project.disciplineName[language]}
                </span>
                <span className="font-mono text-xs text-accent-red font-semibold hidden sm:inline-block">
                  • {project.year}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/5 border border-white/20 text-white hover:bg-accent-red hover:border-accent-red hover:shadow-red-laser-sm transition-all"
                aria-label="Cerrar caso de estudio"
              >
                <X size={20} />
              </button>
            </div>

            {/* TITLE & ONE-LINER HEADER */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <KineticText
                    text={project.title}
                    as="h1"
                    immediate={true}
                    className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase"
                  />
                  <p className="text-base sm:text-xl text-surface-light/80 font-medium mt-1">
                    {project.subtitle[language]}
                  </p>
                </div>

                {/* Award Badge if present */}
                {project.awardBadge && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent-red/15 border border-accent-red text-accent-red font-mono text-xs font-bold shadow-red-laser-sm whitespace-nowrap self-start md:self-auto">
                    <Award size={15} />
                    <span>{project.awardBadge[language]}</span>
                  </div>
                )}
              </div>
            </div>

            {/* INTERACTIVE NAVIGATION TABS WITH HOVER ANIMATION */}
            <div className="relative mb-8 pb-3 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-3">
                {tabsConfig.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  const isHovered = hoveredTab === tab.id;

                  return (
                    <div key={tab.id} className="relative">
                      <motion.button
                        onClick={() => setActiveTab(tab.id)}
                        onMouseEnter={() => setHoveredTab(tab.id)}
                        onMouseLeave={() => setHoveredTab(null)}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative px-5 py-3 rounded-full font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2 border overflow-hidden ${
                          isActive
                            ? 'bg-accent-red text-white border-accent-red shadow-red-laser-sm'
                            : 'bg-black/60 text-surface-light/80 border-white/15 hover:border-accent-red hover:text-white hover:bg-accent-red/20'
                        }`}
                      >
                        {/* Shimmer laser highlight on hover */}
                        {isHovered && !isActive && (
                          <motion.div
                            layoutId="tabLaserSweep"
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-red/30 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                          />
                        )}

                        <Icon 
                          size={15} 
                          className={`transition-transform duration-300 ${
                            isHovered ? 'rotate-6 scale-110 text-accent-red' : ''
                          } ${isActive ? 'text-white' : ''}`} 
                        />
                        <span>{tab.label}</span>

                        {/* Status micro-pill */}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          isActive 
                            ? 'bg-black/30 text-white' 
                            : 'bg-white/10 text-surface-light/60'
                        }`}>
                          {tab.badge}
                        </span>
                      </motion.button>

                      {/* Interactive Floating Hover Tooltip: Tells the user what's inside */}
                      <AnimatePresence>
                        {isHovered && !isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-30 px-3 py-1.5 rounded-lg bg-neutral-900 border border-accent-red text-surface-light font-mono text-[11px] whitespace-nowrap shadow-xl shadow-black flex items-center gap-1.5 pointer-events-none"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-ping" />
                            <span>{tab.hint}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TAB CONTENTS CONTAINER */}
            <div className="min-h-[480px]">
              <AnimatePresence mode="wait">

                {/* ==================== PESTAÑA 1: MUESTRA VISUAL (DEFAULT) ==================== */}
                {activeTab === 'visual' && (
                  <motion.div
                    key="tab-visual"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-8"
                  >
                    {/* Compact One-Liner Statement Banner */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-accent-red/40 bg-gradient-to-r from-[#1a080d] to-[#0a0506] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <p className="text-sm sm:text-base font-medium text-surface-light/95 italic font-satoshi">
                        {project.concept[language]}
                      </p>

                      <button
                        onClick={() => setActiveTab('strategy')}
                        className="px-4 py-2 rounded-full border border-white/20 hover:border-accent-red hover:bg-accent-red/20 font-mono text-xs text-white transition-all whitespace-nowrap flex items-center gap-1.5 group shrink-0"
                      >
                        <span>{t.tabStrategy}</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Visual Display Mode Switcher */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b border-white/10 gap-3">
                      <div className="flex items-center gap-2 font-mono text-xs text-surface-light/70 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-ping" />
                        <span>MODO DE EXHIBICIÓN:</span>
                      </div>

                      <div className="flex rounded-full bg-black/70 p-1 border border-white/15 shadow-inner">
                        <button
                          onClick={() => setVisualDisplayMode('swiper')}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all ${
                            visualDisplayMode === 'swiper'
                              ? 'bg-accent-red text-white shadow-red-laser-sm'
                              : 'text-surface-light/60 hover:text-white'
                          }`}
                        >
                          <Layers size={13} />
                          <span>SWIPER 3D SHOWCASE</span>
                        </button>
                        <button
                          onClick={() => setVisualDisplayMode('grid')}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all ${
                            visualDisplayMode === 'grid'
                              ? 'bg-accent-red text-white shadow-red-laser-sm'
                              : 'text-surface-light/60 hover:text-white'
                          }`}
                        >
                          <Grid3X3 size={13} />
                          <span>GRILLA EDITORIAL</span>
                        </button>
                      </div>
                    </div>

                    {/* MODE A: SWIPER 3D INTERACTIVE CAROUSEL */}
                    {visualDisplayMode === 'swiper' && (
                      <ProjectGallerySwiper
                        images={project.images}
                        title={project.title}
                        language={language}
                        onExpandImage={(img) => {
                          const idx = project.images.indexOf(img);
                          setLightboxIdx(idx >= 0 ? idx : 0);
                        }}
                      />
                    )}

                    {/* MODE B: EDITORIAL GRID WITH 3D PARALLAX CARDS */}
                    {visualDisplayMode === 'grid' && (
                      <div className="space-y-6">
                        {/* HERO LEAD VISUAL (Piece #1) */}
                        <ParallaxCard
                          onClick={() => setLightboxIdx(0)}
                          className="group rounded-card border-2 border-accent-red bg-gradient-to-b from-[#18090d] via-[#100608] to-[#0a0506] p-3.5 shadow-2xl hover:shadow-red-laser cursor-pointer transition-all duration-500 overflow-hidden"
                        >
                          <div className="relative rounded-[24px] overflow-hidden bg-black aspect-[16/9] sm:aspect-[21/9] flex items-center justify-center border border-white/10">
                            <img 
                              src={project.coverImage || project.images[0]} 
                              alt={`${project.title} - Portada`}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                              onError={(e) => {
                                e.target.src = "/assets/images/about/profile.png";
                              }}
                            />

                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs">
                              <div className="px-4 py-2 rounded-full bg-black/80 border border-accent-red flex items-center gap-2 shadow-red-laser-sm">
                                <Maximize2 size={14} className="text-accent-red" />
                                <span>AMPLIAR DETALLE</span>
                              </div>
                            </div>

                            <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-accent-red/50 text-white font-mono text-xs flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-accent-red" />
                              <span>01 // PIEZA CENTRAL & PROTOTIPO</span>
                            </div>
                          </div>
                        </ParallaxCard>

                        {/* DETAIL PIECES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {project.images.slice(1).map((imgSrc, imgIdx) => (
                            <ParallaxCard
                              key={imgIdx}
                              onClick={() => setLightboxIdx(imgIdx + 1)}
                              className="group rounded-card border-2 border-accent-red bg-gradient-to-b from-[#18090d] via-[#100608] to-[#0a0506] p-3 shadow-lg hover:shadow-red-laser-sm cursor-pointer transition-all duration-300"
                            >
                              <div className="rounded-[22px] overflow-hidden bg-black aspect-square sm:aspect-[4/3] flex items-center justify-center border border-white/10">
                                <img 
                                  src={imgSrc} 
                                  alt={`${project.title} - Pieza ${imgIdx + 2}`}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  onError={(e) => {
                                    e.target.src = "/assets/images/about/profile.png";
                                  }}
                                />
                                
                                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/75 border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Maximize2 size={13} className="text-accent-red" />
                                </div>
                              </div>
                              
                              <div className="mt-2.5 px-1 flex items-center justify-between font-mono text-[11px] text-surface-light/70">
                                <span>PIEZA #{imgIdx + 2}</span>
                                <span className="text-accent-red font-bold">{t.mockupLabel}</span>
                              </div>
                            </ParallaxCard>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bottom Quick Bar to Jump to Strategy or Credits */}
                    <div className="p-4 rounded-2xl border border-white/10 bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
                      <span className="text-surface-light/60">
                        ¿Quieres conocer el brief, desafío y decisiones estratégicas de este caso?
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setActiveTab('strategy')}
                          className="px-4 py-2 rounded-full bg-accent-red/20 border border-accent-red text-white hover:bg-accent-red hover:shadow-red-laser-sm transition-all"
                        >
                          VER EL RETO & ESTRATEGIA ↗
                        </button>
                        <button
                          onClick={() => setActiveTab('credits')}
                          className="px-4 py-2 rounded-full border border-white/20 text-surface-light hover:border-accent-red transition-all"
                        >
                          FICHA TÉCNICA ↗
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ==================== PESTAÑA 2: EL RETO & ESTRATEGIA ==================== */}
                {activeTab === 'strategy' && (
                  <motion.div
                    key="tab-strategy"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-8"
                  >
                    {/* Balanced Editorial Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      
                      {/* LEFT COLUMN: El Reto (taped note) + Contexto */}
                      <div className="lg:col-span-7 flex flex-col gap-6">
                        
                        {/* Parchment Sticky Note: El Reto con Cinta */}
                        <div className="relative bg-[#f4ecd8] text-[#1c1815] p-6 sm:p-8 rounded-2xl shadow-xl border border-[#d6c7a9]">
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6.5 bg-white/80 backdrop-blur-sm border border-neutral-300 transform -rotate-1 opacity-85 shadow-md" />

                          <span className="font-mono text-xs font-bold uppercase text-accent-red tracking-wider block mb-2">
                            {t.challengeTitle}
                          </span>
                          <p className="text-sm sm:text-base leading-relaxed font-normal text-neutral-900 font-satoshi">
                            {project.challenge[language]}
                          </p>

                          <div className="mt-4 pt-3 border-t border-[#d6c7a9] flex justify-between font-mono text-[11px] text-neutral-600">
                            <span>DISPOSITIVO EDITORIAL</span>
                            <span className="text-accent-red font-bold">{project.year}</span>
                          </div>
                        </div>

                        {/* Contexto del Brief */}
                        {project.contextDetail && (
                          <div className="p-5 rounded-2xl border border-white/10 bg-neutral-900/80 shadow-md">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-accent-red font-bold block mb-2 flex items-center gap-1.5">
                              <FileText size={14} />
                              {t.contextTitle}
                            </span>
                            <p className="text-xs sm:text-sm text-surface-light/90 leading-relaxed font-normal">
                              {project.contextDetail[language]}
                            </p>
                          </div>
                        )}

                        {/* Solución Estratégica & Impacto */}
                        {project.solution && (
                          <div className="p-5 rounded-2xl border border-accent-red/40 bg-gradient-to-br from-[#1c0a0f] to-[#0e0508] shadow-md">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-accent-red font-bold block mb-2 flex items-center gap-1.5">
                              <CheckCircle2 size={14} />
                              {t.solutionTitle}
                            </span>
                            <p className="text-xs sm:text-sm text-surface-light/90 leading-relaxed font-normal">
                              {project.solution[language]}
                            </p>
                            {project.impact && (
                              <p className="mt-3 pt-3 border-t border-white/10 text-xs text-surface-light/70 italic">
                                <strong>Impacto:</strong> {project.impact[language]}
                              </p>
                            )}
                          </div>
                        )}

                      </div>

                      {/* RIGHT COLUMN: El Concepto + Claves de Diseño */}
                      <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
                        
                        {/* Postage Stamp: El Concepto */}
                        <div className="p-6 rounded-2xl border border-dashed border-accent-red/70 bg-gradient-to-b from-[#18090d] via-[#120608] to-[#0d0507] relative shadow-lg">
                          <span className="font-mono text-xs font-bold uppercase text-accent-red tracking-wider block mb-2">
                            {t.conceptTitle}
                          </span>
                          <p className="text-xs sm:text-sm text-surface-light/95 leading-relaxed font-normal">
                            {project.concept[language]}
                          </p>
                        </div>

                        {/* Claves de Diseño & Estrategia */}
                        {project.designKeys && (
                          <div className="p-5 rounded-2xl border border-white/10 bg-black/60 shadow-lg flex-1">
                            <span className="font-mono text-xs uppercase tracking-wider text-accent-red font-bold block mb-3 flex items-center gap-2">
                              <Sparkles size={14} />
                              {t.designKeysTitle}
                            </span>
                            <div className="space-y-2.5 font-mono text-xs text-surface-light/80">
                              {project.designKeys[language].map((keyItem, kIdx) => (
                                <div key={kIdx} className="flex items-start gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                                  <span className="text-accent-red font-bold">▪</span>
                                  <span>{keyItem}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>

                    </div>
                  </motion.div>
                )}

                {/* ==================== PESTAÑA 3: FICHA & CRÉDITOS ==================== */}
                {activeTab === 'credits' && (
                  <motion.div
                    key="tab-credits"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      
                      {/* Mi Rol & Créditos del Equipo */}
                      <div className="p-6 rounded-2xl border border-white/15 bg-gradient-to-b from-[#18090d] to-[#0a0506] space-y-6">
                        
                        {/* Mi Rol */}
                        {project.role && (
                          <div>
                            <span className="font-mono text-xs text-accent-red uppercase tracking-wider font-bold block mb-2 flex items-center gap-1.5">
                              <UserCheck size={15} />
                              {t.roleTitle}
                            </span>
                            <p className="text-base font-bold text-white font-satoshi">
                              {project.role[language]}
                            </p>
                          </div>
                        )}

                        {/* Equipo & Créditos */}
                        <div className="pt-4 border-t border-white/10">
                          <span className="font-mono text-xs text-surface-light/50 uppercase tracking-wider font-bold block mb-3 flex items-center gap-1.5">
                            <Users size={15} />
                            {t.creditsTitle}
                          </span>
                          <div className="flex flex-wrap gap-2.5">
                            {project.credits && project.credits.map((c, i) => (
                              <div key={i} className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-surface-light text-xs font-mono">
                                <span className="font-bold text-white block">{c.name}</span>
                                <span className="text-accent-red text-[11px]">{c.handle}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Distinción / Reconocimiento */}
                        {project.awardBadge && (
                          <div className="pt-4 border-t border-white/10">
                            <span className="font-mono text-xs text-accent-red uppercase tracking-wider font-bold block mb-1.5">
                              DISTINCIÓN & RECONOCIMIENTO
                            </span>
                            <div className="p-3 rounded-xl bg-accent-red/15 border border-accent-red text-white text-xs font-mono">
                              🏆 {project.awardBadge[language]}
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Herramientas & Disciplinas */}
                      <div className="space-y-6">
                        
                        {/* Herramientas Oficiales */}
                        <div className="p-6 rounded-2xl border border-white/15 bg-neutral-900/90 shadow-md">
                          <span className="font-mono text-xs text-surface-light/60 uppercase font-bold tracking-wider block mb-4">
                            {t.softwares}
                          </span>
                          <div className="flex flex-wrap gap-2.5">
                            {project.softwares.map((swName) => (
                              <SoftwareIcon key={swName} name={swName} size="md" />
                            ))}
                          </div>
                        </div>

                        {/* Disciplinas & Categorías */}
                        <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/60 shadow-md">
                          <span className="font-mono text-xs text-surface-light/40 uppercase font-bold tracking-wider block mb-3 flex items-center gap-1.5">
                            <Layers size={14} />
                            {t.categoriesRole}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {project.categories[language].map((cat, cIdx) => (
                              <span key={cIdx} className="font-mono text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/90">
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* BOTTOM BAR: Return Button & Archive Signature */}
            <div className="mt-10 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full border border-white/20 text-white font-mono text-xs tracking-wider hover:border-accent-red hover:bg-accent-red/20 transition-all flex items-center gap-2"
              >
                <ArrowLeft size={14} />
                <span>{t.backBtn}</span>
              </button>

              <div className="font-mono text-xs text-surface-light/50">
                {t.footerNote}
              </div>
            </div>

          </motion.div>

        </div>

        {/* LUXURY FULLSCREEN LIGHTBOX WITH ZOOM & MULTI-PIECE NAVIGATION */}
        <AnimatePresence>
          {lightboxIdx !== null && (
            <FullscreenLightbox
              images={project.images}
              currentIndex={lightboxIdx}
              onClose={() => setLightboxIdx(null)}
              onNavigate={(idx) => setLightboxIdx(idx)}
            />
          )}
        </AnimatePresence>

      </div>
    </AnimatePresence>
  );
}
