import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { About } from './components/About';
import { SkillsServices } from './components/SkillsServices';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';

function PortfolioApp() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleSelectProjectById = (projectId: string) => {
    const proj = PORTFOLIO_DATA.projects.find((p) => p.id === projectId);
    if (proj) {
      setSelectedProject(proj);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-[#090a0c] font-['Inter'] text-[#1b1c1a] dark:text-[#ffffff] antialiased selection:bg-[#22C55E] selection:text-black flex flex-col transition-colors duration-200">
      {/* Top Fixed Header with Theme Toggle */}
      <Navbar />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-[#faf9f5] dark:bg-[#090a0c] flex-grow transition-colors duration-200">
        <Hero onSelectProject={handleSelectProjectById} />
        <SelectedWork onOpenProject={(proj) => setSelectedProject(proj)} />
        <About />
        <SkillsServices />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
