import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SlidersHorizontal, 
  Layers, 
  Move, 
  Columns2, 
  X, 
  Sparkles, 
  FolderGit2,
  ChevronRight
} from 'lucide-react';
import ReadymagHorizontalScroll from './ReadymagHorizontalScroll';
import ReadymagStackedCards from './ReadymagStackedCards';
import ReadymagDraggableCollage from './ReadymagDraggableCollage';
import ReadymagSplitSlider from './ReadymagSplitSlider';
import { portfolioData } from '../../data/portfolioData';

/**
 * ReadymagShowcaseLab
 * Laboratorio de pruebas y experimentación de galerías estilo Readymag.
 * Permite cambiar entre los 4 formatos icónicos y probarlos con proyectos reales.
 * Completamente modular e independiente de la navegación pública de la web.
 */
export default function ReadymagShowcaseLab({ 
  initialGallery = 'horizontal', 
  onClose,
  sampleProjectIndex = 0 
}) {
  const [activeGalleryType, setActiveGalleryType] = useState(initialGallery);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(sampleProjectIndex);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const projects = portfolioData?.projects || [];
  const currentProject = projects[selectedProjectIdx] || projects[0];

  // Prepare images array with titles/metadata
  const galleryItems = currentProject ? (
    currentProject.images.map((imgSrc, idx) => ({
      src: imgSrc,
      title: `${currentProject.title} — Registro #${idx + 1}`,
      caption: currentProject.subtitle ? currentProject.subtitle.es : currentProject.title,
      meta: currentProject.role ? currentProject.role.es : 'Diseño Gráfico',
      concept: currentProject.concept
    }))
  ) : [];

  const galleryTabs = [
    { id: 'horizontal', label: '01. Horizontal Stream', icon: SlidersHorizontal },
    { id: 'stacked', label: '02. Stacked Deck', icon: Layers },
    { id: 'collage', label: '03. Draggable Collage', icon: Move },
    { id: 'split', label: '04. Split Slider', icon: Columns2 },
  ];

  return (
    <div className="w-full min-h-screen bg-void text-surface-light font-satoshi py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Telemetry & Control Bar */}
      <div className="max-w-7xl mx-auto mb-8 p-6 rounded-3xl border border-white/15 bg-neutral-950/90 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent-red uppercase tracking-wider mb-1.5">
              <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
              <span>READYMAG EXPERIMENTAL LAB // COMPONENTES MODULARES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Galerías de Diseño Editorial
            </h1>
            <p className="font-mono text-xs text-surface-light/60 mt-1 max-w-xl">
              Colección de 4 patrones interactivos inspirados en la plataforma Readymag.
              Listas para probar y conectar con cualquier proyecto.
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/5 border border-white/15 hover:bg-accent-red hover:border-accent-red text-white transition-all cursor-pointer flex items-center gap-2 group font-mono text-xs"
              title="Cerrar laboratorio"
            >
              <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>Cerrar Lab</span>
            </button>
          )}
        </div>

        {/* Gallery Type Switcher & Project Selector */}
        <div className="pt-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          {/* Gallery Format Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {galleryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeGalleryType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveGalleryType(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? 'bg-accent-red text-white border-accent-red shadow-red-laser-sm'
                      : 'bg-void text-surface-light/70 border-white/15 hover:border-accent-red hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Test Project Selector */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-surface-light/50">
              PROBAR CON:
            </span>
            <select
              value={selectedProjectIdx}
              onChange={(e) => setSelectedProjectIdx(Number(e.target.value))}
              className="bg-black/80 border border-white/20 text-white font-mono text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-accent-red cursor-pointer"
            >
              {projects.map((proj, pIdx) => (
                <option key={proj.id} value={pIdx}>
                  {proj.title} ({proj.badgeNumber})
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Main Active Gallery Display */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeGalleryType}-${selectedProjectIdx}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {activeGalleryType === 'horizontal' && (
              <ReadymagHorizontalScroll
                items={galleryItems}
                title={currentProject?.title || "Horizontal Stream"}
                subtitle={currentProject?.subtitle?.es || "Arrastre horizontal continuo con inercia táctil"}
                onSelectImage={(src) => setFullscreenImage(src)}
              />
            )}

            {activeGalleryType === 'stacked' && (
              <ReadymagStackedCards
                items={galleryItems}
                title={currentProject?.title || "Stacked Deck"}
                subtitle={currentProject?.subtitle?.es || "Baraja de cartas 3D apiladas / Arrastra o pasa de carta"}
                onSelectImage={(src) => setFullscreenImage(src)}
              />
            )}

            {activeGalleryType === 'collage' && (
              <ReadymagDraggableCollage
                items={galleryItems}
                title={currentProject?.title || "Draggable Collage"}
                subtitle={currentProject?.subtitle?.es || "Lienzo libre interactivo / Mueve los fragmentos a tu gusto"}
                onSelectImage={(src) => setFullscreenImage(src)}
              />
            )}

            {activeGalleryType === 'split' && (
              <ReadymagSplitSlider
                items={galleryItems}
                title={currentProject?.title || "Split Screen Story"}
                subtitle={currentProject?.subtitle?.es || "Narrativa tipográfica a la izquierda y visor a la derecha"}
                onSelectImage={(src) => setFullscreenImage(src)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
          >
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-accent-red text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <img
              src={fullscreenImage}
              alt="Detalle"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
