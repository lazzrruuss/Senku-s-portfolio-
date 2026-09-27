import React from 'react';
import { Hero } from '../components/Hero';
import { SelectedWork } from '../components/SelectedWork';
import { About } from '../components/About';
import { SkillsServices } from '../components/SkillsServices';
import { Contact } from '../components/Contact';
import { Project } from '../data/portfolioData';

interface HomePageProps {
  onOpenProject: (project: Project) => void;
  onSelectProjectById: (projectId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenProject,
  onSelectProjectById,
}) => {
  return (
    <>
      <Hero onSelectProject={onSelectProjectById} />
      <SelectedWork onOpenProject={onOpenProject} />
      <About />
      <SkillsServices />
      <Contact />
    </>
  );
};
