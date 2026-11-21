import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { uiTranslations } from '../data/translations';
import KineticText from './KineticText';
import ParallaxCard from './ParallaxCard';
import TornPaperButton from './TornPaperButton';

export default function Hero({ onExploreProjects, language }) {
  const t = uiTranslations[language].hero;

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: 3D Floating Red Isotype inside Perforated Stamp Frame */}
        <motion.div 
          initial={{ opacity: 0, x: -40, rotate: -4 }}
          animate={{ opacity: 1, x: 0, rotate: -2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          className="lg:col-span-5 flex justify-center lg:justify-start"
        >
          <ParallaxCard maxTilt={8} className="w-full max-w-xs sm:max-w-sm">
            <div data-cursor-text="ALTAR 00" className="relative group cursor-pointer">
              
              {/* Red glow shadow behind the stamp */}
              <div className="absolute -inset-2 bg-accent-red/30 rounded-3xl blur-2xl group-hover:bg-accent-red/50 transition-all duration-500" />
              
              {/* The Stamp Container with exact silhouette mask from reference */}
              <div 
                className="relative flex flex-col items-center justify-between min-h-[380px] sm:min-h-[430px] aspect-[633/653] shadow-2xl bg-gradient-to-b from-[#18080a] via-[#0d0406] to-black"
                style={{
                  maskImage: "url('/stamp-mask.png')",
                  WebkitMaskImage: "url('/stamp-mask.png')",
                  maskSize: '100% 100%',
                  WebkitMaskSize: '100% 100%',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat'
                }}
              >
                {/* Radial crimson ambiance on the stamp paper */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-80"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(200, 10, 31, 0.28) 0%, rgba(18, 6, 8, 0.8) 55%, #050203 100%)'
                  }}
                />

                {/* Inner Content Area: safely padded inside the stamp margins */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between py-10 px-9 sm:py-12 sm:px-11">
                  
                  {/* Top header annotation inside stamp */}
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-surface-light/65 pb-2 border-b border-white/15">
                    <span className="text-accent-red font-bold uppercase tracking-wider">
                      // SELLO DE IDENTIDAD
                    </span>
                    <span className="text-surface-light/45">
                      MEDELLÍN • 2026
                    </span>
                  </div>

                  {/* Floating 3D Red Laser Isotype */}
                  <motion.div
                    animate={{
                      y: [-6, 6, -6],
                      rotateZ: [-2, 2, -2],
                      rotateX: [-3, 3, -3],
                      rotateY: [-5, 5, -5]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative flex items-center justify-center p-2 my-auto"
                  >
                    {/* Ambient red flare underneath */}
                    <div className="absolute w-36 h-36 rounded-full bg-accent-red/35 blur-2xl -z-10 group-hover:bg-accent-red/55 transition-colors" />

                    {/* 3D Red Laser Phosphor Isotype */}
                    <img 
                      src="/assets/images/about/isotipo-jana-red.png" 
                      alt="Isotipo Oficial — Natalia Jaramillo" 
                      className="w-36 h-36 sm:w-44 sm:h-44 object-contain crt-isotype-3d-red select-none transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>

                  {/* Bottom telemetry readout */}
                  <div className="w-full pt-2.5 border-t border-white/15 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-surface-light/65">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
                      <span>ALTAR 00</span>
                    </div>
                    <span className="text-accent-red uppercase tracking-wider font-bold">
                      UNIVERSO VISUAL
                    </span>
                  </div>

                </div>
              </div>

              {/* Micro label underneath */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-surface-light/50 px-2">
                <span>{t.physicalArchive}</span>
                <span className="text-accent-red">{t.device}</span>
              </div>
            </div>
          </ParallaxCard>
        </motion.div>

        {/* Right Side: Big Typographic Display */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left lg:pl-6">
          
          {/* Metadata Bar in Space Mono */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-accent-red/15 border border-accent-red text-accent-red tracking-wider shadow-red-laser-sm">
              {t.badge}
            </span>
            <span className="font-mono text-xs text-surface-light/60 tracking-wider">
              {t.subtitle}
            </span>
          </motion.div>

          {/* Monumental Headline with Kinetic SplitText Reveal */}
          <div className="space-y-1">
            <KineticText
              text={t.titleWord1}
              as="h1"
              immediate={true}
              duration={1.1}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.88] text-white select-none"
            />
            <KineticText
              text={t.titleWord2}
              as="h2"
              immediate={true}
              delay={0.2}
              duration={1.0}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white select-none"
            />
            <div className="font-mono text-xs sm:text-sm text-accent-red tracking-widest uppercase font-semibold pt-2 flex items-center gap-2">
              <span className="text-white/40">//</span>
              <span>{t.conceptLine}</span>
            </div>
          </div>

          {/* Editorial manifesto summary */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg text-surface-light/80 max-w-xl font-normal leading-relaxed"
          >
            {t.manifesto}
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <TornPaperButton 
              text={t.exploreBtn}
              onClick={onExploreProjects}
              arrow="down-right"
              size="md"
            />

            <a 
              href="https://www.behance.net/gallery/256653357/NATALIA-JARAMILLO-PORTAFOLIO-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase px-5 py-3 rounded-full border border-white/20 hover:border-accent-red hover:bg-accent-red/20 text-white transition-all shadow-md group cursor-pointer"
            >
              <span className="font-black text-accent-red text-sm">Bē</span>
              <span>{t.behanceBtn}</span>
            </a>

            <div className="flex items-center gap-2 font-mono text-xs text-surface-light/60 px-4 py-3 rounded-full border border-white/10 bg-void/50 backdrop-blur-sm shadow-md">
              <Compass size={14} className="text-accent-red animate-pulse" />
              <span>{t.disciplinesBadge}</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
