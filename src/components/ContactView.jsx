import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  Mail, 
  MessageSquare, 
  MapPin, 
  ArrowUpRight, 
  Sparkles,
  Layers,
  Compass,
  Clock
} from 'lucide-react';
import { uiTranslations } from '../data/translations';

export default function ContactView({ language = 'es' }) {
  const t = uiTranslations[language].contact;

  const projectTypes = language === 'es'
    ? ['Diseño Editorial', 'Branding & Identidad', 'Empaques & Packaging', 'Dirección de Arte', 'Otro / Colaboración']
    : ['Editorial Design', 'Branding & Identity', 'Packaging & Art Toys', 'Art Direction', 'Other / Inquiry'];

  const [selectedType, setSelectedType] = useState(projectTypes[0]);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const directEmail = 'nataliajaramillo.diseno@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative pt-12 pb-24 md:pt-16 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. Header Telemetry & Title */}
      <div className="mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-4"
        >
          <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-accent-red/20 border border-accent-red text-accent-red tracking-wider shadow-red-laser-sm">
            ALTAR 04 // {language === 'es' ? 'CONEXIÓN & PROPUESTAS' : 'INQUIRIES & COLLABORATION'}
          </span>
          <span className="flex items-center gap-2 font-mono text-xs text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {language === 'es' ? 'DISPONIBLE PARA NUEVOS PROYECTOS • 2026' : 'AVAILABLE FOR NEW COMMISSIONS • 2026'}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-[0.95]"
        >
          {language === 'es' ? (
            <>
              Hablemos de tu <br className="hidden sm:inline" />
              <span className="text-surface-light/40">próximo</span> proyecto
            </>
          ) : (
            <>
              Let’s talk about your <br className="hidden sm:inline" />
              <span className="text-surface-light/40">next</span> vision
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-mono text-xs sm:text-sm text-surface-light/60 max-w-2xl leading-relaxed"
        >
          {language === 'es'
            ? 'Abierta a comisiones en diseño editorial, creación de identidad de marca, dirección de arte y desarrollos de empaque. Escríbeme y construyamos un nuevo altar visual.'
            : 'Open for commissions in editorial layout, brand systems, art direction, and packaging prototyping. Send a message to build your next visual altar.'}
        </motion.p>
      </div>

      {/* 2. Main 2-Column Integrated Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Direct Info, Copy Email, Socials & Manifesto */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Quick Contact Card */}
          <div className="p-6 sm:p-8 rounded-card border border-white/10 bg-neutral-950/80 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-red to-transparent opacity-60" />
            
            <span className="font-mono text-[11px] text-accent-red uppercase tracking-widest block mb-4">
              // {language === 'es' ? 'CANAL DIRECTO' : 'DIRECT CHANNEL'}
            </span>

            {/* Email Address with Copy Button */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-surface-light/50 uppercase">
                {language === 'es' ? 'Correo Electrónico Oficial' : 'Official Email Address'}
              </label>
              <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-void border border-white/15 hover:border-accent-red/60 transition-colors">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail size={16} className="text-accent-red shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-white truncate select-all">
                    {directEmail}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-accent-red hover:text-white text-surface-light/80 transition-all shrink-0 cursor-pointer"
                  title="Copiar correo"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
              {copiedEmail && (
                <span className="font-mono text-[10px] text-emerald-400 tracking-wider block">
                  ✓ {language === 'es' ? 'Copiado al portapapeles' : 'Copied to clipboard'}
                </span>
              )}
            </div>

            {/* Location & Timezone */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <span className="text-surface-light/40 text-[10px] uppercase block mb-1">
                  {language === 'es' ? 'UBICACIÓN' : 'LOCATION'}
                </span>
                <span className="text-white flex items-center gap-1.5">
                  <MapPin size={12} className="text-accent-red" />
                  Medellín, CO
                </span>
              </div>
              <div>
                <span className="text-surface-light/40 text-[10px] uppercase block mb-1">
                  {language === 'es' ? 'ZONA HORARIA' : 'TIMEZONE'}
                </span>
                <span className="text-white flex items-center gap-1.5">
                  <Clock size={12} className="text-accent-red" />
                  COT (UTC-5)
                </span>
              </div>
            </div>
          </div>

          {/* Disciplines Handled */}
          <div className="p-6 rounded-card border border-white/10 bg-neutral-950/60 backdrop-blur-md">
            <span className="font-mono text-[11px] text-accent-red uppercase tracking-widest block mb-3">
              // {language === 'es' ? 'CAMPOS DE ACCIÓN' : 'AREAS OF PRACTICE'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-surface-light/80">
              <div className="p-2.5 rounded-lg bg-void/60 border border-white/5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                <span>{language === 'es' ? 'Diseño Editorial' : 'Editorial Layout'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-void/60 border border-white/5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                <span>{language === 'es' ? 'Identidad de Marca' : 'Brand Identity'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-void/60 border border-white/5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                <span>{language === 'es' ? 'Empaques & Toys' : 'Packaging & Toys'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-void/60 border border-white/5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                <span>{language === 'es' ? 'Dirección de Arte' : 'Art Direction'}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="p-6 rounded-card border border-white/10 bg-neutral-950/60 backdrop-blur-md">
            <span className="font-mono text-[11px] text-surface-light/40 uppercase tracking-widest block mb-3">
              {language === 'es' ? 'REDES & PLATAFORMAS PROFESIONALES' : 'PROFESSIONAL PLATFORMS'}
            </span>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://www.behance.net/gallery/256653357/NATALIA-JARAMILLO-PORTAFOLIO-2026"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 bg-void text-xs font-mono text-surface-light hover:border-accent-red hover:text-white transition-all group"
              >
                <span>Behance</span>
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/natha-arismendi-705953442"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 bg-void text-xs font-mono text-surface-light hover:border-accent-red hover:text-white transition-all group"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://www.instagram.com/jaramillo5982/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 bg-void text-xs font-mono text-surface-light hover:border-accent-red hover:text-white transition-all group"
              >
                <span>Instagram</span>
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </motion.div>

        {/* Right Column: Integrated Interactive Form (NO FLOATING MODAL) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-10 rounded-card border-2 border-white/15 bg-neutral-950/90 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="laser-horizontal top-0 left-0" />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-accent-red/20 border-2 border-accent-red text-accent-red flex items-center justify-center mx-auto shadow-red-laser-sm">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                  {t.successTitle}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-surface-light/70 max-w-md mx-auto leading-relaxed">
                  {t.successDesc}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ nombre: '', email: '', mensaje: '' });
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-accent-red hover:text-white border border-white/20 text-white font-mono text-xs tracking-wider transition-all"
                >
                  {language === 'es' ? 'ENVIAR OTRO MENSAJE' : 'SEND ANOTHER MESSAGE'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Project Category Pills Selector */}
                <div>
                  <label className="font-mono text-xs text-accent-red uppercase tracking-wider block mb-3 font-bold">
                    1. {t.projectTypeLabel}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => {
                      const isSelected = selectedType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedType(type)}
                          className={`font-mono text-xs px-3.5 py-2 rounded-full transition-all duration-200 border cursor-pointer ${
                            isSelected
                              ? 'bg-accent-red text-white border-accent-red shadow-red-laser-sm font-bold'
                              : 'bg-void text-surface-light/70 border-white/15 hover:border-accent-red hover:text-white hover:bg-accent-red/15'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-surface-light/60 uppercase tracking-wider block mb-2">
                      2. {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder={t.namePlaceholder}
                      className="w-full bg-void border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-surface-light/30 focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-surface-light/60 uppercase tracking-wider block mb-2">
                      3. {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.emailPlaceholder}
                      className="w-full bg-void border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-surface-light/30 focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Project Details Textarea */}
                <div>
                  <label className="font-mono text-xs text-surface-light/60 uppercase tracking-wider block mb-2">
                    4. {t.detailsLabel}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    placeholder={t.detailsPlaceholder}
                    className="w-full bg-void border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-surface-light/30 focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-all resize-none font-mono"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="font-mono text-[11px] text-surface-light/40">
                    {language === 'es' ? '* Todos los campos son procesados de forma directa' : '* All submissions are reviewed directly'}
                  </span>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent-red text-white font-mono text-xs uppercase font-bold tracking-wider hover:bg-white hover:text-black hover:shadow-red-laser-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-red-laser-sm"
                  >
                    <span>{t.submitBtn}</span>
                    <Send size={14} />
                  </button>
                </div>

              </form>
            )}

          </div>
        </motion.div>

      </div>

    </div>
  );
}
