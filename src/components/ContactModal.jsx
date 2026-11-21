import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { uiTranslations } from '../data/translations';

export default function ContactModal({ isOpen, onClose, language }) {
  const t = uiTranslations[language].contact;

  const projectTypes = language === 'es'
    ? ['Editorial', 'Branding', 'Packaging', 'Dirección de Arte']
    : ['Editorial', 'Branding', 'Packaging', 'Art Direction'];

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipo: projectTypes[0],
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        
        {/* Backdrop blur (24px) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-2xl"
        />

        {/* Floating Modal Window: Dark Obsidian-Red Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl rounded-[32px] border-2 border-accent-red bg-gradient-to-b from-[#18090d] via-[#100608] to-[#0a0506] text-surface-light p-6 sm:p-10 shadow-2xl overflow-hidden z-10"
        >
          {/* Laser Accent line */}
          <div className="laser-horizontal top-0 left-0" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs text-accent-red uppercase tracking-widest block">
                {t.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                {t.title}
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 border border-white/20 text-white hover:bg-accent-red hover:border-accent-red transition-all"
              aria-label="Cerrar modal"
            >
              <X size={18} />
            </button>
          </div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-accent-red/20 border-2 border-accent-red text-accent-red flex items-center justify-center mx-auto shadow-red-laser-sm">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white">{t.successTitle}</h3>
              <p className="font-mono text-xs text-surface-light/70 max-w-sm mx-auto">
                {t.successDesc}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Selector de Tipo de Proyecto */}
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-surface-light/60 block mb-2">
                  {t.projectTypeLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map(typ => (
                    <button
                      type="button"
                      key={typ}
                      onClick={() => setFormData({ ...formData, tipo: typ })}
                      className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all ${
                        formData.tipo === typ
                          ? 'bg-accent-red text-white border-accent-red shadow-red-laser-sm'
                          : 'bg-void text-surface-light/70 border-white/15 hover:border-accent-red'
                      }`}
                    >
                      {typ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nombre */}
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-surface-light/60 block mb-1.5">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.namePlaceholder}
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-surface-light/60 block mb-1.5">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-all"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-surface-light/60 block mb-1.5">
                  {t.detailsLabel}
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder={t.detailsPlaceholder}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-accent-red text-white font-mono text-xs font-bold tracking-widest hover:bg-white hover:text-black shadow-red-laser-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send size={14} />
                <span>{t.submitBtn}</span>
              </button>
            </form>
          )}

          {/* Social Links & Location */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-surface-light/60 gap-3">
            <div className="flex items-center gap-4">
              <a 
                href="mailto:natalia.jaramillo@example.com" 
                className="hover:text-accent-red transition-colors flex items-center gap-1"
              >
                <span>EMAIL</span>
                <ArrowUpRight size={12} />
              </a>
              <a 
                href="https://www.behance.net/gallery/256653357/NATALIA-JARAMILLO-PORTAFOLIO-2026" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-accent-red transition-colors flex items-center gap-1"
              >
                <span>BEHANCE</span>
                <ArrowUpRight size={12} />
              </a>
              <a 
                href="https://www.linkedin.com/in/natha-arismendi-705953442" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-accent-red transition-colors flex items-center gap-1"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight size={12} />
              </a>
              <a 
                href="https://www.instagram.com/jaramillo5982/" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-accent-red transition-colors flex items-center gap-1"
              >
                <span>INSTAGRAM</span>
                <ArrowUpRight size={12} />
              </a>
            </div>

            <div className="text-[11px] text-surface-light/40">
              {t.city}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
