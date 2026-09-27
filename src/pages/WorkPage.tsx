import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectCard } from '../components/ProjectCard';
import { useNavigation } from '../context/NavigationContext';

interface WorkPageProps {
  onOpenProject: (project: Project) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onOpenProject }) => {
  const { navigateTo } = useNavigation();

  return (
    <div className="w-full px-6 lg:px-12 py-16 sm:py-24 bg-[#faf9f5] dark:bg-[#090a0c] transition-colors duration-200 min-h-[80vh]">
      <div className="max-w-7xl mx-auto">
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
              <span>Home</span>
            </button>
            <span className="text-[#747878]/50">/</span>
            <span>Selected Work</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#747878]/15 dark:border-white/10">
            <div>
              <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
                Selected Work
              </h1>
              <p className="font-['Inter'] text-base sm:text-lg text-[#444748] dark:text-[#d1d5db] max-w-xl mt-3 leading-relaxed">
                Live client builds, memecoin portals, and production Web3 applications designed and developed by Senku.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#006e2f] dark:text-[#4ade80] font-['JetBrains_Mono'] text-xs font-medium">
                3 Production Deployments
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
          className="p-8 sm:p-12 rounded-xl bg-[#f4f4f0] dark:bg-[#111216] border border-[#747878]/15 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#006e2f] dark:text-[#4ade80] uppercase tracking-widest block mb-2 font-medium">
              Need A Custom Launch?
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-medium text-[#1b1c1a] dark:text-white tracking-tight">
              Have a token, protocol, or dApp to build?
            </h2>
            <p className="font-['Inter'] text-sm sm:text-base text-[#444748] dark:text-[#d1d5db] max-w-lg mt-2">
              From memecoin launch portals to decentralized dashboards with live swaps and telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3.5 bg-[#000000] dark:bg-white text-white dark:text-black hover:bg-[#22C55E] dark:hover:bg-[#22C55E] dark:hover:text-black font-['Inter'] text-sm font-medium tracking-wide transition-all duration-200 rounded flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Start Project Brief</span>
              <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </button>
            <button
              onClick={() => navigateTo('skills')}
              className="px-6 py-3.5 bg-transparent border border-[#747878]/30 dark:border-white/20 hover:border-[#1b1c1a] dark:hover:border-white text-[#1b1c1a] dark:text-white font-['Inter'] text-sm font-medium tracking-wide transition-all duration-200 rounded cursor-pointer"
            >
              <span>Explore Services</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
