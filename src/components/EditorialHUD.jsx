import React, { useState, useEffect } from 'react';
import { useSmoothScroll } from './SmoothScroll';
import { Compass, ChevronRight, Activity, Tv } from 'lucide-react';

export default function EditorialHUD({ currentView, setCurrentView, language, onReplayIntro }) {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const lenis = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const percent = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));
        setScrollPercent(percent);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navSections = [
    { id: 'home', label: 'ALTAR 00 // PORTADA', targetView: 'home', scrollY: 0 },
    { id: 'proyectos', label: 'ALTARES 01-03 // PROYECTOS', targetView: 'proyectos', scrollY: 0 },
    { id: 'sobre-mi', label: 'ALTAR 00 // SOBRE MÍ', targetView: 'sobre-mi', scrollY: 0 },
    { id: 'contacto', label: 'ALTAR 04 // CONTACTO', targetView: 'contacto', scrollY: 0 },
  ];

  const handleSectionClick = (item) => {
    if (currentView !== item.targetView) {
      setCurrentView(item.targetView);
    }
    if (lenis) {
      lenis.scrollTo(item.scrollY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: item.scrollY, behavior: 'smooth' });
    }
  };

  return (
    <aside 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none"
    >
      <div className="relative flex flex-col items-center bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-6 shadow-2xl transition-all duration-300 hover:border-accent-red/60 hover:bg-black/80">
        
        {/* Top Radar Icon */}
        <div className="mb-4 text-accent-red">
          <Compass size={16} className="animate-spin-slow" />
        </div>

        {/* Vertical Laser Progress Track */}
        <div className="relative w-1 h-36 bg-white/10 rounded-full overflow-hidden my-2">
          <div 
            style={{ height: `${scrollPercent}%` }}
            className="w-full bg-accent-red shadow-red-laser-sm transition-all duration-150 rounded-full"
          />
        </div>

        {/* Readout Numbers */}
        <div className="mt-3 font-mono text-[10px] text-surface-light/70 tracking-tighter text-center">
          <span className="text-accent-red font-bold block">{scrollPercent}%</span>
          <span className="text-[8px] text-surface-light/40">HUD</span>
        </div>

        {/* Interactive Coordinate Pill List */}
        <div className="mt-4 flex flex-col gap-2">
          {navSections.map((item) => {
            const isActive = currentView === item.targetView;
            return (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item)}
                className="group/item relative flex items-center justify-center p-1.5 rounded-full"
                title={item.label}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-accent-red ring-4 ring-accent-red/30 scale-125 shadow-red-laser-sm'
                      : 'bg-white/30 group-hover/item:bg-accent-red group-hover/item:scale-110'
                  }`}
                />

                {/* Floating tooltip label on hover */}
                {isHovered && (
                  <div className="absolute right-full mr-3.5 px-3 py-1.5 rounded-lg bg-black/90 border border-accent-red/60 text-white font-mono text-[10px] whitespace-nowrap shadow-xl opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                    <span>{item.label}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Technical Telemetry Badge */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col items-center">
          <Activity size={12} className="text-accent-red animate-pulse" />
          <span className="font-mono text-[8px] text-surface-light/40 mt-1">60FPS</span>

          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="mt-3 group/intro relative flex items-center justify-center p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              title={language === 'es' ? 'Ver Intro Splash' : 'Play Splash Intro'}
            >
              <Tv size={12} className="text-surface-light/60 group-hover/intro:text-accent-red transition-colors" />
              {isHovered && (
                <div className="absolute right-full mr-3.5 px-3 py-1.5 rounded-lg bg-black/95 border border-accent-red/60 text-white font-mono text-[10px] whitespace-nowrap shadow-xl opacity-0 group-hover/intro:opacity-100 transition-opacity pointer-events-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                  <span>{language === 'es' ? 'REPRODUCIR INTRO' : 'REPLAY INTRO'}</span>
                </div>
              )}
            </button>
          )}
        </div>

      </div>
    </aside>
  );
}
