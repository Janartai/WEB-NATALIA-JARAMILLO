import React from 'react';
import { motion } from 'framer-motion';

/**
 * TornPaperButton / TornPaperBadge
 * Authentic torn craft paper container based on user's editorial reference.
 * Renders ragged fibrous paper edges, organic crease shadows, bold red typography,
 * and an editorial hand-drawn angled arrow.
 */
export default function TornPaperButton({
  text = 'EXPLORAR PROYECTOS',
  onClick,
  arrow = 'down-right', // 'down-right', 'right', 'down', 'none'
  className = '',
  size = 'md', // 'sm', 'md', 'lg'
  as = 'button',
  children
}) {
  const Component = as === 'button' ? motion.button : motion.div;

  // Arrow SVGs matching reference style
  const renderArrow = () => {
    if (arrow === 'none') return null;

    if (arrow === 'down-right') {
      return (
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#c80a1e" 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5 flex-shrink-0"
        >
          {/* Main diagonal line */}
          <line x1="6" y1="6" x2="17" y2="17" />
          {/* Arrowhead */}
          <polyline points="17 9 17 17 9 17" />
        </svg>
      );
    }

    if (arrow === 'right') {
      return (
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#c80a1e" 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1.5 flex-shrink-0"
        >
          <line x1="5" y1="12" x2="18" y2="12" />
          <polyline points="12 6 18 12 12 18" />
        </svg>
      );
    }

    if (arrow === 'down') {
      return (
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#c80a1e" 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-y-1.5 flex-shrink-0"
        >
          <line x1="12" y1="5" x2="12" y2="18" />
          <polyline points="6 12 12 18 18 12" />
        </svg>
      );
    }

    return null;
  };

  const sizeStyles = {
    sm: 'px-5 py-2.5 text-xs sm:text-sm tracking-wider',
    md: 'px-7 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base md:text-lg tracking-wider',
    lg: 'px-9 py-4 sm:px-12 sm:py-5 text-base sm:text-lg md:text-xl tracking-widest'
  };

  return (
    <Component
      onClick={onClick}
      whileHover={{ scale: 1.04, rotate: 0.4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`group relative inline-flex items-center justify-center cursor-pointer select-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] hover:drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] transition-all ${className}`}
      style={{
        transform: 'rotate(-0.8deg)'
      }}
    >
      {/* 1. Underlying Torn Craft Paper Texture Image */}
      <img
        src="/torn-paper-banner.png"
        alt="Papel rasgado"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none filter contrast-105"
      />

      {/* 2. Paper Texture Surface Overlay (subtle organic tactile grain) */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-15 mix-blend-multiply"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.08) 0%, transparent 80%)'
        }}
      />

      {/* 3. Text & Arrow Content in High-Impact Red */}
      <div className={`relative z-10 flex items-center justify-center gap-3 sm:gap-4 font-black text-accent-red uppercase font-satoshi ${sizeStyles[size] || sizeStyles.md}`}>
        {children ? (
          children
        ) : (
          <>
            <span className="font-extrabold tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
              {text}
            </span>
            {renderArrow()}
          </>
        )}
      </div>
    </Component>
  );
}
