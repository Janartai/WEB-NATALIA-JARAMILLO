import React, { useRef, useState } from 'react';

/**
 * ParallaxCard: 3D interactive tilt effect with dynamic laser sheen reflection
 */
export default function ParallaxCard({
  children,
  className = '',
  maxTilt = 7,
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    const rX = (percentY - 0.5) * -maxTilt * 2;
    const rY = (percentX - 0.5) * maxTilt * 2;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({ x: percentX * 100, y: percentY * 100 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: '1200px',
      }}
      className={`relative ${className}`}
      {...props}
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered
            ? 'transform 0.12s cubic-bezier(0.2, 0, 0, 1)'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative"
      >
        {children}

        {/* Dynamic Laser Glare / Reflection Layer */}
        {isHovered && (
          <div
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(200, 10, 31, 0.22) 0%, rgba(200, 10, 31, 0.05) 45%, transparent 70%)`,
            }}
            className="absolute inset-0 pointer-events-none rounded-[inherit] mix-blend-screen transition-opacity duration-300"
          />
        )}
      </div>
    </div>
  );
}
