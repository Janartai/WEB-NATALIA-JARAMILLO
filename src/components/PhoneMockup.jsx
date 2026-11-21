import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Maximize2, Sparkles, Smartphone } from 'lucide-react';

/**
 * PhoneMockup: Realistic Smartphone Presentation Frame
 * Specifically designed for UI Design projects, app screen mockups, 
 * and interactive mobile prototype videos.
 */
export default function PhoneMockup({
  src,
  isVideo = false,
  poster = null,
  title = '',
  subtitle = '',
  badge = 'PROTOTIPO INTERACTIVO',
  autoPlay = true,
  loop = true,
  className = '',
  aspectRatio = 'aspect-[9/19.5]',
  size = 'md', // 'compact', 'sm', 'md', 'carousel'
  videoScale = 'scale-[1.07]',
  onExpand = null
}) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      if (autoPlay) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [src, isVideo, autoPlay]);

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const chassisSizeClasses = 
    size === 'compact' || size === 'sm'
      ? 'max-w-[205px] sm:max-w-[225px] md:max-w-[240px] rounded-[34px] sm:rounded-[38px] border-[5px] sm:border-[6px]'
      : size === 'carousel'
      ? 'w-[215px] sm:w-[240px] md:w-[260px] shrink-0 rounded-[36px] sm:rounded-[40px] border-[6px] sm:border-[7px]'
      : 'max-w-[260px] sm:max-w-[290px] md:max-w-[310px] rounded-[44px] sm:rounded-[50px] border-[8px] sm:border-[10px]';

  const islandClasses = 
    size === 'compact' || size === 'sm'
      ? 'top-2 w-16 sm:w-20 h-4 sm:h-4.5 px-2'
      : size === 'carousel'
      ? 'top-2.5 w-20 sm:w-22 h-4.5 sm:h-5 px-2'
      : 'top-2.5 sm:top-3 w-24 sm:w-28 h-5 sm:h-5.5 px-2.5';

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      
      {/* Outer Phone Hardware Chassis */}
      <div 
        className={`relative w-full ${chassisSizeClasses} ${aspectRatio} border-[#1d1d20] bg-black shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(200,10,31,0.25)] ring-1 ring-white/20 overflow-hidden select-none transition-transform duration-500 hover:scale-[1.02]`}
      >
        {/* Subtle Side Button Outlines (Hardware Feel) */}
        <div className="absolute -left-[9px] top-20 w-[2.5px] h-8 bg-[#333338] rounded-l-sm pointer-events-none" />
        <div className="absolute -left-[9px] top-30 w-[2.5px] h-10 bg-[#333338] rounded-l-sm pointer-events-none" />
        <div className="absolute -right-[9px] top-24 w-[2.5px] h-12 bg-[#333338] rounded-r-sm pointer-events-none" />

        {/* Top Dynamic Island / Sensor Pill */}
        <div className={`absolute ${islandClasses} left-1/2 -translate-x-1/2 z-30 bg-black rounded-full flex items-center justify-between shadow-md pointer-events-none border border-white/10`}>
          <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#121215] flex items-center justify-center">
            <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#0a1826]" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-accent-red/80 animate-pulse" />
        </div>

        {/* Screen Content Container */}
        <div className="relative w-full h-full bg-[#0d0709] overflow-hidden flex items-center justify-center">
          
          {isVideo ? (
            <div 
              onClick={onExpand ? onExpand : togglePlay}
              className="relative w-full h-full cursor-pointer group/video flex items-center justify-center overflow-hidden"
            >
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                playsInline
                loop={loop}
                muted={true}
                autoPlay={autoPlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className={`w-full h-full object-cover ${videoScale} origin-center`}
              />

              {/* Central Hover Overlay with AMPLIAR MOCKUP (matches media_1794977313561_7de6a4b2.jpg) */}
              {onExpand && (
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/video:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
                  <div className="px-3.5 py-1.5 rounded-full bg-black/85 border border-accent-red text-white font-mono text-[10px] sm:text-xs flex items-center gap-1.5 shadow-red-laser-sm">
                    <Maximize2 size={12} className="text-accent-red" />
                    <span>AMPLIAR MOCKUP</span>
                  </div>
                </div>
              )}

              {/* Quick Play/Pause control in corner */}
              <div className="absolute bottom-5 right-2.5 z-20 flex items-center gap-1.5 opacity-0 group-hover/video:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); togglePlay(e); }}
                  className="p-1 rounded-full bg-black/75 backdrop-blur-md text-white/90 hover:text-white border border-white/15"
                  title={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? <Pause size={10} /> : <Play size={10} />}
                </button>
              </div>
            </div>
          ) : (
            <div 
              onClick={onExpand ? onExpand : undefined}
              className={`relative w-full h-full flex items-center justify-center ${onExpand ? 'cursor-pointer group/img' : ''}`}
            >
              <img
                src={src}
                alt={title || 'Mockup de app'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                onError={(e) => {
                  e.target.src = "/assets/images/about/profile.png";
                }}
              />
              {onExpand && (
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-full bg-black/80 border border-accent-red text-white font-mono text-[10px] flex items-center gap-1.5 shadow-red-laser-sm">
                    <Maximize2 size={11} className="text-accent-red" />
                    <span>AMPLIAR MOCKUP</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Screen Glare & Glass Reflection across top right corner */}
          <div 
            className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.12]"
            aria-hidden="true"
          />

          {/* Bottom Home Indicator Bar (for static images) */}
          {!isVideo && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 w-24 sm:w-28 h-1 bg-white/40 rounded-full pointer-events-none" />
          )}

        </div>

      </div>

      {/* Optional Metadata Footnote below phone */}
      {(title || subtitle) && (
        <div className="mt-4 text-center max-w-[280px]">
          <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] text-accent-red uppercase tracking-wider mb-0.5">
            <Smartphone size={12} />
            <span>{badge}</span>
          </div>
          {title && (
            <h4 className="font-mono text-sm font-bold text-white tracking-wide uppercase">
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="font-mono text-[11px] text-surface-light/60 mt-0.5 line-clamp-2">
              {subtitle}
            </p>
          )}
        </div>
      )}

    </div>
  );
}
