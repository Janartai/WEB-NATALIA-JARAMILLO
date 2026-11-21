import React from 'react';

/**
 * InfiniteMarquee: Flowing Physical Red Ribbon Separator
 * Uses the authentic red torn paper texture from assets/images/RECURSOS/separador.png
 * as the physical ribbon background with smooth infinite scrolling text.
 */
export default function InfiniteMarquee({ language = 'es' }) {
  const itemsEs = [
    "DISEÑO EDITORIAL",
    "IDENTIDAD DE MARCA & BRANDING",
    "DISEÑO DE EMPAQUES & PACKAGING",
    "JANA // UNIVERSO VISUAL",
    "MEDELLÍN, COLOMBIA",
    "DIRECCIÓN DE ARTE",
    "SISTEMAS TIPOGRÁFICOS",
    "ALTARES DE DISEÑO",
  ];

  const itemsEn = [
    "EDITORIAL DESIGN",
    "BRAND IDENTITY & STRATEGY",
    "PACKAGING DESIGN & STRUCTURE",
    "JANA // VISUAL UNIVERSE",
    "MEDELLÍN, COLOMBIA",
    "ART DIRECTION",
    "TYPOGRAPHIC SYSTEMS",
    "DESIGN ALTARS",
  ];

  const items = language === 'es' ? itemsEs : itemsEn;

  return (
    <div className="relative w-full overflow-hidden select-none my-10 sm:my-14 py-2 sm:py-3 filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
      
      {/* 1. Underlying Red Torn Paper Ribbon (assets/images/RECURSOS/separador.png) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <img
          src="/separador.png"
          alt="Separador cinta roja"
          className="w-full h-full object-fill filter contrast-110 brightness-105"
        />
        {/* Subtle paper fiber depth vignette */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.15) 0%, transparent 80%)'
          }}
        />
      </div>

      {/* 2. Infinite Moving Marquee Track */}
      <div className="relative z-10 flex whitespace-nowrap overflow-hidden py-3 sm:py-3.5 group">
        
        {/* Track 1 */}
        <div className="flex shrink-0 animate-marquee items-center gap-8 sm:gap-10 group-hover:[animation-play-state:paused]">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 sm:gap-10">
              <span className="font-satoshi text-xs sm:text-sm md:text-[15px] font-black tracking-widest text-[#fffbf5] uppercase drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                {item}
              </span>
              <span className="text-white/60 text-xs sm:text-sm font-mono tracking-widest">//</span>
            </div>
          ))}
        </div>

        {/* Track 2 (Duplicate for seamless loop) */}
        <div className="flex shrink-0 animate-marquee items-center gap-8 sm:gap-10 group-hover:[animation-play-state:paused]" aria-hidden="true">
          {items.map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-8 sm:gap-10">
              <span className="font-satoshi text-xs sm:text-sm md:text-[15px] font-black tracking-widest text-[#fffbf5] uppercase drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)] flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                {item}
              </span>
              <span className="text-white/60 text-xs sm:text-sm font-mono tracking-widest">//</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
