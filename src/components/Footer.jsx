import React from 'react';
import { ArrowUp } from 'lucide-react';
import { uiTranslations } from '../data/translations';

export default function Footer({ onNavClick, onOpenContact, language }) {
  const t = uiTranslations[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-void/90 py-16 px-4 sm:px-6 lg:px-8 text-surface-light overflow-hidden">
      
      {/* Laser Top Line */}
      <div className="laser-horizontal top-0 left-0" />

      <div className="max-w-7xl mx-auto flex flex-col justify-between space-y-12">
        
        {/* Top Footer */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase text-accent-red tracking-widest block mb-1">
              {t.archive}
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
              Natalia Jaramillo
            </h2>
            <p className="font-mono text-xs text-surface-light/50 mt-2">
              {t.sub}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-full border border-white/20 bg-neutral-900 text-white hover:border-accent-red hover:bg-accent-red hover:shadow-red-laser-sm transition-all flex items-center gap-2 font-mono text-xs"
            aria-label="Volver arriba"
          >
            <span>{t.toTop}</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Center Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs">
          
          <div>
            <span className="text-accent-red font-bold uppercase tracking-wider block mb-3">
              {t.navTitle}
            </span>
            <ul className="space-y-2 text-surface-light/70">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-accent-red transition-colors">
                  {t.home}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('proyectos')} className="hover:text-accent-red transition-colors">
                  {t.projects}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('sobre-mi')} className="hover:text-accent-red transition-colors">
                  {t.about}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('contacto')} className="hover:text-accent-red transition-colors cursor-pointer">
                  {t.contact}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-accent-red font-bold uppercase tracking-wider block mb-3">
              {t.altarsTitle}
            </span>
            <ul className="space-y-2 text-surface-light/70">
              <li>ALTAR 01 — {language === 'es' ? 'Diseño Editorial' : 'Editorial Design'}</li>
              <li>ALTAR 02 — {language === 'es' ? 'Branding e Identidad' : 'Branding & Identity'}</li>
              <li>ALTAR 03 — {language === 'es' ? 'Empaques & Art Toys' : 'Packaging & Art Toys'}</li>
              <li>ALTAR 04 — {language === 'es' ? 'Contacto & Transmisión' : 'Contact & Inquiry'}</li>
            </ul>
          </div>

          <div>
            <span className="text-accent-red font-bold uppercase tracking-wider block mb-3">
              {t.academicTitle}
            </span>
            <p className="text-surface-light/70 leading-relaxed whitespace-pre-line">
              {t.academicDesc}
            </p>
          </div>

          <div>
            <span className="text-accent-red font-bold uppercase tracking-wider block mb-3">
              {t.directContact}
            </span>
            <button
              onClick={() => onNavClick('contacto')}
              className="px-4 py-2 rounded-full border border-accent-red bg-accent-red/10 text-white hover:bg-accent-red hover:shadow-red-laser-sm transition-all cursor-pointer font-mono text-xs block mb-3"
            >
              {t.talkBtn}
            </button>
            <div className="flex flex-wrap items-center gap-2 text-surface-light/60 font-mono text-[11px]">
              <a 
                href="https://www.behance.net/gallery/256653357/NATALIA-JARAMILLO-PORTAFOLIO-2026" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-accent-red transition-colors"
              >
                Behance
              </a>
              <span>•</span>
              <a 
                href="https://www.linkedin.com/in/natha-arismendi-705953442" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-accent-red transition-colors"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a 
                href="https://www.instagram.com/jaramillo5982/" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-accent-red transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-surface-light/40 gap-4">
          <div>
            © {new Date().getFullYear()} NATALIA JARAMILLO ARISMENDI. {t.rights}
          </div>
          <div className="flex items-center gap-1">
            <span>{t.tagline}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
