import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';

export default function SplashScreen({ onComplete, language = 'es' }) {
  const [animationPhase, setAnimationPhase] = useState('scattered'); // 'scattered', 'converging', 'assembled', 'exiting'
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const containerRef = useRef(null);
  const wordsWrapRef = useRef(null);
  const subtitleRef = useRef(null);
  const topShutterRef = useRef(null);
  const bottomShutterRef = useRef(null);
  const laserBeamRef = useRef(null);
  const flashOverlayRef = useRef(null);

  const masterTimelineRef = useRef(null);
  const floatTimelineRef = useRef(null);

  // Parallax mouse tracker matching BackgroundLaser
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Selected phrase fixed to "ALTAR VISUAL" as requested
  const phraseConfig = {
    lines: ['ALTAR', 'VISUAL'],
    subtext: language === 'es' ? 'ESPACIO DE EXPERIMENTACIÓN GRÁFICA // NATALIA JARAMILLO' : 'GRAPHIC EXPERIMENTATION SPACE // NATALIA JARAMILLO'
  };

  // Parse lines into structure of words & characters
  const characterData = useMemo(() => {
    let globalIndex = 0;
    return phraseConfig.lines.map((line, lineIdx) => {
      const words = line.split(' ');
      return {
        lineIdx,
        words: words.map((word, wordIdx) => {
          const chars = word.split('').map((char) => {
            const charObj = {
              char,
              index: globalIndex
            };
            globalIndex++;
            return charObj;
          });
          return { word, chars };
        })
      };
    });
  }, [language]);

  // Execute the full animation sequence
  const startAnimation = () => {
    if (masterTimelineRef.current) masterTimelineRef.current.kill();
    if (floatTimelineRef.current) floatTimelineRef.current.kill();

    if (!wordsWrapRef.current) return;

    // Direct DOM query guarantees 100% reliable element selection
    const letters = Array.from(wordsWrapRef.current.querySelectorAll('.crt-char-item'));
    if (!letters || letters.length === 0) return;

    setAnimationPhase('scattered');

    // 1. Compute scattered initial positions (Elliptical 3D cloud matching Frame 1)
    const winW = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const winH = typeof window !== 'undefined' ? window.innerHeight : 800;

    const scatterCoords = letters.map((_, i) => {
      const angle = (i / letters.length) * Math.PI * 2 + (Math.random() - 0.5) * 1.3;
      const radiusX = Math.min(winW * 0.38, 220 + Math.random() * 320);
      const radiusY = Math.min(winH * 0.32, 120 + Math.random() * 200);

      return {
        x: Math.cos(angle) * radiusX + (Math.random() - 0.5) * 120,
        y: Math.sin(angle) * radiusY + (Math.random() - 0.5) * 90,
        z: (Math.random() - 0.5) * 400,
        rx: (Math.random() - 0.5) * 130,
        ry: (Math.random() - 0.5) * 130,
        rz: (Math.random() - 0.5) * 150,
        scale: 0.75 + Math.random() * 0.65,
        opacity: 0.75 + Math.random() * 0.25,
        blur: Math.random() < 0.4 ? (1 + Math.random() * 3) : 0
      };
    });

    // 2. Immediately set all letters to their scattered 3D coordinates
    letters.forEach((el, idx) => {
      const coord = scatterCoords[idx];
      gsap.set(el, {
        x: coord.x,
        y: coord.y,
        z: coord.z,
        rotationX: coord.rx,
        rotationY: coord.ry,
        rotationZ: coord.rz,
        scale: coord.scale,
        opacity: coord.opacity,
        filter: `blur(${coord.blur}px)`,
        transformPerspective: 1200,
        force3D: true
      });
    });

    // Reset subtitle
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0, y: 15 });
    }

    // 3. Zero-gravity floating animation while scattered (Frame 1 atmosphere)
    floatTimelineRef.current = gsap.timeline({ repeat: -1, yoyo: true });
    letters.forEach((el, idx) => {
      const dur = 1.6 + (idx % 4) * 0.3;
      floatTimelineRef.current.to(
        el,
        {
          y: '+=16',
          x: '+=8',
          rotationZ: '+=12',
          rotationX: '+=10',
          duration: dur,
          ease: 'sine.inOut'
        },
        idx * 0.04
      );
    });

    // 4. Magnetic convergence timeline (Transition to Frame 2)
    const master = gsap.timeline({
      delay: 1.5,
      onStart: () => {
        setAnimationPhase('converging');
        if (floatTimelineRef.current) floatTimelineRef.current.kill();
      }
    });

    // Magnetic pull into final assembled grid
    master.to(letters, {
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.8,
      ease: 'expo.inOut',
      stagger: {
        amount: 0.5,
        from: 'random'
      }
    });

    // Phosphor snap & flash impact
    master.to(
      wordsWrapRef.current,
      {
        scale: 1.05,
        duration: 0.12,
        ease: 'power2.out',
        onStart: () => {
          setAnimationPhase('assembled');
        }
      },
      '-=0.15'
    );

    // Screen phosphor flare flash
    if (flashOverlayRef.current) {
      master.fromTo(
        flashOverlayRef.current,
        { opacity: 0 },
        { opacity: 0.38, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' },
        '-=0.15'
      );
    }

    // Recoil to standard scale
    master.to(wordsWrapRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'elastic.out(1, 0.4)'
    });

    // Technical Subtitle fades in
    if (subtitleRef.current) {
      master.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        },
        '-=0.2'
      );
    }

    // Hold moment for appreciation, then open to Home
    master.to({}, { duration: 1.5 });
    master.call(() => {
      triggerExit();
    });

    masterTimelineRef.current = master;
  };

  // Exit transition revealing the Home section
  const triggerExit = () => {
    if (animationPhase === 'exiting') return;
    setAnimationPhase('exiting');

    if (masterTimelineRef.current) masterTimelineRef.current.kill();
    if (floatTimelineRef.current) floatTimelineRef.current.kill();

    const exitTl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem('jana_splash_seen', 'true');
        } catch (e) {
          // ignore
        }
        if (onComplete) onComplete();
      }
    });

    // Zoom and dissolve words forward into camera
    if (wordsWrapRef.current) {
      exitTl.to(
        wordsWrapRef.current,
        {
          scale: 1.35,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 0.65,
          ease: 'power3.in'
        },
        0
      );
    }

    if (subtitleRef.current) {
      exitTl.to(subtitleRef.current, { opacity: 0, duration: 0.25 }, 0);
    }

    // Laser split beam sweep
    if (laserBeamRef.current) {
      exitTl.fromTo(
        laserBeamRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.35, ease: 'expo.out' },
        0.1
      );
      exitTl.to(laserBeamRef.current, { opacity: 0, duration: 0.2 }, 0.45);
    }

    // Split curtain shutters
    if (topShutterRef.current && bottomShutterRef.current) {
      exitTl.to(
        topShutterRef.current,
        {
          yPercent: -100,
          duration: 0.75,
          ease: 'expo.inOut'
        },
        0.2
      );
      exitTl.to(
        bottomShutterRef.current,
        {
          yPercent: 100,
          duration: 0.75,
          ease: 'expo.inOut'
        },
        0.2
      );
    }
  };

  // Keyboard shortcut listener (ESC or Space skips)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        e.preventDefault();
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (masterTimelineRef.current) masterTimelineRef.current.kill();
      if (floatTimelineRef.current) floatTimelineRef.current.kill();
    };
  }, [language]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] overflow-hidden select-none bg-[#080808] font-mono"
      style={{ perspective: '1200px' }}
    >
      {/* 0. Clean Smoke Background Layers (Identical to entire website) */}
      <div className="absolute inset-0 bg-[#080808] pointer-events-none z-0" />

      {/* Primary Smoke Texture (/Capa 88.png) with gentle parallax */}
      <div 
        className="absolute -inset-10 transition-transform duration-1000 ease-out pointer-events-none opacity-45 mix-blend-screen z-0"
        style={{
          transform: `translate(${(mousePos.x - 50) * -0.08}%, ${(mousePos.y - 50) * -0.08}%) scale(1.06)`,
          backgroundImage: `url('/Capa 88.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Secondary Smoke Layer for atmospheric depth */}
      <div 
        className="absolute -inset-12 transition-transform duration-1200 ease-out pointer-events-none opacity-25 mix-blend-screen z-0"
        style={{
          transform: `translate(${(mousePos.x - 50) * 0.05}%, ${(mousePos.y - 50) * 0.05}%) scale(1.08) rotate(180deg)`,
          backgroundImage: `url('/Capa 88.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Warm subtle radial red light responding to cursor */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 opacity-60 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(200, 10, 30, 0.16) 0%, transparent 70%)`
        }}
      />

      {/* Phosphor Flash Flare Overlay */}
      <div
        ref={flashOverlayRef}
        className="absolute inset-0 pointer-events-none z-25 opacity-0 bg-accent-red/30"
      />

      {/* Top/Bottom Split Shutters for Cinematic Opening with Smoke Texture */}
      <div
        ref={topShutterRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#080808] z-5 origin-top pointer-events-none overflow-hidden"
      >
        <div 
          className="absolute inset-0 opacity-45 mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `url('/Capa 88.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>
      <div
        ref={bottomShutterRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#080808] z-5 origin-bottom pointer-events-none overflow-hidden"
      >
        <div 
          className="absolute inset-0 opacity-45 mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `url('/Capa 88.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      {/* 6. Center Laser Beam Split Line */}
      <div
        ref={laserBeamRef}
        className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-accent-red shadow-red-laser z-30 opacity-0 pointer-events-none origin-center"
      />

      {/* Header Skip Action */}
      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-40 text-surface-light/60 font-mono text-[11px] tracking-widest">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
          <span className="text-white/80 uppercase font-bold tracking-wider">
            ALTAR VISUAL
          </span>
        </div>

        <button
          onClick={triggerExit}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-accent-red/20 border border-white/10 hover:border-accent-red text-white/90 hover:text-white transition-all duration-200 cursor-pointer"
          title="Saltar intro (ESC)"
        >
          <span className="text-[10px] tracking-wider uppercase font-semibold">
            {language === 'es' ? 'SALTAR INTRO' : 'SKIP INTRO'}
          </span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-white/70 font-bold group-hover:bg-accent-red group-hover:text-white">
            ESC
          </span>
        </button>
      </header>

      {/* 8. Central Magnetic 3D Stage (Where Letters Assemble into ALTAR VISUAL) */}
      <div className="relative w-full h-full flex flex-col items-center justify-center z-30 px-4">
        <div
          ref={wordsWrapRef}
          className="flex flex-col items-center justify-center gap-3 md:gap-5 text-center cursor-default"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {characterData.map((lineData) => (
            <div
              key={`line-${lineData.lineIdx}`}
              className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {lineData.words.map((wordData, wIdx) => (
                <div
                  key={`w-${lineData.lineIdx}-${wIdx}`}
                  className="inline-flex items-center tracking-[0.16em] md:tracking-[0.24em]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {wordData.chars.map((c) => (
                    <span
                      key={`c-${c.index}`}
                      className="crt-char-item crt-letter-red font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl select-none"
                    >
                      {c.char}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Technical CRT Subtitle */}
        <div
          ref={subtitleRef}
          className="mt-8 md:mt-10 flex flex-col items-center gap-1.5 text-center opacity-0"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-surface-light/80 tracking-[0.25em] uppercase">
            <span className="text-accent-red font-bold">[</span>
            <span>{phraseConfig.subtext}</span>
            <span className="text-accent-red font-bold">]</span>
          </div>
          <div className="font-mono text-[9px] text-surface-light/40 tracking-wider">
            {language === 'es' ? 'CARGANDO ALTAR VISUAL' : 'LOADING VISUAL ALTAR'} • 100%
          </div>
        </div>
      </div>
    </div>
  );
}
