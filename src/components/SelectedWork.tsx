import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { useNavigation } from '../context/NavigationContext';
import { useLanguage } from '../context/LanguageContext';

interface SelectedWorkProps {
  onOpenProject: (project: Project) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onOpenProject }) => {
  const { navigateTo } = useNavigation();
  const { t } = useLanguage();

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
              {t.work.badge}
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
              {t.work.title}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-['Inter'] text-[15px] text-[#444748] dark:text-[#d1d5db] max-w-md leading-relaxed">
              {t.work.subtitle}
            </p>
            <button
              type="button"
              onClick={() => navigateTo('work')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded border border-[#747878]/30 dark:border-white/20 hover:border-[#22C55E] dark:hover:border-[#22C55E] font-['JetBrains_Mono'] text-xs font-semibold text-[#1b1c1a] dark:text-white hover:text-[#22C55E] transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              <span>{t.work.viewAll}</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>
        </motion.div>

        {/* 3 Project Cards with Staggered Scroll Reveal */}
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
