import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Project } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpenDetails }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  const localized = t.projects[project.id];
  const displayTitle = localized?.title || project.title;
  const displayDesc = localized?.description || project.description;

  // Motion values for smooth 3D tilt & spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -5;
    const rotY = ((x - centerX) / centerX) * 5;

    rotateX.set(rotX);
    rotateY.set(rotY);
  };

  const handleMouseEnter = () => {
    sound.playHover();
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileTap={{ scale: 0.985 }}
      onClick={() => {
        sound.playClick(900);
        onOpenDetails(project);
      }}
      className="bg-[#faf9f5] dark:bg-[#16171c] p-8 flex flex-col justify-between shadow-xs hover:shadow-2xl transition-all duration-300 border border-[#747878]/15 dark:border-white/10 hover:border-[#1b1c1a]/40 dark:hover:border-[#22C55E]/60 group cursor-pointer relative overflow-hidden rounded-sm"
    >
      {/* Interactive Cursor Spotlight Illumination */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(34, 197, 94, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Subtle top edge scanning light bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#22C55E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <span className="px-3 py-1 bg-[#efeeea] dark:bg-[#212328] font-['JetBrains_Mono'] text-xs text-[#444748] dark:text-[#d1d5db] uppercase tracking-wider transition-colors group-hover:border group-hover:border-[#22C55E]/30">
            {project.badge}
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#444748] dark:text-[#9ca3af] tracking-widest font-semibold group-hover:text-[#22C55E] transition-colors">
            {project.number}
          </span>
        </div>

        <h3 className="font-['Space_Grotesk'] text-2xl font-medium text-[#1b1c1a] dark:text-white mb-3 group-hover:text-[#22C55E] dark:group-hover:text-[#22C55E] transition-colors duration-200">
          {displayTitle}
        </h3>

        <p className="font-['Inter'] text-[15px] text-[#444748] dark:text-[#d1d5db] leading-relaxed mb-6">
          {displayDesc}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-[#f4f4f0] dark:bg-[#212328] font-['JetBrains_Mono'] text-xs text-[#444748] dark:text-[#d1d5db] group-hover:border-b group-hover:border-[#22C55E]/40 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-[#747878]/15 dark:border-white/10 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          {project.demoUrl && project.demoUrl !== '#' ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-['Inter'] text-[13px] font-medium text-[#1b1c1a] dark:text-white hover:text-[#22C55E] dark:hover:text-[#22C55E] flex items-center gap-1.5 transition-colors duration-200 py-1"
            >
              <span>{t.work.launchLive}</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">open_in_new</span>
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
              <span>{t.work.caseStudy}</span>
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
            {t.work.caseStudy}
          </button>
        </div>

        <span className="font-['JetBrains_Mono'] text-xs text-[#747878] dark:text-[#9ca3af]">
          {project.year}
        </span>
      </div>
    </motion.div>
  );
};
