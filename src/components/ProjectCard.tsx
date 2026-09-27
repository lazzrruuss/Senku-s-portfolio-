import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../data/portfolioData';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpenDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onOpenDetails(project)}
      className="bg-[#faf9f5] dark:bg-[#16171c] p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-shadow duration-300 border border-[#747878]/15 dark:border-white/10 hover:border-[#1b1c1a]/40 dark:hover:border-[#22C55E]/50 group cursor-pointer relative"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 bg-[#efeeea] dark:bg-[#212328] font-['JetBrains_Mono'] text-xs text-[#444748] dark:text-[#d1d5db] uppercase tracking-wider">
            {project.badge}
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#444748] dark:text-[#9ca3af] tracking-widest">
            {project.number}
          </span>
        </div>

        <h3 className="font-['Space_Grotesk'] text-2xl font-medium text-[#1b1c1a] dark:text-white mb-3 group-hover:text-[#22C55E] dark:group-hover:text-[#22C55E] transition-colors duration-200">
          {project.title}
        </h3>

        <p className="font-['Inter'] text-[15px] text-[#444748] dark:text-[#d1d5db] leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-[#f4f4f0] dark:bg-[#212328] font-['JetBrains_Mono'] text-xs text-[#444748] dark:text-[#d1d5db]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-[#747878]/15 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {project.demoUrl && project.demoUrl !== '#' ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-['Inter'] text-[13px] font-medium text-[#1b1c1a] dark:text-white hover:text-[#22C55E] dark:hover:text-[#22C55E] flex items-center gap-1.5 transition-colors duration-200 py-1"
            >
              <span>{project.actionText}</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(project);
              }}
              className="font-['Inter'] text-[13px] font-medium text-[#1b1c1a] dark:text-white group-hover:text-[#22C55E] dark:group-hover:text-[#22C55E] flex items-center gap-1.5 transition-colors duration-200 py-1 cursor-pointer"
            >
              <span>{project.actionText}</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                {project.actionType === 'repo' ? 'code' : 'open_in_new'}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(project);
            }}
            className="font-['Inter'] text-[12px] text-[#747878] dark:text-[#9ca3af] hover:text-[#1b1c1a] dark:hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
          >
            Case Study
          </button>
        </div>

        <span className="font-['JetBrains_Mono'] text-xs text-[#747878] dark:text-[#9ca3af]">
          {project.year}
        </span>
      </div>
    </motion.div>
  );
};
