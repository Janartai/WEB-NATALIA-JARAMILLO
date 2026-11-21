import React from 'react';

/**
 * TornCrimsonRibbon
 * Authentic deckled-edge crimson ribbon with repeating discipline text
 * Directly replicated from Natalia Jaramillo's Behance Portfolio 2026.
 */
export default function TornCrimsonRibbon({ text = "BRANDING", repeat = 8, className = "" }) {
  const repeatedText = Array(repeat).fill(`//${text}`).join('   ');

  return (
    <div className={`relative w-full overflow-hidden select-none my-6 ${className}`}>
      {/* Torn Crimson Strip with organic deckled edges via CSS clip-path */}
      <div 
        className="relative w-full py-2.5 sm:py-3 bg-gradient-to-r from-[#7a0612] via-accent-red to-[#8f0917] shadow-xl shadow-black/60 flex items-center justify-center"
        style={{
          clipPath: `polygon(
            0% 4px, 2% 0px, 5% 5px, 8% 1px, 12% 4px, 16% 0px, 20% 5px, 24% 2px, 28% 5px, 32% 1px, 36% 4px, 40% 0px, 44% 4px, 48% 1px, 52% 5px, 56% 2px, 60% 4px, 64% 0px, 68% 5px, 72% 1px, 76% 4px, 80% 0px, 84% 5px, 88% 2px, 92% 4px, 96% 1px, 100% 3px,
            100% calc(100% - 3px), 97% 100%, 93% calc(100% - 4px), 89% calc(100% - 1px), 85% calc(100% - 5px), 81% calc(100% - 2px), 77% calc(100% - 4px), 73% 100%, 69% calc(100% - 4px), 65% calc(100% - 1px), 61% calc(100% - 5px), 57% calc(100% - 2px), 53% calc(100% - 5px), 49% 100%, 45% calc(100% - 3px), 41% calc(100% - 5px), 37% calc(100% - 1px), 33% 100%, 29% calc(100% - 4px), 25% calc(100% - 2px), 21% calc(100% - 5px), 17% calc(100% - 1px), 13% 100%, 9% calc(100% - 4px), 5% calc(100% - 1px), 1% calc(100% - 5px), 0% calc(100% - 2px)
          )`
        }}
      >
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)'
          }}
        />

        {/* Text ribbon */}
        <div className="font-mono text-xs sm:text-sm font-black tracking-widest text-white uppercase whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-4">
          {repeatedText}
        </div>
      </div>
    </div>
  );
}
