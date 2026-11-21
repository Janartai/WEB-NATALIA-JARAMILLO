import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import { uiTranslations } from '../data/translations';
import KineticText from './KineticText';
import ParallaxCard from './ParallaxCard';
import PhoneMockup from './PhoneMockup';
import TornCrimsonRibbon from './TornCrimsonRibbon';

export default function ProjectsView({ 
  disciplines = [], 
  projects = [], 
  selectedDiscipline = 'all',
  onSelectDiscipline,
  onSelectProject, 
  language = 'es' 
}) {
  const [activeFilter, setActiveFilter] = useState(selectedDiscipline || 'all');
  const t = uiTranslations[language].projectsView;
  const isEs = language === 'es';

  // Sync if selectedDiscipline prop changes from outside
  useEffect(() => {
    if (selectedDiscipline) {
      setActiveFilter(selectedDiscipline);
    }
  }, [selectedDiscipline]);

  const handleFilterChange = (discId) => {
    setActiveFilter(discId);
    if (onSelectDiscipline) onSelectDiscipline(discId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.discipline === activeFilter);

  const currentDisciplineObj = disciplines.find(d => d.id === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-accent-red uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
            {t.tag}
          </div>
          <KineticText
            text={activeFilter === 'all' ? t.title : (currentDisciplineObj?.title[language] || t.title)}
            as="h1"
            className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase"
          />
          <p className="text-surface-light/70 text-sm sm:text-base mt-2 max-w-xl font-normal">
            {activeFilter === 'all' 
              ? t.desc 
              : currentDisciplineObj?.tagline[language]}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleFilterChange('all')}
            className={`font-mono text-xs px-4 py-2 rounded-full border transition-all ${
              activeFilter === 'all'
                ? 'bg-accent-red text-white border-accent-red shadow-red-laser-sm font-bold'
                : 'bg-void text-surface-light/70 border-white/20 hover:border-accent-red hover:text-white'
            }`}
          >
            {t.allFilter}
          </button>
          {disciplines.map(disc => (
            <button
              key={disc.id}
              onClick={() => handleFilterChange(disc.id)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all ${
                activeFilter === disc.id
                  ? 'bg-accent-red text-white border-accent-red shadow-red-laser-sm font-bold'
                  : 'bg-void text-surface-light/70 border-white/20 hover:border-accent-red hover:text-white'
              }`}
            >
              {disc.title[language]}
            </button>
          ))}
        </div>
      </motion.div>

      {/* =========================================================================
          MODO 1: SECCIONES ESCALONADAS CON NOMBRES GRANDES (CUANDO FILTER === 'all')
          Las disciplinas tienen sus nombres gigantes y los proyectos van pasando.
          Al hacer clic, lleva a la categoría con todos los proyectos de esa sección.
      ========================================================================= */}
      {activeFilter === 'all' && (
        <div className="space-y-24 mb-24">
          {disciplines.map((discipline, index) => (
            <DisciplineSection
              key={discipline.id}
              discipline={discipline}
              index={index}
              projects={projects.filter(p => p.discipline === discipline.id || (discipline.id === 'otros' && !['editorial', 'branding', 'empaques'].includes(p.discipline)))}
              onOpenCategory={() => handleFilterChange(discipline.id)}
              onSelectProject={onSelectProject}
              language={language}
              isEs={isEs}
              t={t}
            />
          ))}
        </div>
      )}

      {/* =========================================================================
          MODO 2: CATEGORÍA ABIERTA (CUANDO FILTER !== 'all')
          Muestra TODOS los proyectos de esa sección seleccionada.
      ========================================================================= */}
      {activeFilter !== 'all' && (
        <div className="space-y-8 mb-24">
          
          {/* Barra superior para volver a ver todas las secciones con nombres grandes */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/10 gap-3 font-mono text-xs">
            <button
              onClick={() => handleFilterChange('all')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-accent-red hover:bg-accent-red/20 text-white transition-all group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>{isEs ? 'VOLVER A TODAS LAS SECCIONES' : 'BACK TO ALL SECTIONS'}</span>
            </button>

            <span className="text-surface-light/60">
              {filteredProjects.length} {isEs ? 'PROYECTOS EN ESTA CATEGORÍA' : 'PROJECTS IN THIS CATEGORY'}
            </span>
          </div>

          {/* Grilla con todos los proyectos de esta sección (Notas con papel forma exterior) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {filteredProjects.map((project, idx) => {
              const rotations = [-0.9, 0.8, -0.6, 0.9, -0.7, 0.7];
              const cardRotation = rotations[idx % rotations.length];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => onSelectProject(project.id)}
                  data-cursor-text={isEs ? 'VER CASO' : 'VIEW CASE'}
                  className="cursor-pointer group pt-4"
                  style={{ transform: `rotate(${cardRotation}deg)` }}
                >
                  <ParallaxCard maxTilt={6}>
                    <div className="relative group/tornCard cursor-pointer flex flex-col select-none transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-0">
                      {/* Real Deckled Torn Paper Sheet from assets/images/RECURSOS/papel forma exterior.png (Ultra-HD 1146x1635) */}
                      <img 
                        src="/papel-forma-exterior.png?v=2" 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-[0_14px_30px_rgba(0,0,0,0.75)] select-none z-0 transform-gpu" 
                        style={{ imageRendering: '-webkit-optimize-contrast' }}
                      />

                      {/* Centered Translucent Drafting Tape on Top Edge */}
                      <div 
                        aria-hidden="true"
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none w-28 sm:w-32 h-6 bg-white/75 backdrop-blur-[3px] border-t border-b border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.35)] rounded-[1px] rotate-[-0.6deg]"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 2px, transparent 2px, transparent 5px)',
                        }}
                      />

                      {/* Content on top of the torn paper note */}
                      <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between h-[490px] sm:h-[520px] text-[#221c17]">
                        {/* Top Header: VER CASO en rojo y disciplina/año a la derecha */}
                        <div>
                          <div className="flex items-center justify-between pb-2 border-b border-[#dfd5c0]">
                            <span className="font-mono text-xs sm:text-[12px] font-black uppercase text-accent-red tracking-wider group-hover/tornCard:underline flex items-center gap-1">
                              {isEs ? 'VER CASO →' : 'VIEW CASE →'}
                            </span>
                            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#554b3f] uppercase tracking-wider">
                              <span>{project.disciplineName?.[language] || project.discipline}</span>
                              <span className="text-[#a09078]">//</span>
                              <span className="text-[#706456] font-bold">{project.year}</span>
                            </div>
                          </div>
                        </div>

                        {/* Photo Plate Mount in the center */}
                        <div className="relative my-2.5 flex-1 p-1 bg-white border border-[#dfd5c0] shadow-sm rounded-[2px] overflow-hidden flex items-center justify-center group-hover/tornCard:border-accent-red/50 transition-colors">
                          <div className="w-full h-full relative overflow-hidden bg-[#181412] rounded-[1px] flex items-center justify-center">
                            {project.isPhoneMockup ? (
                              <div className="h-full flex items-center justify-center scale-[0.62] origin-center pointer-events-none">
                                <PhoneMockup
                                  src={project.phoneScreens?.[0]?.src || project.coverImage}
                                  isVideo={project.hasPhoneVideo && project.phoneScreens?.[0]?.type === 'video'}
                                  poster={project.coverImage}
                                  autoPlay={false}
                                />
                              </div>
                            ) : (
                              <img 
                                src={project.coverImage} 
                                alt={project.title} 
                                className="w-full h-full object-cover group-hover/tornCard:scale-105 transition-transform duration-500 filter contrast-[1.03]" 
                                onError={(e) => {
                                  e.target.src = "/assets/images/about/profile.png";
                                }}
                              />
                            )}
                          </div>
                        </div>

                        {/* Title & Metadata (Sin VER CASO abajo) */}
                        <div className="pt-1">
                          <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-[#1a1614] group-hover/tornCard:text-accent-red transition-colors font-satoshi uppercase">
                            {project.title}
                          </h3>
                          <p className="font-mono text-xs sm:text-[12px] leading-relaxed text-[#40362f] mt-1 line-clamp-1">
                            {project.subtitle?.[language] || ''}
                          </p>

                          <div className="mt-2.5 pt-2 border-t border-[#dfd5c0] flex items-center justify-between font-mono text-[11px] text-[#706456]">
                            <span className="line-clamp-1">{project.role ? project.role[language] : (isEs ? 'Diseño' : 'Design')}</span>
                            <span className="font-bold text-[#554b3f] uppercase tracking-wider">{project.badgeNumber}</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </ParallaxCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}

// Sección Escalonada con Nombres Grandes (Wireframe 3)
// Los proyectos de la sección pasan automáticamente y al dar clic te lleva a la categoría con todos los proyectos
function DisciplineSection({ discipline, index, projects, onOpenCategory, onSelectProject, language, isEs, t }) {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Los proyectos pasan continuamente para que se vean todos pasar
  useEffect(() => {
    if (projects.length <= 1) return;
    const interval = setInterval(() => {
      setActiveProjectIdx((prev) => (prev + 1) % projects.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [projects.length]);

  const activeProject = projects[activeProjectIdx] || projects[0];
  const isRightAligned = discipline.cardAlign === 'right';
  const isCenterAligned = discipline.cardAlign === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`w-full flex flex-col ${
        isCenterAligned 
          ? 'items-center text-center' 
          : isRightAligned 
            ? 'items-end text-right' 
            : 'items-start text-left'
      }`}
    >
      {/* Altar Badge in Space Mono */}
      <div className="flex items-center gap-2 font-mono text-xs text-accent-red mb-1">
        <span className="text-accent-red/70 font-bold">SELECCIÓN</span>
        <span className="text-white/40">//</span>
        <span className="px-2 py-0.5 rounded bg-accent-red/15 border border-accent-red/40 text-accent-red font-semibold text-[11px]">{discipline.altarNumber}</span>
      </div>

      {/* Giant Discipline Title in Satoshi Bold with Kinetic SplitText */}
      <div 
        onClick={onOpenCategory}
        className="cursor-pointer group/title inline-block mb-4"
        title={isEs ? 'Clic para ver todos los proyectos de esta sección' : 'Click to view all projects in this section'}
      >
        <KineticText
          text={discipline.title[language]}
          as="h2"
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase group-hover/title:text-accent-red transition-colors"
        />
      </div>

      {/* Big Interactive Stamp Card (Capa 104) with subtle tape & photo plate mount */}
      <ParallaxCard
        maxTilt={4}
        className={`${
          isCenterAligned 
            ? 'w-full max-w-4xl' 
            : 'w-full md:w-4/5 lg:w-3/4'
        }`}
      >
        <div 
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={onOpenCategory}
          data-cursor-text={isEs ? 'ABRIR SECCIÓN' : 'OPEN SECTION'}
          className="relative text-[#221c17] p-6 sm:p-8 transition-all duration-500 cursor-pointer w-full group/sectionCard hover:-translate-y-1.5 select-none"
        >
          {/* Authentic Postage Stamp Paper Sheet with true scalloped cutouts from estampilla.png (Ultra-HD 2285x1575) */}
          <img 
            src="/estampilla.png?v=2" 
            alt="" 
            className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.85)] select-none z-0 transform-gpu" 
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />

          {/* Masking tape on top of the section card centered */}
          <div 
            aria-hidden="true"
            className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none w-36 sm:w-44 h-7 bg-white/75 backdrop-blur-[3px] border-t border-b border-white/80 shadow-[0_3px_10px_rgba(0,0,0,0.35)] rounded-[1px] rotate-[-0.6deg]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 2px, transparent 2px, transparent 5px)',
            }}
          />

          {/* Archival Dossier Banner */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#dfd5c0] text-[#221c17]">
            <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-accent-red tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
              <span>EXPEDIENTE // {discipline.title[language]}</span>
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-[#554b3f] bg-black/5 px-2.5 py-1 rounded border border-[#dfd5c0] flex items-center gap-1.5">
              <span>{isEs ? 'MUESTRA' : 'DISPLAY'}:</span>
              <span className="text-accent-red font-bold">
                {activeProject?.title} ({activeProjectIdx + 1}/{projects.length})
              </span>
            </div>
          </div>

          {/* Dynamic Display Area: Framed Photo Mount on Stamp Paper */}
          <div className="relative z-10 mt-4 p-1.5 sm:p-2 bg-white border border-[#dfd5c0] shadow-md rounded-[2px] overflow-hidden group-hover/sectionCard:border-accent-red/50 transition-colors">
            <div className="relative h-72 sm:h-96 rounded-[1px] overflow-hidden bg-[#181412] flex items-center justify-center">
              {activeProject && (
                activeProject.isPhoneMockup ? (
                  <div className="relative h-full flex items-center justify-center py-2 scale-[0.68] sm:scale-[0.82] origin-center pointer-events-none">
                    <PhoneMockup
                      src={activeProject.phoneScreens?.[0]?.src || activeProject.coverImage}
                      isVideo={activeProject.hasPhoneVideo && activeProject.phoneScreens?.[0]?.type === 'video'}
                      poster={activeProject.coverImage}
                      title={activeProject.title}
                      badge="MOCKUP DE APP"
                      autoPlay={false}
                    />
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeProject.id + (activeProject.coverImage || '')}
                      src={activeProject.coverImage || activeProject.images[0]}
                      alt={activeProject.title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full object-cover filter contrast-[1.03]"
                      onError={(e) => {
                        e.target.src = "/assets/images/about/profile.png";
                      }}
                    />
                  </AnimatePresence>
                )
              )}

              {/* Dark gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

              {/* Overlay Tag in Space Mono */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="bg-[#181412]/90 backdrop-blur-md px-3.5 py-2 rounded border border-[#dfd5c0]/30 text-white shadow-lg">
                  <span className="font-mono text-xs text-accent-red font-bold mr-2">
                    {activeProject?.badgeNumber}
                  </span>
                  <span className="text-sm font-bold tracking-tight">
                    {activeProject?.title}
                  </span>
                </div>

                {/* Action pill: Clic lleva a la categoría con todos los proyectos */}
                <div className="flex items-center gap-1.5 bg-accent-red px-4 py-2 rounded-full text-white font-mono text-xs font-bold border border-accent-red shadow-red-laser-sm hover:scale-105 transition-transform">
                  <span>{isEs ? 'VER TODOS LOS PROYECTOS' : 'VIEW ALL PROJECTS'} ({projects.length})</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </div>

          {/* Project Mini Pills inside Category */}
          <div className="relative z-10 mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-[#dfd5c0]">
            <span className="font-mono text-xs text-[#554b3f] font-bold mr-2">
              {isEs ? 'Proyectos en esta sección:' : 'Projects in this section:'}
            </span>
            {projects.map((proj, pIdx) => (
              <span
                key={proj.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCategory();
                }}
                className={`font-mono text-xs px-3 py-1 rounded-full cursor-pointer transition-all ${
                  activeProject?.id === proj.id
                    ? 'bg-accent-red text-white font-bold shadow-sm scale-105'
                    : 'bg-white/80 border border-[#dfd5c0] text-[#221c17] hover:bg-accent-red hover:text-white'
                }`}
              >
                {proj.title}
              </span>
            ))}
          </div>

        </div>
      </ParallaxCard>
    </motion.div>
  );
}
