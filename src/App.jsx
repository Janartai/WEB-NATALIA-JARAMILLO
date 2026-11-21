import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import BackgroundLaser from './components/BackgroundLaser';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoReel from './components/VideoReel';
import FeaturedProjects from './components/FeaturedProjects';
import ProjectsView from './components/ProjectsView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import ProjectDetailView from './components/ProjectDetailView';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import EditorialHUD from './components/EditorialHUD';
import InfiniteMarquee from './components/InfiniteMarquee';
import { portfolioData } from './data/portfolioData';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null); // 'editorial', 'branding', 'empaques' or null
  const [language, setLanguage] = useState('es'); // 'es' or 'en'

  const selectedProject = portfolioData.projects.find(p => p.id === selectedProjectId);

  const handleOpenProject = (id) => {
    setSelectedProjectId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseProject = () => {
    setSelectedProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDiscipline = (discId) => {
    setSelectedProjectId(null);
    setSelectedDiscipline(discId);
    setCurrentView('proyectos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view) => {
    setSelectedProjectId(null);
    if (view === 'proyectos') setSelectedDiscipline(null);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SmoothScroll isLocked={showSplash}>
      <div className="relative min-h-screen bg-void text-surface-light selection:bg-accent-red selection:text-white font-satoshi">
        
        {/* 0. Cinematic CRT Phosphor Intro (Splash Screen) */}
        {showSplash && (
          <SplashScreen 
            onComplete={() => setShowSplash(false)} 
            language={language}
          />
        )}

        {/* 1. Global Interactive Smoke Background */}
        <BackgroundLaser />

        {/* 2. Minimalist Editorial Ink Cursor */}
        <CustomCursor />

        {/* 3. Sticky Glassmorphic Navbar with Language Switcher */}
        <Navbar 
          currentView={currentView}
          setCurrentView={handleNavigate}
          language={language}
          setLanguage={setLanguage}
          onReplayIntro={() => setShowSplash(true)}
        />

        {/* 5. Main Views with AnimatePresence */}
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            
            {/* Dedicated Full-Page Project View (NO FLOATING MODAL) */}
            {selectedProject ? (
              <motion.div
                key={`project-detail-${selectedProject.id}-${language}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectDetailView 
                  project={selectedProject}
                  allProjects={portfolioData.projects}
                  onClose={handleCloseProject}
                  onSelectProject={handleOpenProject}
                  language={language}
                />
              </motion.div>
            ) : (
              <>
                {currentView === 'home' && (
                  <motion.div
                    key={`home-${language}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Home Hero */}
                    <Hero 
                      onExploreProjects={() => {
                        setSelectedDiscipline(null);
                        setCurrentView('proyectos');
                      }} 
                      language={language}
                    />

                    {/* Kinetic Typography Marquee Ribbon */}
                    <InfiniteMarquee language={language} />

                    {/* Showreel Container: Dedicated pure video player */}
                    <VideoReel language={language} />

                    {/* Featured 3-column project showcase with Swiper 3D & Parallax Grid */}
                    <FeaturedProjects 
                      projects={portfolioData.projects} 
                      onSelectProject={handleOpenProject}
                      language={language}
                    />
                  </motion.div>
                )}

                {currentView === 'proyectos' && (
                  <motion.div
                    key={`proyectos-${language}-${selectedDiscipline || 'all'}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Categorías Escalonadas & Filtros */}
                    <ProjectsView 
                      disciplines={portfolioData.disciplines}
                      projects={portfolioData.projects}
                      selectedDiscipline={selectedDiscipline}
                      onSelectDiscipline={setSelectedDiscipline}
                      onSelectProject={handleOpenProject}
                      language={language}
                    />
                  </motion.div>
                )}

                {currentView === 'sobre-mi' && (
                  <motion.div
                    key={`sobre-mi-${language}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Altar 00: Perfil, Experiencia, Reconocimientos y Ficha Técnica */}
                    <AboutView 
                      author={portfolioData.author}
                      onOpenContact={() => handleNavigate('contacto')}
                      language={language}
                    />
                  </motion.div>
                )}

                {currentView === 'contacto' && (
                  <motion.div
                    key={`contacto-${language}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Altar 04: Transmisión Directa & Formulario Integrado (NO MODAL FLOTANTE) */}
                    <ContactView language={language} />
                  </motion.div>
                )}
              </>
            )}

          </AnimatePresence>
        </main>

        {/* 4. Editorial Footer */}
        <Footer 
          onNavClick={handleNavigate}
          language={language}
        />

      </div>
    </SmoothScroll>
  );
}
