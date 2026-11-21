import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Send, Award, Maximize2, ExternalLink } from 'lucide-react';
import { uiTranslations } from '../data/translations';
import SoftwareIcon from './SoftwareIcon';
import KineticText from './KineticText';
import ParallaxCard from './ParallaxCard';
import FullscreenLightbox from './FullscreenLightbox';

export default function AboutView({ author, onOpenContact, language }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const t = uiTranslations[language].aboutView;

  const handleDownloadCV = () => {
    alert(language === 'es' 
      ? "Iniciando descarga del CV / Portafolio de Natalia Jaramillo en PDF."
      : "Initiating download of Natalia Jaramillo's CV / Portfolio PDF."
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Top Header & Breadcrumb */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-10 border-b border-white/10 gap-4"
      >
        <div>
          <span className="font-mono text-xs text-accent-red uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-red" />
            {t.tag}
          </span>
          <KineticText
            text={author.name}
            as="h1"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-1"
          />
        </div>

        <div className="font-mono text-xs text-surface-light/70 tracking-wider">
          {t.location}
        </div>
      </motion.div>

      {/* Main Grid: Altar plate & Technical CV */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Altar Plate / Open Book & Polaroid */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col"
        >
          {/* Main Statement Card: Styled as an Archival Dossier Note */}
          <ParallaxCard maxTilt={5} className="w-full">
            <div className="relative rounded-card border border-white/15 hover:border-accent-red/60 bg-gradient-to-b from-[#140608] via-[#0e0406] to-[#070203] p-6 sm:p-8 shadow-2xl transition-all duration-500">
            
            {/* Visual Tape Element at Top */}
            <div 
              aria-hidden="true"
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-neutral-200/50 backdrop-blur-[2px] border border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.5)] rounded-[1px] rotate-[-0.6deg] z-20 pointer-events-none select-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 4px)',
              }}
            />

            {/* Subtle warm glow underneath */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-accent-red/10 rounded-full blur-3xl pointer-events-none" />

            {/* Photo Card with Subtle Border & Coiled Thread */}
            <div 
              data-cursor-text="NATALIA"
              className="relative mb-6 mx-auto max-w-[230px] bg-neutral-900/90 p-2.5 pb-4 rounded-2xl shadow-xl border border-white/20 hover:border-accent-red/60 transform -rotate-1 hover:rotate-0 transition-all duration-500 group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-black aspect-[4/5] rounded-xl border border-white/10">
                <img 
                  src={author.profileImage} 
                  alt={author.name}
                  className="w-full h-full object-cover object-top filter contrast-105 brightness-100 transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/assets/foto natalia jaramillo/foto natalia jaramillo.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Red thread coil graphic accent */}
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-2 border-accent-red rounded-full opacity-80 pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border border-accent-red rounded-full opacity-60 pointer-events-none" />
            </div>

            {/* Bio Statement */}
            <div className="space-y-3 font-satoshi text-surface-light">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                <span className="text-accent-red">{author.bioGreeting[language].split(' ')[0]} </span>
                {author.bioGreeting[language].split(' ').slice(1).join(' ')}
              </h2>
              
              <p className="text-xs sm:text-sm text-surface-light/90 leading-relaxed font-normal">
                {author.bio[language]}
              </p>
            </div>

            {/* Software Postage Stamp */}
            <div className="mt-6 pt-4 border-t border-dashed border-accent-red/50 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-accent-red tracking-wider block mb-1.5">
                  SOFTWARES & HERRAMIENTAS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {author.softwareTags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-0.5 rounded bg-accent-red text-white font-mono text-[11px] font-bold shadow-red-laser-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="font-mono text-[10px] text-right text-surface-light/60">
                <span>{t.device}</span><br />
                <span className="text-accent-red font-bold">ALTAR 00</span>
              </div>
            </div>

            {/* Physical metadata underneath */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs text-surface-light/60">
              <span className="text-accent-red font-semibold">{t.designer}</span>
              <span className="text-white">{author.name}</span>
            </div>
            </div>
          </ParallaxCard>
        </motion.div>

        {/* Right Columns: Trayectoria, Awards & Technical Specs */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-8"
        >

          {/* Section 1: Experiencia & Reconocimientos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Experiencia */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-accent-red uppercase tracking-wider">
                <span className="text-white/40">//</span>
                <span>{t.experience}</span>
              </div>

              <div className="space-y-4">
                {author.experience.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-white/10 bg-neutral-900/80 hover:border-accent-red/60 hover:bg-neutral-900 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                        <span className="text-accent-red text-xs">↗</span>
                        {exp.role[language]}
                      </h3>
                      <span className="font-mono text-[10px] text-surface-light/40 whitespace-nowrap">
                        {typeof exp.period === 'object' ? exp.period[language] : exp.period}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-accent-red mt-1">
                      {exp.company}
                    </p>
                    <p className="text-xs text-surface-light/60 mt-2 leading-relaxed">
                      {exp.description[language]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reconocimientos & Awards */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-accent-red uppercase tracking-wider">
                <span className="text-white/40">//</span>
                <span>{t.awards}</span>
              </div>

              <div className="space-y-4">
                {author.awards.map((award, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl border border-white/10 bg-gradient-to-b from-[#18090d] via-[#100608] to-[#0a0506] border-accent-red/60 shadow-lg relative overflow-hidden group hover:border-accent-red hover:shadow-red-laser-sm transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-accent-red/20 border border-accent-red/40 text-accent-red">
                        <Award size={18} />
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-white tracking-tight">
                          {award.title[language]}
                        </h4>
                        <div className="font-mono text-xs text-accent-red mt-0.5">
                          {award.project} • {award.year}
                        </div>
                        <p className="text-xs text-surface-light/60 mt-2 leading-relaxed">
                          {award.description[language]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Muestra & Publicaciones */}
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/60">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-surface-light/50 block mb-2">
                    {t.publications}
                  </span>
                  <div className="space-y-2">
                    {author.publications.map((pub, pIdx) => (
                      <div key={pIdx} className="text-xs">
                        <div className="text-white font-medium flex items-center gap-1">
                          <span className="text-accent-red">↗</span>
                          {pub.title[language]}
                        </div>
                        <div className="font-mono text-[10px] text-surface-light/50 pl-3">
                          {pub.detail[language]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Section 2: Educación & Proyectos / Colaboraciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            
            {/* Educación con cinta */}
            <div className="relative rounded-2xl border border-white/10 bg-neutral-900/80 p-5 shadow-lg">
              <div className="absolute -top-2.5 left-8 w-16 h-4.5 bg-white/70 backdrop-blur-sm border border-neutral-300 transform -rotate-2 opacity-80 z-10 pointer-events-none" />
              
              <div className="flex items-center gap-2 font-mono text-xs text-accent-red uppercase tracking-wider mb-3">
                <span className="text-white/40">//</span>
                <span>{t.education}</span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                {author.education.map((edu, idx) => (
                  <div key={idx} className="border-l-2 border-accent-red/50 pl-3 py-1">
                    <p className="font-bold text-white text-xs">{edu.title[language]}</p>
                    <p className="text-surface-light/60 text-[11px]">{edu.institution} — {edu.location}</p>
                    <span className="text-accent-red text-[10px]">{typeof edu.period === 'object' ? edu.period[language] : edu.period}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Proyectos & Colaboraciones con cinta */}
            <div className="relative rounded-2xl border border-white/10 bg-neutral-900/80 p-5 shadow-lg">
              <div className="absolute -top-2.5 right-8 w-16 h-4.5 bg-white/70 backdrop-blur-sm border border-neutral-300 transform rotate-1 opacity-80 z-10 pointer-events-none" />

              <div className="flex items-center gap-2 font-mono text-xs text-accent-red uppercase tracking-wider mb-3">
                <span className="text-white/40">//</span>
                <span>{t.collaborations}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {author.collaborations.map((collab) => (
                  <span 
                    key={collab}
                    className="font-mono text-xs px-3 py-1.5 rounded-full bg-void border border-white/15 text-surface-light/80 hover:border-accent-red hover:text-white transition-colors"
                  >
                    • {collab}
                  </span>
                ))}
              </div>

              {/* Idiomas */}
              <div className="mt-5 pt-3 border-t border-white/10">
                <span className="font-mono text-[11px] text-surface-light/40 uppercase block mb-1">
                  {t.languages}
                </span>
                <div className="flex gap-4 font-mono text-xs text-surface-light/80">
                  {author.languages.map((lang, lIdx) => (
                    <span key={lIdx}>
                      {lang.name[language]} <strong className="text-accent-red">[{lang.level[language]}]</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Section 3: Software & Ficha Técnica + Action Buttons */}
          <div className="p-6 rounded-card border border-white/15 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Software list in Space Mono with real icons */}
            <div className="w-full sm:w-auto">
              <span className="font-mono text-[11px] uppercase tracking-wider text-surface-light/50 block mb-2">
                {t.softwareSpecs}
              </span>
              <div className="flex flex-wrap gap-2 max-w-lg">
                {author.skills.map((skill) => (
                  <SoftwareIcon key={skill} name={skill} size="sm" />
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleDownloadCV}
                className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/30 text-white font-mono text-xs font-bold tracking-wider hover:border-accent-red hover:bg-accent-red hover:shadow-red-laser-sm transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                <span>{t.downloadCv}</span>
              </button>

              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-accent-red text-white font-mono text-xs font-bold tracking-wider hover:bg-white hover:text-black hover:shadow-red-laser-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-red-laser-sm"
              >
                <Send size={14} />
                <span>{t.startProject}</span>
              </button>
            </div>

          </div>

        </motion.div>

      </div>

      {/* =========================================================================
          PLIEGO CENTRAL OFICIAL: EL SANTUARIO EN EL VIENTO (BEHANCE 2026)
      ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 pt-10 border-t border-white/10"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent-red uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-accent-red" />
              <span>EXPEDIENTE EDITORIAL // BEHANCE 2026</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Pliego Central: El Santuario en el Viento
            </h2>
            <p className="text-surface-light/70 text-xs sm:text-sm mt-1 max-w-2xl font-normal">
              {language === 'es' 
                ? 'Composición visual y materialización artesanal: libro de cuero antiguo intervenido, hilo rojo ceremonial, marco de plata repujada y registros tipográficos en pliegos raspados.'
                : 'Visual composition and craft materialization: intervened vintage leather book, ceremonial red thread, embossed silver frame, and scraped paper typography.'}
            </p>
          </div>

          <a
            href="https://www.behance.net/gallery/256653357/NATALIA-JARAMILLO-PORTAFOLIO-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs px-5 py-2.5 rounded-full border border-white/20 hover:border-accent-red hover:bg-accent-red/20 text-white transition-all self-start sm:self-auto group shrink-0"
          >
            <span className="font-bold text-accent-red">Bē</span>
            <span>{language === 'es' ? 'VER CASO EN BEHANCE ↗' : 'VIEW ON BEHANCE ↗'}</span>
          </a>
        </div>

        {/* Big Interactive Book Spread Frame */}
        <div 
          onClick={() => setLightboxOpen(true)}
          className="relative rounded-[28px] overflow-hidden border border-white/15 hover:border-accent-red/60 bg-gradient-to-b from-[#140608] to-[#070203] p-3 sm:p-5 shadow-2xl cursor-pointer group transition-all duration-500"
        >
          {/* Masking tape on top border */}
          <div 
            aria-hidden="true"
            className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none w-36 sm:w-48 h-6.5 bg-neutral-200/50 backdrop-blur-[2px] border border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.5)] rounded-[1px] rotate-[0.2deg]"
          />

          <div className="relative rounded-[20px] overflow-hidden bg-black aspect-[16/9] flex items-center justify-center border border-white/10">
            <img 
              src="/assets/images/about/PORTAFOLIO NATALIA JARAMILLO ARISMENDI-02.png" 
              alt="Pliego Central — Natalia Jaramillo Portafolio 2026"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs">
              <div className="px-5 py-2.5 rounded-full bg-black/80 border border-white/30 flex items-center gap-2 shadow-2xl">
                <Maximize2 size={15} className="text-accent-red" />
                <span>{language === 'es' ? 'AMPLIAR EN ALTA RESOLUCIÓN' : 'EXPAND IN HIGH RESOLUTION'}</span>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-red" />
              <span>ALTAR 00 // REGISTRO EDITORIAL & GRIMORIO</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Lightbox for the Master Book Spread */}
      <AnimatePresence>
        {lightboxOpen && (
          <FullscreenLightbox
            images={['/assets/images/about/PORTAFOLIO NATALIA JARAMILLO ARISMENDI-02.png']}
            currentIndex={0}
            onClose={() => setLightboxOpen(false)}
            onNavigate={() => {}}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
