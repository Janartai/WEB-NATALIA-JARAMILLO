import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers, Grid3X3, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Keyboard, Autoplay } from 'swiper/modules';
import { uiTranslations } from '../data/translations';
import KineticText from './KineticText';
import ParallaxCard from './ParallaxCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function FeaturedProjects({ projects, onSelectProject, language }) {
  const t = uiTranslations[language].featured;
  const [displayMode, setDisplayMode] = useState('swiper'); // 'swiper' or 'grid'
  
  // Curated 6 Best Projects explicitly selected by Natalia
  const featuredOrder = ['sincronika', 'rebel', 'detras', 'terralma-packaging', 'mini-hearts-club', 'evolution'];
  const featuredList = projects
    .filter((p) => p.featured)
    .sort((a, b) => {
      const idxA = featuredOrder.indexOf(a.id);
      const idxB = featuredOrder.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Section Header with Kinetic Typography & Mode Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 pb-5 border-b border-white/10 gap-5">
        <div>
          <span className="font-mono text-xs uppercase text-accent-red tracking-wider flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
            {t.tag}
          </span>
          <KineticText
            text={t.title}
            as="h2"
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          />
        </div>

        {/* View Controls & Hint */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="font-mono text-xs text-surface-light/50 hidden sm:block">
            {t.instruction}
          </div>

          <div className="flex rounded-full bg-black/70 p-1 border border-white/15 shadow-inner">
            <button
              onClick={() => setDisplayMode('swiper')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all ${
                displayMode === 'swiper'
                  ? 'bg-accent-red text-white shadow-red-laser-sm'
                  : 'text-surface-light/60 hover:text-white'
              }`}
            >
              <Layers size={13} />
              <span>SWIPER 3D</span>
            </button>
            <button
              onClick={() => setDisplayMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all ${
                displayMode === 'grid'
                  ? 'bg-accent-red text-white shadow-red-laser-sm'
                  : 'text-surface-light/60 hover:text-white'
              }`}
            >
              <Grid3X3 size={13} />
              <span>GRILLA</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE A: SWIPER 3D SHOWCASE */}
      {displayMode === 'swiper' && (
        <div className="relative group/featuredSwiper featured-swiper-container py-6">
          
          <button
            className="featured-prev absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-accent-red hover:border-accent-red hover:shadow-red-laser-sm transition-all opacity-80 group-hover/featuredSwiper:opacity-100"
            aria-label="Proyecto anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="featured-next absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-accent-red hover:border-accent-red hover:shadow-red-laser-sm transition-all opacity-80 group-hover/featuredSwiper:opacity-100"
            aria-label="Siguiente proyecto"
          >
            <ChevronRight size={22} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Keyboard, Autoplay]}
            navigation={{
              prevEl: '.featured-prev',
              nextEl: '.featured-next',
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            keyboard={{ enabled: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            spaceBetween={24}
            effect="coverflow"
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 140,
              modifier: 1,
              slideShadows: false,
            }}
            className="w-full !overflow-visible pt-6 pb-14"
          >
            {featuredList.map((project, index) => (
              <SwiperSlide
                key={project.id}
                className="max-w-[90%] sm:max-w-[440px] md:max-w-[480px] pt-6 pb-2"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onSelect={() => onSelectProject(project.id)}
                  language={language}
                  t={t}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* MODE B: 3-COLUMN EDITORIAL GRID */}
      {displayMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-6">
          {featuredList.map((project, index) => (
            <ParallaxCard key={project.id} maxTilt={6} className="pt-4">
              <ProjectCard 
                project={project} 
                index={index} 
                onSelect={() => onSelectProject(project.id)} 
                language={language}
                t={t}
              />
            </ParallaxCard>
          ))}
        </div>
      )}

    </section>
  );
}

function ProjectCard({ project, index, onSelect, language, t }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Cycling mockups while user hovers
  useEffect(() => {
    let interval;
    if (isHovered && project.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIdx((prev) => (prev + 1) % project.images.length);
      }, 950);
    } else {
      setCurrentImageIdx(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, project.images.length]);

  // Subtle organic paper rotations matching the analog note reference
  const rotations = [-0.8, 0.7, -0.6, 0.9, -0.5, 0.8];
  const cardRotation = rotations[index % rotations.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      data-cursor-text={language === 'es' ? 'VER CASO' : 'VIEW CASE'}
      className="group relative cursor-pointer flex flex-col h-full select-none pt-4"
      style={{ transform: `rotate(${cardRotation}deg)` }}
    >
      {/* Cream Paper Note Container (Matches Reference Image media_1795033592956_cb6fe464 with Centered Tape & No Red Pin) */}
      <div className="relative bg-[#f6efe3] text-[#221c17] p-5 sm:p-6 rounded-[3px] border border-[#dfd5be] shadow-[0_14px_35px_rgba(0,0,0,0.7),0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:rotate-0 group-hover:-translate-y-2 group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(200,10,31,0.2)] flex flex-col justify-between h-[490px] sm:h-[520px]">
        
        {/* Semi-translucent Matte Drafting Tape on Top Edge (Fully visible over dark background and cream paper) */}
        <div 
          aria-hidden="true"
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 sm:w-36 h-7 bg-white/75 backdrop-blur-[3px] border-t border-b border-white/80 shadow-[0_3px_8px_rgba(0,0,0,0.35)] rounded-[1px] rotate-[-0.6deg] pointer-events-none z-30"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 2px, transparent 2px, transparent 5px)',
          }}
        />

        {/* Top Note Header & Metadata (Matches "EL RETO:" red header format with thin divider line) */}
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-[#dfd5c0]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs sm:text-[12px] font-black uppercase text-accent-red tracking-wider">
                EXPEDIENTE // {project.badgeNumber}
              </span>
              <span className="text-[#a09078] text-xs font-mono">//</span>
              <span className="font-mono text-[11px] font-bold text-[#554b3f] uppercase tracking-wider">
                {project.disciplineName[language]}
              </span>
            </div>

            <div className="w-6 h-6 rounded-full bg-black/5 border border-[#dfd5c0] flex items-center justify-center text-[#221c17] group-hover:bg-accent-red group-hover:text-white group-hover:border-accent-red transition-all duration-300 shadow-sm">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>

        {/* 4. Center: Mounted Photo Plate on Paper with Hover Animation Loop */}
        <div className="relative my-2.5 flex-1 p-1 bg-white border border-[#dfd5c0] shadow-sm rounded-[2px] overflow-hidden flex items-center justify-center group-hover:border-accent-red/50 transition-colors">
          <div className="w-full h-full relative overflow-hidden bg-[#181412] rounded-[1px]">
            <img
              src={project.images[currentImageIdx] || project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.03]"
              onError={(e) => {
                e.target.src = "/assets/images/about/profile.png";
              }}
            />

            {/* Hover Status Badge */}
            {isHovered && (
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#f6efe3]/95 backdrop-blur-md border border-accent-red text-accent-red font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
                <span>{t.loop} #{currentImageIdx + 1} / {project.images.length}</span>
              </div>
            )}

            {/* Subtle paper reflection gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </div>

        {/* 5. Bottom Note Content: Typewriter Title, Description & Metadata */}
        <div className="pt-1">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-[#1a1614] group-hover:text-accent-red transition-colors font-satoshi uppercase">
            {project.title}
          </h3>
          <p className="font-mono text-xs sm:text-[12px] leading-relaxed text-[#40362f] mt-1.5 line-clamp-2">
            {project.subtitle[language]}
          </p>

          <div className="mt-3 pt-2.5 border-t border-[#dfd5c0] flex items-center justify-between font-mono text-[11px] text-[#706456]">
            <span>AÑO: {project.year}</span>
            <span className="text-accent-red font-bold tracking-wider uppercase">{project.altar}</span>
            <span className="text-accent-red font-bold group-hover:underline flex items-center gap-1">
              VER CASO →
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
