import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor: Minimalist Editorial Ink Pointer
 * Replaces high-tech laser crosshairs with an authentic, organic editorial ink mark.
 */
export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const textRef = useRef(null);

  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default'); // 'default', 'pointer', 'action'
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device early
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Smooth GSAP setters
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });

    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power2.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Check for custom cursor action text
      const cursorTarget = target.closest('[data-cursor-text]');
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor-text');
        setCursorText(text || '');
        setCursorVariant('action');
        return;
      }

      // Check if hovering clickable interactive element
      const interactive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
      if (interactive) {
        setCursorText('');
        setCursorVariant('pointer');
        return;
      }

      // Default
      setCursorText('');
      setCursorVariant('default');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      
      {/* 1. Subtle Crimson Ink Dot */}
      <div
        ref={cursorDotRef}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
        }}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-red transition-opacity duration-200 pointer-events-none ${
          cursorVariant === 'action' ? 'scale-0' : 'scale-100'
        }`}
      />

      {/* 2. Soft Tactile Aura / Action Badge */}
      <div
        ref={cursorRingRef}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
        }}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-none ${
          cursorVariant === 'default'
            ? 'w-7 h-7 border border-white/20 bg-transparent'
            : cursorVariant === 'pointer'
            ? 'w-11 h-11 border border-accent-red/60 bg-accent-red/10 backdrop-blur-[1px]'
            : cursorVariant === 'action'
            ? 'w-auto px-4 py-1.5 rounded-full bg-[#120a0d] border border-accent-red/70 shadow-lg text-white'
            : 'w-7 h-7 opacity-0'
        }`}
      >
        {/* Editorial Action Text */}
        {cursorVariant === 'action' && cursorText && (
          <span
            ref={textRef}
            className="font-mono text-[10px] font-bold tracking-wider text-[#f5efe6] uppercase whitespace-nowrap"
          >
            {cursorText}
          </span>
        )}
      </div>

    </div>
  );
}
