import React, { useEffect, useState } from 'react';

export default function BackgroundLaser() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized mouse position for soft organic parallax
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-void select-none">
      {/* 1. Base dark background */}
      <div className="absolute inset-0 bg-[#080808]" />

      {/* 2. Smoke texture layer from RECURSOS (Capa 88.png) with gentle parallax and ambient blend */}
      <div 
        className="absolute -inset-10 transition-transform duration-1000 ease-out pointer-events-none opacity-45 mix-blend-screen"
        style={{
          transform: `translate(${(mousePos.x - 50) * -0.08}%, ${(mousePos.y - 50) * -0.08}%) scale(1.06)`,
          backgroundImage: `url('/Capa 88.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 3. Subtle secondary smoke wave for atmospheric depth */}
      <div 
        className="absolute -inset-12 transition-transform duration-1200 ease-out pointer-events-none opacity-25 mix-blend-screen"
        style={{
          transform: `translate(${(mousePos.x - 50) * 0.05}%, ${(mousePos.y - 50) * 0.05}%) scale(1.08) rotate(180deg)`,
          backgroundImage: `url('/Capa 88.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 4. Warm subtle radial light responding to cursor */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 opacity-60"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(200, 10, 31, 0.08) 0%, rgba(10, 10, 10, 0.5) 45%, #080808 85%)`
        }}
      />

      {/* 5. Fine film grain / noise overlay */}
      <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
    </div>
  );
}
