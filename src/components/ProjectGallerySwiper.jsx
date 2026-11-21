import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { 
  Navigation, Pagination, EffectCoverflow, 
  Keyboard, Autoplay, Thumbs 
} from 'swiper/modules';
import { 
  ChevronLeft, ChevronRight, Maximize2, 
  Play, Pause, Layers, MonitorPlay 
} from 'lucide-react';

// Import essential Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/thumbs';

export default function ProjectGallerySwiper({ 
  images = [], 
  title = '', 
  onExpandImage,
  language = 'es' 
}) {
  const [activeMode, setActiveMode] = useState('coverflow'); // 'coverflow' or 'cinema'
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef(null);

  if (!images || images.length === 0) return null;

  const toggleAutoplay = () => {
    if (!swiperRef.current) return;
    if (isPlaying) {
      swiperRef.current.autoplay.stop();
      setIsPlaying(false);
    } else {
      swiperRef.current.autoplay.start();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full rounded-card border-2 border-accent-red bg-gradient-to-b from-[#18090d] via-[#100608] to-[#0a0506] p-4 sm:p-6 shadow-2xl overflow-hidden">
      
      {/* Top Gallery Toolbar */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-white/10 gap-3">
        
        {/* Left: Indicator & Badge */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-accent-red/20 border border-accent-red text-accent-red font-bold flex items-center gap-2 shadow-red-laser-sm">
            <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
            SWIPER 3D SHOWCASE
          </span>
          <span className="font-mono text-xs text-surface-light/60">
            {activeIndex + 1} / {images.length} {language === 'es' ? 'PIEZAS' : 'ASSETS'}
          </span>
        </div>

        {/* Right: Mode Switcher & Controls */}
        <div className="flex items-center gap-2">
          
          {/* Coverflow vs Cinema Mode */}
          <div className="flex rounded-full bg-black/60 p-1 border border-white/10">
            <button
              onClick={() => setActiveMode('coverflow')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-semibold transition-all ${
                activeMode === 'coverflow'
                  ? 'bg-accent-red text-white shadow-red-laser-sm'
                  : 'text-surface-light/60 hover:text-white'
              }`}
            >
              <Layers size={12} />
              <span>3D COVERFLOW</span>
            </button>
            <button
              onClick={() => setActiveMode('cinema')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-semibold transition-all ${
                activeMode === 'cinema'
                  ? 'bg-accent-red text-white shadow-red-laser-sm'
                  : 'text-surface-light/60 hover:text-white'
              }`}
            >
              <MonitorPlay size={12} />
              <span>CINEMATIC</span>
            </button>
          </div>

          {/* Autoplay Play/Pause */}
          <button
            onClick={toggleAutoplay}
            className={`p-2 rounded-full border transition-all ${
              isPlaying
                ? 'bg-accent-red text-white border-accent-red shadow-red-laser-sm'
                : 'bg-white/5 border-white/15 text-surface-light hover:border-accent-red hover:text-white'
            }`}
            title={isPlaying ? 'Pausar reproducción' : 'Reproducción automática'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>
      </div>

      {/* Main Swiper Container */}
      <div className="relative group/swiper py-2">
        
        {/* Previous Button */}
        <button
          className="swiper-custom-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-accent-red hover:border-accent-red hover:shadow-red-laser-sm transition-all duration-300 opacity-80 group-hover/swiper:opacity-100"
          aria-label="Pieza anterior"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next Button */}
        <button
          className="swiper-custom-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-accent-red hover:border-accent-red hover:shadow-red-laser-sm transition-all duration-300 opacity-80 group-hover/swiper:opacity-100"
          aria-label="Siguiente pieza"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dynamic Swiper Instance */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          key={activeMode} // Re-mount on mode change for clean transitions
          modules={[Navigation, Pagination, EffectCoverflow, Keyboard, Autoplay, Thumbs]}
          navigation={{
            prevEl: '.swiper-custom-prev',
            nextEl: '.swiper-custom-next',
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          keyboard={{ enabled: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          centeredSlides={activeMode === 'coverflow'}
          slidesPerView={activeMode === 'coverflow' ? 'auto' : 1}
          spaceBetween={activeMode === 'coverflow' ? 24 : 20}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          effect={activeMode === 'coverflow' ? 'coverflow' : 'slide'}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 160,
            modifier: 1,
            slideShadows: false,
          }}
          className="w-full pb-10"
        >
          {images.map((imgSrc, idx) => (
            <SwiperSlide
              key={idx}
              className={`transition-all duration-500 ${
                activeMode === 'coverflow'
                  ? 'max-w-[85%] sm:max-w-[70%] md:max-w-[620px]'
                  : 'w-full'
              }`}
            >
              <div 
                data-cursor-text={language === 'es' ? 'DESLIZAR' : 'SWIPE'}
                className="relative rounded-[26px] overflow-hidden bg-black/90 border border-white/15 aspect-[16/10] sm:aspect-[16/9] shadow-2xl flex items-center justify-center group/card cursor-grab active:cursor-grabbing"
              >
                
                <img
                  src={imgSrc}
                  alt={`${title} - Muestra #${idx + 1}`}
                  className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 group-hover/card:scale-105"
                  onError={(e) => {
                    e.target.src = "/assets/images/about/profile.png";
                  }}
                />

                {/* Subtle dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-accent-red/60 text-white font-mono text-[11px] flex items-center gap-2 shadow-red-laser-sm">
                  <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
                  <span>PIEZA #{idx + 1}</span>
                </div>

                {/* Click to expand button */}
                <button
                  onClick={() => onExpandImage && onExpandImage(imgSrc)}
                  className="absolute bottom-4 right-4 z-10 px-3.5 py-2 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-xs flex items-center gap-2 hover:bg-accent-red hover:border-accent-red hover:shadow-red-laser-sm transition-all"
                >
                  <Maximize2 size={13} className="text-accent-red" />
                  <span>{language === 'es' ? 'AMPLIAR' : 'EXPAND'}</span>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Interactive Thumbnail Navigation Strip */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] text-surface-light/60 uppercase">
            {language === 'es' ? 'Navegación por miniaturas' : 'Thumbnail Strip'}
          </span>
          <span className="font-mono text-[10px] text-accent-red">
            {language === 'es' ? 'Desliza o haz clic para saltar' : 'Swipe or click to jump'}
          </span>
        </div>

        <Swiper
          onSwiper={setThumbsSwiper}
          watchSlidesProgress={true}
          slidesPerView={images.length > 5 ? 5 : images.length}
          spaceBetween={10}
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 8 },
            640: { slidesPerView: 4, spaceBetween: 10 },
            768: { slidesPerView: 6, spaceBetween: 12 },
          }}
          className="thumbs-swiper"
        >
          {images.map((imgSrc, idx) => (
            <SwiperSlide key={idx} className="cursor-pointer">
              <div
                className={`relative rounded-xl overflow-hidden aspect-[16/10] bg-black border-2 transition-all duration-300 ${
                  activeIndex === idx
                    ? 'border-accent-red shadow-red-laser-sm scale-105 ring-2 ring-accent-red/50'
                    : 'border-white/15 opacity-50 hover:opacity-100 hover:border-white/40'
                }`}
              >
                <img
                  src={imgSrc}
                  alt={`Miniatura ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/images/about/profile.png";
                  }}
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] text-white">
                  #{idx + 1}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
}
