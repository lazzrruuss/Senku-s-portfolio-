import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';

interface SelectedWorkProps {
  onOpenProject: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onOpenProject }) => {
  return (
    <section className="w-full px-6 lg:px-12 py-24 bg-[#f4f4f0] dark:bg-[#111216] border-b border-[#747878]/15 dark:border-white/10 transition-colors duration-200" id="work">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase tracking-widest block mb-3 font-medium">
              Portfolio
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
              Selected Work
            </h2>
          </div>
          <p className="font-['Inter'] text-[15px] text-[#444748] dark:text-[#d1d5db] max-w-md leading-relaxed">
            Concept and personal projects built with modern web technologies and high-end aesthetics.
          </p>
        </motion.div>

        {/* 3 Editable Project Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenDetails={onOpenProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
