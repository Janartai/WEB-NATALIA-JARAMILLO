import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { uiTranslations } from '../data/translations';

/**
 * TornNavPill: Authentic torn paper / masking tape navigation button
 * Matches the craft paper button design with fibrous edges and vibrant red typography.
 */
function TornNavPill({ 
  label, 
  icon = null, 
  isActive = false, 
  onClick, 
  rotation = 0, 
  href = null, 
  isExternal = false,
  className = '' 
}) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 0 }}
      whileTap={{ scale: 0.96 }}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`group relative inline-flex items-center justify-center cursor-pointer select-none transition-all duration-300 filter ${
        isActive
          ? 'drop-shadow-[0_5px_12px_rgba(200,10,31,0.55)] z-20 scale-[1.03]'
          : 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)] opacity-95 hover:opacity-100 hover:drop-shadow-[0_7px_14px_rgba(0,0,0,0.85)]'
      } ${className}`}
    >
      {/* 1. Underlying Torn Craft Paper Texture Image */}
      <img
        src="/torn-paper-banner.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none filter contrast-105 brightness-[1.02]"
      />

      {/* 2. Paper Grain & Vignette Overlay */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-10 mix-blend-multiply"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.12) 0%, transparent 80%)'
        }}
      />

      {/* 3. Red Drafting Tape Pin for Active Item */}
      {isActive && (
        <div 
          aria-hidden="true"
          className="w-7 sm:w-8 h-2 sm:h-2.5 bg-accent-red/90 rounded-[1px] shadow-sm absolute -top-1 left-1/2 -translate-x-1/2 pointer-events-none z-20"
        />
      )}

      {/* 4. Text Content in High-Impact Red (matches EXPLORAR PROYECTOS reference) */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 px-3.5 sm:px-4.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black uppercase tracking-wider text-accent-red font-satoshi">
        {icon}
        <span className="drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] whitespace-nowrap">
          {label}
        </span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block bg-transparent border-0 p-0 text-left">
      {content}
    </button>
  );
}

export default function Navbar({ currentView, setCurrentView, language, setLanguage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = uiTranslations[language].nav;

  const navItems = [
    { id: 'home', label: t.home, rotation: -1.0 },
    { id: 'proyectos', label: t.projects, rotation: 1.2 },
    { id: 'sobre-mi', label: t.about, rotation: -0.8 },
    { id: 'contacto', label: t.contact, rotation: 1.4 },
  ];

  const handleNavClick = (id) => {
    setCurrentView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-void/90 border-b border-white/10 transition-all duration-300 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Navigation: INICIO as Torn Paper Note */}
        <div className="flex items-center space-x-3">
          <TornNavPill
            label={t.home}
            isActive={currentView === 'home'}
            onClick={() => handleNavClick('home')}
            rotation={-1.0}
          />

          {/* Subtitle ticker in Space Mono */}
          <span className="hidden lg:inline-block font-mono text-[11px] text-surface-light/40 tracking-wider pl-2">
            {t.location}
          </span>
        </div>

        {/* Right Navigation & Language Switcher */}
        <div className="hidden md:flex items-center space-x-2.5 lg:space-x-3.5">
          
          {/* Navigation Pills (PROYECTOS, SOBRE MÍ, CONTÁCTAME) as Torn Paper Notes */}
          <nav className="flex items-center space-x-2 lg:space-x-2.5">
            {navItems.slice(1).map((item) => (
              <TornNavPill
                key={item.id}
                label={item.label}
                isActive={currentView === item.id}
                onClick={() => handleNavClick(item.id)}
                rotation={item.rotation}
              />
            ))}
          </nav>

          {/* Behance Link Button as Torn Paper Note */}
          <TornNavPill
            label="BEHANCE ↗"
            icon={<span className="font-black text-accent-red text-xs">Bē</span>}
            href="https://www.behance.net/gallery/256653357/NATALIA-JARAMILLO-PORTAFOLIO-2026"
            isExternal={true}
            rotation={-1.2}
          />

          {/* Language Switcher Pill (ES | EN) */}
          <div className="flex items-center p-1 rounded-full border border-white/15 bg-black/60 font-mono text-[11px] ml-1">
            <button
              onClick={() => setLanguage('es')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                language === 'es'
                  ? 'bg-accent-red text-white font-bold shadow-red-laser-sm'
                  : 'text-surface-light/60 hover:text-white'
              }`}
            >
              ES
            </button>
            <span className="text-white/20 px-0.5">/</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                language === 'en'
                  ? 'bg-accent-red text-white font-bold shadow-red-laser-sm'
                  : 'text-surface-light/60 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

        </div>

        {/* Mobile View Toggle & Language Pill */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Mobile Language Switcher */}
          <div className="flex items-center p-0.5 rounded-full border border-white/15 bg-black/60 font-mono text-[10px]">
            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-0.5 rounded-full ${
                language === 'es' ? 'bg-accent-red text-white font-bold' : 'text-white/50'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full ${
                language === 'en' ? 'bg-accent-red text-white font-bold' : 'text-white/50'
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-surface-light p-2 rounded-lg hover:text-accent-red transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Torn Paper Notes */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-void/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col items-center space-y-4"
        >
          {navItems.map((item, idx) => (
            <TornNavPill
              key={item.id}
              label={item.label}
              isActive={currentView === item.id}
              onClick={() => handleNavClick(item.id)}
              rotation={idx % 2 === 0 ? -1 : 1}
              className="w-full max-w-[240px]"
            />
          ))}
          <TornNavPill
            label="BEHANCE ↗"
            icon={<span className="font-black text-accent-red text-xs">Bē</span>}
            href="https://www.behance.net/gallery/256653357/NATALIA-JARAMILLO-PORTAFOLIO-2026"
            isExternal={true}
            rotation={-1.2}
            className="w-full max-w-[240px]"
          />
        </motion.div>
      )}
    </header>
  );
}
