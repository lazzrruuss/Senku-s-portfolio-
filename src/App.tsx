import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { AboutPage } from './pages/AboutPage';
import { SkillsPage } from './pages/SkillsPage';
import { ContactPage } from './pages/ContactPage';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';

function PortfolioApp() {
  const { currentPage, pendingProjectId, clearPendingProjectId } = useNavigation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // If a project ID was targeted during navigation (e.g. from Hero cards)
  useEffect(() => {
    if (pendingProjectId) {
      const proj = PORTFOLIO_DATA.projects.find((p) => p.id === pendingProjectId);
      if (proj) {
        setSelectedProject(proj);
      }
      clearPendingProjectId();
    }
  }, [pendingProjectId, clearPendingProjectId]);

  const handleSelectProjectById = (projectId: string) => {
    const proj = PORTFOLIO_DATA.projects.find((p) => p.id === projectId);
    if (proj) {
      setSelectedProject(proj);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'work':
        return <WorkPage onOpenProject={(proj) => setSelectedProject(proj)} />;
      case 'about':
        return <AboutPage />;
      case 'skills':
        return <SkillsPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
          <HomePage
            onOpenProject={(proj) => setSelectedProject(proj)}
            onSelectProjectById={handleSelectProjectById}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-[#090a0c] font-['Inter'] text-[#1b1c1a] dark:text-[#ffffff] antialiased selection:bg-[#22C55E] selection:text-black flex flex-col transition-colors duration-200">
      {/* Top Fixed Header with multi-page navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-[#faf9f5] dark:bg-[#090a0c] flex-grow transition-colors duration-200">
        {renderCurrentPage()}
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
      <NavigationProvider>
        <PortfolioApp />
      </NavigationProvider>
    </ThemeProvider>
  );
}
