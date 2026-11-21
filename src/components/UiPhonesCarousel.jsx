import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Maximize2, Smartphone } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

/**
 * UiPhonesCarousel
 * Specifically created for UI Design projects:
 * Displays a continuous horizontal conveyor of 3 phones gliding smoothly from right to left,
 * showcasing mobile application screens inside realistic smartphone frames.
 */
export default function UiPhonesCarousel({ 
  screens = [], 
  onSelectScreen, 
  language = 'es' 
}) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);

  // If screens is empty or has fewer than 3, duplicate to ensure a continuous flowing conveyor
  const baseScreens = screens.length > 0 ? screens : [
    { src: '/assets/images/ui/app-aura-screen1.svg', title: 'Dashboard Circadiano', subtitle: 'Telemetría biométrica' },
    { src: '/assets/images/ui/app-ecotrack-screen1.svg', title: 'Rutas Sostenibles', subtitle: 'Navegación y cálculo de emisiones' },
    { src: '/assets/images/ui/app-aura-screen2.svg', title: 'Sesión Binaural', subtitle: 'Visualizador de frecuencias alfa' }
  ];

  // Ensure enough items for a seamless -50% transform loop
  const marqueeList = baseScreens.length < 5
    ? [...baseScreens, ...baseScreens, ...baseScreens, ...baseScreens]
    : [...baseScreens, ...baseScreens];

  // Dynamic duration so movement is never rushed (approx 4.5s per item)
  const animDuration = `${Math.max(35, baseScreens.length * 4.5)}s`;

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 320;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="my-14 w-full">
      
      {/* Top Header Label */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-1 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
          <span className="text-white font-bold tracking-wider uppercase">
            {language === 'es' ? '// FLUJO DE INTERFACES MÓVILES (3 TELÉFONOS)' : '// MOBILE UI FLOW (3 PHONES)'}
          </span>
          <span className="text-surface-light/40 hidden sm:inline">• {language === 'es' ? 'Desplazamiento Continuo' : 'Continuous Flow'}</span>
        </div>

        {/* Controls: Pause/Play + Manual Nudge */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="p-1.5 px-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-surface-light text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
            title={isPaused ? "Reanudar movimiento" : "Pausar movimiento"}
          >
            {isPaused ? <Play size={12} className="text-accent-red fill-accent-red" /> : <Pause size={12} className="text-accent-red" />}
            <span>{isPaused ? (language === 'es' ? 'REANUDAR' : 'RESUME') : (language === 'es' ? 'PAUSAR' : 'PAUSE')}</span>
          </button>

          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            <button
              onClick={() => handleScroll('left')}
              className="p-1.5 rounded-full hover:bg-accent-red hover:text-white transition-all text-surface-light/80 cursor-pointer"
              title="Mover a la izquierda"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-1.5 rounded-full hover:bg-accent-red hover:text-white transition-all text-surface-light/80 cursor-pointer"
              title="Mover a la derecha"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Continuous Marquee Belt */}
      <div 
        ref={scrollContainerRef}
        className="relative w-full overflow-x-auto py-8 px-2 scrollbar-none [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] group"
      >
        <div 
          className={`flex items-center gap-6 sm:gap-8 md:gap-10 w-max animate-marquee-rtl ${
            isPaused ? '[animation-play-state:paused]' : 'group-hover:[animation-play-state:paused]'
          }`}
          style={{ animationDuration: animDuration }}
        >
          {marqueeList.map((screenItem, sIdx) => {
            const screenSrc = typeof screenItem === 'string' ? screenItem : screenItem.src || screenItem.poster;
            const screenTitle = typeof screenItem === 'object' ? screenItem.title : `Pantalla 0${(sIdx % baseScreens.length) + 1}`;
            const screenSub = typeof screenItem === 'object' ? screenItem.subtitle : 'Interfaz Mobile';

            return (
              <div 
                key={sIdx}
                onClick={() => onSelectScreen && onSelectScreen(screenSrc)}
                className="flex flex-col items-center shrink-0 cursor-pointer group/phone transition-transform duration-500 hover:scale-[1.03]"
              >
                {/* Phone Mockup Frame */}
                <div className="relative">
                  <PhoneMockup
                    src={screenSrc}
                    isVideo={screenItem?.type === 'video'}
                    poster={screenItem?.poster}
                    size="carousel"
                    title={screenTitle}
                    subtitle={screenSub}
                    autoPlay={false}
                    className="pointer-events-none"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 rounded-[38px] opacity-0 group-hover/phone:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs z-30">
                    <div className="px-3.5 py-1.5 rounded-full bg-black/85 border border-white/30 flex items-center gap-1.5 shadow-2xl">
                      <Maximize2 size={12} className="text-accent-red" />
                      <span className="text-[11px]">AMPLIAR</span>
                    </div>
                  </div>
                </div>

                {/* Subtitle Caption Under Each Phone */}
                <div className="mt-4 text-center font-mono">
                  <span className="text-white text-xs font-bold block tracking-wide group-hover/phone:text-accent-red transition-colors">
                    {screenTitle}
                  </span>
                  {screenSub && (
                    <span className="text-surface-light/50 text-[11px] block mt-0.5">
                      {screenSub}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Helpful Hint */}
      <div className="text-center mt-3 font-mono text-[11px] text-surface-light/40">
        <span>{language === 'es' ? 'Pasa el cursor sobre los teléfonos para pausar el movimiento y haz clic para ampliar cada pantalla' : 'Hover over phones to pause movement, click to enlarge any screen'}</span>
      </div>

    </div>
  );
}
