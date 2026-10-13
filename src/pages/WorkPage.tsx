import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectCard } from '../components/ProjectCard';
import { useNavigation } from '../context/NavigationContext';
import { useLanguage } from '../context/LanguageContext';
import { CyberMotionCanvas } from '../components/CyberMotionCanvas';
import { MagneticButton } from '../components/MagneticButton';

interface WorkPageProps {
  onOpenProject: (project: Project) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onOpenProject }) => {
  const { navigateTo } = useNavigation();
  const { t } = useLanguage();

  return (
    <div className="relative w-full px-6 lg:px-12 py-16 sm:py-24 bg-transparent transition-colors duration-200 min-h-[80vh] overflow-hidden">
      {/* Background Cyber Motion Canvas */}
      <CyberMotionCanvas density="compact" interactive={true} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Breadcrumb & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-4 font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[#006e2f] dark:text-[#4ade80]">
            <button
              onClick={() => navigateTo('home')}
              className="hover:underline flex items-center gap-1 cursor-pointer text-[#747878] dark:text-[#9ca3af] hover:text-[#1b1c1a] dark:hover:text-white"
            >
              <span>{t.nav.home}</span>
            </button>
            <span className="text-[#747878]/50">/</span>
            <span>{t.work.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#747878]/15 dark:border-white/10">
            <div>
              <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
                {t.work.title}
              </h1>
              <p className="font-['Inter'] text-base sm:text-lg text-[#444748] dark:text-[#d1d5db] max-w-xl mt-3 leading-relaxed">
                {t.work.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#006e2f] dark:text-[#4ade80] font-['JetBrains_Mono'] text-xs font-semibold">
                {t.work.deployments}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid with 3D Tilt and Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenDetails={onOpenProject}
            />
          ))}
        </div>

        {/* Project Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-8 sm:p-12 rounded-2xl glass-panel-elevated flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden group shadow-xl"
        >
          {/* Subtle scanning glow line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#22C55E] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase tracking-widest block mb-2 font-medium">
              {t.work.badge}
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
              {t.work.needLaunch}
            </h2>
            <p className="font-['Inter'] text-sm sm:text-base text-[#444748] dark:text-[#d1d5db] max-w-lg mt-2">
              {t.work.needLaunchSub}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton
              onClick={() => navigateTo('contact')}
              className="px-6 py-3.5 bg-[#000000] dark:bg-white text-white dark:text-black hover:bg-[#22C55E] dark:hover:bg-[#22C55E] dark:hover:text-black font-['Inter'] text-sm font-medium tracking-wide transition-all duration-200 rounded-lg flex items-center gap-2 shadow-sm"
            >
              <span>{t.work.startBrief}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </MagneticButton>
            <MagneticButton
              onClick={() => navigateTo('skills')}
              className="px-6 py-3.5 glass-btn text-[#1b1c1a] dark:text-white font-['Inter'] text-sm font-medium tracking-wide transition-all duration-200 rounded-lg"
            >
              <span>{t.work.exploreServices}</span>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
