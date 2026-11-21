import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * KineticText: High-end typography reveal replicating GSAP SplitText
 * with character or word mask animations, 3D perspective rotation, and ScrollTrigger.
 */
export default function KineticText({
  text = '',
  as: Component = 'div',
  className = '',
  splitBy = 'chars', // 'chars' | 'words'
  stagger = 0.025,
  delay = 0,
  duration = 0.9,
  immediate = false,
  highlightWords = [],
  highlightClass = 'text-accent-red',
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.kinetic-token');
    if (!elements || elements.length === 0) return;

    // Reset initial state
    gsap.set(elements, {
      y: '115%',
      opacity: 0,
      rotateX: -30,
      transformOrigin: '50% 100%',
    });

    const animConfig = {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration: duration,
      ease: 'power4.out',
      stagger: stagger,
      delay: delay,
    };

    let ctx = gsap.context(() => {
      if (immediate) {
        gsap.to(elements, animConfig);
      } else {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 88%',
          onEnter: () => gsap.to(elements, animConfig),
          once: true,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [text, splitBy, stagger, delay, duration, immediate]);

  // Token rendering
  if (splitBy === 'words') {
    const words = text.split(' ');
    return (
      <Component ref={containerRef} className={`${className} perspective-1000`}>
        {words.map((word, wIdx) => {
          const isHighlight = highlightWords.includes(word.trim().toUpperCase());
          return (
            <span key={wIdx} className="inline-block overflow-hidden mr-[0.25em] align-top">
              <span
                className={`kinetic-token inline-block transform-gpu will-change-transform ${
                  isHighlight ? highlightClass : ''
                }`}
              >
                {word}
              </span>
            </span>
          );
        })}
      </Component>
    );
  }

  // Split by characters (grouped in words to keep word wrap natural)
  const words = text.split(' ');
  return (
    <Component ref={containerRef} className={`${className} perspective-1000`}>
      {words.map((word, wIdx) => {
        const isHighlight = highlightWords.includes(word.trim().toUpperCase());
        return (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em] align-top">
            {word.split('').map((char, cIdx) => (
              <span key={cIdx} className="inline-block overflow-hidden align-top">
                <span
                  className={`kinetic-token inline-block transform-gpu will-change-transform ${
                    isHighlight ? highlightClass : ''
                  }`}
                >
                  {char}
                </span>
              </span>
            ))}
          </span>
        );
      })}
    </Component>
  );
}
