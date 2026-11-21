import React from 'react';

const iconMap = {
  illustrator: '/assets/icons/ADOBE ILLUSTRATOR.png',
  ai: '/assets/icons/ADOBE ILLUSTRATOR.png',
  photoshop: '/assets/icons/ADOBE PHOTOSHOP.png',
  ps: '/assets/icons/ADOBE PHOTOSHOP.png',
  indesign: '/assets/icons/ADOBE INDESING.png',
  indesing: '/assets/icons/ADOBE INDESING.png',
  id: '/assets/icons/ADOBE INDESING.png',
  'after effects': '/assets/icons/ADOBE AFTER EFFECTS.png',
  ae: '/assets/icons/ADOBE AFTER EFFECTS.png',
  premiere: '/assets/icons/ADOBE PREMIERE.png',
  pr: '/assets/icons/ADOBE PREMIERE.png',
  figma: '/assets/icons/FIGMA.png',
  fg: '/assets/icons/FIGMA.png',
};

export default function SoftwareIcon({ name, showLabel = true, size = "md" }) {
  const norm = name.toLowerCase().trim();
  let iconSrc = null;

  for (const [key, path] of Object.entries(iconMap)) {
    if (norm.includes(key)) {
      iconSrc = path;
      break;
    }
  }

  const dim = size === "sm" ? "w-5 h-5" : size === "lg" ? "w-8 h-8" : "w-6 h-6";

  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/10 hover:border-accent-red/60 hover:bg-black/90 transition-all shadow-sm">
      {iconSrc ? (
        <img 
          src={iconSrc} 
          alt={name} 
          className={`${dim} object-contain filter drop-shadow`}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <span className="w-2 h-2 rounded-full bg-accent-red" />
      )}
      {showLabel && (
        <span className="font-mono text-xs text-surface-light font-medium whitespace-nowrap">
          {name}
        </span>
      )}
    </div>
  );
}
